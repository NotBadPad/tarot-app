<template>
  <div class="container">
    <div class="stars"></div>
    
    <!-- 牌面展示 -->
    <div class="card-display" :class="{ reversed: isReversed }">
      <img :src="getCardImage(card)" class="card-image" mode="aspectFit" />
      <div class="orientation-toggle" @click="toggleOrientation">
        <span class="toggle-text">{{ isReversed ? '切换正位' : '切换逆位' }}</span>
      </div>
    </div>
    
    <!-- 基本信息 -->
    <div class="info-section">
      <span class="card-name">{{ card?.name }}</span>
      <span class="card-en">{{ card?.nameEn }}</span>
      <div class="meta-info">
        <span v-if="card?.roman" class="meta-item">罗马数字: {{ card.roman }}</span>
        <span v-if="card?.element" class="meta-item">元素: {{ card.element }}</span>
        <span v-if="card?.planet" class="meta-item">星体: {{ card.planet }}</span>
      </div>
    </div>
    
    <!-- 关键词 -->
    <div class="keywords-section">
      <span class="section-title">关键词</span>
      <div class="keywords-list">
        <span 
          v-for="(kw, i) in displayKeywords" 
          :key="i"
          class="keyword-tag"
          :class="{ reversed: isReversed }"
        >{{ kw }}</span>
      </div>
    </div>
    
    <!-- 含义解读 -->
    <div class="meaning-section">
      <span class="section-title">{{ isReversed ? '逆位含义' : '正位含义' }}</span>
      <span class="meaning-text">{{ currentMeaning }}</span>
    </div>
    
    <!-- 描述 -->
    <div v-if="card?.description" class="description-section">
      <span class="section-title">牌面描述</span>
      <span class="description-text">{{ card.description }}</span>
    </div>
    
    <!-- 相关建议 -->
    <div class="advice-section">
      <span class="section-title">生活建议</span>
      <div class="advice-list">
        <div class="advice-item">
          <span class="advice-label">💖 感情</span>
          <span class="advice-text">{{ getLoveAdvice() }}</span>
        </div>
        <div class="advice-item">
          <span class="advice-label">💼 事业</span>
          <span class="advice-text">{{ getCareerAdvice() }}</span>
        </div>
        <div class="advice-item">
          <span class="advice-label">✨ 成长</span>
          <span class="advice-text">{{ getGrowthAdvice() }}</span>
        </div>
      </div>
    </div>
    
    <!-- 操作按钮 -->
    <div class="actions">
      <button class="action-btn" @click="drawAgain">
        <span class="btn-text">用这张牌占卜</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { TAROT_DECK } from '@/data/tarot-data.js';
import { getCardImage } from '@/utils/tarot.js';

const card = ref(null);
const isReversed = ref(false);

onMounted(() => {
  let id = null;
  let reversed = false;
  
  // H5 模式：从路径 /card/:id 解析
  try {
    const path = window.location.pathname;
    const match = path.match(/\/card\/([^\/]+)/);
    if (match) {
      id = match[1];
    }
    const params = new URLSearchParams(window.location.search);
    reversed = params.get('reversed') === 'true';
  } catch (e) {}
  
  // 小程序模式回退
  if (id === null) {
    try {
      const options = uni.getEnterOptionsSync();
      const query = options.query || {};
      id = query.id;
      reversed = query.reversed === 'true';
    } catch (e) {}
  }
  
  if (id !== null) {
    const foundCard = TAROT_DECK.find(c => c.id == id);
    if (foundCard) {
      card.value = foundCard;
      isReversed.value = reversed;
    }
  }
});

const displayKeywords = computed(() => {
  if (!card.value?.keywords) return [];
  return isReversed.value ? card.value.keywords.map(e => e + '(逆)') : card.value.keywords;
});

const currentMeaning = computed(() => {
  if (!card.value?.meaning) return '暂无解读';
  return isReversed.value ? card.value.meaning.reversed : card.value.meaning.upright;
});

const toggleOrientation = () => {
  isReversed.value = !isReversed.value;
};

const getLoveAdvice = () => {
  const elMap = { '火': 'fire', '水': 'water', '风': 'air', '土': 'earth', fire: 'fire', water: 'water', air: 'air', earth: 'earth' };
  const element = elMap[card.value?.element] || 'fire';
  const adviceMap = {
    fire: { upright: '热情的表达会带来美好结果', reversed: '需要冷静思考感情中的问题' },
    water: { upright: '直觉会引导你找到真爱', reversed: '不要被情绪淹没理性' },
    air: { upright: '沟通是维系关系的关键', reversed: '避免过度分析对方的话语' },
    earth: { upright: '稳定和安全感是感情的基础', reversed: '不要过于物质化感情' }
  };
  return adviceMap[element][isReversed.value ? 'reversed' : 'upright'];
};

const getCareerAdvice = () => {
  const elMap = { '火': 'fire', '水': 'water', '风': 'air', '土': 'earth', fire: 'fire', water: 'water', air: 'air', earth: 'earth' };
  const element = elMap[card.value?.element] || 'fire';
  const adviceMap = {
    fire: { upright: '主动争取机会，展现领导力', reversed: '避免冲动决策，多听建议' },
    water: { upright: '用直觉做出选择，相信自己', reversed: '别让情绪影响职场判断' },
    air: { upright: '清晰的思维帮你解决复杂问题', reversed: '注意细节，避免理论化' },
    earth: { upright: '踏实工作会得到回报', reversed: '不要固执于旧有方式' }
  };
  return adviceMap[element][isReversed.value ? 'reversed' : 'upright'];
};

const getGrowthAdvice = () => {
  return isReversed.value ? '今天适合内省，反思过去，为新的开始做准备。' : '保持开放心态，新的机会正在靠近，准备好迎接变化。';
};

const drawAgain = () => {
  uni.setStorageSync('preselected_card', {
    ...card.value,
    isReversed: isReversed.value
  });
  uni.switchTab({
    url: '/pages/index/index'
  });
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
  background-image: radial-gradient(2px 2px at 20px 30px, #fff, transparent);
  opacity: 0.3;
  pointer-events: none;
}

.card-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30rpx;
}

.card-display.reversed .card-image {
  transform: rotate(180deg);
}

.card-image {
  width: 280rpx;
  height: 420rpx;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #2d2d4a 0%, #1a1a2e 100%);
  box-shadow: 0 20rpx 50rpx rgba(0, 0, 0, 0.4);
  margin-bottom: 20rpx;
}

.orientation-toggle {
  padding: 16rpx 40rpx;
  background: rgba(157, 78, 221, 0.2);
  border-radius: 30rpx;
  border: 1rpx solid rgba(157, 78, 221, 0.3);
}

.toggle-text {
  font-size: 26rpx;
  color: #9d4edd;
}

.info-section {
  text-align: center;
  margin-bottom: 40rpx;
}

.card-name {
  display: block;
  font-size: 44rpx;
  color: #fff;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.card-en {
  display: block;
  font-size: 26rpx;
  color: #9d4edd;
  margin-bottom: 16rpx;
  font-style: italic;
}

.meta-info {
  display: flex;
  justify-content: center;
  gap: 20rpx;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.05);
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
}

.section-title {
  display: block;
  font-size: 32rpx;
  color: #e0aaff;
  font-weight: 600;
  margin-bottom: 20rpx;
}

.keywords-section {
  margin-bottom: 40rpx;
}

.keywords-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.keyword-tag {
  font-size: 26rpx;
  color: #fff;
  background: rgba(157, 78, 221, 0.2);
  padding: 12rpx 28rpx;
  border-radius: 28rpx;
  border: 1rpx solid rgba(157, 78, 221, 0.3);
}

.keyword-tag.reversed {
  background: rgba(255, 100, 100, 0.15);
  border-color: rgba(255, 100, 100, 0.3);
  color: #ff9999;
}

.meaning-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1rpx solid rgba(157, 78, 221, 0.2);
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
}

.meaning-text {
  font-size: 30rpx;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
}

.description-section {
  margin-bottom: 40rpx;
}

.description-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
}

.advice-section {
  margin-bottom: 50rpx;
}

.advice-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.advice-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16rpx;
  padding: 24rpx;
}

.advice-label {
  display: block;
  font-size: 28rpx;
  color: #9d4edd;
  margin-bottom: 8rpx;
}

.advice-text {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

.actions {
  padding-bottom: 40rpx;
}

.action-btn {
  width: 100%;
  background: linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%);
  border: none;
  border-radius: 50rpx;
  padding: 30rpx;
}

.action-btn .btn-text {
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
}
</style>
