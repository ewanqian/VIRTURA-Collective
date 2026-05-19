# Collective Audit And Index Report 2026-04-16

日期：2026-04-16
仓库：`VIRTURA-Collective`
本地路径：`/Volumes/Sync/Workspace/VIRTURA-Collective/repo`

> 2026-05-20 maintenance note: this is now a historical audit. The current public contract is the four-repo graph in `VIRTURA-SpacePort/docs/public-graph/`. `SceneForge` and other internal/tool repositories are not part of the current public navigation wave. Since this report was written, `VIRTURA-Collective` has gained a prototype frontstage and formal independent member work pages.

这份报告面向两种用途：

1. 给当前团队快速判断 `VIRTURA-Collective` 到了什么阶段
2. 给后续更强模型继续做长时间推演时，提供一份比较干净的输入底稿

---

## 1. 本轮实际做了什么

### 已执行检查

- 已将仓库拉到本地
- 已确认当前默认分支为 `main`
- 已确认仓库当前是内容与信息架构仓，而不是现成前端工程仓
- 已检查工程文件：未发现 `package.json`、`vite.config.*`、`next.config.*`、`astro.config.*`、`mkdocs.yml`、`_config.yml` 等前端或静态站点构建配置
- 已审计 Markdown 相对链接：共检查 `190` 条，相对坏链 `0` 条
- 已用本地静态服务器验证根目录与 `README.md` 可被访问，HTTP 返回 `200`

### 本轮顺手清理

- 清理了 `about/README.md` 中重复出现的一段 `Team Slogan`
- 新增了这份审计与 index 报告
- 将这份报告补入了 `README.md` 和 `docs/README.md`

### 运行结论

当前仓库“能执行”的部分主要是：

- Markdown 结构审计
- 静态目录访问验证
- 内容层与信息架构层分析

当前仓库“还不能执行”的部分主要是：

- 真实网页首页
- 前端页面路由
- 卡片组件系统
- 活动/作品/成员的可视化前台
- 部署构建流程

换句话说，`VIRTURA-Collective` 现在更像一个已经整理到位的“团队公开内容仓”，而不是一个已经成型的“团队官网仓”。

---

## 2. 当前状态一句话判断

`VIRTURA-Collective` 已经完成了“团队主入口”的内容收束，但还没有进入“网页前台产品化”的阶段。

如果用更直白的话说：

- 团队是谁，已经能读明白
- 团队在做什么，已经能看出主线
- 哪些作品值得先看，已经能进入
- 活动节奏和协作者网络，已经初步成形
- 但它还主要是 GitHub Markdown 入口，不是一个真正强有力的公共首页

---

## 3. 当前成熟度评估

## A. 已经成熟的部分

### 1. 仓库角色已经相对稳定

当前 `portfolio / VIRTURA-Collective / VIRTURA-SpacePort / VIRTURA-Newsroom / SceneForge` 的角色分工已经基本站住：

- `portfolio`：个人入口
- `VIRTURA-Collective`：团队主入口
- `VIRTURA-SpacePort`：公共前台 + 知识网络宿主 + 深档案源
- `VIRTURA-Newsroom`：发布出口
- `SceneForge`：工具与数字舞台实验仓

这是整个系统目前最有价值的成果之一。

### 2. 团队公开叙事已经不再漂浮

`About / Works / Activities / Research / Collaboration / Members / Artists / Performances` 这些一级入口已经不再是空骨架，而是可读、可判断、可继续跳转的内容层。

### 3. 作品入口已经有代表样板

`Drop Flow`、`TIMER`、`Observation and Symbiosis` 这三条线足以支撑“第一次来的人先理解团队能力”的最小样板。

### 4. 活动线已经具备节奏感

`Activities` 不只是活动表，而是已经开始承担：

- 公共节奏展示
- 系列说明
- 报名入口
- GitHub 档案回收入口

这意味着团队不是静态介绍，而是能被看到仍在发生。

## B. 还不成熟的部分

### 1. 还没有真正的首页产品层

现在的首页本质上还是 README 导航，不是网站首页。

缺的不是“内容”，而是：

- 视觉层级
- 首屏重点
- 按钮系统
- 卡片系统
- 组件化 CTA
- 针对不同访客的动线分发

### 2. 元数据还没有完全统一

虽然 `works/*/manifest.json` 已经存在，但整个仓库层面仍然有一些不统一：

- `status` 的写法同时出现 `ongoing`、`ongoing index`、`ongoing_index`
- 有些页面强调 `current source`
- 有些页面只在正文里提到迁移状态
- 活动、作品、人物、演出条目的字段还没有完全对齐

### 3. 仍然偏“文本结构正确”，还不够“用户体验强”

目前访问体验更像：

- 读文档
- 沿链接跳仓

而不是：

- 被首页抓住
- 很自然地进入一个作品或活动
- 继续被引到下一步动作

### 4. 一部分文档仍保留明显占位痕迹

例如 `docs/venues/*` 仍然有：

- `待补充`
- `问题1`
- `问题2`

这说明内部结构探索已经开始，但不适合直接成为对外前台的一部分。

---

## 4. 目前最值得关注的问题汇总

下面按优先级汇总，而不是按文件列举。

## P0

### 1. 没有真正可部署的网页前台

这是当前最大问题。

不是因为内容不足，而是因为没有一个真正承接这些内容的前端壳：

- 没有首页视觉
- 没有导航组件
- 没有卡片化信息层
- 没有作品、活动、人物之间的统一 UI 关系
- 没有“第一次来该点哪里”的强引导

所以目前的 `Collective` 更像“站点资料源”，而不是“站点本身”。

### 2. 仓库维护环境存在 SMB 文件系统风险

本轮克隆过程中，远端对象拉取成功，但工作区签出阶段卡住，后续手动恢复时又出现 `fatal: Could not write new index file.`。

这更像是挂载在 `/Volumes/Sync` 的 SMB 文件系统对 Git 索引写入不够稳定，而不是仓库内容本身损坏。

如果后续要继续高频编辑、批量迁移或跑自动化，建议：

- 开发工作区尽量放本地 SSD
- 同步盘作为镜像或备份
- 不要把高频 Git 操作的主战场长期放在 SMB 挂载目录

## P1

### 3. 首页与一级页之间有重复叙事

当前 `README`、`about/README.md`、`works/README.md` 都在承担“第一次解释团队是谁、先看什么”的工作。

这在 Markdown 仓里是合理过渡，但在网页前台里会造成：

- 首屏话重复
- 用户还没行动就先读很多层说明
- 首页和二级页角色不够分明

### 4. 元数据与状态词不统一

这会直接影响未来网页生成：

- 状态 badge 无法统一渲染
- 过滤器与排序规则难以一致
- 活动、作品、研究、人物无法共享卡片模板

建议后续统一至少这几类字段：

- `title`
- `type`
- `status`
- `summary`
- `year_range` 或 `date`
- `current_source`
- `related_people`
- `featured`
- `public_links`

### 5. `Members` 与 `Artists` 有角色重叠

现在的区分逻辑在文本上已经解释得比较清楚，但从网页结构看，普通访客仍很可能把这两页理解成两个相似的人物页。

更适合的网页策略是：

- 顶部导航只保留一个 `People` 或 `Artists`
- 在人物页内部再区分 `core collaboration`、`project-based`、`research/documentation`
- `Members` 变成一段组织关系说明，而不是单独和 `Artists` 平行竞争注意力

### 6. 一些待办文档已经落后于现状

例如旧的 `Next-Wave Todo` 仍把部分已完成事项当作待办。

这不是大 bug，但会影响后续大模型判断现状时的准确性。

## P2

### 7. 研究层目前是“有入口，没形成首屏吸引力”

`Research` 作为索引是成立的，但还不够像一个会让外部人点进去的公共页面。

问题不在研究不重要，而在缺少：

- 每条研究线的一句话价值
- 一条推荐阅读顺序
- 一两个最代表性的进入按钮

### 8. 演出层与活动层还没有彻底分家

现在 `Performances` 和 `Activities` 的边界已经写出来了，但前台展示上还不够一眼看懂：

- `Performances` 应强调作品如何进入现实场域
- `Activities` 应强调团队公共节奏、报名、参与和回放

网页落地时必须把这两者做成不同的展示语言。

---

## 5. `index` 应该怎么做

这里说的 `index` 不是单纯的目录页，而是“团队公共首页”。

它应该同时回答 4 个问题：

1. 你们是谁
2. 现在最值得看什么
3. 我下一步该点哪里
4. 这是一个还在发生的网络，而不是一堆静态文档

## 首页推荐结构

### 1. Hero / 首屏

建议首屏只放 4 件事：

- 团队名 `VIRTURA`
- 一句清晰定义
- 一句当前状态
- 两到三个强按钮

建议按钮：

- `看代表作品`
- `看近期活动`
- `发起合作`

辅助按钮：

- `进入 SpacePort 深档案`
- `订阅活动日历`

### 2. Current Pulse / 当前脉冲

这一屏非常重要，用来说明“这个 collective 现在是活的”。

建议展示：

- 下一场公开活动
- 最近更新的作品线
- 最近一个开放入口
- 一条简短更新日志

这一块比大段自我介绍更有说服力。

### 3. Featured Works / 代表作品

建议只放 3 张大卡：

- `Drop Flow`
- `TIMER`
- `Observation and Symbiosis`

每张卡只保留：

- 标题
- 一句话定义
- 状态
- 时间范围
- 一个主按钮

按钮建议：

- `进入系列`
- `看版本`
- `看公开资料`

### 4. Activities Timeline / 活动时间轴

建议首页只放最近 4 到 6 条，不要把所有活动一次压上去。

每条活动卡片建议有：

- 日期
- 系列名
- 一句话说明
- 当前动作按钮

按钮逻辑：

- 未开始：`报名`
- 已结束但有档案：`看档案`
- 已开放观看：`进入观看室`

### 5. People / 协作者网络

首页不要直接做长名单。

更适合的做法是：

- 一段简短说明：这是一个去中心化协作网络
- 4 到 6 个代表人物卡
- 一个总按钮：`认识协作者`

### 6. Research Directions / 研究方向

不要把研究页做成抽象理论入口，而要做成“作品背后的方法线索”。

建议只展示 4 条主线：

- Digital Library / Digital Stage
- Spatial Creative Framework
- Intellectual Equipment
- Digital Emotion Container

每条只放：

- 标题
- 一句话说明
- `继续阅读` 按钮

### 7. Collaboration / 合作入口

这一屏的作用不是讲原则，而是降低行动门槛。

建议做成 3 张卡：

- `我有项目，想合作`
- `我想参与研究或整理`
- `我想先从活动进入`

每张卡都给一个明确按钮。

### 8. Ecosystem Map / 仓库生态地图

这一块是 VIRTURA 很有辨识度的地方，应该保留，但不要太早出现。

建议放在首页靠后位置，用一张轻量结构图说明：

- `portfolio`
- `VIRTURA-Collective`
- `VIRTURA-SpacePort`
- `VIRTURA-Newsroom`
- `SceneForge`

按钮建议：

- `看团队主入口`
- `看知识网络`
- `看发布`
- `看工具实验`

---

## 6. 页面体系建议

如果真的开始做网页，建议采用下面这套页面体系，而不是把现在每个 Markdown 目录直接等价变成一级导航。

## 一级导航建议

- `Home`
- `Works`
- `Activities`
- `People`
- `Research`
- `Collaboration`

不要优先放成一级导航的：

- `Members`
- `Performances`
- `Docs`

处理建议：

- `Members` 并入 `People` 或 `Collaboration`
- `Performances` 作为 `Works` 的一个筛选视图或二级页
- `Docs` 保持文档层，不进入普通访客主导航

## 页面树建议

### `/`

团队公共首页，负责抓人、分流、建立信任。

### `/works`

作品总入口，支持按：

- 作品类型
- 状态
- 时间
- 是否 featured

进行筛选。

### `/works/:slug`

单个作品系列页。

必须固定显示：

- 一句话定义
- 状态
- 时间范围
- 关键版本
- 相关活动
- 协作者
- 公开资料
- `current source`

### `/activities`

活动总入口，支持：

- upcoming / past
- 按系列筛选
- 按是否有回放或档案筛选

### `/activities/:slug`

单场活动页。

建议固定字段：

- what
- when
- where
- series
- who it is for
- signup / archive / replay

### `/people`

协作者与网络页。

支持：

- 按角色筛选
- 按作品线回看
- 按参与类型筛选

### `/research`

研究方向总览。

强调：

- 为什么这条研究线存在
- 它和哪些作品、活动、工具相连

### `/collaboration`

合作与参与入口。

重点是动作，不是大段原则说明。

建议至少有：

- 发起项目合作
- 参与研究/文档
- 先从活动进入

### `/ecosystem`

如果想单独展开仓库生态，可以额外做这一页。

否则就只作为首页靠后的一个区块。

---

## 7. 首页应该显示什么信息

建议首页信息优先级如下：

1. 团队定义
2. 当前最值得看的 3 个作品
3. 当前和接下来的 3 到 5 个活动
4. 进入协作的 3 条路径
5. 研究方向的 4 条主线
6. 仓库生态地图

不建议首页第一屏就塞太多的内容：

- 长篇宣言
- 全部成员名单
- 所有历史活动
- 全量仓库说明
- 太深的理论正文

首页必须做的事是“分流”，不是“装完整”。

---

## 8. 应该有哪些按钮

## 首页主按钮

- `看代表作品`
- `看近期活动`
- `发起合作`

## 首页辅助按钮

- `进入观看室`
- `认识协作者`
- `看研究方向`
- `进入 SpacePort`
- `订阅活动日历`

## 作品页按钮

- `看版本`
- `看公开资料`
- `看相关活动`
- `看协作者`
- `查看源档案`

## 活动页按钮

- `报名`
- `看档案`
- `看回放`
- `看相关作品`

## 人物页按钮

- `看参与项目`
- `看相关活动`
- `返回协作者网络`

## 合作页按钮

- `发起项目合作`
- `参与研究整理`
- `先参加一次活动`

---

## 9. 出色设计可以体现在哪里

VIRTURA 的前台不应该做成普通机构官网。

真正出色的地方，应该体现在“这是一个活的空间网络”这件事上。

## 设计方向建议

### 1. 把首页做成“公共前台”，不是企业落地页

关键词建议：

- spatial
- editorial
- archive-aware
- stage-like
- living network

### 2. 用“时间 + 场景 +关系”组织视觉

不要只是从上到下堆卡片。

可以考虑：

- 一条流动时间轴
- 一个轻量节点地图
- 当前活动与作品之间的连线
- 滚动时逐步进入不同层级

### 3. 强调“观看入口”而不是“介绍入口”

很多团队首页停留在“自我介绍”，但 VIRTURA 更适合优先给人一个可以进入的东西：

- 作品
- 观看室
- 活动
- 版本
- 公开资料

### 4. 视觉上避免科技公司套板

更适合的方向：

- 深色矿物底或灰白纸面底
- 局部高亮用冷青、琥珀、雾蓝或数字墨色
- 中文标题可偏展览感或编辑感
- 英文副标题保持清晰和轻度系统感

### 5. 让“状态”成为视觉语言的一部分

例如：

- `ongoing`
- `upcoming`
- `public`
- `archive`
- `source in SpacePort`

这些不只是 metadata，也可以成为页面的 badge 和内容节奏。

---

## 10. 功能优先级重排

这里按“先把前台立住”而不是“先把所有内容补齐”来排序。

| 优先级 | 事项 | 为什么现在做 |
|---|---|---|
| P0 | 搭建真实首页与一级导航 | 没有前台壳，内容再多也只是 Markdown 集合 |
| P0 | 统一内容模型与状态字段 | 不统一就无法稳定生成网页卡片与筛选 |
| P1 | 做 `Works / Activities / People / Research / Collaboration` 五大页面 | 先把主骨架网站化 |
| P1 | 给首页加入 `Current Pulse` 和近期活动区 | 让 collective 看起来是活的 |
| P1 | 把 `Members` 角色说明并入 `People` 或 `Collaboration` | 降低重复导航 |
| P1 | 给每条作品线补统一摘要、封面图、状态、外链 | 为卡片化展示准备素材 |
| P2 | 做活动筛选、作品筛选、人物关系回看 | 提升信息可用性 |
| P2 | 做 `ecosystem map` 与仓库关系页 | 强化 VIRTURA 的系统辨识度 |
| P3 | 继续大规模迁移深层知识网络和历史档案 | 这一步晚一点反而更安全 |

---

## 11. 目前处在什么进化阶段

如果把这套系统粗略分成 5 个阶段：

### Stage 1

内容分散，角色混叠，外部很难理解团队本体。

### Stage 2

团队入口建立，仓库角色分离，主线开始清晰。

### Stage 3

首页产品化，一级页面网站化，访客可以不靠读 README 也能顺畅进入。

### Stage 4

作品、活动、人物、研究形成统一内容模型，可以持续发布和扩展。

### Stage 5

数字舞台、知识网络、观看室、活动节奏、仓库生态形成真正联动的公共系统。

## 当前判断

`VIRTURA-Collective` 现在大约处在：

**Stage 2.4 到 Stage 2.8 之间**

也就是：

- “内容主楼”已经立住
- “网页前台”还没真正开工

最关键的跨越不是继续加很多文档，而是进入 Stage 3。

---

## 12. 未来更新表建议

## 0 到 2 周

目标：把“内容仓”变成“网站骨架”

- 选定前端方案
- 搭建真实首页
- 落地一级导航
- 统一作品、活动、人物、研究的最小字段
- 先做 3 个 featured work 卡片
- 先做 4 个 upcoming / recent activity 卡片

## 2 到 6 周

目标：让网站真正可用

- 完成 `Works / Activities / People / Research / Collaboration`
- 做状态 badge 与筛选器
- 接入 `current source`
- 明确 `SpacePort` 深档案跳转
- 补首页的 `Current Pulse`
- 为每条作品线准备封面图与一句话摘要

## 6 到 12 周

目标：让它从“官网”变成“可持续更新系统”

- 打通作品与活动互链
- 补活动档案回收机制
- 补人物参与项目回看
- 做 `Performances` 的事件视图
- 做 `ecosystem map`
- 做最小多语言策略

## 3 到 6 个月

目标：进入真正的 VIRTURA 前台形态

- 接入观看室 / Viewing Room
- 接入 Scene Viewer 或 Digital Stage Lite 入口
- 做研究方向的更深层展示
- 逐步把活动、观看、研究、工具、深档案串成统一体验

---

## 13. 一份更适合交给 GPT Pro 的判断

如果把这份报告浓缩成一句指令，大概是：

> 请不要把 `VIRTURA-Collective` 当成一个还缺一点文案的官网，而要把它当成一个已经完成内容收束、但尚未完成前台产品化的团队主入口仓。请重点解决首页、页面体系、内容模型统一、动作按钮、状态系统和仓库生态分流，而不是继续先扩张 Markdown 数量。

---

## 14. 建议继续交给 GPT Pro 的 6 个长算任务

### 1. 产出完整网站信息架构

要求它输出：

- URL map
- 一级导航
- 二级页面结构
- 每个页面的目标用户
- 每个页面的 CTA

### 2. 产出统一内容模型

要求它输出：

- work schema
- activity schema
- person schema
- research schema
- collaboration schema

并说明哪些字段来自现有 Markdown，哪些字段必须补齐。

### 3. 产出首页文案与模块脚本

要求它输出：

- hero 文案 3 版
- featured works 模块文案
- current pulse 模块文案
- collaboration CTA 文案

### 4. 产出视觉设计方向板

要求它输出：

- 2 到 3 种视觉方向
- 色彩建议
- 字体建议
- 动效建议
- 不该做成什么样

### 5. 产出前端落地方案

要求它比较：

- Astro
- Next.js
- Vite + static

然后给出最适合当前仓库结构的方案。

### 6. 产出内容迁移优先序

要求它明确：

- 哪些继续留在 `SpacePort`
- 哪些迁入 `Collective`
- 哪些只保留 `source link`
- 哪些不要进入首页

---

## 15. 最终结论

`VIRTURA-Collective` 现在不是“太乱”，而是“已经把主楼立起来，但还没装修成真正的前台”。

所以接下来最聪明的动作不是继续猛补文档，而是：

1. 把首页做出来
2. 把内容模型统一
3. 把按钮和路径变清楚
4. 把 `SpacePort` 作为深档案与知识网络入口保护好
5. 再决定哪些内容值得继续迁移

只要这一步跨过去，`Collective` 就会从“一个很清楚的 GitHub 入口”进化成“一个真正能抓住人、分流人、持续更新的团队前台”。
