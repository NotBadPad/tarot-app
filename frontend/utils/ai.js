// AI 塔罗解读接口（走服务端代理）
// 不再直接调用第三方 AI API，所有请求通过后端代理，保护 API Key 安全

// 服务端基础地址
export const getBaseURL = () => {
  // 优先使用用户配置的后端地址
  const config = getApiConfig();
  if (config?.baseURL) return config.baseURL;

  // 默认后端地址
  // H5 模式下，如果前后端同源则使用空字符串（相对路径）
  // 跨域场景需要填写完整域名
  return '';
};

/**
 * 获取认证 Token
 */
function getAuthToken() {
  try {
    const userInfo = uni.getStorageSync('userInfo');
    return userInfo?.token || '';
  } catch {
    return '';
  }
}

/**
 * 构建请求头
 */
function buildHeaders() {
  const headers = {
    'Content-Type': 'application/json'
  };
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * 调用后端 AI 解读接口
 * @param {Object} options
 * @param {string} options.question - 求占问题
 * @param {Array} options.cards - 抽到的牌
 * @param {string} options.spreadName - 牌阵名称
 */
export async function getAIInterpretation({ question, cards, spreadName }) {
  const baseURL = getBaseURL();

  try {
    const response = await uni.request({
      url: `${baseURL}/api/ai/interpret`,
      method: 'POST',
      header: buildHeaders(),
      data: {
        question: question || '',
        cards: cards.map(card => ({
          name: card.name,
          isReversed: !!card.isReversed,
          position: card.position || null,
          keywords: card.keywords || []
        })),
        spread_name: spreadName || '塔罗牌阵',
        spread_positions: cards.map((_, i) => cards[i]?.position?.name || `第${i + 1}张`)
      },
      timeout: 60000
    });

    if (response.statusCode !== 200) {
      const errorMsg = response.data?.error || `服务器错误 ${response.statusCode}`;
      throw new Error(errorMsg);
    }

    const result = response.data;
    if (!result.interpretation) {
      throw new Error('服务器返回数据异常');
    }

    return {
      success: true,
      interpretation: result.interpretation,
      timestamp: Date.now()
    };

  } catch (error) {
    console.error('AI 解读请求失败:', error);
    return {
      success: false,
      error: error.message || '网络请求失败，请检查后端服务是否运行',
      fallback: true
    };
  }
}

/**
 * 保存后端配置（后端地址等）
 */
export function saveApiConfig(config) {
  uni.setStorageSync('tarot_api_config', config);
}

/**
 * 获取后端配置
 */
export function getApiConfig() {
  return uni.getStorageSync('tarot_api_config') || null;
}

/**
 * 快速解读（不调用 API，本地生成，用于无网或后端不可用时的豁底）
 */
export function getQuickInterpretation(cards) {
  const interpretations = cards.map(card => {
    const meaning = card.isReversed
      ? (card.meaning?.reversed || '需要反思与调整')
      : (card.meaning?.upright || '积极的能量正在涌动');

    const keywords = (card.keywords || []).slice(0, 3).join('、');

    return `**${card.name}** ${card.isReversed ? '逆位' : '正位'}
${card.position?.name ? `位置：${card.position.name}` : ''}
${keywords ? `关键词：${keywords}` : ''}
核心信息：${meaning.split('。')[0]}。`;
  }).join('\n\n');

  return {
    success: true,
    interpretation: `抽到的牌：\n\n${interpretations}\n\n---\n\n这是基于牌面含义的简要解读。\n想获得更深入的 AI 智能解读，请确保后端服务正常运行。`,
    timestamp: Date.now(),
    isQuick: true
  };
}

export default {
  getAIInterpretation,
  getQuickInterpretation,
  saveApiConfig,
  getApiConfig
};
