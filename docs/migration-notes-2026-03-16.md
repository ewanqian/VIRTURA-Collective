# Migration Notes 2026-03-16

日期：2026-03-16

这份文档记录 `VIRTURA-Collective` 启动时的迁移原则与第一轮处理范围。

## Purpose

迁移的目标不是“把所有东西搬过来”，而是优先把团队本体稳定下来。

因此第一轮只做 3 件事：

1. 先建立团队主入口
2. 先定义角色和互链
3. 先把最重要的内容纳入新结构

## First-Round Migration Targets

优先关注以下内容：

- 团队介绍
- 成员与参与方式
- 代表作品入口
- 研究方向概览
- 合作说明

## Likely Source Areas

这些内容后续主要从以下位置整理：

- `VIRTURA-SpacePort/organization`
- `VIRTURA-SpacePort/organization/works`
- `VIRTURA-Newsroom` 中与团队本体高度相关但不适合留在发布仓的页面
- 个人与项目仓中需要被团队主仓引用的代表项目

## Not Migrated Yet

当前明确不在第一轮迁移中的内容：

- 大体积视频与工程文件
- 细碎研究支线全文
- 所有历史项目的完整归档
- 私有后台治理内容
- 工具仓内部实现细节

## Handling Principles

对旧内容统一采用以下顺序：

1. 保留
2. 迁移
3. 降级
4. 归档
5. 删除

## Immediate Next Step

下一步优先动作：

1. 给 `portfolio` 增加稳定团队跳转
2. 给 `VIRTURA-SpacePort` 改写前台定位
3. 给 `VIRTURA-Newsroom` 改写发布定位
4. 选取 3 个代表作品作为团队主仓首批索引样板
