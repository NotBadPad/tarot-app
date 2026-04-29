<template>
  <div class="container">
    <!-- 背景 -->
    <div class="stars"></div>
    
    <!-- 洗牌动画 -->
    <div v-if="isShuffling" class="shuffle-screen">
      <div class="shuffle-animation">
        <div class="card-pile">
          <div 
            v-for="(card, index) in 5" 
            :key="index"
            class="shuffling-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <img :src="cardBackImage" class="card-back" />
          </div>
        </div>
      </div>
      <span class="shuffle-text">正在洗牌...</span>
      <span class="shuffle-hint">集中思考你的问题</span>
    </div>
    
    <!-- 抽牌界面 -->
    <div v-else-if="!isComplete" class="draw-screen">
      <div class="progress">
        <span class="progress-text">请点击抽取第 {{ currentIndex + 1 }} 张牌</span>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${(currentIndex / totalCards) * 100}%` }"></div>
        </div>
      </div>
      
      <!-- 牌堆 -->
      <div class="deck-area" @click="drawCard" v-if="remainingCards > 0">
        <div class="deck-stack">
          <div 
            v-for="index in 10" 
            :key="index"
            class="deck-card"
            :style="{ transform: `translateY(-${index * 2}px) rotate(${(index - 5) * 0.5}deg)` }"
          >
            <img :src="cardBackImage" class="card-back" />
          </div>
        </div>
        <span class="deck-count">剩余 {{ remainingCards }} 张</span>
      </div>
      
      <!-- 已抽牌展示 -->
      <div v-if="drawnCards.length > 0" class="drawn-cards" scroll-x>
        <div class="cards-row">
          <div 
            v-for="(card, index) in drawnCards" 
            :key="index"
            class="drawn-card"
            :class="{ reversed: card.isReversed }"
          >
            <img :src="getCardImage(card)" class="card-image" mode="aspectFit" />
            <span class="position-label">{{ card.position?.name || `第${index + 1}张` }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 完成界面 -->
    <div v-else class="complete-screen">
      <span class="complete-text">抽牌完成 ✨</span>
      <div class="cards-preview">
        <div 
          v-for="(card, index) in drawnCards" 
          :key="index"
          class="preview-card"
          :class="{ reversed: card.isReversed }"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <img :src="getCardImage(card)" class="card-image" mode="aspectFit" />
          <span class="card-name">{{ card.name }}</span>
          <span class="orientation">{{ card.isReversed ? '逆位' : '正位' }}</span>
        </div>
      </div>
      <button class="result-btn" @click="viewResult">
        <span class="btn-text">查看解读</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { SPREADS } from '@/data/tarot-data.js';
import { shuffleDeck, getCardImage } from '@/utils/tarot.js';

const cardBackImage = '/static/images/card-back.svg';

const spreadId = ref('single');
const question = ref('');
const spread = ref(null);

const isShuffling = ref(true);
const isComplete = ref(false);
const currentIndex = ref(0);

const deck = ref([]);
const drawnCards = ref([]);

const totalCards = computed(() => spread.value?.positions.length || 1);
const remainingCards = computed(() => totalCards.value - currentIndex.value);

onMounted(() => {
  let query = {};
  if (typeof window !== 'undefined' && window.location) {
    const params = new URLSearchParams(window.location.search);
    query = Object.fromEntries(params);
  } else {
    try {
      const options = uni.getEnterOptionsSync();
      query = options.query || {};
    } catch (e) {}
  }
  spreadId.value = query.spreadId || 'single';
  question.value = decodeURIComponent(query.question || '');
  spread.value = SPREADS[spreadId.value];
  startShuffle();
});

const startShuffle = async () => {
  isShuffling.value = true;
  deck.value = shuffleDeck();
  
  // 1.5秒洗牌动画
  setTimeout(() => {
    isShuffling.value = false;
  }, 1500);
};

const drawCard = () => {
  if (currentIndex.value >= totalCards.value) return;
  
  const card = deck.value[currentIndex.value];
  card.isReversed = Math.random() > 0.5;
  card.position = spread.value.positions[currentIndex.value];
  
  drawnCards.value.push(card);
  currentIndex.value++;
  
  // 需要震动反馈
  uni.vibrateShort({
    type: 'light'
  });
  
  if (currentIndex.value >= totalCards.value) {
    setTimeout(() => {
      isComplete.value = true;
    }, 500);
  }
};

const viewResult = () => {
  const reading = {
    spreadId: spreadId.value,
    spreadName: spread.value.name,
    question: question.value,
    cards: drawnCards.value,
    timestamp: Date.now()
  };
  
  // 保存到本地
  const readings = uni.getStorageSync('tarot_readings') || [];
  readings.unshift(reading);
  if (readings.length > 50) readings.pop();
  uni.setStorageSync('tarot_readings', readings);
  
  // 跳转结果页
  uni.navigateTo({
    url: `/pages/result/result?id=${reading.timestamp}`
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #fff, transparent),
    radial-gradient(2px 2px at 40px 70px, #fff, transparent),
    radial-gradient(2px 2px at 50px 160px, #fff, transparent);
  opacity: 0.3;
  pointer-events: none;
}

/* 洗牌动画 */
.shuffle-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40rpx;
}

.shuffle-animation {
  width: 200rpx;
  height: 280rpx;
  position: relative;
  margin-bottom: 60rpx;
}

.card-pile {
  position: relative;
  width: 100%;
  height: 100%;
}

.shuffling-card {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: shuffle 0.5s ease-in-out infinite;
}

@keyframes shuffle {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateX(-30rpx) rotate(-5deg); }
  75% { transform: translateX(30rpx) rotate(5deg); }
}

.shuffle-text {
  font-size: 40rpx;
  color: #e0aaff;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.shuffle-hint {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
}

/* 抽牌界面 */
.draw-screen {
  padding: 40rpx;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.progress {
  margin-bottom: 40rpx;
}

.progress-text {
  display: block;
  font-size: 32rpx;
  color: #fff;
  margin-bottom: 16rpx;
  text-align: center;
}

.progress-bar {
  height: 8rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #9d4edd, #e0aaff);
  border-radius: 4rpx;
  transition: width 0.3s;
}

.deck-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx 0;
}

.deck-stack {
  position: relative;
  width: 200rpx;
  height: 280rpx;
  cursor: pointer;
}

.deck-card {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
}

.deck-stack:active .deck-card {
  transform: scale(0.95) !important;
}

.card-back {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%);
  border-radius: 16rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.1);
}

.deck-count {
  margin-top: 30rpx;
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.5);
}

.drawn-cards {
  height: 320rpx;
  white-space: nowrap;
}

.cards-row {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
}

.drawn-card {
  width: 160rpx;
  flex-shrink: 0;
  animation: slideIn 0.5s ease-out;
}

.drawn-card.reversed .card-image {
  transform: rotate(180deg);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50rpx);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.card-image {
  width: 160rpx;
  height: 240rpx;
  border-radius: 12rpx;
  background: linear-gradient(135deg, #2d2d4a 0%, #1a1a2e 100%);
  transition: transform 0.3s;
}

.position-label {
  display: block;
  text-align: center;
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 12rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 完成界面 */
.complete-screen {
  padding: 60rpx 40rpx;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.complete-text {
  font-size: 48rpx;
  color: #e0aaff;
  margin-bottom: 40rpx;
  font-weight: 600;
}

.cards-preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20rpx;
  margin-bottom: 60rpx;
}

.preview-card {
  width: 140rpx;
  text-align: center;
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.preview-card.reversed .card-image {
  transform: rotate(180deg);
}

.preview-card .card-image {
  width: 140rpx;
  height: 210rpx;
  border-radius: 10rpx;
  margin-bottom: 12rpx;
}

.card-name {
  display: block;
  font-size: 24rpx;
  color: #fff;
  margin-bottom: 4rpx;
}

.orientation {
  font-size: 20rpx;
  color: #9d4edd;
}

.result-btn {
  background: linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%);
  border: none;
  border-radius: 50rpx;
  padding: 30rpx 100rpx;
  box-shadow: 0 10rpx 40rpx rgba(157, 78, 221, 0.4);
}

.result-btn .btn-text {
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
}
</style>
