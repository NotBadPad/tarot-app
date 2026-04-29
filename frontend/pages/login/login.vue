<template>
  <div class="container">
    <div class="stars"></div>
    
    <div class="header">
      <h1 class="title">🔮 塔罗梦语</h1>
      <p class="subtitle">登录后同步你的占卜记录</p>
    </div>
    
    <div class="login-card">
      <div class="avatar-section">
        <div class="avatar-placeholder">
          <span class="avatar-icon">👤</span>
        </div>
        <p class="welcome-text">欢迎回来</p>
      </div>
      
      <div class="login-btn" @click="handleLogin">
        <span class="btn-icon">👻</span>
        <span class="btn-text">微信一键登录</span>
      </div>
      
      <div class="guest-btn" @click="skipLogin">
        <span class="btn-text">游客访问</span>
      </div>
      
      <p class="privacy-text">
        登录即表示您同意《用户协议》和《隐私政策》
      </p>
    </div>
  </div>
</template>

<script setup>
import { getBaseURL } from '@/utils/ai.js';

const handleLogin = async () => {
  // H5 模式下走游客登录流程：注册+登录后端，获取真实 token
  const baseURL = getBaseURL();
  const guestId = 'u' + Date.now().toString(36).slice(-6) + Math.random().toString(36).slice(2, 6);
  const username = guestId;
  const password = guestId + '_pwd';

  try {
    // 1. 先尝试注册
    let res = await uni.request({
      url: `${baseURL}/api/auth/register`,
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      data: { username, password },
      timeout: 15000
    });

    // 如果用户名已存在，则直接登录
    if (res.statusCode === 400 && res.data?.error?.includes('已存在')) {
      res = await uni.request({
        url: `${baseURL}/api/auth/login`,
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        data: { username, password },
        timeout: 15000
      });
    }

    if (res.statusCode !== 200 || !res.data?.token) {
      throw new Error(res.data?.error || '登录失败');
    }

    const userInfo = {
      nickName: '塔罗爱好者',
      avatarUrl: '',
      isLogin: true,
      token: res.data.token,
      username: res.data.user?.username || username
    };

    uni.setStorageSync('userInfo', userInfo);
    uni.showToast({ title: '登录成功', icon: 'success' });

    setTimeout(() => {
      uni.switchTab({ url: '/pages/index/index' });
    }, 1000);
  } catch (err) {
    console.error('登录失败:', err);
    // 后端不可用时，降级为本地模拟登录
    const userInfo = {
      nickName: '塔罗爱好者',
      avatarUrl: '',
      isLogin: true
    };
    uni.setStorageSync('userInfo', userInfo);
    uni.showToast({ title: '本地模式登录', icon: 'none' });
    setTimeout(() => {
      uni.switchTab({ url: '/pages/index/index' });
    }, 1000);
  }
};

const skipLogin = () => {
  uni.switchTab({ url: '/pages/index/index' });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%);
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stars {
  position: fixed;
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
  margin-bottom: 30px;
}

.title {
  font-size: 26px;
  color: #e0aaff;
  font-weight: 600;
  margin-bottom: 8px;
  margin-top: 0;
}

.subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.login-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(157, 78, 221, 0.2);
  border-radius: 12px;
  padding: 30px 20px;
  width: 80%;
  max-width: 300px;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}

.avatar-placeholder {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  box-shadow: 0 0 15px rgba(157, 78, 221, 0.4);
}

.avatar-icon {
  font-size: 30px;
}

.welcome-text {
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  margin: 0;
}

.login-btn {
  background: linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%);
  border-radius: 25px;
  padding: 14px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}

.login-btn:active {
  transform: scale(0.98);
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  color: #fff;
  font-size: 15px;
  font-weight: 500;
}

.guest-btn {
  text-align: center;
  padding: 10px;
  cursor: pointer;
}

.guest-btn .btn-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.privacy-text {
  text-align: center;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 20px;
  margin-bottom: 0;
}
</style>