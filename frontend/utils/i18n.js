import { computed, ref } from 'vue';

const STORAGE_KEY = 'tarot_locale';
const DEFAULT_LOCALE = 'zh';
const canUseUni = () => typeof uni !== 'undefined' && uni.getStorageSync;

const messages = {
  zh: {
    appName: '塔罗梦语',
    login: '点击登录',
    guest: '游客',
    tagline: '探索内心的智慧之镜',
    daily: '每日一抽',
    dailyDesc: '今天的塔罗指引',
    cardSearch: '牌意查询',
    cardSearchDesc: '78张牌详解',
    comingSoon: '即将上线，敬请期待',
    selectSpread: '选择牌阵',
    cardUnit: '张牌',
    questionOptional: '你的问题（可选）',
    questionPlaceholder: '例如：我最近的工作运势如何？或者留空让牌卡自由告诉你...',
    startShuffle: '🃏 开始洗牌',
    intro: '塔罗牌是自反的工具，回答始于你内心',
    language: 'English',
    shuffling: '正在洗牌...',
    shuffleHint: '集中思考你的问题',
    drawProgress: '请点击抽取第 {n} 张牌',
    remaining: '剩余 {n} 张',
    drawnPosition: '第{n}张',
    drawComplete: '抽牌完成 ✨',
    viewReading: '查看解读',
    upright: '正位',
    reversed: '逆位',
    switchUpright: '切换正位',
    switchReversed: '切换逆位',
    dailyListening: '正在聆听星象...',
    dailyDraw: '点击抽取今日牌运',
    dailyHint: '每天只有一次机会，集中精神思考今天的期许',
    dailyGuide: '🔮 今日指引',
    detail: '查看详情',
    shareDaily: '分享日运',
    dailyHistory: '查看历史日运 →',
    copiedShare: '已复制，去分享吧~',
    history: '历史记录',
    historySubtitle: '你的占卜旅程',
    emptyHistory: '还没有占卜记录',
    emptyHint: '去抽第一张牌吧~',
    startReading: '开始占卜',
    viewDetail: '查看详情 →',
    clearAll: '清除所有记录',
    confirmClear: '确认清除',
    confirmClearContent: '确定要清除所有占卜记录吗？',
    cleared: '已清除',
    noReading: '没有找到这次占卜',
    noReadingHint: '可能是记录已被清除，重新抽一次会更准。',
    restart: '重新开始',
    coreMeaning: '核心含义',
    smartReading: '🔮 智能解读',
    loadingReading: '正在获取解读...',
    getAiReading: '获取 AI 解读',
    getBasicReading: '获取基础解读',
    share: '分享',
    drawAgain: '再抽一次',
    copiedResult: '已复制结果',
    cardKeywords: '关键词',
    uprightMeaning: '正位含义',
    reversedMeaning: '逆位含义',
    cardDescription: '牌面描述',
    lifeAdvice: '生活建议',
    love: '💖 感情',
    career: '💼 事业',
    growth: '✨ 成长',
    useCard: '用这张牌占卜',
    loginSubtitle: '登录后同步你的占卜记录',
    welcomeBack: '欢迎回来',
    wechatLogin: '微信一键登录',
    guestAccess: '游客访问',
    privacy: '登录即表示您同意《用户协议》和《隐私政策》',
    loginSuccess: '登录成功',
    offlineGuest: '后端暂不可用，以游客模式访问',
    today: '今天',
    daysAgo: '{n}天前',
    justNow: '刚刚',
    minutesAgo: '{n}分钟前',
    hoursAgo: '{n}小时前',
    noMeaning: '暂无解读',
    shareQuestion: '问题',
    drawnCards: '抽到的牌'
  },
  en: {
    appName: 'Tarot Dream',
    login: 'Log in',
    guest: 'Guest',
    tagline: 'Explore the mirror of inner wisdom',
    daily: 'Daily Card',
    dailyDesc: "Today's tarot guidance",
    cardSearch: 'Card Meanings',
    cardSearchDesc: '78-card guide',
    comingSoon: 'Coming soon',
    selectSpread: 'Choose a Spread',
    cardUnit: 'cards',
    questionOptional: 'Your question (optional)',
    questionPlaceholder: 'Example: How is my work luck lately? Or leave blank and let the cards speak...',
    startShuffle: '🃏 Start Shuffling',
    intro: 'Tarot reflects inward; the answer begins with you',
    language: '中文',
    shuffling: 'Shuffling...',
    shuffleHint: 'Focus on your question',
    drawProgress: 'Tap to draw card {n}',
    remaining: '{n} left',
    drawnPosition: 'Card {n}',
    drawComplete: 'Draw complete ✨',
    viewReading: 'View Reading',
    upright: 'Upright',
    reversed: 'Reversed',
    switchUpright: 'Switch Upright',
    switchReversed: 'Switch Reversed',
    dailyListening: 'Listening to the stars...',
    dailyDraw: "Draw today's card",
    dailyHint: 'One draw per day. Focus on what you hope for today.',
    dailyGuide: "🔮 Today's Guidance",
    detail: 'Details',
    shareDaily: 'Share Daily',
    dailyHistory: 'View daily history →',
    copiedShare: 'Copied. Ready to share.',
    history: 'History',
    historySubtitle: 'Your tarot journey',
    emptyHistory: 'No readings yet',
    emptyHint: 'Draw your first card.',
    startReading: 'Start Reading',
    viewDetail: 'View Details →',
    clearAll: 'Clear all records',
    confirmClear: 'Clear records',
    confirmClearContent: 'Clear all tarot reading records?',
    cleared: 'Cleared',
    noReading: 'Reading not found',
    noReadingHint: 'It may have been cleared. Draw again to continue.',
    restart: 'Start Over',
    coreMeaning: 'Core Meaning',
    smartReading: '🔮 Smart Reading',
    loadingReading: 'Getting reading...',
    getAiReading: 'Get AI Reading',
    getBasicReading: 'Get Basic Reading',
    share: 'Share',
    drawAgain: 'Draw Again',
    copiedResult: 'Result copied',
    cardKeywords: 'Keywords',
    uprightMeaning: 'Upright Meaning',
    reversedMeaning: 'Reversed Meaning',
    cardDescription: 'Card Description',
    lifeAdvice: 'Life Advice',
    love: '💖 Love',
    career: '💼 Career',
    growth: '✨ Growth',
    useCard: 'Use this Card',
    loginSubtitle: 'Log in to sync your readings',
    welcomeBack: 'Welcome back',
    wechatLogin: 'WeChat Quick Login',
    guestAccess: 'Continue as Guest',
    privacy: 'By logging in, you agree to the Terms and Privacy Policy',
    loginSuccess: 'Login successful',
    offlineGuest: 'Backend unavailable. Continuing as guest.',
    today: 'Today',
    daysAgo: '{n}d ago',
    justNow: 'Just now',
    minutesAgo: '{n}m ago',
    hoursAgo: '{n}h ago',
    noMeaning: 'No reading yet',
    shareQuestion: 'Question',
    drawnCards: 'Drawn cards'
  }
};

const saved = canUseUni() ? uni.getStorageSync(STORAGE_KEY) : '';
export const locale = ref(saved || DEFAULT_LOCALE);

export const isEn = computed(() => locale.value === 'en');

export function setLocale(next) {
  locale.value = next === 'en' ? 'en' : 'zh';
  if (canUseUni()) uni.setStorageSync(STORAGE_KEY, locale.value);
}

export function toggleLocale() {
  setLocale(isEn.value ? 'zh' : 'en');
}

export function t(key, params = {}) {
  const template = messages[locale.value]?.[key] || messages.zh[key] || key;
  return Object.entries(params).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), template);
}

export function cardName(card) {
  if (!card) return '';
  return isEn.value ? (card.nameEn || card.name) : card.name;
}

export function spreadName(spread) {
  if (!spread) return '';
  return isEn.value ? (spread.nameEn || spread.name) : spread.name;
}

export function orientation(isReversed) {
  return t(isReversed ? 'reversed' : 'upright');
}

const positionMap = {
  核心讯息: 'Core Message',
  过去: 'Past',
  现在: 'Present',
  未来: 'Future',
  你的状态: 'You',
  对方状态: 'Them',
  关系现状: 'Relationship',
  挑战: 'Challenge',
  建议: 'Advice',
  现状: 'Current State',
  选择A现状: 'Option A Now',
  选择A结果: 'Option A Outcome',
  选择B现状: 'Option B Now',
  选择B结果: 'Option B Outcome',
  当前状况: 'Current State',
  你的优势: 'Your Strength',
  障碍: 'Obstacle',
  短期发展: 'Short Term',
  长期展望: 'Long Term',
  行动建议: 'Action Advice',
  目标: 'Goal',
  潜意识: 'Subconscious',
  环境: 'Environment',
  '希望/恐惧': 'Hopes/Fears',
  结果: 'Outcome'
};

export function positionName(position, fallback = '') {
  const name = typeof position === 'string' ? position : position?.name;
  if (!name) return fallback;
  return isEn.value ? (positionMap[name] || name) : name;
}

export function cardCount(n) {
  return isEn.value ? `${n} ${t('cardUnit')}` : `${n}${t('cardUnit')}`;
}

