# Daily Maintenance And Git Preflight 2026-04-16

这份文档是给 `VIRTURA-Collective` 日常维护、每日更新、自我优化和 Git 版本管理前检查使用的。

目标不是把每次维护做成大工程，而是把真正高价值的重复动作固定下来：

1. 每天快速看清仓库现状
2. 每次版本管理前自动跑一遍关键检查
3. 每轮都逼自己做一点小而真实的优化

---

## 每日维护主指令

下面这段可以直接发给 GPT / Codex / 其他 agent。

## Direct-Use Prompt

你现在是 `VIRTURA-Collective` 的每日维护助手。

你的任务不是泛泛总结仓库，而是执行一轮真正有用的日常维护检查，并推动这个仓库每次都比上一次更清楚一点、更干净一点、更适合继续生长一点。

请按下面顺序执行：

1. 查看当前 Git 状态
   需要看：
   - 当前分支
   - 当前 HEAD
   - 工作区是否干净
   - staged / unstaged / untracked 分别是什么

2. 做一轮 Markdown 健康检查
   重点检查：
   - 相对链接是否有坏链
   - 首页与 docs 索引是否还能互相找到
   - 新增文档是否已经被收进索引

3. 做一轮“占位内容 / 半成品痕迹”检查
   重点查找：
   - `TODO`
   - `FIXME`
   - `待补充`
   - `问题1`
   - `问题2`
   - `placeholder`
   - `占位`
   - “后续会继续补”
   - “下一步会继续补”

4. 做一轮“结构是否变得更清楚”检查
   重点判断：
   - 首页是否比以前更像前台，而不是目录
   - `Collective` 与 `SpacePort` 的边界是否仍清楚
   - `Works / Activities / People / Research / Collaboration` 这 5 类内容是否仍能被区分
   - 有没有新加的内容正在把首页重新拉回说明书状态

5. 做一轮“版本管理前风险”检查
   重点判断：
   - 有没有临时文件不该进入 Git
   - 有没有浏览器调试产物误入工作区
   - 有没有生成文件只适合留在 `output/`，不适合进入正式版本

6. 提出 3 条最值得做的优化动作
   要求：
   - 必须具体
   - 必须与当前仓库现实相关
   - 至少 1 条是能立刻执行的小优化
   - 不要只给大规划

7. 如果有“小而确定”的问题，直接修
   例如：
   - 修 docs 索引漏链
   - 清理重复文案
   - 收一两个明显占位词
   - 补一个缺失入口

8. 最后输出一份高密度维护报告
   报告必须包含：
   - 今日仓库状态
   - 检查结果
   - 风险点
   - 已做优化
   - 下一步最值得继续做的 3 件事

---

## Git 前检查短指令

如果你只想在提交前快速跑一轮，而不是做完整日报，可以用这段：

> 请为 `VIRTURA-Collective` 执行一次 Git 前检查。重点看 Git 状态、Markdown 坏链、占位内容、临时产物、docs 索引同步情况，并告诉我这次提交前最该确认的 3 个问题。如果有小而确定的问题，直接修。

---

## 仓库内实际命令

### 每日维护

```bash
./scripts/repo_maintenance.sh
```

它会：

- 输出 Git 状态摘要
- 审计 Markdown 相对链接
- 扫描占位内容
- 检查是否有 `.playwright-cli` 临时产物进入 staged
- 识别同步盘 / Git 索引异常迹象
- 生成一份 `output/maintenance/` 下的维护报告

### Git 前严格检查

```bash
./scripts/repo_maintenance.sh --strict
```

严格模式当前会阻止三类问题：

- Markdown 相对坏链
- `.playwright-cli/` 临时文件进入 staged
- 疑似同步盘 / Git 索引异常导致的大面积 `deleted + untracked`

---

## Hook 安装

如果希望每次 `git commit` 前自动跑一遍：

```bash
./scripts/install_hooks.sh
```

这个安装脚本会：

- 把 Git hooks 指向仓库内的 `.githooks/`
- 启用 `pre-commit`
- 在提交前自动执行 `./scripts/repo_maintenance.sh --strict`

如果当前工作区出现疑似同步盘索引错乱，这个 hook 也会直接拦下提交，避免把整仓误记成删除再新增。

---

## 维护原则

这套日常维护最重要的不是“每天都改很多”，而是每天都做下面这几件事：

1. 让结构再清楚一点
2. 让前台再像前台一点
3. 让深层资料边界再稳一点
4. 让临时噪音少一点
5. 让下一次继续维护的人更容易接手一点

---

## 建议节奏

### 每天一次

- 运行 `./scripts/repo_maintenance.sh`
- 看维护报告
- 选 1 到 2 条最小但最值得的优化动作执行

### 每次提交前

- 运行 `./scripts/repo_maintenance.sh --strict`
- 或直接依赖 `pre-commit hook`

### 每周一次

- 回看最近几份维护报告
- 合并重复问题
- 判断哪些已不再是“每日问题”，而是该进入正式 Roadmap 或专题文档
