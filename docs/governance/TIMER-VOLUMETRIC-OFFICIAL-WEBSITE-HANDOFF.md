# TIMER Volumetric — Official Website Implementation Handoff

Target: `VIRTURA-Cellective/VIRTURA-Website` · official `virtura.space`. Current connected GitHub account is **read-only** to that target repo. This document provides implementation directions, not deployed changes.

## Confirmed source and media

- The user-selected image is `https://ewanqian.site/assets/home/featured-timer-visionpro.webp`.
- Its exact binary blob was copied from `ewanqian/portfolio` into this branch at `assets/timer/featured-timer-visionpro.webp` (matching Git SHA `b61688ac79f41eebd3856f3ec70a42a3033a3a74`).
- Do not hotlink another portfolio's asset indefinitely; copy that file to official website `VIRTURA_WEBSITE_ASSETS/03_UFO_CIRCULAR_SERIES/timer-visionpro-spatial-study.webp` or equivalent, retaining the exact image aspect ratio. Do not invent a newly completed volumetric show.

## Proposed precise site changes

### 1. Homepage `index.html`

Current Featured Work section places TIMER / DROP FLOW in a single case card, with the old `work/ufo-circular-series.html` detail page. Preserve it as a series/technical relationship; add a **separate priority card** in Featured Research (recommended after the audiovisual pair) or as a prominent Spatial Computing feature. Do not falsely promote research as confirmed commercial delivery.

```html
<a class="project timer-spatial-study" href="https://ewanqian.site/works/timer" target="_blank" rel="noopener noreferrer">
  <img class="visual" src="VIRTURA_WEBSITE_ASSETS/03_UFO_CIRCULAR_SERIES/timer-visionpro-spatial-study.webp" alt="TIMER spatial archive and Apple Vision Pro scene study" loading="lazy">
  <span class="tag">Spatial Computing / Research</span>
  <div class="meta">
    <span class="title"><span class="lang-zh">控时者 · 空间观看研究</span><span class="lang-en">TIMER — Spatial Study</span></span>
    <span class="info"><span class="lang-zh">体积化场景 / XR 研究 · 持续推进</span><span class="lang-en">Volumetric Scene / XR Research · Ongoing</span></span>
  </div>
</a>
```

Match current CSS grid and existing `.project` component conventions. The current project grid uses `:nth-child()` selectors; **adding a card changes visual spans for subsequent cards**. Update explicit card order or grid placement and verify desktop/mobile layouts before merging. Avoid adding an unverified project into `data/projects.csv` with `status=confirmed`; choose `status=research`, `homepage=yes` only after the new editorial slot is deliberate, and provide a distinct `detail_page` or external CTA.

### 2. Project detail `work/ufo-circular-series.html`

After the existing TIMER section, add a distinctly named `TIMER — Spatial Study` block using the selected image and summary. Original collaboration credits remain on the 2024 piece; label the spatial media exploration as Ewan Qian's follow-up research. It must not be grouped under “15K panoramic delivery” facts if those facts do not apply to the AVP spatial study.

Recommended Chinese copy:

> **控时者 · 空间观看研究 / TIMER — Spatial Study**  
> 从 2024 年《控时者》合作视听作品出发，钱誉文将原有场景转译为可在网页与空间设备中观看的三维档案，继续研究体积化图像、时间结构与空间观看之间的关系。这是一项持续发展的 XR 与空间媒介研究，不等同于原作已完成的展演交付。

Recommended English:

> Extending the collaborative 2024 audiovisual work TIMER, Ewan Qian explores three-dimensional scene archiving, volumetric imagery and spatial viewing through browser-based and XR presentation pathways. This ongoing study is distinct from the original performed work.

Include links to `https://ewanqian.site/works/timer` and Collective `works/timer/volumetric-study.md`.

### 3. Homepage priority rules

- `TIMER — Spatial Study`: **P1 / Editorial Featured Research**, not “confirmed commercial work”.
- `TIMER 2024`: original **public artwork**, keep full collaborative credits.
- `Drop Flow`: maintain separate work/editions, do not replace with TIMER picture.
- Homepage can distinguish Featured Work vs Featured Research; do not reorder unrelated paid client cases without checking business priorities.

### 4. Acceptance checklist

1. Website repo contains locally served optimized media. Original dimensions maintained or consciously letterboxed, no stretched/cropped source.
2. Both CN/EN headings and captions work with existing language selector; mobile 375px and 1280px tested.
3. Click goes to a legitimate project entry, no broken link or direct-link 404.
4. Research label, original work attribution and personal extension differentiation visible.
5. Homepage grid works with the added card; PageSpeed and alt labels pass basic check.
6. Screenshot and link check attached to PR, official pages deployment confirmed after merge.

**Required permission:** owner of `VIRTURA-Cellective/VIRTURA-Website` grants Write access to GitHub identity `ewanqian` and authorizes connected app repository access. Do not transfer or paste PATs.
