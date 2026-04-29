import { createApp } from 'vue'
import App from './App.h5.vue'
import Index from './pages/index/index.vue'
import Daily from './pages/daily/daily.vue'
import Draw from './pages/draw/draw.vue'
import Result from './pages/result/result.vue'
import History from './pages/history/history.vue'
import CardDetail from './pages/card-detail/card-detail.vue'
import { createRouter, createWebHistory } from 'vue-router'

import Login from './pages/login/login.vue'

// 创建路由
const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Index },
  { path: '/daily', component: Daily },
  { path: '/draw', component: Draw },
  { path: '/result', component: Result },
  { path: '/history', component: History },
  { path: '/card/:id', component: CardDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路径转换：把 uni-app 的 pages 路径转成 vue-router 路径
function convertUrl(url) {
  if (!url) return url
  // 解析路径和查询参数
  const [path, query] = url.split('?')
  const map = {
    '/pages/index/index': '/',
    '/pages/daily/daily': '/daily',
    '/pages/draw/draw': '/draw',
    '/pages/result/result': '/result',
    '/pages/history/history': '/history',
    '/pages/login/login': '/login',
    '/pages/card-detail/card-detail': '/card'
  }
  let newPath = map[path] || path
  // card-detail 特殊处理 id 参数
  if (path === '/pages/card-detail/card-detail' && query) {
    const params = new URLSearchParams(query)
    const id = params.get('id')
    if (id) {
      newPath = `/card/${id}`
      params.delete('id')
      const remaining = params.toString()
      if (remaining) return `${newPath}?${remaining}`
      return newPath
    }
  }
  return query ? `${newPath}?${query}` : newPath
}

// 简单的 Toast 实现
function showToastUI(options) {
  const title = typeof options === 'string' ? options : options.title || ''
  const icon = options.icon || 'none'
  const duration = options.duration || 2000

  let el = document.getElementById('uni-toast')
  if (!el) {
    el = document.createElement('div')
    el.id = 'uni-toast'
    el.style.cssText = `
      position: fixed; top: 45%; left: 50%; transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.75); color: #fff; padding: 12px 20px;
      border-radius: 8px; font-size: 14px; z-index: 9999; pointer-events: none;
      white-space: nowrap; transition: opacity 0.3s; opacity: 0;
    `
    document.body.appendChild(el)
  }
  el.textContent = icon === 'success' ? '✓ ' + title : title
  el.style.opacity = '1'
  setTimeout(() => { el.style.opacity = '0' }, duration)
}

// 模拟 uni-app API
window.uni = {
  navigateTo: (options) => {
    const url = convertUrl(options.url)
    router.push(url)
    options.success && options.success()
  },
  navigateBack: () => router.back(),
  redirectTo: (options) => {
    const url = convertUrl(options.url)
    router.replace(url)
    options.success && options.success()
  },
  switchTab: (options) => {
    const url = convertUrl(options.url)
    router.replace(url)
    options.success && options.success()
  },
  reLaunch: (options) => {
    const url = convertUrl(options.url)
    router.replace(url)
    options.success && options.success()
  },
  getStorageSync: (key) => {
    const raw = localStorage.getItem(key)
    if (raw === null) return null
    try { return JSON.parse(raw) } catch { return raw }
  },
  setStorageSync: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  removeStorageSync: (key) => localStorage.removeItem(key),
  vibrateShort: () => {},
  showToast: (options) => showToastUI(options),
  showLoading: (options) => showToastUI({ title: options?.title || '加载中...', icon: 'none' }),
  hideLoading: () => {
    const el = document.getElementById('uni-toast')
    if (el) el.style.opacity = '0'
  },
  getEnterOptionsSync: () => ({ query: {} }),
  showModal: (options) => {
    if (confirm(options.title + '\n' + options.content)) {
      options.success && options.success({ confirm: true })
    } else {
      options.success && options.success({ cancel: true })
    }
  },
  request: (options) => {
    const { url, method = 'GET', data, header = {}, success, fail, complete, timeout = 30000 } = options
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeout)

    const fetchOptions = {
      method: method.toUpperCase(),
      headers: { ...header },
      signal: controller.signal
    }

    if (fetchOptions.headers['content-type'] === undefined && fetchOptions.headers['Content-Type'] === undefined) {
      fetchOptions.headers['Content-Type'] = 'application/json'
    }

    let fetchUrl = url
    if (fetchOptions.method === 'GET' && data) {
      const params = new URLSearchParams(data)
      fetchUrl += (url.includes('?') ? '&' : '?') + params.toString()
    } else if (fetchOptions.method !== 'GET' && data) {
      fetchOptions.body = typeof data === 'string' ? data : JSON.stringify(data)
    }

    const p = fetch(fetchUrl, fetchOptions)
      .then(async (res) => {
        clearTimeout(timer)
        const contentType = res.headers.get('content-type') || ''
        let responseData
        if (contentType.includes('application/json')) {
          responseData = await res.json()
        } else {
          responseData = await res.text()
        }
        const result = {
          data: responseData,
          statusCode: res.status,
          header: Object.fromEntries(res.headers.entries()),
          cookies: []
        }
        success && success(result)
        complete && complete(result)
        return result
      })
      .catch((err) => {
        clearTimeout(timer)
        const errorResult = { errMsg: err.message }
        fail && fail(errorResult)
        complete && complete(errorResult)
        throw err
      })

    return p
  }
}

const app = createApp(App)
app.use(router)
app.mount('#app')
