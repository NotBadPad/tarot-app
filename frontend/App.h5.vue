<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = [
  { path: '/', label: '占卜', icon: '✦' },
  { path: '/daily', label: '日运', icon: '☾' },
  { path: '/history', label: '历史', icon: '⌁' }
]

const showTabs = computed(() => !['/login', '/draw', '/result'].includes(route.path))

const go = (path) => {
  router.replace(path)
}

onMounted(() => {
  console.log('App Launch')
})
</script>

<template>
  <div class="dream-shell">
    <div class="cosmic-backdrop"></div>
    <router-view></router-view>
    <nav v-if="showTabs" class="dream-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.path"
        class="dream-tab"
        :class="{ active: route.path === tab.path }"
        @click="go(tab.path)"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </button>
    </nav>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background:
    radial-gradient(circle at 16% 10%, rgba(244, 200, 255, 0.18), transparent 30%),
    radial-gradient(circle at 84% 14%, rgba(120, 210, 255, 0.14), transparent 34%),
    linear-gradient(145deg, #090817 0%, #15102b 48%, #081d2a 100%);
  min-height: 100vh;
  color: #fff;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.dream-shell {
  min-height: 100vh;
  position: relative;
}

.cosmic-backdrop {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    radial-gradient(1px 1px at 14% 18%, rgba(255,255,255,.88), transparent),
    radial-gradient(1px 1px at 28% 34%, rgba(224,170,255,.85), transparent),
    radial-gradient(1.5px 1.5px at 76% 22%, rgba(180,230,255,.86), transparent),
    radial-gradient(1px 1px at 88% 66%, rgba(255,237,184,.72), transparent),
    radial-gradient(1px 1px at 42% 78%, rgba(255,255,255,.76), transparent);
  background-size: 240px 240px;
  animation: starDrift 24s linear infinite;
}

.cosmic-backdrop::before {
  content: "";
  position: absolute;
  inset: -12%;
  background:
    radial-gradient(circle at 50% 22%, rgba(157, 78, 221, .2), transparent 34%),
    radial-gradient(circle at 8% 82%, rgba(72, 202, 228, .16), transparent 32%),
    linear-gradient(120deg, transparent, rgba(255,255,255,.045), transparent);
  filter: blur(2px);
}

.container {
  position: relative;
  z-index: 1;
  padding-bottom: 110px !important;
}

.dream-tabs {
  position: fixed;
  left: 18px;
  right: 18px;
  bottom: 18px;
  z-index: 20;
  height: 64px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 8px;
  border: 1px solid rgba(224, 170, 255, 0.22);
  border-radius: 22px;
  background: rgba(12, 10, 28, 0.78);
  box-shadow: 0 18px 54px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
}

.dream-tab {
  border: 0;
  border-radius: 16px;
  color: rgba(255, 255, 255, 0.58);
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 12px;
  transition: transform .2s ease, color .2s ease, background .2s ease;
}

.dream-tab.active {
  color: #fff;
  background: linear-gradient(135deg, rgba(157, 78, 221, 0.72), rgba(72, 202, 228, 0.42));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 10px 24px rgba(157, 78, 221, .22);
}

.dream-tab:active {
  transform: translateY(1px) scale(.98);
}

.tab-icon {
  font-size: 18px;
  line-height: 1;
}

@keyframes starDrift {
  from { background-position: 0 0; }
  to { background-position: 240px 360px; }
}
</style>
