# Midterm Audit 2026-03-16

这份文档用于检查 `VIRTURA-Collective` 建立后的中期状态，重点确认：

1. 哪些内容已经成功迁入
2. 哪些内容绝不能在这个阶段误迁或误删
3. 哪些地方最容易造成“信息流失的错觉”
4. 下一轮修正应该怎么做

## Executive Summary

当前这次改造是有效的，但仍处于“入口收束期”，还没有进入“全量迁移期”。

最关键的判断是：

- `VIRTURA-Collective` 已经成功承担了团队主入口角色
- `VIRTURA-SpacePort` 仍然必须继续承担知识网络主宿主、详细旧档案宿主和公共导览前台
- `VIRTURA-Newsroom` 已开始收束为发布出口
- 目前最大的风险不是内容真的丢了，而是**层级角色被误读**

## What Has Successfully Moved

截至本次中期检查，`VIRTURA-Collective` 已经接住了这些内容：

- 团队主入口
- 团队定义与价值观
- 合作原则与参与方式
- 成员结构的公开版入口
- `Drop Flow` 样板系列
- `TIMER` 样板系列
- 项目档案模板
- 状态板与待办板

这说明“团队本体”已经不再寄居在 `SpacePort` 里。

## What Must Still Stay In SpacePort

这部分非常关键，属于当前阶段不能误迁、也不应误写成“已迁完成”的内容。

### 1. Knowledge Network

`knowledge-network/` 当前仍然主要宿主在 `VIRTURA-SpacePort`。

它不只是几篇理论文章，而是：

- 知识网络总说明
- 10 个知识领域
- 4 阶段学习结构
- `our-theory` 深层内容
- 多条学习路径和技能索引

这部分现在应该被视为：

**SpacePort 的核心功能之一，而不是已被 Collective 吞并的内容。**

### 2. Detailed Legacy Work Files

`Drop Flow`、`TIMER` 目前在 `VIRTURA-Collective` 中已有系列索引，但大量详细旧版本文档仍主要保存在 `VIRTURA-SpacePort`。

这包括：

- 版本细节正文
- 分享讲稿
- 完整归档文档
- 已核对公开资料索引
- 旧式项目脉络页

当前正确关系应该是：

- `Collective`：团队视角下的系列索引和长期档案骨架
- `SpacePort`：旧版细节文档与公共档案源宿主

### 3. Public Knowledge / Theory Depth

`Research` 现在已经在 `Collective` 中有方向索引，但理论全文和知识网络深度仍应主要留在 `SpacePort`。

也就是说：

- `Collective/research` 负责“研究总览”
- `SpacePort/knowledge-network` 负责“知识网络本体”

### 4. Stations And World-Building Residue

`stations/` 和部分世界观叙事页目前仍主要留在 `SpacePort`。

这部分现在不应该优先迁到 `Collective`，否则会重新把团队主仓拉回“场所/设定仓”。

## Current Risk: Information Loss Illusion

当前最大的风险不是文件没了，而是外部人可能产生这 4 个误判：

1. 误以为 `Collective` 已经完整接管知识网络
2. 误以为 `SpacePort` 只剩下一个空壳前台
3. 误以为 `Collective/research` 已经等价于 `knowledge-network`
4. 误以为 `Drop Flow` 和 `TIMER` 的全部历史已经迁完

这 4 个误判如果不纠正，后续就会出现“看上去更清楚了，实际上更难找详细内容”的问题。

## Corrected Role Map

中期修正后的正确理解应该是：

| Repo / Layer | Current True Role |
|---|---|
| `portfolio` | 个人入口 |
| `VIRTURA-Collective` | 团队主入口、团队视角索引、长期档案骨架 |
| `VIRTURA-SpacePort` | 公共导览前台 + 知识网络主宿主 + 旧档案源宿主 |
| `VIRTURA-Newsroom` | 发布出口 |
| `SceneForge` | 工坊与 Digital Stage 实验仓 |

## Findings By Severity

### P1: Knowledge Network Boundary Is Not Explicit Enough

虽然 `research/README.md` 已经有方向索引，但仍需要更明确地写出：

`knowledge-network` 目前仍主要保存在 `VIRTURA-SpacePort`。

否则会造成迁移完成的错觉。

### P1: SpacePort Function Needs Protection

`SpacePort` 当前不是“被降级到可忽略”，而是被**重新定位**。

它仍然承担：

- 知识网络
- 理论深层页
- 旧版作品详细档案
- 公共导览

因此后续整理时不能把它误清空。

### P2: Series Indexes Need Explicit Source Notes

虽然 `Drop Flow` 和 `TIMER` 已经加了源链接，但后续系列迁移也必须统一加“current source”说明。

否则用户会以为 `Collective` 中的版本页就是全部正文。

### P2: Performances Still Needs Stronger Event Metadata

`Performances` 现在已经从空骨架变成入口，但还缺：

- venue
- date
- format

这会影响它从“列表页”成长为“事件索引页”。

### P3: Members Page Is Public-Facing But Still Lightweight

现在的 `members/README.md` 已经可用，但仍更像公开结构页，而不是团队协作关系图。

后续要继续补：

- 角色关系
- 长期协作 vs 项目协作
- 版本内的参与关系

## Corrective Todo

### Immediate

- 在 `research/README.md` 明确写出：知识网络当前主宿主仍是 `VIRTURA-SpacePort`
- 在 `status-dashboard` 和 `todo` 中加入“保护 SpacePort 的知识网络功能边界”
- 为后续所有新迁项目统一补 `current source` 说明

### Near-Term

- 让 `Performances` 增加 `venue / date / format`
- 迁 `Observation and Symbiosis`，但保持“系列索引先于全文迁移”
- 给 `members` 增加“长期协作 / 项目制协作”区分

### Do Not Do Yet

- 不要把 `knowledge-network` 全部搬进 `Collective`
- 不要把 `stations/` 直接迁进团队主仓
- 不要把 `SpacePort` 清成只剩一页 README

## Midterm Conclusion

当前改造方向是对的。

但从中期状态看，真正的关键不是“继续迁更多”，而是：

**在继续迁之前，把 `Collective` 与 `SpacePort` 的边界写得更硬、更清楚。**

只有这样，后面的迁移才不会把“入口收束”做成“细节丢失”。
