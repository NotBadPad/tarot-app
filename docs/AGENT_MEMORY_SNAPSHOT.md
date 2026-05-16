# Agent 记忆快照（脱敏）

> 这份文件用于把 Hermes Agent 的长期工作上下文同步到仓库，便于跨设备、跨会话恢复项目状态。  
> **安全原则**：不记录 API Key、Token、密码、完整私钥、完整支付信息等敏感凭证。

更新时间：2026-05-17

## 用户与协作偏好

- 项目 Owner 使用 `awayy1432` 作为本地/服务端常用标识。
- GitHub 账号：`NotBadPad`。
- 偏好直接、高效、少废话的协作方式；适合并行处理的任务优先并行推进。
- 微信消息结尾使用处理 agent 签名：`—— Hermes`、`—— 小开`、`—— 小富`、`—— 小运`、`—— botstreet`。
- 外部展示服务器拓扑时，本机 `45.194.21.126` 使用名称 **JTTI-HK**，不要标为 `local`。

## 当前项目：Tarot Dream 小程序

- 项目：塔罗梦语 / Tarot Dream。
- 技术栈：uni-app + Vue 3 + Node.js/Express + SQLite。
- 小程序 AppID：`wx11b1edb836a1523a`。
- 生产域名：`https://tarot.awayy1432.com`。
- 当前 GitHub 仓库：`https://github.com/NotBadPad/tarot-app`。
- GitHub 远程使用 HTTPS；凭证已在运行环境中配置，可直接 push。

## 服务器与域名拓扑（公开版）

| 名称 | 用途/备注 | 域名 |
|---|---|---|
| JTTI-HK | 本项目当前生产入口；对外展示时使用此名称 | `tarot.awayy1432.com` |
| JTTI-JP | 其他节点 | `awayy1432.org` |
| CS-US | 其他节点；Sub2API 管理后端所在机器 | `awayy1432.xyz` |
| hy-hk01 | 香港节点，常用于低延迟内网/部署任务 | - |

> 私有 IP、SSH 细节、后台账号、数据库密码等不写入仓库。

## Hermes / 模型路由现状

- 当前主模型：`gpt-5.5` via `awayy1432` 自建网关。
- 默认 DeepSeek API 凭证由运行环境变量管理，不写入仓库。
- 代码专家/子 agent 小开当前使用 `gpt-5.5` via `awayy1432` 自建网关。
- 股票/投资/市场分析交给小富（xiao-fu），使用 TradingAgents 工作流。
- 辅助模型已固定到 DeepSeek `deepseek-v4-flash`，用于避免 MiMo thinking 模式 `reasoning_content` 兼容问题。
- opendoor 下 GPT 模型已从 Hermes 配置中移除，仅保留 Claude/Gemini 类模型。

## Sub2API / 模型网关

- 对外 AI 网关：`https://sub2api.awayy1432.xyz/v1`。
- 网关用于提供 `gpt-5.5` / `gpt-5.4` 等内部模型路由。
- 管理后端、数据库与 Redis 细节保留在服务器环境，不写入仓库。

## Bot Street（波街）运营状态

- 平台：`https://botstreet.io`。
- Bot：`Hermes-Agent-CN`。
- Bot Agent ID：`176885966097616896`。
- 任务记录文件（服务器本地）：`/root/botstreet-completed-tasks.md`。
- 操作原则：
  - 检查任务前先读本地任务记录，避免重复申请。
  - 人工会话中发现新任务时，默认先汇报并等待确认，不擅自报名。
  - 只读查询可由主 Hermes 直接调 API；复杂交付也可由主 Hermes 接手，避免子代理超时。
  - 单次报名/交付可委托 botstreet 子 agent，但实际以效率优先。

### 近期 Bot Street 任务交付

- 已发布并提交安寻安保两篇推广文：
  - `articles/anxun-security-app-promotion.md`
  - `articles/anxun-security-merchant-onboarding.md`
- 波街对应任务状态已进入 `PENDING_REVIEW` / `SUBMITTED`。

## 已知运维注意事项

- Weixin/iLink 消息可能限流；高频 cron 推送应优先投递到 `local` 或减少消息频率。
- Hermes Gateway 重启会中断当前会话；配置变更后重启是正常现象，但不应频繁无意义重启。
- MiMo `mimo-v2.5-pro` thinking 模式曾因 `reasoning_content` 未回传导致 HTTP 400；辅助模型已改用 DeepSeek 避免该问题。
- GitHub push 已验证可用；不要提交 `.env`、API Key、Token、支付账号等敏感信息。
