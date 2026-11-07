# VIRTURA｜团队作品、Credit 与内容出版系统（实施提案）

状态：实施提案，须经正式官网仓库维护者合并。适用对象：`VIRTURA-Cellective/VIRTURA-Website`、`ewanqian/VIRTURA-Collective`、`ewanqian/VIRTURA-SpacePort`、`ewanqian/portfolio`。

## 0. 已核实的边界

- 正式官网源仓库：`VIRTURA-Cellective/VIRTURA-Website`，`CNAME=virtura.space`。当前连接对该仓库仅有 pull 权限，不能以它的名义直接提交 PR。
- 团队档案仓库：`ewanqian/VIRTURA-Collective`，`CNAME=collective.virtura.space`。其首页标有 `noindex,nofollow`，并链接正式官网；不应当被当作第二份正式首页。
- 个人网站：`ewanqian/portfolio`，已有 `projects/` 人工文档、`database/` 稳定对象、`content/` 已筛选的公开内容、前台生成层；可迁移**原则**，不可直接将个人的作者身份或项目权属迁入团队。
- 实验档案：`ewanqian/VIRTURA-SpacePort`，独立承担实验、方法、过程与长期资料。
- 正式网站 `data/projects.csv` 目前偏展示清单，混合项目/系列、缺版本级职责和证据结构；`work/ufo-circular-series.html` 将 TIMER/Drop Flow 置于同一系列入口，需要分出作品本体与展演版本。

## 1. 唯一主站，分布式内容仓库

**唯一对外门户**：`virtura.space`。首页只发布有图像、公开说明、合作署名与具体团队职责的精选案例，承接项目合作。Team 中人物姓名、头像链接到经核验的个人网站。

**集体内容层**：`VIRTURA-Collective` 保留艺术家/项目/版本/Credit、公开图像索引、展演时间线与可复用中英文摘要。暂不将它宣称为运行中的数据库或自动 CMS；保持文件式内容源，未来再经 CI 编译为官网可消费的 JSON。其旧 people 和 works 路径保留可访问，待正式网站替代页面完成后逐路由做 301，而非立即全站跳首页。

**研究层**：`VIRTURA-SpacePort` 保留过程素材、技术系统、工具、旧版与研究；工作成果可以被正式官网引用，官网不复制全部研究记录。

**个人层**：`portfolio` 仅以钱誉文的个人实践、真实分工与个人延伸研究为线索引用合作作品。个人展览/奖项与团队项目并非自动等价。

## 2. 可迁移的个人 Portfolio 工作流

1. Intake：新展演/图像/合作说明先进入项目目录，附日期、授权范围、文件指纹与公开来源；保留原图，不重新生成尺寸。
2. Normalize：固定 ID，把 Work / Edition / Event / Contributor / Credit / Asset / Evidence 分成关系对象。
3. Validate：审核正式项目名、演出日期、角色、组织/客户/场地方、是否授权公开、素材是否重复、证据是否一致。
4. Curate：筛选一张现场证据 Hero、3–6 张能证明实际规模和方法的图片，精简中英文本。
5. Publish：经过验证的 `public_ready` 数据才进入主站；新 PR 提供截图、实际链接、移动端/双语检查。
6. Maintain：一次事实修改只维护一个对象源；网站通过生成数据或明确同步 PR 更新，不允许不同仓库各自编写互相矛盾的履历。

## 3. Credit 结构（每个版本独立）

必须分别记录以下五层：

| 层 | 字段 | 原则 |
|---|---|---|
| Work（作品） | id、titleZh/En、type、summary、authorshipType | 系列、作品、研究、商业交付不可混用 |
| Edition（版本） | editionId、workId、year、venue、format、date | ROOM719 与杭州双年展属于不同版 |
| People（艺术家） | personId、publicName、profileUrl | 成员身份 ≠ 作品所有权 |
| Credit（贡献） | editionId、personId、roleZh/En、scope、confidence、evidenceId | 只有明确参与版本才记录，禁止全系列推导 |
| Organization（机构） | orgId、relationship：commissioner/producer/venue/support | 机构、主办、客户、空间与集体分开 |

**必须区分的职责类型**：Art Direction、Concept、Visual Design、Sound/Composition、Creative Coding、Realtime System、Interaction、Spatial Design、Motion Capture、Production、Technical Direction、On-site Operation。可以多人共担，禁止自动将 `参与` 转换成 `主创/导演/总制作`。

例如：
```json
{
  "workId": "drop-flow",
  "editionId": "drop-flow-room719-2025",
  "title": "滴流 / Drop Flow — ROOOOOOOM_719",
  "year": 2025,
  "contributors": [
    {"personId": "ma-xiaoyao", "role": "participating-artist"},
    {"personId": "qian-yuwen", "role": "participating-artist"},
    {"personId": "xu-hao", "role": "participating-artist"},
    {"personId": "xu-sihui", "role": "participating-artist"}
  ],
  "source": "shared-public-artist-archive",
  "creditVerification": "roles-pending-edition-level-confirmation",
  "publicationState": "verified-participant-names"
}
```
这是参与者示例，不可据此推断每个人具体负责视觉/音频的全部部分。

**现场文案模板**：
「《作品名》，版本 / 年份 / 地点。VIRTURA 实际承担：×××（已核对）。合作艺术家：×××。制作/主办/场地分别列出。相关研究链接单独列入。」

## 4. 图片、素材与署名

- 可复用的共同作品图以作品/展演版和版权许可为准；网页不需要额外写“素材来自某某网站”，但作品必要的摄影署名或合同要求仍需遵守。
- 文件名不应成为 Credit 来源；对照 PDF、活动资料、现场原件和共同仓库记录来确认作品归属。
- `assets/` 中为网页优化副本；原始图存长期资料库。保存像素尺寸、比例、图片指纹、版本、拍摄者/授权状态及对应作品。
- 严格排除艺术家个人独立商业案例和私人信息，除非取得明确授权并以个人作品形式展示。
- 页面 Hero 应优先展示现场空间与观众比例；系统截图用于解释实时方法。不要为统一布局强制改变画幅。

## 5. 正式发布门槛

- 每个详情页有：项目名、类型、年份、地点、简短理念、团队职责、人员/机构 Credit、有效媒体、相关链接。
- 两种语言内容完整；手机 375px 与桌面至少各测一次；图片比例正确，不能有 404、横向溢出或误导占位。
- PR 必须附：数据差异、影响的路线、图片清单、旧链接处理、至少一项实际浏览器截图/说明；失败则回退。
- 主页精选仅限证据充分且清晰说明团队贡献的 6–9 个案例；其余留档案层，不需要硬凑数量。

## 6. 渐进迁移顺序

P0：正式官网补许思慧人物卡片（肖像、xusihui.com）并保持 Murphy Nile → murphynile.com；修复错误人物/职位。维持已有设计骨架。

P0：《滴流》各展演版单独 Credit；《TIMER》原作与钱誉文后续空间研究分离；原系列页保留为“相关作品/技术脉络”。

P1：建立 `credits.json`、`works.json`、`editions.json` 与图片索引；以 CSV 作为暂存展示清单，不作为完整事实源。

P1：正式官网只保留 Work/Services/Studio/People/Contact 等公众栏目；Collective 作为可引用档案和内容端点，不重复开设第二套商业落地页。

P2：Newsroom 可作为出版/研究入口；SpacePort 只出现在深入阅读环节，避免主站导航过载。

## 7. 防止仓库繁殖

每个新仓库须有明确唯一 Owner、用途、数据主权、公开入口、生命周期与维护负责人。不符合者归档，不建新的“总系统”或第二个官网。

不要机械把 `portfolio` 的所有字段、研究项目、索引搬到团队层；优先先做好 2 件代表作和 2 个艺术家页，证明流程可用。
