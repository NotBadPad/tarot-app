<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  console.log('App Launch')
})
</script>

<template>
  <router-view></router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%);
  min-height: 100vh;
  color: #fff;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>