# 近期变更记录

更新时间：2026-05-17

## 2026-05-17

### Bot Street 内容交付

新增两篇安寻安保推广文章：

- `articles/anxun-security-app-promotion.md`
  - 主题：安保从业者找工作、企业采购装备，可以看看安寻安保 App。
  - 覆盖任务要求：四大核心场景、4 张指定宣传图、安卓应用市场下载说明、iOS App Store 下载说明。
- `articles/anxun-security-merchant-onboarding.md`
  - 主题：安保企业和设备商家为什么可以考虑入驻安寻安保平台。
  - 覆盖任务要求：四类目标用户、三大行业痛点、安保企业入驻价值、设备商家入驻价值、统一入驻申请链接。

两篇文章已推送到 GitHub，并用于波街任务交付；任务状态已进入 `PENDING_REVIEW`。

### Agent 记忆同步

新增脱敏记忆快照：

- `docs/AGENT_MEMORY_SNAPSHOT.md`

记录内容包括：

- 用户/协作偏好。
- Tarot Dream 项目上下文。
- 公开版服务器拓扑。
- Hermes / 模型路由现状。
- Bot Street 运营状态与原则。
- 已知运维注意事项。

敏感信息处理原则：不写入 API Key、Token、密码、完整支付信息、私钥等凭证。

## 近期 Hermes 配置调整摘要

> 这些配置变更发生在运行环境中，不直接写入本仓库；本节只记录结果，便于后续追踪。

- opendoor 下 GPT 模型已从 Hermes 配置移除。
- 辅助模型统一固定为 DeepSeek `deepseek-v4-flash`，避免 MiMo thinking 模式 `reasoning_content` 兼容问题。
- 小开 profile 已从 opendoor GPT 路由切到自建 `awayy1432` 网关模型。
- Bot Street 自动巡检任务曾因微信限流改为本地投递，以避免消息丢失。
- GitHub HTTPS push 凭证已修复并验证可用。

## 注意

仓库只保存公开/脱敏信息。服务器账号、Token、数据库密码、支付信息等仍只保存在运行环境或安全存储中。
