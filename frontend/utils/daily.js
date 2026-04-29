// 每日一抽功能

import { TAROT_DECK } from '../data/tarot-data.js';

const DAILY_CARD_KEY = 'tarot_daily_card';
const DAILY_DRAWN_KEY = 'tarot_daily_drawn';

/**
 * 检查今天是否已抽过
 */
export function hasDrawnToday() {
  const lastDrawn = uni.getStorageSync(DAILY_DRAWN_KEY);
  if (!lastDrawn) return false;
  
  const lastDate = new Date(parseInt(lastDrawn));
  const today = new Date();
  
  return lastDate.getFullYear() === today.getFullYear() &&
         lastDate.getMonth() === today.getMonth() &&
         lastDate.getDate() === today.getDate();
}

/**
 * 获取今天的日期字符串
 */
function getTodayString() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

/**
 * 抽取每日一牌
 */
export function drawDailyCard() {
  if (hasDrawnToday()) {
    return getTodayCard();
  }
  
  // 基于日期生成伪随机种子，保证同一天同一个人抽到相同的牌
  const today = getTodayString();
  const seed = hashString(today + getUserIdentifier());
  
  // 使用种子选择牌
  const randomIndex = seed % TAROT_DECK.length;
  const card = TAROT_DECK[randomIndex];
  
  // 基于种子决定是否逆位
  const isReversed = (seed % 10) > 5;
  
  const dailyCard = {
    ...card,
    isReversed,
    date: today,
    timestamp: Date.now()
  };
  
  // 保存
  uni.setStorageSync(DAILY_CARD_KEY, dailyCard);
  uni.setStorageSync(DAILY_DRAWN_KEY, Date.now().toString());
  
  return dailyCard;
}

/**
 * 获取今天的牌（如果不存在则抽取）
 */
export function getTodayCard() {
  const card = uni.getStorageSync(DAILY_CARD_KEY);
  if (!card) {
    return drawDailyCard();
  }
  
  // 检查是否是今天的牌
  const today = getTodayString();
  if (card.date !== today) {
    return drawDailyCard();
  }
  
  return card;
}

/**
 * 获取历史每日一抽记录
 */
export function getDailyHistory(limit = 30) {
  const history = uni.getStorageSync('tarot_daily_history') || [];
  return history.slice(0, limit);
}

/**
 * 保存到历史记录
 */
export function saveToHistory(card) {
  let history = uni.getStorageSync('tarot_daily_history') || [];
  
  // 检查是否已存在今天的记录
  const today = getTodayString();
  const existingIndex = history.findIndex(h => h.date === today);
  
  if (existingIndex >= 0) {
    history[existingIndex] = card;
  } else {
    history.unshift(card);
  }
  
  // 只保留最近 90 天
  if (history.length > 90) {
    history = history.slice(0, 90);
  }
  
  uni.setStorageSync('tarot_daily_history', history);
}

/**
 * 字符串哈希函数
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为 32bit 整数
  }
  return Math.abs(hash);
}

/**
 * 获取用户标识（基于设备）
 */
function getUserIdentifier() {
  // 尝试获取设备信息作为标识
  try {
    const systemInfo = uni.getSystemInfoSync();
    return systemInfo.deviceId || systemInfo.model || 'unknown';
  } catch (e) {
    return 'unknown';
  }
}

/**
 * 生成每日指引文本
 */
export function generateDailyGuidance(card) {
  const meanings = {
    love: {
      upright: '今天在感情方面保持开放和真诚，可能会有意想不到的收获。',
      reversed: '今天需要更多自我关爱，不要急于投入新的感情。'
    },
    work: {
      upright: '工作上会有新的机会，保持积极主动的态度。',
      reversed: '今天适合整理和规划，不要急于推进新项目。'
    },
    health: {
      upright: '精力充沛的一天，适合运动或尝试新事物。',
      reversed: '注意休息，不要过度消耗自己的能量。'
    }
  };
  
  // 根据牌的元素类型给出建议
  let guidance = '';
  
  if (card.element === '火') {
    guidance = card.isReversed 
      ? '今天适合放慢脚步，避免冲动决策。给自己一些思考的空间。'
      : '今天充满行动力和热情，是开始新项目的好时机！';
  } else if (card.element === '水') {
    guidance = card.isReversed
      ? '情绪波动可能较大，尝试冥想或独处来平复心情。'
      : '直觉敏锐的一天，相信你的内心感受，它会指引你。';
  } else if (card.element === '风') {
    guidance = card.isReversed
      ? '沟通可能遇到障碍，注意表达方式，多倾听他人。'
      : '思维清晰，适合学习、沟通或制定计划。';
  } else if (card.element === '土') {
    guidance = card.isReversed
      ? '财务或物质方面需要谨慎，避免不必要的支出。'
      : '踏实稳定的一天，适合处理实际事务和财务规划。';
  } else {
    // 大阿尔卡纳
    guidance = card.isReversed
      ? '今天可能会面临一些内在的挑战，这是成长的机会。'
      : '重要的能量流动中，留意生活中的同步性和巧合。';
  }
  
  return {
    general: guidance,
    keywords: card.keywords?.slice(0, 3) || ['变化', '成长', '觉察']
  };
}

export default {
  hasDrawnToday,
  drawDailyCard,
  getTodayCard,
  getDailyHistory,
  saveToHistory,
  generateDailyGuidance
};
