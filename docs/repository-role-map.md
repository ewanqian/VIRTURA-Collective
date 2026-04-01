# Repository Role Map

日期：2026-03-16

这份文档把 VIRTURA 当前最重要的公开仓库，压缩成一张可以长期复用的命名与角色对照表。

## Top Brand

`VIRTURA`

说明：
- 这是总品牌名
- 不是单个仓库要独占的标题壳
- 其他仓库都从属于它

## Primary Entrances

### `portfolio`

角色：
- 个人入口

负责：
- 钱誉文是谁
- 个人代表项目
- 个人合作入口

不负责：
- 团队本体
- 团队总导航

### `VIRTURA-Collective`

角色：
- 团队主入口

负责：
- 团队是谁
- 谁参与
- 团队作品与演出入口
- 研究方向概览
- 合作入口

不负责：
- 抽象总控
- 工具主仓
- 所有文章发布

## Public Front Desk

### `VIRTURA-SpacePort`

角色：
- 公共导览前台
- 生态地图
- 新人入口

负责：
- 引导访客理解生态
- 提供仓库索引
- 作为 Digital Stage 的公共前台入口

不负责：
- 团队本体身份
- 团队主作品总楼

## Publication Layer

### `VIRTURA-Newsroom`

角色：
- 发布出口

负责：
- 文章
- 公告
- 项目复盘
- 媒体资料

不负责：
- 团队主入口
- 内部治理总仓

## Workshop Layer

### `SceneForge`

角色：
- 场景工坊
- Digital Stage 实验仓

负责：
- 造景逻辑
- 舞台结构实验
- 空间化呈现方法
- WIP 工具原型

不负责：
- 团队本体
- 生态总品牌

## Background Infrastructure

### `RepoForge`

角色：
- 自动化与治理工具壳

### `Forge / workforge`

角色：
- 私有后台与执行工作区

## Reading Order

如果一个新访客第一次进入 VIRTURA，推荐动线是：

1. 先看 `portfolio` 或 `VIRTURA-Collective`
2. 再看 `VIRTURA-SpacePort`
3. 需要文章时去 `VIRTURA-Newsroom`
4. 需要看工具与舞台实验时去 `SceneForge`

## Naming Rule Going Forward

未来新增仓库时，先问这 3 个问题：

1. 它是身份入口、前台、发布出口、工具工坊，还是后台？
2. 它是不是在抢已有仓库的角色？
3. 它是否真的需要一个新仓，而不是应该先进入现有结构？

只有这三个问题都清楚时，才值得继续开新仓。
