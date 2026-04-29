<template>
  <div class="container">
    <div class="stars"></div>
    
    <!-- 标题 -->
    <div class="header">
      <span class="spread-name">{{ reading?.spreadName }}</span>
      <span v-if="reading?.question" class="question">"{{ reading.question }}"</span>
      <span class="time">{{ formatTime(reading?.timestamp) }}</span>
    </div>
    
    <!-- 牌面展示 -->
    <div class="cards-section">
      <div 
        v-for="(card, index) in reading?.cards" 
        :key="index"
        class="card-item"
        :class="{ reversed: card.isReversed }"
      >
        <div class="position-badge">{{ card.position?.name }}</div>
        <img :src="getCardImage(card)" class="card-image" mode="aspectFit" />
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
        <!-- #ifdef H5 -->
        <div v-html="formatInterpretation(interpretation)"></div>
        <!-- #endif -->
        <!-- #ifndef H5 -->
        <rich-text :nodes="formatInterpretation(interpretation)"></rich-text>
        <!-- #endif -->
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
import { getCardMeaning, getCardImage } from '@/utils/tarot.js';
import { getAIInterpretation, getQuickInterpretation } from '@/utils/ai.js';

const reading = ref(null);
const interpretation = ref('');
const loading = ref(false);
const hasAIConfig = ref(false);

// #ifdef H5
onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  
  if (id) {
    const readings = uni.getStorageSync('tarot_readings') || [];
    reading.value = readings.find(r => r.timestamp == id);
  }
  
  // 检查后端是否配置
  // H5 模式下后端与前端同源，始终可用
  // #ifdef H5
  hasAIConfig.value = true;
  // #endif
  // #ifndef H5
  const config = uni.getStorageSync('tarot_api_config');
  hasAIConfig.value = !!(config && config.baseURL);
  // #endif
});
// #endif
// #ifndef H5
onMounted(() => {
  const options = uni.getEnterOptionsSync();
  const query = options.query || {};
  const id = query.id;
  
  if (id) {
    const readings = uni.getStorageSync('tarot_readings') || [];
    reading.value = readings.find(r => r.timestamp == id);
  }
  
  // 检查后端是否配置
  // H5 模式下后端与前端同源，始终可用
  // #ifdef H5
  hasAIConfig.value = true;
  // #endif
  // #ifndef H5
  const config = uni.getStorageSync('tarot_api_config');
  hasAIConfig.value = !!(config && config.baseURL);
  // #endif
});
// #endif

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

  const escaped = escapeHtml(text);

  // 简单的 Markdown 转换（在转换过程中保持转义，避免重新引入 HTML 标签）
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color: #e0aaff;">$1</strong>')
    .replace(/###\s+(.+)/g, '<div style="color: #9d4edd; font-size: 16px; margin: 16px 0 8px;">$1</div>')
    .replace(/##\s+(.+)/g, '<div style="color: #e0aaff; font-size: 18px; margin: 20px 0 12px; font-weight: bold;">$1</div>')
    .replace(/---/g, '<hr style="border: none; border-top: 1px solid rgba(157, 78, 221, 0.3); margin: 16px 0;">')
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
  background: linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%);
  padding: 30rpx;
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
}

.header {
  text-align: center;
  padding: 30rpx 0;
}

.spread-name {
  display: block;
  font-size: 40rpx;
  color: #e0aaff;
  font-weight: 600;
  margin-bottom: 16rpx;
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
  margin-bottom: 40rpx;
}

.card-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1rpx solid rgba(157, 78, 221, 0.2);
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  position: relative;
}

.position-badge {
  position: absolute;
  top: -16rpx;
  left: 30rpx;
  background: linear-gradient(135deg, #7b2cbf, #9d4edd);
  color: #fff;
  font-size: 22rpx;
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
}

.card-image {
  width: 200rpx;
  height: 300rpx;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #2d2d4a 0%, #1a1a2e 100%);
  display: block;
  margin: 20rpx auto;
  transition: transform 0.3s;
}

.card-item.reversed .card-image {
  transform: rotate(180deg);
}

.card-info {
  text-align: center;
  margin-bottom: 20rpx;
}

.card-name {
  display: block;
  font-size: 32rpx;
  color: #fff;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.orientation {
  font-size: 24rpx;
  color: #9d4edd;
  display: block;
  margin-bottom: 12rpx;
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
  background: rgba(157, 78, 221, 0.15);
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
}

.meaning-box {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12rpx;
  padding: 20rpx;
}

.meaning-title {
  display: block;
  font-size: 24rpx;
  color: #9d4edd;
  margin-bottom: 8rpx;
}

.meaning-text {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.interpretation-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1rpx solid rgba(157, 78, 221, 0.2);
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
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
  border-top-color: #9d4edd;
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
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
}

.ai-btn {
  background: linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%);
  border: none;
  border-radius: 16rpx;
  padding: 30rpx;
  margin: 20rpx 0;
}

.ai-btn .btn-text {
  color: #fff;
  font-size: 30rpx;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 20rpx;
  margin-bottom: 40rpx;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  padding: 26rpx;
  border: none;
  border-radius: 16rpx;
}

.action-btn.primary {
  background: linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.08);
  border: 1rpx solid rgba(157, 78, 221, 0.3);
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
</style>
