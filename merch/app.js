const SVG_NS='http://www.w3.org/2000/svg';
const LOGO_RATIO=938/169;
const LOGO_WIDTH={22:116,5:40};

const presets={
  mainChest:{cm:22,x:300,y:247,r:0},
  smallCenter:{cm:5,x:300,y:235,r:0},
  angledChest:{cm:5,x:326,y:218,r:38},
  sleeve:{cm:5,x:469,y:222,r:12},
  lowerCorner:{cm:5,x:385,y:535,r:38}
};

const state={view:'front',front:[],back:[],selectedId:null,logoDataUrl:'',currentSize:22};
const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
const svg=$('#editorSvg');
let drag=null;

function uid(){return Math.random().toString(36).slice(2,9)}
function sideItems(){return state[state.view]}
function selected(){return sideItems().find(x=>x.id===state.selectedId)||null}
function escText(s){return String(s).replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))}
function normalizeSize(cm){return Number(cm)===22?22:5}
function logoWidth(cm){return LOGO_WIDTH[normalizeSize(cm)]}

async function loadLogo(){
  const txt=await fetch('./assets/virtura-logo.svg').then(r=>r.text());
  state.logoDataUrl='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(txt)));
}

function shirtMarkup(label='FRONT'){
  return `
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000" flood-opacity=".5"/></filter>
    </defs>
    <g filter="url(#shadow)">
      <path d="M230 112 C248 126 272 134 300 134 C328 134 352 126 370 112 L452 140 L526 194 L480 276 L432 252 L432 606 L168 606 L168 252 L120 276 L74 194 L148 140 Z" fill="#10100f" stroke="none"/>

      <g fill="none" stroke="#d9d9d4" stroke-width="1.35" stroke-linecap="square" stroke-linejoin="round">
        <path d="M230 112 L148 140 L74 194 L120 276 L165 253"/>
        <path d="M370 112 L452 140 L526 194 L480 276 L435 253"/>
        <path d="M168 265 L168 382 M168 400 L168 606"/>
        <path d="M432 265 L432 382 M432 400 L432 606"/>
        <path d="M168 606 L286 606 M314 606 L432 606"/>
      </g>

      <g fill="none" stroke="#d9d9d4" stroke-linecap="round">
        <path d="M254 109 C265 124 280 132 300 132 C320 132 335 124 346 109" stroke-width="1.35"/>
        <path d="M264 108 C273 119 285 125 300 125 C315 125 327 119 336 108" stroke-width="1" opacity=".65"/>
        <path d="M166 254 C173 228 174 196 168 163" stroke-width="1" opacity=".72"/>
        <path d="M434 254 C427 228 426 196 432 163" stroke-width="1" opacity=".72"/>
      </g>
    </g>
    <text x="300" y="650" fill="#777772" font-size="10" font-family="Helvetica,Arial,sans-serif" text-anchor="middle" letter-spacing="2.2">${label}</text>`;
}

function decalMarkup(d,interactive=true){
  const cm=normalizeSize(d.cm);const w=logoWidth(cm),h=w/LOGO_RATIO,x=d.x-w/2,y=d.y-h/2;
  const box=(interactive&&d.id===state.selectedId)?`<rect x="${x-7}" y="${y-7}" width="${w+14}" height="${h+14}" rx="2" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="5 5" opacity=".62"/>`:'';
  return `<g class="decal" data-id="${d.id}" transform="rotate(${d.r} ${d.x} ${d.y})" style="cursor:${interactive?'move':'default'}">${box}<image href="${state.logoDataUrl}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/></g>`;
}

function render(){
  svg.innerHTML=shirtMarkup(state.view.toUpperCase())+sideItems().map(d=>decalMarkup(d,true)).join('');
  bindDecals();syncControls();
}

function bindDecals(){
  $$('#editorSvg .decal').forEach(g=>g.addEventListener('pointerdown',e=>{
    e.preventDefault();const id=g.dataset.id;state.selectedId=id;const d=selected();if(!d)return;
    const p=svgPoint(e);drag={id,startX:p.x,startY:p.y,origX:d.x,origY:d.y};svg.setPointerCapture?.(e.pointerId);render();
  }));
}

function svgPoint(e){const pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;return pt.matrixTransform(svg.getScreenCTM().inverse())}

svg.addEventListener('pointermove',e=>{
  if(!drag)return;const d=sideItems().find(x=>x.id===drag.id);if(!d)return;const p=svgPoint(e);
  d.x=Math.max(78,Math.min(522,drag.origX+p.x-drag.startX));d.y=Math.max(132,Math.min(590,drag.origY+p.y-drag.startY));render();
});
window.addEventListener('pointerup',()=>{drag=null});

function addLogo(cm=state.currentSize,presetKey=null){
  cm=normalizeSize(cm);state.currentSize=cm;
  const fallback=cm===22?presets.mainChest:presets.smallCenter;
  const p=presetKey&&presets[presetKey]?presets[presetKey]:fallback;
  const d={id:uid(),cm,x:p.x,y:p.y,r:p.r};sideItems().push(d);state.selectedId=d.id;render();
}

function setSize(cm){
  cm=normalizeSize(cm);state.currentSize=cm;const d=selected();if(d)d.cm=cm;render();
}

function applyPreset(key){
  const p=presets[key];if(!p)return;state.currentSize=p.cm;let d=selected();
  if(!d){addLogo(p.cm,key);return}
  d.cm=p.cm;d.x=p.x;d.y=p.y;d.r=p.r;render();
}

function setRotation(r){const d=selected();if(!d)return;d.r=Number(r);render()}

function syncControls(){
  const d=selected();
  $$('.sizePreset').forEach(b=>b.classList.toggle('active',Number(b.dataset.size)===(d?normalizeSize(d.cm):state.currentSize)));
  $$('.rotationPresets button').forEach(b=>b.classList.toggle('active',!!d&&Number(b.dataset.rotation)===Number(d.r)));
  $('#duplicateBtn').disabled=!d;$('#deleteBtn').disabled=!d;
  $('#sizeOut').textContent=d?normalizeSize(d.cm)+' CM':'—';
}

function switchView(view){state.view=view;state.selectedId=sideItems()[0]?.id||null;$$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.view===view));render()}

$('#addLogoBtn').onclick=()=>addLogo(state.currentSize);
$$('.sizePreset').forEach(b=>b.onclick=()=>setSize(Number(b.dataset.size)));
$$('.placementPreset').forEach(b=>b.onclick=()=>applyPreset(b.dataset.preset));
$$('.rotationPresets button').forEach(b=>b.onclick=()=>setRotation(Number(b.dataset.rotation)));
$$('.tab').forEach(b=>b.onclick=()=>switchView(b.dataset.view));
$('#deleteBtn').onclick=()=>{if(!state.selectedId)return;state[state.view]=sideItems().filter(x=>x.id!==state.selectedId);state.selectedId=sideItems()[0]?.id||null;render()};
$('#duplicateBtn').onclick=()=>{const d=selected();if(!d)return;const c={...d,id:uid(),x:d.x+18,y:d.y+18};sideItems().push(c);state.selectedId=c.id;render()};

function encodeState(){const payload={front:state.front,back:state.back};return btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).replace(/=+$/,'')}
function decodeState(){
  const m=location.hash.match(/design=([^&]+)/);if(!m)return false;
  try{let s=m[1].replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';const p=JSON.parse(decodeURIComponent(escape(atob(s))));
    if(Array.isArray(p.front)&&Array.isArray(p.back)){
      state.front=p.front.map(d=>({...d,cm:normalizeSize(d.cm)}));state.back=p.back.map(d=>({...d,cm:normalizeSize(d.cm)}));return true;
    }
  }catch(e){}return false;
}

$('#copyLinkBtn').onclick=async()=>{const url=location.href.split('#')[0]+'#design='+encodeState();try{await navigator.clipboard.writeText(url);flash($('#copyLinkBtn'),'已复制方案链接')}catch(e){prompt('复制这个方案链接：',url)}};
function flash(btn,text){const old=btn.textContent;btn.textContent=text;setTimeout(()=>btn.textContent=old,1500)}

function standaloneSvg(view,items,w=600,h=700){return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 600 700"><rect width="600" height="700" fill="#080808"/>${shirtMarkup(view.toUpperCase())}${items.map(d=>decalMarkup(d,false)).join('')}</svg>`}
async function svgToCanvas(svgText,width,height){const blob=new Blob([svgText],{type:'image/svg+xml'});const url=URL.createObjectURL(blob);const img=new Image();await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=url});const c=document.createElement('canvas');c.width=width;c.height=height;const ctx=c.getContext('2d');ctx.drawImage(img,0,0,width,height);URL.revokeObjectURL(url);return c}
function downloadCanvas(c,name){const a=document.createElement('a');a.download=name;a.href=c.toDataURL('image/png');a.click()}
async function exportCurrent(){const c=await svgToCanvas(standaloneSvg(state.view,sideItems()),1800,2100);downloadCanvas(c,`VIRTURA-tee-${state.view}.png`)}
async function exportCombined(){
  const out=document.createElement('canvas');out.width=2400;out.height=1600;const ctx=out.getContext('2d');ctx.fillStyle='#080808';ctx.fillRect(0,0,out.width,out.height);ctx.fillStyle='#f2f1ec';ctx.font='500 34px Helvetica,Arial,sans-serif';ctx.fillText('VIRTURA / CUSTOM MERCH',90,95);ctx.fillStyle='#777772';ctx.font='18px Helvetica,Arial,sans-serif';ctx.fillText('FRONT / BACK · BLACK TEE · 22 CM / 5 CM',90,135);
  const f=await svgToCanvas(standaloneSvg('front',state.front),1200,1400);const b=await svgToCanvas(standaloneSvg('back',state.back),1200,1400);ctx.drawImage(f,0,155,1200,1400);ctx.drawImage(b,1200,155,1200,1400);downloadCanvas(out,'VIRTURA-tee-front-back.png');
}
$('#exportCurrentBtn').onclick=exportCurrent;$('#exportCombinedBtn').onclick=exportCombined;$('#exportCombinedMobile').onclick=exportCombined;

function confirm(){
  const rows=[];const format=(arr,label)=>{if(!arr.length)rows.push([label,'无 Logo']);else arr.forEach((d,i)=>rows.push([`${label} ${i+1}`,`${normalizeSize(d.cm)} CM · ${Math.round(d.r)}°`]))};format(state.front,'正面');format(state.back,'背面');
  $('#summary').innerHTML=rows.map(r=>`<div class="summaryRow"><span>${escText(r[0])}</span><span>${escText(r[1])}</span></div>`).join('');$('#confirmDialog').showModal();
}
$('#confirmBtn').onclick=confirm;$('#confirmBtnMobile').onclick=confirm;$('#dialogExportBtn').onclick=async()=>{await exportCombined();$('#confirmDialog').close()};
$('#screenshotModeBtn').onclick=()=>{document.body.classList.toggle('screenshot');if(document.body.classList.contains('screenshot')){const exit=document.createElement('button');exit.id='exitShot';exit.textContent='退出截图模式';Object.assign(exit.style,{position:'fixed',right:'16px',top:'16px',zIndex:99,border:'1px solid #333',background:'#111',color:'#eee',padding:'10px 12px'});exit.onclick=()=>{document.body.classList.remove('screenshot');exit.remove()};document.body.appendChild(exit)}};

(async()=>{await loadLogo();const restored=decodeState();if(!restored)addLogo(22,'mainChest');else{state.selectedId=state.front[0]?.id||null;state.currentSize=state.front[0]?.cm||22;render()}})();
