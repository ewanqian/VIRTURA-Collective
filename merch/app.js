const SVG_NS='http://www.w3.org/2000/svg';
const SVG_W=600, SVG_H=700, BODY_W_PX=262, BODY_W_CM=60;
const CM_TO_PX=BODY_W_PX/BODY_W_CM;
const LOGO_RATIO=938/169;
const placements={
  centerChest:{x:300,y:260,r:0},leftChest:{x:246,y:218,r:0},rightChest:{x:354,y:218,r:0},
  leftSleeve:{x:132,y:223,r:-10},rightSleeve:{x:468,y:223,r:10},lower:{x:370,y:510,r:0}
};
const state={view:'front',front:[],back:[],selectedId:null,logoDataUrl:''};
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
const svg=$('#editorSvg');
let drag=null;

function uid(){return Math.random().toString(36).slice(2,9)}
function sideItems(){return state[state.view]}
function selected(){return sideItems().find(x=>x.id===state.selectedId)||null}
function escText(s){return String(s).replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))}

async function loadLogo(){
  const txt=await fetch('./assets/virtura-logo.svg').then(r=>r.text());
  state.logoDataUrl='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(txt)));
}
function shirtMarkup(label='FRONT'){
  return `
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="11" stdDeviation="12" flood-color="#000" flood-opacity=".55"/></filter>
    </defs>
    <g filter="url(#shadow)">
      <path d="M232 108 C249 126 271 135 300 135 C329 135 351 126 368 108 L451 136 L533 198 L481 286 L431 257 L431 611 L169 611 L169 257 L119 286 L67 198 L149 136 Z" fill="#111" stroke="#dfdfd9" stroke-width="1.35" stroke-linejoin="round"/>
      <path d="M258 111 C268 126 281 133 300 133 C319 133 332 126 342 111 C332 105 318 100 300 100 C282 100 268 105 258 111 Z" fill="#111" stroke="#dfdfd9" stroke-width="1.25"/>
      <path d="M267 108 C275 119 286 124 300 124 C314 124 325 119 333 108" fill="none" stroke="#dfdfd9" stroke-width="1" opacity=".55"/>
      <path d="M169 257 L149 136 M431 257 L451 136" fill="none" stroke="#dfdfd9" stroke-width="1" opacity=".28"/>
      <path d="M174 604 L426 604" stroke="#dfdfd9" stroke-width=".8" opacity=".18"/>
    </g>
    <text x="300" y="650" fill="#777772" font-size="10" font-family="Helvetica,Arial,sans-serif" text-anchor="middle" letter-spacing="2.2">${label}</text>`;
}
function decalMarkup(d,interactive=true){
  const w=d.cm*CM_TO_PX,h=w/LOGO_RATIO,x=d.x-w/2,y=d.y-h/2;
  const box=(interactive&&d.id===state.selectedId)?`<rect x="${x-7}" y="${y-7}" width="${w+14}" height="${h+14}" rx="2" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="5 5" opacity=".65"/>`:'';
  return `<g class="decal" data-id="${d.id}" transform="rotate(${d.r} ${d.x} ${d.y})" style="cursor:${interactive?'move':'default'}">${box}<image href="${state.logoDataUrl}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/></g>`;
}
function render(){
  const items=sideItems();
  svg.innerHTML=shirtMarkup(state.view.toUpperCase())+items.map(d=>decalMarkup(d,true)).join('');
  bindDecals(); syncControls();
}
function bindDecals(){
  $$('#editorSvg .decal').forEach(g=>g.addEventListener('pointerdown',e=>{
    e.preventDefault(); const id=g.dataset.id; state.selectedId=id; const d=selected(); if(!d)return;
    const p=svgPoint(e); drag={id,startX:p.x,startY:p.y,origX:d.x,origY:d.y}; svg.setPointerCapture?.(e.pointerId); render();
  }));
}
function svgPoint(e){
  const pt=svg.createSVGPoint(); pt.x=e.clientX;pt.y=e.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse());
}
svg.addEventListener('pointermove',e=>{
  if(!drag)return; const d=sideItems().find(x=>x.id===drag.id);if(!d)return; const p=svgPoint(e);
  d.x=Math.max(75,Math.min(525,drag.origX+p.x-drag.startX)); d.y=Math.max(135,Math.min(590,drag.origY+p.y-drag.startY)); render();
});
window.addEventListener('pointerup',()=>{drag=null});

function addLogo(cm=22,place='centerChest'){
  const p=placements[place]; const d={id:uid(),cm,x:p.x,y:p.y,r:p.r}; sideItems().push(d);state.selectedId=d.id;render();
}
function applyPlacement(key){const d=selected();if(!d)return;const p=placements[key];d.x=p.x;d.y=p.y;d.r=p.r;render()}
function syncControls(){const d=selected();$('#sizeRange').disabled=!d;$('#rotationRange').disabled=!d;$('#duplicateBtn').disabled=!d;$('#deleteBtn').disabled=!d;if(d){$('#sizeRange').value=d.cm;$('#rotationRange').value=d.r;$('#sizeOut').textContent=d.cm.toFixed(1)+' cm';$('#rotationOut').textContent=d.r+'°'}else{$('#sizeOut').textContent='—';$('#rotationOut').textContent='—'}}
function switchView(view){state.view=view;state.selectedId=sideItems()[0]?.id||null;$$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.view===view));render()}

$('#addLogoBtn').onclick=()=>addLogo(22,'centerChest');
$$('.preset').forEach(b=>b.onclick=()=>{const cm=Number(b.dataset.size);const d=selected();if(d){d.cm=cm;render()}else addLogo(cm,cm===5?'leftChest':'centerChest')});
$$('.positionGrid button').forEach(b=>b.onclick=()=>applyPlacement(b.dataset.place));
$$('.tab').forEach(b=>b.onclick=()=>switchView(b.dataset.view));
$('#sizeRange').oninput=e=>{const d=selected();if(!d)return;d.cm=Number(e.target.value);render()};
$('#rotationRange').oninput=e=>{const d=selected();if(!d)return;d.r=Number(e.target.value);render()};
$('#deleteBtn').onclick=()=>{if(!state.selectedId)return;state[state.view]=sideItems().filter(x=>x.id!==state.selectedId);state.selectedId=sideItems()[0]?.id||null;render()};
$('#duplicateBtn').onclick=()=>{const d=selected();if(!d)return;const c={...d,id:uid(),x:d.x+18,y:d.y+18};sideItems().push(c);state.selectedId=c.id;render()};

function encodeState(){const payload={front:state.front,back:state.back};return btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).replace(/=+$/,'')}
function decodeState(){const m=location.hash.match(/design=([^&]+)/);if(!m)return false;try{let s=m[1].replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';const p=JSON.parse(decodeURIComponent(escape(atob(s))));if(Array.isArray(p.front)&&Array.isArray(p.back)){state.front=p.front;state.back=p.back;return true}}catch(e){}return false}
$('#copyLinkBtn').onclick=async()=>{const url=location.href.split('#')[0]+'#design='+encodeState();try{await navigator.clipboard.writeText(url);flash($('#copyLinkBtn'),'已复制方案链接')}catch(e){prompt('复制这个方案链接：',url)}};
function flash(btn,text){const old=btn.textContent;btn.textContent=text;setTimeout(()=>btn.textContent=old,1500)}

function standaloneSvg(view,items,w=600,h=700){return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 600 700"><rect width="600" height="700" fill="#080808"/>${shirtMarkup(view.toUpperCase())}${items.map(d=>decalMarkup(d,false)).join('')}</svg>`}
async function svgToCanvas(svgText,width,height){const blob=new Blob([svgText],{type:'image/svg+xml'});const url=URL.createObjectURL(blob);const img=new Image();await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=url});const c=document.createElement('canvas');c.width=width;c.height=height;const ctx=c.getContext('2d');ctx.drawImage(img,0,0,width,height);URL.revokeObjectURL(url);return c}
function downloadCanvas(c,name){const a=document.createElement('a');a.download=name;a.href=c.toDataURL('image/png');a.click()}
async function exportCurrent(){const c=await svgToCanvas(standaloneSvg(state.view,sideItems()),1800,2100);downloadCanvas(c,`VIRTURA-tee-${state.view}.png`)}
async function exportCombined(){
  const out=document.createElement('canvas');out.width=2400;out.height=1600;const ctx=out.getContext('2d');ctx.fillStyle='#080808';ctx.fillRect(0,0,out.width,out.height);ctx.fillStyle='#f2f1ec';ctx.font='500 34px Helvetica,Arial,sans-serif';ctx.fillText('VIRTURA / CUSTOM MERCH',90,95);ctx.fillStyle='#777772';ctx.font='18px Helvetica,Arial,sans-serif';ctx.fillText('FRONT / BACK · BLACK TEE · BODY WIDTH ≈ 60 CM',90,135);
  const f=await svgToCanvas(standaloneSvg('front',state.front),1200,1400);const b=await svgToCanvas(standaloneSvg('back',state.back),1200,1400);ctx.drawImage(f,0,155,1200,1400);ctx.drawImage(b,1200,155,1200,1400);downloadCanvas(out,'VIRTURA-tee-front-back.png');
}
$('#exportCurrentBtn').onclick=exportCurrent;$('#exportCombinedBtn').onclick=exportCombined;$('#exportCombinedMobile').onclick=exportCombined;

function confirm(){
  const rows=[];const format=(arr,label)=>{if(!arr.length)rows.push([label,'无 Logo']);else arr.forEach((d,i)=>rows.push([`${label} ${i+1}`,`${d.cm.toFixed(1)} cm · ${Math.round(d.r)}°`]))};format(state.front,'正面');format(state.back,'背面');
  $('#summary').innerHTML=rows.map(r=>`<div class="summaryRow"><span>${escText(r[0])}</span><span>${escText(r[1])}</span></div>`).join('');$('#confirmDialog').showModal();
}
$('#confirmBtn').onclick=confirm;$('#confirmBtnMobile').onclick=confirm;$('#dialogExportBtn').onclick=async()=>{await exportCombined();$('#confirmDialog').close()};
$('#screenshotModeBtn').onclick=()=>{document.body.classList.toggle('screenshot');if(document.body.classList.contains('screenshot')){const exit=document.createElement('button');exit.id='exitShot';exit.textContent='退出截图模式';Object.assign(exit.style,{position:'fixed',right:'16px',top:'16px',zIndex:99,border:'1px solid #333',background:'#111',color:'#eee',padding:'10px 12px'});exit.onclick=()=>{document.body.classList.remove('screenshot');exit.remove()};document.body.appendChild(exit)}};

(async()=>{await loadLogo();const restored=decodeState();if(!restored)addLogo(22,'centerChest');else{state.selectedId=state.front[0]?.id||null;render()}})();
