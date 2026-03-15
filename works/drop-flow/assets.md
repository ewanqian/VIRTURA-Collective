# Drop Flow Assets

这页说明 `Drop Flow` 系列后续应该如何整理图片、海报、截图、证书和视频封面。

## Asset Rule

最稳的做法不是把所有图片直接塞进仓库根目录，而是：

1. 先收集到临时区
2. 再按版本和类型整理
3. 文档只引用正式目录中的文件

## Suggested Structure

```text
drop-flow/
  README.md
  versions.md
  public-materials.md
  collaborators.md
  assets.md
  manifest.json
  assets/
    _inbox/
    drop-flow-1.0/
    drop-flow-ufo/
    drop-flow-hangzhou/
    drop-flow-luminous/
```

## Suggested Asset Types

- `stage/`: 现场图、舞台图
- `rehearsal/`: 排练图、工作照
- `social/`: 社交媒体截图、视频封面
- `docs/`: 海报、证书、活动页截图
- `render/`: 设计稿、渲染图

## Naming Rule

建议统一：

```text
YYYYMMDD_project_place_type_index.ext
```

例如：

```text
20251019_dropflow-hangzhou_stage_vr_01.jpg
20251108_dropflow-luminous_docs_poster_01.jpg
```

## Current Policy

在 `VIRTURA-Collective` 里，优先放：

- 索引
- 小样
- 说明
- 公开可引用资料

大体积原文件后续再决定是否走 LFS 或外部存储。

## Related Pages

- [Drop Flow Public Materials](./public-materials.md)
- [Project Archive Template](../../docs/project-archive-template.md)
