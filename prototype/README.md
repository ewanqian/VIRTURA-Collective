# Frontstage Prototype

这个目录现在不再只是单页首页草图，而是一套更接近正式团队站的静态前台雏形。

当前版本已经包含：

- 团队首页
- `Drop Flow` 作品页
- `TIMER` 作品页
- `Observation and Symbiosis` 作品页
- `CONTROL: The Uptime Protocol` 成员独立作品页
- `Desire Machining Center` 成员独立作品页

这轮原型的核心方向是：

- 中文优先
- 白底黑字
- 直角硬边
- 借鉴现有 `timer / drop-flow` 作品页语法
- 把作品页语法升级成整个团队站的统一语法

## Files

- `index.html`：团队首页
- `works/drop-flow.html`：Drop Flow 作品页
- `works/timer.html`：TIMER 作品页
- `works/observation-and-symbiosis.html`：观察与共生作品页
- `works/control-uptime-protocol.html`：Murphy Nile 成员独立作品页
- `works/desire-machining-center.html`：Sihui Xu 成员独立作品页
- `styles.css`：全站共享视觉系统
- `app.js`：轻量动效与滚动导航
- `assets/works/`：本地作品视觉素材

## View Locally

在仓库根目录运行：

```bash
python3 -m http.server 8123
```

然后打开：

```text
http://127.0.0.1:8123/prototype/
```

作品页入口：

```text
http://127.0.0.1:8123/prototype/works/drop-flow.html
http://127.0.0.1:8123/prototype/works/timer.html
http://127.0.0.1:8123/prototype/works/observation-and-symbiosis.html
http://127.0.0.1:8123/prototype/works/control-uptime-protocol.html
http://127.0.0.1:8123/prototype/works/desire-machining-center.html
```

这个原型仍然刻意不引入构建工具，方便快速迭代方向。等页面体系、内容模型和视觉语言稳定下来，再决定是否迁移到 Astro、Next.js 或其他正式前端栈。
