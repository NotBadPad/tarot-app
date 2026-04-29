# 塔罗梦语 (Tarot Dream)

> 塔罗牌 AI 占卜小程序 — uni-app 全栈项目

## 项目结构

```
├── frontend/          # uni-app 前端 (H5 + 微信小程序)
│   ├── pages/         # 页面组件
│   ├── components/    # 通用组件
│   ├── data/          # 塔罗牌数据
│   └── utils/         # 工具函数
│
└── backend/           # Node.js + Express 后端
    ├── server.js      # 服务入口
    ├── public/        # 静态资源
    └── package.json
```

## 技术栈

- **前端**: uni-app (Vue 3) + Vite
- **后端**: Node.js + Express + SQLite
- **AI**: 多提供商故障转移 (Kimi / OpenAI / 通义千问)
- **部署**: Nginx 反向代理 + Let's Encrypt SSL

## 快速开始

### 前端

```bash
cd frontend
npm install
npm run dev:h5        # H5 开发
npm run build:h5      # H5 构建
npm run dev:mp-weixin  # 微信小程序开发
```

### 后端

```bash
cd backend
cp .env.example .env  # 配置你的 API Key
npm install
node server.js
```

## 环境变量

后端需要 `.env` 文件:

| 变量 | 说明 |
|------|------|
| `AI_PROVIDER` | AI 提供商 (kimi/openai/aliyun) |
| `AI_API_KEY` | API 密钥 |
| `JWT_SECRET` | JWT 签名密钥 |
| `PORT` | 服务端口 (默认 3000) |

## 部署

访问: https://tarot.awayy1432.com

---

Made with ❤️ by [awayy1432](https://github.com/NotBadPad)
