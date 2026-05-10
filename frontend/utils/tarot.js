// 塔罗牌核心逻辑工具函数

import { TAROT_DECK, SPREADS } from '../data/tarot-data.js';

/**
 * 洗牌 - Fisher-Yates 洗牌算法
 */
export function shuffleDeck(deck = [...TAROT_DECK]) {
  // 深拷贝每张牌，避免修改原始牌组
  const copiedDeck = deck.map(card => ({ ...card }));
  for (let i = copiedDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedDeck[i], copiedDeck[j]] = [copiedDeck[j], copiedDeck[i]];
  }
  return copiedDeck;
}

/**
 * 抽牌
 * @param {number} count - 抽牌数量
 * @param {boolean} allowReversed - 是否允许逆位
 */
export function drawCards(count = 1, allowReversed = true) {
  const shuffled = shuffleDeck();
  const drawn = shuffled.slice(0, count);
  
  return drawn.map(card => ({
    ...card,
    isReversed: allowReversed ? Math.random() > 0.5 : false,
    timestamp: Date.now()
  }));
}

/**
 * 按牌阵抽牌
 * @param {string} spreadId - 牌阵ID
 * @param {boolean} allowReversed - 是否允许逆位
 */
export function drawSpread(spreadId = 'single', allowReversed = true) {
  const spread = SPREADS[spreadId];
  if (!spread) {
    throw new Error(`未找到牌阵: ${spreadId}`);
  }
  
  const cards = drawCards(spread.positions.length, allowReversed);
  
  return {
    spreadId,
    spreadName: spread.name,
    timestamp: Date.now(),
    cards: cards.map((card, index) => ({
      ...card,
      position: spread.positions[index]
    }))
  };
}

/**
 * 获取牌的正/逆位含义
 */
export function getCardMeaning(card) {
  if (card.meaning) {
    return card.isReversed ? card.meaning.reversed : card.meaning.upright;
  }
  return card.isReversed ? '逆位含义' : '正位含义';
}

/**
 * 获取牌的关键词
 */
export function getCardKeywords(card) {
  if (!card.keywords) return [];
  // 逆位时取反义关键词或加上"逆位"标记
  if (card.isReversed) {
    return card.keywords.map(k => `${k}(逆)`);
  }
  return card.keywords;
}

/**
 * 保存抽牌记录
 */
export function saveReading(reading) {
  const key = 'tarot_readings';
  const readings = uni.getStorageSync(key) || [];
  readings.unshift(reading);
  
  // 只保留最近50条
  if (readings.length > 50) {
    readings.pop();
  }
  
  uni.setStorageSync(key, readings);
  return reading;
}

/**
 * 获取历史记录
 */
export function getReadings(limit = 10) {
  const readings = uni.getStorageSync('tarot_readings') || [];
  return readings.slice(0, limit);
}

/**
 * 格式化时间
 */
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  // 小于1小时
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return minutes < 1 ? '刚刚' : `${minutes}分钟前`;
  }
  
  // 小于24小时
  if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}小时前`;
  }
  
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

/**
 * 获取牌面图片路径（需要用户自己提供图片）
 */
export function getCardImage(card) {
  if (!card) return '/static/images/card-back.svg';
  if (card.image) return card.image;

  const suit = card.suit || 'major';
  const number = card.number !== undefined ? card.number : card.id;
  return `/static/images/cards/${suit}/${number}.svg`;
}

/**
 * 牌面图片加载失败时的梦幻占位图
 */
export function getFallbackCardImage(card) {
  const title = card?.name || '塔罗';
  const subtitle = card?.nameEn || 'Tarot Dream';
  const suit = card?.suit || 'major';
  const palettes = {
    major: ['#2b174d', '#6d3fd1', '#f2c879'],
    cups: ['#15345d', '#42a7c6', '#e7f8ff'],
    wands: ['#4b1b2b', '#d96b43', '#fff0a8'],
    swords: ['#1d284f', '#7da1ff', '#eef4ff'],
    pentacles: ['#193d35', '#6fb46e', '#f0ffd0']
  };
  const [deep, glow, ink] = palettes[suit] || palettes.major;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 360">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${deep}"/>
          <stop offset="1" stop-color="#090817"/>
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="34%" r="45%">
          <stop offset="0" stop-color="${glow}" stop-opacity=".72"/>
          <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect x="8" y="8" width="224" height="344" rx="18" fill="url(#bg)" stroke="${ink}" stroke-opacity=".78" stroke-width="3"/>
      <circle cx="120" cy="122" r="86" fill="url(#halo)"/>
      <path d="M120 54l13 43 43 13-43 13-13 43-13-43-43-13 43-13z" fill="${ink}" opacity=".88"/>
      <circle cx="120" cy="110" r="38" fill="none" stroke="${ink}" stroke-opacity=".55" stroke-width="2"/>
      <path d="M54 250c28-24 104-24 132 0" fill="none" stroke="${ink}" stroke-opacity=".42" stroke-width="2"/>
      <text x="120" y="286" text-anchor="middle" font-size="25" font-weight="700" fill="${ink}" font-family="Arial, sans-serif">${title}</text>
      <text x="120" y="314" text-anchor="middle" font-size="12" fill="${ink}" opacity=".72" font-family="Arial, sans-serif">${subtitle}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * 获取牌背图片
 */
export function getCardBackImage() {
  return '/static/images/card-back.svg';
}

/**
 * 生成抽牌结果的文本描述
 */
export function generateReadingText(reading) {
  const { spreadName, cards } = reading;
  
  let text = `## ${spreadName}\n\n`;
  
  cards.forEach((card, index) => {
    const positionName = card.position ? card.position.name : '抽到的牌';
    const orientation = card.isReversed ? '逆位' : '正位';
    
    text += `### ${index + 1}. ${positionName}\n`;
    text += `牌面：**${card.name}** (${orientation})\n`;
    text += `含义：${getCardMeaning(card)}\n\n`;
  });
  
  return text;
}

/**
 * 模拟洗牌动画（用于用户体验）
 */
export function simulateShufflingAnimation(duration = 1500) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

export default {
  shuffleDeck,
  drawCards,
  drawSpread,
  getCardMeaning,
  getCardKeywords,
  saveReading,
  getReadings,
  formatDate,
  getCardImage,
  getFallbackCardImage,
  getCardBackImage,
  generateReadingText,
  simulateShufflingAnimation
};
