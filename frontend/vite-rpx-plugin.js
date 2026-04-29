// Vite 插件：将 rpx 转换为 px
export default function rpxToPxPlugin() {
  return {
    name: 'rpx-to-px',
    transform(code, id) {
      if (id.endsWith('.vue') || id.endsWith('.css') || id.endsWith('.scss')) {
        // 将 rpx 转换为 px (1rpx = 0.5px 基于 750px 设计稿)
        code = code.replace(/(\d+)rpx/g, (match, num) => {
          return `${parseInt(num) * 0.5}px`;
        });
      }
      return code;
    }
  };
}