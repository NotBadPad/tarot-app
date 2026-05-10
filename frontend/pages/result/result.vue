<template>
  <div class="container">
    <div class="stars"></div>
    
    <!-- 标题 -->
    <div class="header">
      <span class="spread-name">{{ reading?.spreadName }}</span>
      <span v-if="reading?.question" class="question">"{{ reading.question }}"</span>
      <span class="time">{{ formatTime(reading?.timestamp) }}</span>
    </div>
    
    <div v-if="!reading" class="empty-result">
      <span class="empty-title">没有找到这次占卜</span>
      <span class="empty-hint">可能是记录已被清除，重新抽一次会更准。</span>
      <button class="ai-btn" @click="drawAgain">
        <span class="btn-text">重新开始</span>
      </button>
    </div>

    <!-- 牌面展示 -->
    <div v-else class="cards-section">
      <div 
        v-for="(card, index) in reading?.cards" 
        :key="index"
        class="card-item"
        :class="{ reversed: card.isReversed }"
      >
        <div class="position-badge">{{ card.position?.name }}</div>
        <img :src="getCardImage(card)" class="card-image" mode="aspectFit" @error="setFallbackImage($event, card)" />
        <div class="card-info">
          <span class="card-name">{{ card.name }}</span>
          <span class="orientation">{{ card.isReversed ? '逆位' : '正位' }}</span>
          <div class="keywords">
            <span 
              v-for="(kw, i) in getKeywords(card)" 
              :key="i"
              class="keyword-tag"
            >{{ kw }}</span>
          </div>
        </div>
        <div class="meaning-box">
          <span class="meaning-title">核心含义</span>
          <span class="meaning-text">{{ getCardMeaning(card) }}</span>
        </div>
      </div>
    </div>
    
    <!-- AI 解读 -->
    <div class="interpretation-section">
      <div class="section-header">
        <span class="section-title">🔮 智能解读</span>
      </div>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-box">
        <div class="loading-spinner"></div>
        <span class="loading-text">正在获取解读...</span>
      </div>
      
      <!-- 解读内容 -->
      <div v-else-if="interpretation" class="interpretation-content">
        <div v-if="isH5" v-html="formatInterpretation(interpretation)"></div>
        <rich-text v-else :nodes="formatInterpretation(interpretation)"></rich-text>
      </div>
      
      <!-- 获取按钮 -->
      <button 
        v-else 
        class="ai-btn" 
        @click="getInterpretation"
        :disabled="loading"
      >
        <span class="btn-text">{{ hasAIConfig ? '获取 AI 解读' : '获取基础解读' }}</span>
      </button>
    </div>
    
    <!-- 操作按钮 -->
    <div class="actions">
      <button class="action-btn secondary" @click="shareResult">
        <span class="btn-icon">📤</span>
        <span class="btn-text">分享</span>
      </button>
      <button class="action-btn primary" @click="drawAgain">
        <span class="btn-icon">🃏</span>
        <span class="btn-text">再抽一次</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCardMeaning, getCardImage, getCardKeywords, getFallbackCardImage } from '@/utils/tarot.js';
import { getAIInterpretation, getQuickInterpretation } from '@/utils/ai.js';

const reading = ref(null);
const interpretation = ref('');
const loading = ref(false);
const hasAIConfig = ref(false);
const isH5 = typeof window !== 'undefined' && typeof document !== 'undefined';

const setFallbackImage = (event, card) => {
  event.target.src = getFallbackCardImage(card);
};

const getQueryParam = (key) => {
  let queryStr = '';
  if (window.location.hash) {
    const idx = window.location.hash.indexOf('?');
    if (idx !== -1) queryStr = window.location.hash.slice(idx + 1);
  } else {
    queryStr = window.location.search.slice(1);
  }
  return new URLSearchParams(queryStr).get(key);
};

onMounted(() => {
  let id = null;
  if (typeof window !== 'undefined' && window.location) {
    id = getQueryParam('id');
    // H5 模式下后端与前端同源，始终可用
    hasAIConfig.value = true;
  } else {
    try {
      const options = uni.getEnterOptionsSync();
      const query = options.query || {};
      id = query.id;
    } catch (e) {}
    const config = uni.getStorageSync('tarot_api_config');
    hasAIConfig.value = !!(config && config.baseURL);
  }
  
  if (id) {
    const readings = uni.getStorageSync('tarot_readings') || [];
    reading.value = readings.find(r => r.timestamp == id);
  }
});

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(parseInt(timestamp));
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const getKeywords = (card) => {
  if (!card.keywords) return [];
  const kws = card.keywords.slice(0, 3);
  return card.isReversed ? kws.map(k => k + '(逆)') : kws;
};

const getInterpretation = async () => {
  if (!reading.value) {
    uni.showToast({ title: '没有可解读的占卜记录', icon: 'none' });
    return;
  }

  loading.value = true;
  
  try {
    // 调用后端 AI 解读代理
    const result = await getAIInterpretation({
      question: reading.value.question,
      cards: reading.value.cards,
      spreadName: reading.value.spreadName
    });
    
    if (result.success) {
      interpretation.value = result.interpretation;
    } else if (result.status === 401 || result.error?.includes('401') || result.error?.includes('token')) {
      // Bug #6 Fix: 游客模式无 token 会收到 401，应给出明确提示而非悄悄降级
      uni.showToast({ title: '请先登录后再获取 AI 解读', icon: 'none', duration: 2500 });
      const quick = getQuickInterpretation(reading.value.cards);
      interpretation.value = quick.interpretation + '\n\n---\n\n*登录后可获取更深度的 AI 智能解读*';
    } else {
      // AI 失败时使用快速解读
      const quick = getQuickInterpretation(reading.value.cards);
      interpretation.value = quick.interpretation + '\n\n---\n\n*AI 解读服务暂时不可用，已切换到基础解读*';
    }
  } catch (error) {
    console.error('获取解读失败:', error);
    const quick = getQuickInterpretation(reading.value.cards);
    interpretation.value = quick.interpretation;
  } finally {
    loading.value = false;
  }
};

const formatInterpretation = (text) => {
  if (!text) return '';
  // 先对原始文本做 HTML 实体编码，防止恶意脚本注入
  const escapeHtml = (str) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const escaped = escapeHtml(text)
    .replace(/\n{2,}---\n{2,}/g, '\n---\n')
    .replace(/\n{3,}/g, '\n\n');

  // 简单的 Markdown 转换（在转换过程中保持转义，避免重新引入 HTML 标签）
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color: #e0aaff;">$1</strong>')
    .replace(/###\s+(.+)/g, '<div style="color: #9d4edd; font-size: 16px; margin: 10px 0 4px;">$1</div>')
    .replace(/##\s+(.+)/g, '<div style="color: #e0aaff; font-size: 18px; margin: 12px 0 6px; font-weight: bold;">$1</div>')
    .replace(/---/g, '<hr style="border: none; border-top: 1px solid rgba(157, 78, 221, 0.3); margin: 10px 0;">')
    .replace(/\n{2,}/g, '\n')
    .replace(/\n/g, '<br>');
};

const shareResult = () => {
  if (!reading.value) return;
  // 生成图片或文本分享
  const text = `🔮 塔罗梦语\n\n${reading.value.spreadName}\n${reading.value.question ? '问题: ' + reading.value.question + '\n' : ''}\n抽到的牌:\n${reading.value.cards.map((c, i) => `${i+1}. ${c.name} ${c.isReversed ? '逆位' : '正位'}`).join('\n')}`;
  
  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({ title: '已复制结果', icon: 'success' });
    }
  });
};

const drawAgain = () => {
  uni.switchTab({ url: '/pages/index/index' });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background:
    radial-gradient(circle at 50% 0%, rgba(224, 170, 255, 0.16), transparent 32%),
    linear-gradient(180deg, rgba(8, 8, 24, 0.84) 0%, rgba(12, 18, 39, 0.95) 100%);
  padding: 30rpx;
  overflow: hidden auto;
}

.stars {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #fff, transparent),
    radial-gradient(2px 2px at 40px 70px, #fff, transparent);
  opacity: 0.3;
  pointer-events: none;
  animation: floatStars 10s ease-in-out infinite alternate;
}

.header {
  text-align: center;
  padding: 18rpx 0 22rpx;
}

.spread-name {
  display: block;
  font-size: 40rpx;
  color: #fff;
  font-weight: 600;
  margin-bottom: 10rpx;
  text-shadow: 0 0 28rpx rgba(224, 170, 255, 0.58);
}

.question {
  display: block;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8rpx;
  font-style: italic;
}

.time {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
}

.cards-section {
  margin-bottom: 24rpx;
}

.card-item {
  background: rgba(255, 255, 255, 0.065);
  border: 1rpx solid rgba(224, 170, 255, 0.2);
  border-radius: 20rpx;
  padding: 24rpx;
  margin-bottom: 22rpx;
  position: relative;
  box-shadow: 0 20rpx 54rpx rgba(0, 0, 0, 0.24), inset 0 1rpx 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18rpx);
}

.position-badge {
  position: absolute;
  top: -16rpx;
  left: 30rpx;
  background: linear-gradient(135deg, #9d4edd, #48cae4);
  color: #fff;
  font-size: 22rpx;
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
}

.card-image {
  width: 300rpx;
  height: 450rpx;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #2d2d4a 0%, #1a1a2e 100%);
  display: block;
  margin: 14rpx auto 16rpx;
  transition: transform 0.3s;
  box-shadow: 0 18rpx 44rpx rgba(0, 0, 0, 0.32);
}

.card-item.reversed .card-image {
  transform: rotate(180deg);
}

.card-info {
  text-align: center;
  margin-bottom: 16rpx;
}

.card-name {
  display: block;
  font-size: 32rpx;
  color: #fff;
  font-weight: 600;
  margin-bottom: 4rpx;
}

.orientation {
  font-size: 24rpx;
  color: #e0aaff;
  display: block;
  margin-bottom: 10rpx;
}

.keywords {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12rpx;
}

.keyword-tag {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(157, 78, 221, 0.18);
  border: 1rpx solid rgba(224, 170, 255, 0.12);
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
}

.meaning-box {
  background: rgba(0, 0, 0, 0.22);
  border-radius: 12rpx;
  padding: 16rpx 18rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.06);
}

.meaning-title {
  display: block;
  font-size: 24rpx;
  color: #e0aaff;
  margin-bottom: 4rpx;
}

.meaning-text {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.interpretation-section {
  background: rgba(255, 255, 255, 0.065);
  border: 1rpx solid rgba(224, 170, 255, 0.2);
  border-radius: 20rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 20rpx 54rpx rgba(0, 0, 0, 0.24), inset 0 1rpx 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18rpx);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14rpx;
}

.section-title {
  font-size: 32rpx;
  color: #fff;
  font-weight: 600;
}

.config-tip {
  background: rgba(157, 78, 221, 0.2);
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
}

.tip-text {
  font-size: 24rpx;
  color: #9d4edd;
}

.loading-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx;
}

.loading-spinner {
  width: 60rpx;
  height: 60rpx;
  border: 4rpx solid rgba(157, 78, 221, 0.2);
  border-top-color: #48cae4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20rpx;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.6);
}

.interpretation-content {
  font-size: 27rpx;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.55;
}

.ai-btn {
  width: 100%;
  background: linear-gradient(135deg, #9d4edd 0%, #5a6cff 52%, #48cae4 100%);
  border: none;
  border-radius: 22rpx;
  padding: 30rpx;
  margin: 20rpx 0;
  box-shadow: 0 16rpx 42rpx rgba(72, 202, 228, 0.2), 0 10rpx 34rpx rgba(157, 78, 221, 0.3);
}

.ai-btn .btn-text {
  color: #fff;
  font-size: 30rpx;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 20rpx;
  margin-bottom: 24rpx;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  padding: 26rpx;
  border: none;
  border-radius: 18rpx;
}

.action-btn.primary {
  background: linear-gradient(135deg, #9d4edd 0%, #5a6cff 52%, #48cae4 100%);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.08);
  border: 1rpx solid rgba(224, 170, 255, 0.24);
}

.action-btn .btn-icon {
  font-size: 32rpx;
}

.action-btn .btn-text {
  color: #fff;
  font-size: 30rpx;
  font-weight: 500;
}

/* 模态框 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1a1a2e;
  border: 1rpx solid rgba(157, 78, 221, 0.3);
  border-radius: 24rpx;
  padding: 40rpx;
  width: 80%;
  max-width: 560rpx;
}

.modal-title {
  display: block;
  font-size: 36rpx;
  color: #e0aaff;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16rpx;
}

.modal-desc {
  display: block;
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-bottom: 30rpx;
}

.picker-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(157, 78, 221, 0.3);
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  color: #fff;
  text-align: center;
}

.config-input {
  width: 100%;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(157, 78, 221, 0.3);
  border-radius: 12rpx;
  padding: 0 20rpx;
  color: #fff;
  font-size: 28rpx;
  margin-bottom: 30rpx;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  gap: 20rpx;
}

.modal-btn {
  flex: 1;
  padding: 24rpx;
  border: none;
  border-radius: 12rpx;
  font-size: 28rpx;
}

.modal-btn.cancel {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
}

.modal-btn.confirm {
  background: linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%);
  color: #fff;
}

.config-hint {
  display: block;
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  margin-top: 20rpx;
}

.empty-result {
  margin: 80rpx 0 40rpx;
  padding: 42rpx 30rpx;
  text-align: center;
  border-radius: 22rpx;
  background: rgba(255,255,255,.065);
  border: 1rpx solid rgba(224, 170, 255, 0.2);
  backdrop-filter: blur(18rpx);
}

.empty-title,
.empty-hint {
  display: block;
}

.empty-title {
  color: #fff;
  font-size: 34rpx;
  font-weight: 700;
  margin-bottom: 12rpx;
}

.empty-hint {
  color: rgba(255,255,255,.58);
  font-size: 26rpx;
}

@keyframes floatStars {
  from { opacity: .22; transform: translateY(0); }
  to { opacity: .42; transform: translateY(16rpx); }
}
</style>
