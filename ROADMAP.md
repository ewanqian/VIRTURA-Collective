# CORE DIRECTIONS

> 缓慢，意味着平滑；平滑，意味着快。
> Slow means smooth. Smooth means fast.

这个文档用于整理当前 VIRTURA / Ewan Qian 相关工作的核心方向。
目标不是一次解决全部问题，而是把已经出现的方向归档、分层、缓慢推进，直到形成清晰结果。

---

## 01. Identity / 对外身份与口径

### 目标
明确：
- 我是谁
- 团队是谁
- 我们做什么
- 别人为什么要找我们

### 当前重点
- 个人简介底稿（短版 / 中版 / 长版）
- 团队简介底稿（短版 / 中版 / 长版）
- collective / spaceport / research network 的统一表达
- 面向客户与面向同行的不同说法

### 待解决问题
- 个人定位主轴：艺术家 / 空间影像创作者 / 系统作者 / collective 发起人
- 团队页是否分商务版 / 研究版
- slogan 最终定稿
- collective 与 spaceport 的口径切换规则

### 对应文档
- `identity/personal_bio.md`
- `identity/team_intro.md`
- `identity/messaging_versions.md`

---

## 02. Portfolio / 个人与团队作品组织

### 目标
让别人快速看懂：
- 做过什么
- 每类项目分别代表什么能力
- 哪些是核心项目

### 当前重点
- 个人作品集第二版
- 团队作品集第二版
- 一项目一大图的结构
- 每个项目固定字段模板

### 项目固定字段
- 项目名称
- 一句话定义
- 角色
- 交付形式
- 场景 / 公开呈现
- 资产入口
- 当前状态

### 待解决问题
- 按时间排还是按能力排
- 每个项目放几张图
- 哪些项目算核心项目
- 团队项目与个人项目如何区分

### 对应文档
- `portfolio/core_projects_index.md`
- `portfolio/project_entry_template.md`
- `portfolio/team_portfolio_structure.md`

---

## 03. Digital Library / GitHub 资料库系统

### 目标
把作品、图片、文档、工程、研究记录组织成一个长期可增长的系统。

### 当前重点
- GitHub 仓库结构
- markdown 条目模板
- 图片 / 视频命名规范
- 项目条目与研究记录条目分离

### 待解决问题
- 仓库总目录规范
- 协作者如何参与
- agent / AI 在哪个环节介入
- 一套内容如何同时服务归档与展示

### 对应文档
- `library/repository_structure.md`
- `library/project_entry_template.md`
- `library/research_note_template.md`
- `library/file_naming_rules.md`

---

## 04. Venue System / 场地与空间系统

### 目标
把不同场地的模型、分辨率、媒体版本、工程关系整理成可复用条目。

### 当前重点
- UFO 条目
- 深圳专场条目
- 场地信息模板
- 分辨率与输出关系表

### 每个场地条目建议字段
- 场地名称
- 一句话定义
- 城市 / 项目背景
- 尺寸
- 分辨率
- 屏幕 / 投影面数量
- 模型入口
- 媒体版本
- 工程映射
- 当前状态
- 待解决问题

### 待解决问题
- 是否统一为 project package
- 先做哪两个样板场地
- 不同引擎与 Arena 的对应关系如何记录
- 是否对外展示部分场地条目

### 对应文档
- `venues/venue_entry_template.md`
- `venues/ufo_terminal.md`
- `venues/shenzhen_special.md`

---

## 05. DigitalStageViewer / 数字舞台查看器

### 目标
做一个轻量中间层，用于查看场地、媒体、机位、版本和说明关系。

### 定位
DigitalLibrary 管"记住什么"。
DigitalStageViewer 管"怎么进入它"。

### 当前重点
- v0.1 信息架构
- 项目包结构
- Unity 主线原型
- 展示模式 / 调试模式分离

### 明确不做
- 不做 Arena 替代
- 不做完整播控系统
- 不做完整云平台
- 不做多人在线同步
- 不做复杂商业级 UI

### 待解决问题
- Unity 主线原型何时开始
- openFrameworks 副线研究怎么记录
- 网页 Lite 版的边界
- Arena / OBS / VideoPlayer 的映射规则

### 对应文档
- `digital_stage_viewer/DigitalStageViewer_v0.1_Spec.md`
- `digital_stage_viewer/project_package_structure.md`
- `digital_stage_viewer/openframeworks_notes.md`
- `digital_stage_viewer/web_lite_notes.md`

---

## 06. Demo / 对外样板与最小展示成果

### 目标
形成可以快速证明能力的最小样板。

### 当前重点
- AVP 双目 demo
- 沉浸式空间假想案例
- 团队展示样板间视频
- 飞机稿 / 场地测试素材

### 待解决问题
- 先做哪个 demo
- demo 面向谁
- demo 是否并入作品集
- demo 与商业提案如何连接

### 对应文档
- `demo/avp_stereo_demo.md`
- `demo/spatial_showcase_demo.md`
- `demo/demo_backlog.md`

---

## 07. Workflow / 生产流程与版本管理

### 目标
把当前创作链路收成可重复的方法，而不是临时操作。

### 当前重点
- Blender → Unity / Unreal → Arena 的链路
- 版本命名规则
- 媒体导出规则
- 文档归档流程

### 待解决问题
- 演出项目与展览项目流程是否分开
- 不同引擎如何统一命名
- 版本号规则
- 调试版 / 展示版如何区分

### 对应文档
- `workflow/pipeline_overview.md`
- `workflow/versioning_rules.md`
- `workflow/export_rules.md`

---

## 08. Collaboration / 协作机制

### 目标
让更多人能加入，而不是一直停留在单机状态。

### 当前重点
- GitHub 新手协作说明
- 最低门槛贡献方式
- 文档 / 图片 / 英文 / 资料补充的分工方式

### 待解决问题
- 新协作者如何加入
- issue / PR 如何最简化
- collective 如何不只是口号
- 人与 agent 的协作边界

### 对应文档
- `collaboration/how_to_contribute.md`
- `collaboration/roles_and_tasks.md`
- `collaboration/agent_collaboration_notes.md`

---

## 09. Business / 商业转型与样板路线

### 目标
从自由接活走向主动组织合作与样板。

### 当前重点
- 面向文旅 / 品牌 / 展陈 / 演出的可能切口
- 小团队适合承接的项目体量
- 自建样板空间 / 飞机稿的策略

### 待解决问题
- 优先面向哪类客户
- 先做创意执行，还是先做系统样板
- 哪些资源值得优先利用
- 哪些合作口径最适合现阶段

### 对应文档
- `business/commercial_paths.md`
- `business/sample_case_strategy.md`

---

## 10. Long-term Research / 长线研究

### 目标
保留那些暂时没有结论，但值得长期追踪的问题。

### 当前重点
- 去中心化团队如何真实运作
- 人与 AI 的平等协作如何落地
- 作品如何转成组织能力
- 工具如何不反过来吞掉创作

### 待解决问题
- 哪些问题值得长期保留
- 哪些问题只是短期干扰
- 研究与项目推进如何互相支持

### 对应文档
- `research/long_term_questions.md`
- `research/unresolved_topics.md`

---

# 发展路线图

## 近期重点
- 完善个人与团队身份介绍
- 建立核心项目档案与模板体系
- 启动 DigitalStageViewer 研究

## 中期规划
- 开发最小可用展示样板
- 建立 GitHub 协作机制
- 深化作品集结构

## 长期愿景
- 探索网页轻量版
- 研究开源技术路线
- 建立可持续的协作生态

---

# 工作原则

1. 不一次解决全部问题
2. 每次只推进一个方向的一小步
3. 先定结构，再做扩展
4. 先做可进入的入口，再做复杂系统
5. 每一个新方向都必须回答：
   - 它服务什么
   - 它不服务什么
   - 它会不会分散精力
