# Project Archive Template

这是一份轻量项目档案模板，供 `VIRTURA-Collective` 后续迁移更多系列和项目时复用。

## Minimal Structure

每个项目或系列至少建议有这几层：

```text
project-or-series/
  README.md
  versions.md
  public-materials.md
```

如果项目更复杂，再逐步增加：

```text
project-or-series/
  README.md
  versions.md
  public-materials.md
  assets.md
  collaborators.md
  manifest.json
```

## README.md Should Answer

- 它是什么
- 为什么重要
- 现在有几个版本或阶段
- 当前以哪个源文件为准
- 下一步要补什么

## versions.md Should Answer

- 这个项目经历了哪些版本
- 每个版本分别解决了什么问题
- 推荐从哪几个版本开始看

## public-materials.md Should Answer

- 目前有哪些公开链接可引用
- 哪些是官方页面
- 哪些是视频或媒体报道
- 还有哪些公开资料待补

## Minimal Metadata Fields

如果以后加 `manifest.json`，建议至少有：

- title
- type
- status
- year
- contributors
- related_repos
- current_source
- public_links
- notes

## Working Rule

先建立轻量索引，再慢慢补细节，不要一开始就追求全量归档。
