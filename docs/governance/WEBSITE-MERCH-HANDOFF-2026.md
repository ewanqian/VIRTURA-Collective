# 给正式网站维护者的实施清单｜VIRTURA Website / Merchandise

目标仓库：[VIRTURA-Cellective/VIRTURA-Website](https://github.com/VIRTURA-Cellective/VIRTURA-Website)。
现有连接只读，本文为**待执行 handoff**，不是已在正式站部署的改动。

## A. 当前核验事实

1. `VIRTURA-Website/CNAME` 指向 `virtura.space`。
2. `VIRTURA-Website/README.md` 将官网、Collective、SpacePort 分成业务前台 / 成员艺术档案 / 研究实验层。
3. `VIRTURA-Website/index.html` 包含现有 `#people` 和 Murphy Nile 人物信息与外链，但尚未找到 Sihui Xu / 许思慧；只需新增人物卡片，避免重做整页。
4. `data/projects.csv` 只有九行项目展示记录，且 TIMER / DROP FLOW 合并为单一案例；应建立版本化 Credit 数据而非在 CSV 里拼更多描述。
5. `brand-spec.md` 已给定黑灰白 / 大画幅 / 12-column asymmetry / 克制动效的风格；`work/` 已存在七个详情页。沿用设计系统，不另起 UI。
6. `ewanqian/VIRTURA-Collective/merch/` 目前是黑 T 恤 Logo 定制编辑器（22cm/5cm、正反两面、导出 PNG 与分享方案），**不是可收款、库存、发货或售后完备的商城**。禁止对外宣称“商城已上线”。

## B. 官网可直接实施的文件修改

- `index.html`：在 `#people .people` 的人物卡片中新增 **Sihui Xu / 许思慧**。照片用 Collective 已入库的方形肖像副本，切勿热链 PDF；人名/头像链接 `https://xusihui.com/`，按钮标签 `Website`。简介：上海媒体艺术家、创意技术工作者；实时视觉、互动装置、视听现场、游戏与 XR。与 VIRTURA 合作《Drop Flow》《TIMER》。归类 collaborative artist，不自动视为所有商业项目的团队交付。
- `index.html`：已有 Murphy Nile 的姓名链接 `https://www.murphynile.com`，统一成 `https://murphynile.com/` 并确保头像/姓名/外链键盘可用；保留其独立作者地位，不把所有个人项目放入 VIRTURA 作品案例。
- `work/ufo-circular-series.html`：保留系列关系，但明确两个作品、各版本的年份/演出/场地/参与者/团队承担范围；增加链接到 Collective 各作品版本档案。不能把杭州双年展版一概归为环幕交付。
- `data/projects.csv`：仅当详情页与素材完成后，更新 `project_name_zh/en` 与案例关联；未经核验不要把 Research / Archive 标为 confirmed。
- `index.html` 页脚：把 Collective 标为 Artist Archive（或直接导航到主站 People），把 SpacePort 标为 Research Archive；不会在同一主导航提供两套“官网”。
- `brand-spec.md`：增加图片规则（保留画幅、现场优先、封面与高清详情图分离）及真实署名规则；已有色彩/栅格系统不修改。

## C. 推荐团队 Credit 数据模型（由 Collective 内容供给）

```json
{
  "id": "timer-ufo-2024",
  "workId": "timer",
  "dateLabel": "2024",
  "event": "UFO Terminal · Loading… Permission 2",
  "contributors": [{"personId":"xu-hao","role":"composition"},{"personId":"qian-yuwen","role":"visual-design"},{"personId":"xu-sihui","role":"interaction-collaboration"}],
  "teamContribution": ["audiovisual-work"],
  "evidence": ["collective/timer", "artist-public-archive"],
  "state": "requires-edition-level-signoff"
}
```
此数据是结构示意，具体分工发布前应再按版本核对。不可因参与某次版本而赋予全系列署名。

## D. 周边 / 收藏品：先停止“商城化”，评估真实产品

当前的 Merch 只是可交互 T 恤布局样机，应当作为 **Product Lab / Concept Prototype** 保留；不要在主站导航上叫“Shop”或“Store”。

第一阶段只做：
- 2–3 件有真实可生产资产的实体产品（例如 T 恤、印刷品、限量作品），每件具备尺寸/材质/成本/授权/版次/摄影/预计交付；
- 单件产品页面可提交**意向登记**，但无收款能力时需明确不是订单；
- 样品、物流、退换政策、支付合规、客户支持与库存路径明确后再考虑上线商城。

不建议为一个 T 恤设计编辑器另建库存、支付、积分、会员、NFT、收藏品交易等系统。优先验证一件产品实际完成从展示→询价→交付的完整流程。

## E. 四轮实施和验收

- **第 1 轮（内容可信）**：Sihui/Murphy 人物链接、Drop Flow/TIMER Credit 修订。验收：可点击、姓名/头像正确、手机版不溢出。
- **第 2 轮（视觉统一）**：现有 `brand-spec.md` 派生公共组件、媒体尺寸/裁切规则、项目页模板。验收：现场照片与文字关系清晰，首页 6–9 个案例避免拥挤。
- **第 3 轮（发布工程）**：Collective 导出精选 JSON → Website PR 更新，配 Schema 校验、失效 URL 检查和静态截图检查。暂不跨账户自动推送，也不存放 PAT。
- **第 4 轮（周边实验）**：从定制演示转向一个实际样品及可追踪询价。只有明确订单、支付、库存和履约才叫商城。

## F. 维护者接手方式

正式官网仓库的管理员为 `ewanqian` 提供 GitHub Collaborator 的 Write 权限，或在该仓库接受一个由拥有 push 权限的账号创建的分支/PR。**请勿在 Issue、Markdown 或 PR 中粘贴 PAT。**

一旦有写入权限，按上述范围提交小 PR，避免一次性大改：
1. `feat(people): link Sihui Xu and Murphy Nile`
2. `fix(credits): version-specific Drop Flow and TIMER records`
3. `chore(content): add export and quality-gate contract`
4. `docs(merch): classify prototype, restrict shop claims`

完成后跑链接、可访问性、图片载入、移动端与中英文检查，合并才算上线候选；通过 GitHub Pages 部署与公网校验后才叫已发布。
