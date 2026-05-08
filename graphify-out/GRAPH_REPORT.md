# Graph Report - tarot-app  (2026-05-08)

## Corpus Check
- 24 files · ~19,855 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 189 nodes · 198 edges · 15 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `70917f17`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]

## God Nodes (most connected - your core abstractions)
1. `🔮 塔罗牌小程序` - 10 edges
2. `drawDailyCard()` - 7 edges
3. `✅ 功能特性` - 7 edges
4. `塔罗牌小程序 H5 测试用例` - 7 edges
5. `塔罗梦语 (Tarot Dream)` - 6 edges
6. `测试结果` - 6 edges
7. `getTodayString()` - 4 edges
8. `getBaseURL()` - 4 edges
9. `getAIInterpretation()` - 4 edges
10. `📖 使用说明` - 4 edges

## Surprising Connections (you probably didn't know these)
- `handleLogin()` --calls--> `getBaseURL()`  [INFERRED]
  frontend/pages/login/login.vue → frontend/utils/ai.js
- `getInterpretation()` --calls--> `getAIInterpretation()`  [INFERRED]
  frontend/pages/result/result.vue → frontend/utils/ai.js
- `getInterpretation()` --calls--> `getQuickInterpretation()`  [INFERRED]
  frontend/pages/result/result.vue → frontend/utils/ai.js

## Communities (15 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (22): aiLimiter, ALLOWED_ORIGINS, apiLimiter, app, axios, bcrypt, buildAIPrompt(), cors (+14 more)

### Community 1 - "Community 1"
Cohesion: 0.1
Nodes (10): CUPS, MAJOR_ARCANA, PENTACLES, SPREADS, SWORDS, TAROT_DECK, WANDS, drawCards() (+2 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (22): 🔮 塔罗牌小程序, 1. 快速开始, 🎨 牌面图片, 📝 牌阵说明, 🛠 开发计划, 📖 许可证, 每日一抽, 牌意详解 (+14 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (13): app, controller, deviceId, el, fetchOptions, p, params, raw (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (9): config, getInterpretation(), options, buildHeaders(), getAIInterpretation(), getApiConfig(), getAuthToken(), getBaseURL() (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.17
Nodes (11): 项目结构, 技术栈, 快速开始, 前端, 后端, 环境变量, 部署, code:block1 (├── frontend/          # uni-app 前端 (H5 + 微信小程序)) (+3 more)

### Community 6 - "Community 6"
Cohesion: 0.18
Nodes (5): question, selectedSpread, spreads, storedUser, userInfo

### Community 7 - "Community 7"
Cohesion: 0.38
Nodes (7): drawDailyCard(), getTodayCard(), getTodayString(), getUserIdentifier(), hasDrawnToday(), hashString(), saveToHistory()

### Community 8 - "Community 8"
Cohesion: 0.2
Nodes (9): 测试环境, 一、页面访问与加载, 二、路由跳转, 三、图片资源, 四、核心功能, 五、后端服务, 仍存在的问题, 测试结果 (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.25
Nodes (7): 一、页面访问与加载, 三、图片资源加载, 四、核心功能, 五、登录与用户, 六、后端服务, 二、路由跳转与导航, 塔罗牌小程序 H5 测试用例

### Community 11 - "Community 11"
Cohesion: 0.4
Nodes (4): foundCard, match, options, { path, query }

## Knowledge Gaps
- **83 isolated node(s):** `routes`, `router`, `url`, `raw`, `el` (+78 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `routes`, `router`, `url` to the rest of the system?**
  _83 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._