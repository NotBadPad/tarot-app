<template>
  <div class="container">
    <!-- 背景装饰 -->
    <div class="stars"></div>
    
    <!-- 主标题 -->
    <div class="header">
      <div class="user-section" @click="goToLogin">
        <div class="user-avatar">
          <span class="avatar-text">{{ userInfo.isLogin && userInfo.nickName ? userInfo.nickName[0] : '人' }}</span>
        </div>
        <span class="user-name">{{ userInfo.isLogin ? userInfo.nickName : '点击登录' }}</span>
      </div>
      <span class="title">🔮 塔罗梦语</span>
      <span class="subtitle">探索内心的智慧之镜</span>
    </div>
    
    <!-- 快速入口 -->
    <div class="quick-actions">
      <div class="action-card daily" @click="goToDaily">
        <span class="action-icon">🌙</span>
        <span class="action-name">每日一抽</span>
        <span class="action-desc">今天的塔罗指引</span>
      </div>
      <div class="action-card cards" @click="browseCards">
        <span class="action-icon">📜</span>
        <span class="action-name">牌意查询</span>
        <span class="action-desc">78张牌详解</span>
      </div>
    </div>
    
    <!-- 牌阵选择 -->
    <div class="spread-section">
      <span class="section-title">选择牌阵</span>
      <div class="spread-list">
        <div 
          v-for="spread in spreads" 
          :key="spread.id"
          class="spread-card"
          :class="{ active: selectedSpread === spread.id }"
          @click="selectSpread(spread.id)"
        >
          <span class="spread-name">{{ spread.name }}</span>
          <span class="spread-desc">{{ spread.description }}</span>
          <span class="spread-count">{{ spread.positions.length }}张牌</span>
        </div>
      </div>
    </div>
    
    <!-- 问题输入 -->
    <div class="question-section">
      <span class="section-title">你的问题（可选）</span>
      <textarea
        v-model="question"
        class="question-input"
        placeholder="例如：我最近的工作运势如何？或者留空让牌卡自由告诉你..."
        maxlength="100"
      />
      <span class="char-count">{{ question.length }}/100</span>
    </div>
    
    <!-- 开始按钮 -->
    <button class="start-btn" @click="startReading">
      <span class="btn-text">🃏 开始洗牌</span>
    </button>
    
    <!-- 简介 -->
    <div class="intro">
      <span class="intro-text">塔罗牌是自反的工具，回答始于你内心</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { SPREADS } from '@/data/tarot-data.js';

const spreads = Object.values(SPREADS);
const selectedSpread = ref('single');
const question = ref('');
const userInfo = ref({ isLogin: false });

onMounted(() => {
  // 检查登录状态
  const storedUser = uni.getStorageSync('userInfo');
  if (storedUser && storedUser.isLogin) {
    userInfo.value = storedUser;
  }
});

const goToLogin = () => {
  if (!userInfo.value.isLogin) {
    uni.navigateTo({ url: '/pages/login/login' });
  }
};

const selectSpread = (id) => {
  selectedSpread.value = id;
};

const goToDaily = () => {
  uni.switchTab({ url: '/pages/daily/daily' });
};

const browseCards = () => {
  uni.showToast({ title: '即将上线，敬请期待', icon: 'none' });
};

const startReading = () => {
  uni.navigateTo({
    url: `/pages/draw/draw?spreadId=${selectedSpread.value}&question=${encodeURIComponent(question.value)}`
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%);
  padding: 30rpx;
  position: relative;
  overflow: hidden;
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
    radial-gradient(2px 2px at 50px 160px, #fff, transparent),
    radial-gradient(2px 2px at 90px 40px, #fff, transparent),
    radial-gradient(2px 2px at 130px 80px, #fff, transparent),
    radial-gradient(2px 2px at 160px 120px, #fff, transparent);
  opacity: 0.3;
  pointer-events: none;
}

.header {
  text-align: center;
  padding: 60rpx 0 40rpx;
  position: relative;
}

.user-section {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.user-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6rpx;
}

.avatar-text {
  font-size: 28rpx;
  color: #fff;
}

.user-name {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.7);
}

.title {
  display: block;
  font-size: 56rpx;
  font-weight: bold;
  color: #e0aaff;
  text-shadow: 0 0 20rpx rgba(224, 170, 255, 0.5);
  margin-bottom: 16rpx;
}

.subtitle {
  display: block;
  font-size: 28rpx;
  color: #9d4edd;
  letter-spacing: 4rpx;
}

.quick-actions {
  display: flex;
  gap: 20rpx;
  margin-bottom: 40rpx;
}

.action-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 2rpx solid rgba(157, 78, 221, 0.3);
  border-radius: 16rpx;
  padding: 30rpx;
  text-align: center;
  transition: all 0.3s;
}

.action-card:active {
  transform: scale(0.98);
}

.action-card.daily {
  background: linear-gradient(135deg, rgba(123, 44, 191, 0.15), rgba(157, 78, 221, 0.1));
}

.action-card.cards {
  background: linear-gradient(135deg, rgba(157, 78, 221, 0.1), rgba(123, 44, 191, 0.15));
}

.action-icon {
  font-size: 48rpx;
  display: block;
  margin-bottom: 12rpx;
}

.action-name {
  display: block;
  font-size: 30rpx;
  color: #fff;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.action-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
}

.section-title {
  display: block;
  font-size: 32rpx;
  color: #fff;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.spread-section {
  margin-bottom: 40rpx;
}

.spread-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.spread-card {
  background: rgba(255, 255, 255, 0.05);
  border: 2rpx solid rgba(157, 78, 221, 0.3);
  border-radius: 16rpx;
  padding: 30rpx;
  position: relative;
  transition: all 0.3s;
}

.spread-card.active {
  background: rgba(157, 78, 221, 0.15);
  border-color: #9d4edd;
  box-shadow: 0 0 20rpx rgba(157, 78, 221, 0.3);
}

.spread-name {
  display: block;
  font-size: 32rpx;
  color: #fff;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.spread-desc {
  display: block;
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8rpx;
}

.spread-count {
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24rpx;
  color: #9d4edd;
  background: rgba(157, 78, 221, 0.2);
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
}

.question-section {
  margin-bottom: 50rpx;
  position: relative;
}

.question-input {
  width: 100%;
  height: 160rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 2rpx solid rgba(157, 78, 221, 0.3);
  border-radius: 16rpx;
  padding: 20rpx;
  color: #fff;
  font-size: 28rpx;
  box-sizing: border-box;
}

.question-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.char-count {
  position: absolute;
  right: 20rpx;
  bottom: -30rpx;
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.4);
}

.start-btn {
  background: linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%);
  border: none;
  border-radius: 50rpx;
  padding: 30rpx 80rpx;
  margin: 40rpx auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10rpx 40rpx rgba(157, 78, 221, 0.4);
  transition: transform 0.2s;
}

.start-btn:active {
  transform: scale(0.98);
}

.btn-text {
  color: #fff;
  font-size: 36rpx;
  font-weight: 600;
}

.intro {
  text-align: center;
  margin-top: 60rpx;
}

.intro-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.4);
}
</style>
