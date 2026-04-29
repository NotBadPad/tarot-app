<template>
  <div class="container">
    <div class="stars"></div>
    
    <!-- 标题 -->
    <div class="header">
      <span class="title">每日一抽</span>
      <span class="subtitle">{{ todayDate }}</span>
      <div class="moon-phase">
        <span class="moon-icon">{{ moonPhase.icon }}</span>
        <span class="moon-name">{{ moonPhase.name }}</span>
      </div>
    </div>
    
    <!-- 抽牌区域 -->
    <div v-if="!hasDrawn && !showCard" class="draw-area">
      <div class="card-placeholder" @click="drawCard">
        <div class="card-back">
          <span class="card-pattern">✦</span>
          <span class="card-text">点击抽取今日牌运</span>
        </div>
      </div>
      <span class="draw-hint">每天只有一次机会，集中精神思考今天的期许</span>
    </div>
    
    <!-- 结果展示 -->
    <div v-else class="result-area">
      <div class="card-display" :class="{ reversed: dailyCard?.isReversed }">
        <img 
          :src="getCardImage(dailyCard)" 
          class="card-image" 
          mode="aspectFit"
          @click="viewCardDetail"
        />
        <div class="card-info">
          <span class="card-name">{{ dailyCard?.name }}</span>
          <span class="orientation">{{ dailyCard?.isReversed ? '逆位' : '正位' }}</span>
        </div>
      </div>
      
      <!-- 指引文本 -->
      <div class="guidance-box">
        <span class="guidance-title">🔮 今日指引</span>
        <span class="guidance-text">{{ guidance.general }}</span>
        <div class="keywords">
          <span 
            v-for="(kw, i) in guidance.keywords" 
            :key="i"
            class="keyword-tag"
          >{{ kw }}</span>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="actions">
        <button class="action-btn" @click="viewCardDetail">
          <span class="btn-icon">📜</span>
          <span class="btn-text">查看详情</span>
        </button>
        <button class="action-btn primary" @click="shareDaily">
          <span class="btn-icon">📤</span>
          <span class="btn-text">分享日运</span>
        </button>
      </div>
    </div>
    
    <!-- 历史记录入口 -->
    <div class="history-entry" @click="viewHistory">
      <span class="history-text">查看历史日运 →</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { 
  hasDrawnToday, 
  drawDailyCard, 
  getTodayCard,
  generateDailyGuidance 
} from '@/utils/daily.js';
import { getCardImage } from '@/utils/tarot.js';

const hasDrawn = ref(false);
const showCard = ref(false);
const dailyCard = ref(null);
const guidance = ref({ general: '', keywords: [] });

const todayDate = ref('');
const moonPhase = ref({ icon: '🌑', name: '新月' });

onMounted(() => {
  initDate();
  
  // 检查是否今天已抽过
  hasDrawn.value = hasDrawnToday();
  if (hasDrawn.value) {
    dailyCard.value = getTodayCard();
    guidance.value = generateDailyGuidance(dailyCard.value);
    showCard.value = true;
  }
});

const initDate = () => {
  const date = new Date();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  todayDate.value = `${date.getMonth() + 1}月${date.getDate()}日 星期${weekDays[date.getDay()]}`;
  
  // 简单的月相计算（基于日期）
  const day = date.getDate();
  if (day < 7) {
    moonPhase.value = { icon: '🌑', name: '新月' };
  } else if (day < 14) {
    moonPhase.value = { icon: '🌒', name: '上弦月' };
  } else if (day < 22) {
    moonPhase.value = { icon: '🌕', name: '满月' };
  } else {
    moonPhase.value = { icon: '🌘', name: '下弦月' };
  }
};

const drawCard = () => {
  uni.vibrateShort({ type: 'light' });
  
  // 添加动画效果
  uni.showLoading({ title: '洗牌中...' });
  
  setTimeout(() => {
    dailyCard.value = drawDailyCard();
    guidance.value = generateDailyGuidance(dailyCard.value);
    hasDrawn.value = true;
    showCard.value = true;
    uni.hideLoading();
  }, 1000);
};

const viewCardDetail = () => {
  if (!dailyCard.value) return;
  uni.navigateTo({
    url: `/pages/card-detail/card-detail?id=${dailyCard.value.id}&from=daily&reversed=${dailyCard.value.isReversed || false}`
  });
};

const shareDaily = () => {
  const text = `🔮 ${todayDate.value} 每日塔罗\n\n抽到牌：${dailyCard.value.name} ${dailyCard.value.isReversed ? '逆位' : '正位'}\n\n今日指引：${guidance.value.general}`;
  
  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({ title: '已复制，去分享吧~', icon: 'none' });
    }
  });
};

const viewHistory = () => {
  uni.switchTab({ url: '/pages/history/history' });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%);
  padding: 30rpx;
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

.header {
  text-align: center;
  padding: 40rpx 0;
}

.title {
  display: block;
  font-size: 48rpx;
  color: #e0aaff;
  font-weight: 600;
  margin-bottom: 12rpx;
  text-shadow: 0 0 20rpx rgba(224, 170, 255, 0.3);
}

.subtitle {
  display: block;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16rpx;
}

.moon-phase {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
}

.moon-icon {
  font-size: 36rpx;
}

.moon-name {
  font-size: 24rpx;
  color: #9d4edd;
}

/* 抽牌区域 */
.draw-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 0;
}

.card-placeholder {
  width: 280rpx;
  height: 420rpx;
  margin-bottom: 40rpx;
  cursor: pointer;
  transition: transform 0.3s;
}

.card-placeholder:active {
  transform: scale(0.95);
}

.card-back {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #7b2cbf 0%, #9d4edd 50%, #7b2cbf 100%);
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4rpx solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20rpx 60rpx rgba(123, 44, 191, 0.4);
}

.card-pattern {
  font-size: 80rpx;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 20rpx;
}

.card-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 0 40rpx;
}

.draw-hint {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
}

/* 结果区域 */
.result-area {
  padding: 20rpx 0;
}

.card-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-display.reversed .card-image {
  transform: rotate(180deg);
}

.card-image {
  width: 260rpx;
  height: 390rpx;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #2d2d4a 0%, #1a1a2e 100%);
  box-shadow: 0 20rpx 50rpx rgba(0, 0, 0, 0.4);
  transition: transform 0.3s;
}

.card-info {
  text-align: center;
  margin-top: 24rpx;
}

.card-name {
  display: block;
  font-size: 40rpx;
  color: #fff;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.orientation {
  font-size: 26rpx;
  color: #9d4edd;
}

.guidance-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1rpx solid rgba(157, 78, 221, 0.2);
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 40rpx;
}

.guidance-title {
  display: block;
  font-size: 32rpx;
  color: #e0aaff;
  margin-bottom: 20rpx;
  font-weight: 600;
}

.guidance-text {
  display: block;
  font-size: 30rpx;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  margin-bottom: 24rpx;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.keyword-tag {
  font-size: 24rpx;
  color: #9d4edd;
  background: rgba(157, 78, 221, 0.15);
  padding: 10rpx 24rpx;
  border-radius: 24rpx;
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
  background: rgba(255, 255, 255, 0.08);
}

.action-btn.primary {
  background: linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%);
}

.action-btn .btn-icon {
  font-size: 32rpx;
}

.action-btn .btn-text {
  color: #fff;
  font-size: 28rpx;
  font-weight: 500;
}

.history-entry {
  text-align: center;
  padding: 20rpx;
}

.history-text {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.5);
}
</style>
