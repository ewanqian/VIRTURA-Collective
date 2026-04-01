# Storage Strategy 2026-03-16

这份文档用于明确：哪些内容适合放在主仓，哪些内容不应该直接塞进 Git 仓库本体。

## Principle

主仓优先放：

- 索引
- 小样
- 说明
- 元数据
- 公开可引用资料

主仓不优先放：

- 未筛选的大体积原始图片
- 工程母文件
- 长视频母版
- 动捕原始数据
- 重复缓存

## Recommended Layers

### Layer 1: Main Repository

适合放：

- `README.md`
- `versions.md`
- `public-materials.md`
- `manifest.json`
- 小体积预览图

### Layer 2: Git LFS

适合放：

- 中等体积可版本化文件
- 有明确协作需求的媒体文件

### Layer 3: External Storage Or Archive Repo

适合放：

- 原始视频母版
- 大体积工程包
- 动捕原始数据
- 大量未筛选素材

## Rule For Future Projects

每个系列先建“索引壳”，再决定大文件去哪里。

不要反过来先把大文件堆进主仓，再想结构。
