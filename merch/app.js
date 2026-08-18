const LOGO_RATIO = 938 / 169;
const CM_PX_MAP = { 22: 116, 5: 48 };
const placements = {
  centerChest: { x: 300, y: 278, r: 0 },
  leftChest: { x: 250, y: 234, r: 0 },
  rightChest: { x: 350, y: 234, r: 0 },
  leftSleeve: { x: 146, y: 221, r: -12 },
  rightSleeve: { x: 454, y: 221, r: 12 },
  backLower: { x: 412, y: 594, r: 38 }
};
const quickPresets = {
  bigCenter: { cm: 22, place: 'centerChest', r: 0 },
  smallChest: { cm: 5, place: 'leftChest', r: 0 },
  angledChest: { cm: 5, place: 'rightChest', r: 38 },
  sleeve: { cm: 5, place: 'rightSleeve', r: 12 },
  lower: { cm: 5, place: 'backLower', r: 38 }
};

const state = { view: 'front', front: [], back: [], selectedId: null, logoDataUrl: '' };
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const svgFront = $('#editorSvgFront');
const svgBack = $('#editorSvgBack');
let drag = null;

function uid() { return Math.random().toString(36).slice(2, 9); }
function sideItems(side = state.view) { return state[side]; }
function selected() { return sideItems().find(x => x.id === state.selectedId) || null; }
function escText(s) { return String(s).replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m])); }

async function loadLogo() {
  const txt = await fetch('./assets/virtura-logo.svg').then(r => r.text());
  state.logoDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(txt)));
}

function shirtMarkup(view = 'front') {
  const front = view === 'front';
  const collarFront = `
      <path d="M257 110 C268 126 282 136 300 136 C318 136 332 126 343 110" fill="none" stroke="#dfdfd9" stroke-width="1.15"/>
      <path d="M247 104 C261 126 278 138 300 138 C322 138 339 126 353 104" fill="none" stroke="#dfdfd9" stroke-width="1.15"/>
      <path d="M260 106 L248 100 M340 106 L352 100" fill="none" stroke="#dfdfd9" stroke-width="1"/>
  `;
  const collarBack = `
      <path d="M264 108 C276 119 286 124 300 124 C314 124 324 119 336 108" fill="none" stroke="#dfdfd9" stroke-width="1.05"/>
  `;
  return `
    <defs>
      <filter id="shadow-${view}" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="11" flood-color="#000" flood-opacity=".52"/></filter>
    </defs>
    <g filter="url(#shadow-${view})">
      <path d="M182 616 L274 616" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>
      <path d="M326 616 L418 616" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>

      <path d="M181 616 L181 414" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>
      <path d="M181 380 L181 255" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>
      <path d="M419 616 L419 414" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>
      <path d="M419 380 L419 255" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>

      <path d="M181 255 L116 284" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>
      <path d="M419 255 L484 284" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>

      <path d="M116 284 L76 198" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>
      <path d="M484 284 L524 198" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>

      <path d="M76 198 L161 140" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>
      <path d="M524 198 L439 140" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>

      <path d="M161 140 L238 114" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>
      <path d="M439 140 L362 114" fill="none" stroke="#dfdfd9" stroke-width="1.25" stroke-linecap="round"/>

      <path d="M140 258 C132 235 130 214 133 196" fill="none" stroke="#dfdfd9" stroke-width="1" stroke-linecap="round" opacity=".9"/>
      <path d="M460 258 C468 235 470 214 467 196" fill="none" stroke="#dfdfd9" stroke-width="1" stroke-linecap="round" opacity=".9"/>

      ${front ? collarFront : collarBack}
    </g>
    <text x="300" y="667" fill="#777772" font-size="11" font-family="Helvetica,Arial,sans-serif" text-anchor="middle" letter-spacing="4">${front ? 'FRONT' : 'BACK'}</text>`;
}

function cmToPx(cm) { return CM_PX_MAP[cm] || CM_PX_MAP[22]; }

function decalMarkup(d, interactive = true, side = 'front') {
  const w = cmToPx(d.cm);
  const h = w / LOGO_RATIO;
  const x = d.x - w / 2;
  const y = d.y - h / 2;
  const isActive = interactive && side === state.view && d.id === state.selectedId;
  const box = isActive
    ? `<rect x="${x - 7}" y="${y - 7}" width="${w + 14}" height="${h + 14}" rx="2" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="5 5" opacity=".65"/>`
    : '';
  return `<g class="decal ${side === state.view ? 'editable' : 'locked'}" data-id="${d.id}" data-side="${side}" transform="rotate(${d.r} ${d.x} ${d.y})" style="cursor:${side === state.view && interactive ? 'move' : 'default'}">${box}<image href="${state.logoDataUrl}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/></g>`;
}

function renderSide(side) {
  const svg = side === 'front' ? svgFront : svgBack;
  svg.innerHTML = shirtMarkup(side) + state[side].map(d => decalMarkup(d, true, side)).join('');
}

function render() {
  renderSide('front');
  renderSide('back');
  bindDecals();
  syncControls();
  syncPaneState();
}

function bindDecals() {
  $$('.decal.editable').forEach(g => g.addEventListener('pointerdown', e => {
    e.preventDefault();
    const id = g.dataset.id;
    const side = g.dataset.side;
    switchView(side);
    state.selectedId = id;
    const d = selected();
    if (!d) return;
    const svg = side === 'front' ? svgFront : svgBack;
    const p = svgPoint(svg, e);
    drag = { id, side, startX: p.x, startY: p.y, origX: d.x, origY: d.y };
    if (svg.setPointerCapture) svg.setPointerCapture(e.pointerId);
    render();
  }));
}

function svgPoint(svg, e) {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function handleMove(e) {
  if (!drag) return;
  const items = state[drag.side];
  const d = items.find(x => x.id === drag.id);
  if (!d) return;
  const svg = drag.side === 'front' ? svgFront : svgBack;
  const p = svgPoint(svg, e);
  d.x = Math.max(85, Math.min(515, drag.origX + p.x - drag.startX));
  d.y = Math.max(150, Math.min(605, drag.origY + p.y - drag.startY));
  render();
}
svgFront.addEventListener('pointermove', handleMove);
svgBack.addEventListener('pointermove', handleMove);
window.addEventListener('pointerup', () => { drag = null; });

function addLogo(cm = 22, place = 'centerChest', side = state.view, rotationOverride = null) {
  const p = placements[place];
  const d = { id: uid(), cm, x: p.x, y: p.y, r: rotationOverride === null ? p.r : rotationOverride };
  state[side].push(d);
  state.view = side;
  state.selectedId = d.id;
  render();
}

function applyPlacement(key) {
  const d = selected();
  if (!d) return;
  const p = placements[key];
  d.x = p.x;
  d.y = p.y;
  d.r = p.r;
  render();
}

function applyQuickPreset(key) {
  const preset = quickPresets[key];
  if (!preset) return;
  const targetSide = key === 'lower' ? 'back' : 'front';
  const d = selected();
  if (d && state.view === targetSide) {
    const p = placements[preset.place];
    d.cm = preset.cm;
    d.x = p.x;
    d.y = p.y;
    d.r = preset.r;
    render();
  } else {
    addLogo(preset.cm, preset.place, targetSide, preset.r);
  }
}

function syncPaneState() {
  $$('.teePane').forEach(p => p.classList.toggle('activePane', p.dataset.pane === state.view));
  $$('.tab').forEach(b => b.classList.toggle('active', b.dataset.view === state.view));
  $('#currentSideOut').textContent = state.view === 'front' ? '正面 FRONT' : '背面 BACK';
}

function syncControls() {
  const d = selected();
  $('#duplicateBtn').disabled = !d;
  $('#deleteBtn').disabled = !d;
  $('#sizeOut').textContent = d ? `${d.cm} CM` : '—';
}

function switchView(view) {
  state.view = view;
  state.selectedId = sideItems(view)[0]?.id || null;
  syncPaneState();
  render();
}

$('#addLogoBtn').onclick = () => addLogo(22, 'centerChest', state.view);
$$('.preset').forEach(b => b.onclick = () => {
  const cm = Number(b.dataset.size);
  const d = selected();
  if (d) {
    d.cm = cm;
    render();
  } else {
    addLogo(cm, cm === 5 ? (state.view === 'back' ? 'backLower' : 'leftChest') : 'centerChest', state.view);
  }
});
$$('.positionGrid button').forEach(b => b.onclick = () => applyPlacement(b.dataset.place));
$$('.tab').forEach(b => b.onclick = () => switchView(b.dataset.view));
$$('[data-quick]').forEach(b => b.onclick = () => applyQuickPreset(b.dataset.quick));
$$('[data-rotate]').forEach(b => b.onclick = () => {
  const d = selected();
  if (!d) return;
  const n = Number(b.dataset.rotate);
  d.r = (state.view === 'back' && d.x < 300) ? -n : n;
  render();
});
$('#deleteBtn').onclick = () => {
  if (!state.selectedId) return;
  state[state.view] = sideItems().filter(x => x.id !== state.selectedId);
  state.selectedId = sideItems()[0]?.id || null;
  render();
};
$('#duplicateBtn').onclick = () => {
  const d = selected();
  if (!d) return;
  const c = { ...d, id: uid(), x: d.x + 18, y: d.y + 18 };
  sideItems().push(c);
  state.selectedId = c.id;
  render();
};

function encodeState() {
  const payload = { front: state.front, back: state.back };
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).replace(/=+$/, '');
}
function decodeState() {
  const m = location.hash.match(/design=([^&]+)/);
  if (!m) return false;
  try {
    let s = m[1].replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    const p = JSON.parse(decodeURIComponent(escape(atob(s))));
    if (Array.isArray(p.front) && Array.isArray(p.back)) {
      state.front = p.front;
      state.back = p.back;
      return true;
    }
  } catch (e) {}
  return false;
}
$('#copyLinkBtn').onclick = async () => {
  const url = location.href.split('#')[0] + '#design=' + encodeState();
  try {
    await navigator.clipboard.writeText(url);
    flash($('#copyLinkBtn'), '已复制方案链接');
  } catch (e) {
    prompt('复制这个方案链接：', url);
  }
};
function flash(btn, text) {
  const old = btn.textContent;
  btn.textContent = text;
  setTimeout(() => btn.textContent = old, 1500);
}

function standaloneSvg(view, items, w = 600, h = 700) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 600 700"><rect width="600" height="700" fill="#080808"/>${shirtMarkup(view)}${items.map(d => decalMarkup(d, false, view)).join('')}</svg>`;
}
async function svgToCanvas(svgText, width, height) {
  const blob = new Blob([svgText], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
  URL.revokeObjectURL(url);
  return c;
}
function downloadCanvas(c, name) {
  const a = document.createElement('a');
  a.download = name;
  a.href = c.toDataURL('image/png');
  a.click();
}
async function exportCurrent() {
  const c = await svgToCanvas(standaloneSvg(state.view, sideItems()), 1800, 2100);
  downloadCanvas(c, `VIRTURA-tee-${state.view}.png`);
}
async function exportCombined() {
  const out = document.createElement('canvas');
  out.width = 2400;
  out.height = 1600;
  const ctx = out.getContext('2d');
  ctx.fillStyle = '#080808';
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.fillStyle = '#f2f1ec';
  ctx.font = '500 34px Helvetica,Arial,sans-serif';
  ctx.fillText('VIRTURA / CUSTOM MERCH', 90, 95);
  ctx.fillStyle = '#777772';
  ctx.font = '18px Helvetica,Arial,sans-serif';
  ctx.fillText('FRONT + BACK · BLACK TEE · 22 CM / 5 CM', 90, 135);
  const f = await svgToCanvas(standaloneSvg('front', state.front), 1200, 1400);
  const b = await svgToCanvas(standaloneSvg('back', state.back), 1200, 1400);
  ctx.drawImage(f, 0, 155, 1200, 1400);
  ctx.drawImage(b, 1200, 155, 1200, 1400);
  downloadCanvas(out, 'VIRTURA-tee-front-back.png');
}
$('#exportCurrentBtn').onclick = exportCurrent;
$('#exportCombinedBtn').onclick = exportCombined;
$('#exportCombinedMobile').onclick = exportCombined;

function confirm() {
  const rows = [];
  const format = (arr, label) => {
    if (!arr.length) rows.push([label, '无 Logo']);
    else arr.forEach((d, i) => rows.push([`${label} ${i + 1}`, `${d.cm} CM · ${Math.round(d.r)}°`]));
  };
  format(state.front, '正面');
  format(state.back, '背面');
  $('#summary').innerHTML = rows.map(r => `<div class="summaryRow"><span>${escText(r[0])}</span><span>${escText(r[1])}</span></div>`).join('');
  $('#confirmDialog').showModal();
}
$('#confirmBtn').onclick = confirm;
$('#confirmBtnMobile').onclick = confirm;
$('#dialogExportBtn').onclick = async () => { await exportCombined(); $('#confirmDialog').close(); };
$('#screenshotModeBtn').onclick = () => {
  document.body.classList.toggle('screenshot');
  if (document.body.classList.contains('screenshot')) {
    const exit = document.createElement('button');
    exit.id = 'exitShot';
    exit.textContent = '退出截图模式';
    Object.assign(exit.style, { position: 'fixed', right: '16px', top: '16px', zIndex: 99, border: '1px solid #333', background: '#111', color: '#eee', padding: '10px 12px' });
    exit.onclick = () => { document.body.classList.remove('screenshot'); exit.remove(); };
    document.body.appendChild(exit);
  }
};

(async () => {
  await loadLogo();
  const restored = decodeState();
  if (!restored) {
    addLogo(22, 'centerChest', 'front', 0);
    addLogo(5, 'rightSleeve', 'front', 12);
    addLogo(5, 'backLower', 'back', 38);
    state.selectedId = state.front[0]?.id || null;
    state.view = 'front';
  } else {
    state.view = 'front';
    state.selectedId = state.front[0]?.id || state.back[0]?.id || null;
  }
  render();
})();
