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
  const suit = card.suit || 'major';
  const number = card.number !== undefined ? card.number : card.id;
  return `/static/images/cards/${suit}/${number}.svg`;
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
  getCardBackImage,
  generateReadingText,
  simulateShufflingAnimation
};
