<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style>
/* 每个页面的公共css */
page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}

/* 禁用选中 */
.uni-select {
  user-select: none;
}
</style>
