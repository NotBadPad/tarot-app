import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import rpxToPxPlugin from './vite-rpx-plugin.js'

export default defineConfig({
  plugins: [vue(), rpxToPxPlugin()],
  publicDir: 'static',
  resolve: {
    alias: {
      '@': '/',
      '@dcloudio/uni-app': '/uni-app-mock.js'
    }
  },
  build: {
    outDir: 'dist/h5',
    emptyOutDir: true
  }
})
