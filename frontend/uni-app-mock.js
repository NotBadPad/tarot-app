// H5 模拟 uni-app 生命周期和 API
import { onMounted, getCurrentInstance } from 'vue'

export function onLoad(fn) {
  onMounted(() => {
    const instance = getCurrentInstance()
    const route = instance?.proxy?.$route
    if (route) {
      fn(route.query)
    } else {
      // 从 URL 解析参数
      const search = new URLSearchParams(window.location.search)
      const query = {}
      search.forEach((v, k) => query[k] = v)
      fn(query)
    }
  })
}

export function onReady() {}
export function onUnload() {}
export function onShow() {}
export function onHide() {}
export function onPullDownRefresh() {}
export function onReachBottom() {}
export function onShareAppMessage() {}
