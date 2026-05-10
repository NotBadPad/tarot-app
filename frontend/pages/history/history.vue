<template>
  <div class="container">
    <div class="stars"></div>
    
    <div class="header">
      <span class="title">历史记录</span>
      <span class="subtitle">你的占卜旅程</span>
    </div>
    
    <div v-if="readings.length === 0" class="empty-state">
      <span class="empty-icon">📜</span>
      <span class="empty-text">还没有占卜记录</span>
      <span class="empty-hint">去抽第一张牌吧~</span>
      <button class="start-btn" @click="goToDraw">
        <span class="btn-text">开始占卜</span>
      </button>
    </div>
    
    <div v-else class="reading-list">
      <div 
        v-for="reading in readings" 
        :key="reading.timestamp"
        class="reading-card"
        @click="viewReading(reading.timestamp)"
      >
        <div class="card-header">
          <span class="spread-name">{{ reading.spreadName }}</span>
          <span class="time">{{ formatTime(reading.timestamp) }}</span>
        </div>
        
        <span v-if="reading.question" class="question">
          "{{ truncateQuestion(reading.question) }}"
        </span>
        
        <div class="cards-preview">
          <div 
            v-for="(card, index) in reading.cards.slice(0, 3)" 
            :key="index"
            class="mini-card"
            :class="{ reversed: card.isReversed }"
          >
            <img :src="getCardImage(card)" class="mini-image" mode="aspectFit" @error="setFallbackImage($event, card)" />
            <span class="mini-name">{{ card.name }}</span>
          </div>
          <span v-if="reading.cards.length > 3" class="more-cards">
            +{{ reading.cards.length - 3 }}</span>
        </div>
        
        <div class="card-footer">
          <span class="cards-count">{{ reading.cards.length }}张牌</span>
          <span class="view-btn">查看详情 →</span>
        </div>
      </div>
    </div>
    
    <div v-if="readings.length > 0" class="clear-section">
      <span class="clear-btn" @click="clearAll">清除所有记录</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted  } from 'vue';
import { getCardImage, getFallbackCardImage } from '@/utils/tarot.js';

const readings = ref([]);

const setFallbackImage = (event, card) => {
  event.target.src = getFallbackCardImage(card);
};

onMounted(() => {
  loadReadings();
});

const loadReadings = () => {
  readings.value = uni.getStorageSync('tarot_readings') || [];
};

const formatTime = (timestamp) => {
  const date = new Date(parseInt(timestamp));
  const now = new Date();
  const diff = now - date;
  
  // Bug #7 Fix: 之前用 diff < 86400000 判断"今天"不准确（昨晚深夜也会被算为今天内）
  // 改为比较日历日期字符串，确保只有真正同一天才显示纯时间
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) {
    return `今天 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  }
  if (diff < 604800000) {
    return `${Math.floor(diff / 86400000)}天前`;
  }
  return `${date.getMonth() + 1}月${date.getDate()}日`;
};

const truncateQuestion = (q) => {
  if (q.length <= 20) return q;
  return q.substring(0, 20) + '...';
};

const viewReading = (timestamp) => {
  uni.navigateTo({
    url: `/pages/result/result?id=${timestamp}`
  });
};

const goToDraw = () => {
  uni.switchTab({ url: '/pages/index/index' });
};

const clearAll = () => {
  uni.showModal({
    title: '确认清除',
    content: '确定要清除所有占卜记录吗？',
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync('tarot_readings');
        readings.value = [];
        uni.showToast({ title: '已清除', icon: 'success' });
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background:
    radial-gradient(circle at 50% 0%, rgba(224, 170, 255, 0.14), transparent 32%),
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
    radial-gradient(2px 2px at 20px 30px, #fff, transparent);
  opacity: 0.3;
  pointer-events: none;
  animation: floatStars 10s ease-in-out infinite alternate;
}

.header {
  text-align: center;
  padding: 40rpx 0;
}

.title {
  display: block;
  font-size: 44rpx;
  color: #fff;
  font-weight: 600;
  margin-bottom: 12rpx;
  text-shadow: 0 0 28rpx rgba(224, 170, 255, 0.52);
}

.subtitle {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.5);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 40rpx;
}

.empty-icon {
  font-size: 100rpx;
  margin-bottom: 30rpx;
}

.empty-text {
  font-size: 32rpx;
  color: #fff;
  margin-bottom: 12rpx;
}

.empty-hint {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 40rpx;
}

.start-btn {
  background: linear-gradient(135deg, #9d4edd 0%, #5a6cff 52%, #48cae4 100%);
  border: none;
  border-radius: 50rpx;
  padding: 24rpx 80rpx;
}

.start-btn .btn-text {
  color: #fff;
  font-size: 30rpx;
  font-weight: 500;
}

.reading-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.reading-card {
  background: rgba(255, 255, 255, 0.065);
  border: 1rpx solid rgba(224, 170, 255, 0.2);
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 18rpx 48rpx rgba(0, 0, 0, 0.22), inset 0 1rpx 0 rgba(255,255,255,.08);
  backdrop-filter: blur(18rpx);
  transition: transform .2s ease, border-color .2s ease;
}

.reading-card:active {
  transform: scale(.99);
  border-color: rgba(224, 170, 255, 0.46);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.spread-name {
  font-size: 30rpx;
  color: #fff;
  font-weight: 600;
}

.time {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
}

.question {
  display: block;
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  margin-bottom: 20rpx;
}

.cards-preview {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.mini-card {
  width: 80rpx;
  text-align: center;
}

.mini-card.reversed .mini-image {
  transform: rotate(180deg);
}

.mini-image {
  width: 80rpx;
  height: 120rpx;
  border-radius: 8rpx;
  background: linear-gradient(135deg, #2d2d4a 0%, #1a1a2e 100%);
  margin-bottom: 8rpx;
  box-shadow: 0 8rpx 18rpx rgba(0,0,0,.25);
}

.mini-name {
  display: block;
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.more-cards {
  font-size: 24rpx;
  color: #e0aaff;
  margin-left: 12rpx;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.05);
}

.cards-count {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
}

.view-btn {
  font-size: 26rpx;
  color: #bdefff;
}

.clear-section {
  text-align: center;
  padding: 40rpx;
}

.clear-btn {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: underline;
}

@keyframes floatStars {
  from { opacity: .22; transform: translateY(0); }
  to { opacity: .42; transform: translateY(16rpx); }
}
</style>
