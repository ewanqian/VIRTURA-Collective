# First-Wave Migration Map

日期：2026-03-16

这份文档记录 `VIRTURA-Collective` 第一轮内容迁移的建议路径。

目标不是一次搬空旧仓，而是先把最关键的团队本体内容和最值得看的入口稳定下来。

## Migration Rule

第一轮只迁 4 类内容：

1. 团队介绍
2. 作品一级入口
3. 演出一级入口
4. 研究方向概览

这轮不做的事情：

- 不一次性迁所有历史项目
- 不先搬大体积资产
- 不改所有深层子页
- 不把 `SpacePort` 清空

## First-Wave Targets

| Source | Current Role | Target in `VIRTURA-Collective` | Action | Status |
|---|---|---|---|---|
| `VIRTURA-SpacePort/organization/README.md` | 团队介绍 | `about/README.md` | 合并核心定义与对外说明 | pending |
| `VIRTURA-Team` 中的新人欢迎与协作说明 | 旧团队仓 | `about/README.md` + `collaboration/README.md` | 提炼后迁入 | pending |
| `VIRTURA-SpacePort/organization/works/README.md` | 作品总入口 | `works/README.md` | 建立首层作品索引 | pending |
| `VIRTURA-SpacePort/organization/works/drop-flow-series` | 重点系列 | `works/README.md` + future `works/drop-flow/` | 先建入口，后分批迁条目 | pending |
| `VIRTURA-SpacePort/organization/works/timer-series` | 重点系列 | `works/README.md` + future `works/timer/` | 先建入口，后分批迁条目 | pending |
| `portfolio/projects/*` 中与团队合作强相关的项目 | 个人项目条目 | `works/README.md` 或 `performances/README.md` | 做团队视角索引，不重复全文 | pending |
| `VIRTURA-SpacePort/knowledge-network/our-theory` | 理论总入口 | `research/README.md` | 只保留核心方向索引 | pending |
| `VIRTURA-Newsroom` 中偏团队本体的说明页 | 发布仓混合内容 | `about/README.md` 或 `docs/` | 迁出发布仓 | pending |

## What Stays in Place for Now

以下内容第一轮不迁出，只建立引用关系：

- `VIRTURA-SpacePort` 的 `knowledge-network` 深层页面
- `portfolio` 的个人项目全文
- `VIRTURA-Newsroom` 的研究文章正文
- 各仓中的图片、视频、工程文件与大资产

## Recommended First Batch

如果只做最小可行迁移，建议先处理这 5 项：

1. 团队一句话定义
2. 团队合作说明
3. `Drop Flow` 系列入口
4. `Timer` 系列入口
5. 研究方向总览

## Why This Order

这个顺序的好处是：

- 外部马上能理解团队本体
- 最有辨识度的作品系列先露出来
- `SpacePort` 不会因为迁移而突然断裂
- 后续深层条目可以慢慢归档，不必一次做完
