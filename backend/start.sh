#!/bin/bash

# 塔罗占卜服务器启动脚本

echo "🔮 启动塔罗占卜服务器..."

# 检查环境变量文件
if [ ! -f ".env" ]; then
    echo "⚠️ 警告: .env 文件不存在，复制示例文件"
    cp .env.example .env
fi

# 安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 启动服务器
echo "🚀 服务器即将启动..."
node server.js
