/* ===== Editable content: edit this block only ===== */

const PV=/[?&]preview\b/.test(location.search);
if(PV)try{const sd=JSON.parse(localStorage.getItem("mk_tech_data")||"null");if(sd&&Array.isArray(sd.projects)&&Array.isArray(sd.founders)){CONFIG.projects=sd.projects;CONFIG.founders=sd.founders}}catch(e){}
/* ===== Helpers ===== */
const $=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ok=u=>/^https?:\/\//.test(u||'');
$('#pr').innerHTML=CONFIG.principles.map((p,i)=>`<div class="card"><span class="n">0${i+1}</span><h3>${esc(p[0])}</h3><p>${esc(p[1])}</p></div>`).join('');
function renderF(){$('#fd').innerHTML=CONFIG.founders.map((f,i)=>`<article class="fo" tabindex="0" role="button" data-i="${i}" aria-label="Open profile of ${esc(f.name)}"><div class="art" data-f>${f.photo?`<img src="${esc(f.photo)}" alt="${esc(f.name)}" loading="lazy">`:`<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="rgba(56,189,248,.35)">${[40,80,120,160].map(r=>`<ellipse cx="${i?260:140}" cy="125" rx="${r}" ry="${r*.45}" transform="rotate(${i?-20:20} ${i?260:140} 125)"/>`).join('')}</g><circle cx="${i?260:140}" cy="125" r="6" fill="#ffb454"/></svg>`}</div><div class="b"><h3>${esc(f.name)}</h3><div class="role">${esc(f.role)}</div><p class="ph">${esc(f.bio||'')}</p><span class="meta">View profile →</span></div></article>`).join('')}
renderF();
const PJ=CONFIG.projects,DV=CONFIG.divisions,byId=id=>PJ.find(p=>p.id===id);
$('#by').textContent='Founded by '+CONFIG.founders.map(f=>f.name).join(' & ')+' · Est. '+CONFIG.est;
$('#mt').innerHTML=CONFIG.metrics.map(m=>`<div><b>${esc(m[0])}</b><span>${esc(m[1])}</span><i>Engineering target · not independently audited</i></div>`).join('');
function art(m){let g='';
if(m==='grid')for(let i=1;i<10;i++)g+=`<path d="M${i*40} 0V240M0 ${i*24}H400"/>`;
if(m==='orbit')for(let i=1;i<5;i++)g+=`<ellipse cx="290" cy="90" rx="${i*40}" ry="${i*17}" transform="rotate(-18 290 90)"/>`;
if(m==='chart')g='<path d="M0 190L60 160 110 175 170 110 230 130 290 60 350 80 400 30"/><path d="M0 215H400"/>';
if(m==='nodes')g='<path d="M60 60L180 120 300 50 340 170 180 190 60 60M180 120L340 170"/>'+[[60,60],[180,120],[300,50],[340,170],[180,190]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="6"/>`).join('');
if(m==='wave')for(let i=0;i<4;i++)g+=`<path d="M0 ${90+i*22}Q100 ${50+i*22} 200 ${90+i*22}T400 ${90+i*22}"/>`;
return `<svg class="art2" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="stroke:var(--cyan);fill:none;stroke-width:1.2">${g}</svg>`}
let fc='All',fo='All Leadership';const OWf=()=>['All Leadership',...CONFIG.founders.map(f=>f.name),'MK.TECH Studio'];
const bt=(l,k,cur)=>l.map(x=>`<button type="button" data-k="${k}" data-v="${esc(x)}" aria-pressed="${x===cur}">${esc(x)}</button>`).join('');
const vid=u=>/\.(mp4|webm)(\?|$)/i.test(u);
function media(p){return (p.img?`<img class="dimg" src="${esc(p.img)}" alt="${esc(p.name)} preview">`:'')+(ok(p.video)?(vid(p.video)?`<video class="dimg" controls preload="none" src="${esc(p.video)}"></video>`:`<p><a class="btn" href="${esc(p.video)}" target="_blank" rel="noopener noreferrer">Watch video</a></p>`):'')}
function renderP(inn){$('#pj').innerHTML=PJ.map((p,i)=>`<article class="pj rv${inn?' in':''}" tabindex="0" data-id="${p.id}" data-g="${esc(p.grp)}" data-o="${esc(p.owner)}" style="--c:${p.c};--px:${20+(i*37)%60}%">${p.img?`<img class="pimg" src="${esc(p.img)}" alt="" loading="lazy">`:''}${art(p.m)}<span class="st">${esc(p.cat)} · ${esc(p.status)}</span><h3>${esc(p.name)}</h3><p>${esc(p.tag)}</p><div class="meta">Owner · ${esc(p.owner)}</div><div class="meta">${p.tech.map(esc).join(' · ')}</div><button class="btn vb" type="button" data-id="${p.id}">View Architecture<span class="sr"> of ${esc(p.name)}</span></button></article>`).join('');
const GR=['All',...new Set(PJ.map(p=>p.grp))];if(!GR.includes(fc))fc='All';$('#fc').innerHTML=bt(GR,'c',fc);if(!OWf().includes(fo))fo='All Leadership';$('#fo').innerHTML=bt(OWf(),'o',fo);applyF()}
renderP();
function lay(){let i=0;document.querySelectorAll('.pj').forEach(p=>{p.classList.remove('w4','w2');if(!p.hidden)p.classList.add([4,2,2,4][i++%4]===4?'w4':'w2')})}
function applyF(){let n=0;document.querySelectorAll('.pj').forEach(el=>{const v=(fc==='All'||el.dataset.g===fc)&&(fo==='All Leadership'||el.dataset.o===fo);el.hidden=!v;if(v)n++});lay();$('#cn').textContent='Showing '+n+' of '+PJ.length+' projects';$('#em').hidden=n>0}
$('#pf').addEventListener('click',e=>{const b=e.target.closest('button[data-k]');if(!b)return;if(b.dataset.k==='c')fc=b.dataset.v;else fo=b.dataset.v;b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));applyF()});
applyF();
const dlg=$('#dlg');let opener=null,dn=false;
const li=a=>a&&a.length?'<ul>'+a.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>':'To be completed.';
function openP(id,btn){const p=byId(id);if(!p)return;opener=btn;
$('#dc').innerHTML=`${media(p)}<div class="meta">${esc(p.cat)} · ${esc(p.status)}</div><h3 id="dt">${esc(p.name)}</h3>${p.aka?`<div class="meta">Previously listed as ${esc(p.aka)}</div>`:''}<p class="lead" style="margin:10px 0">${esc(p.tag)}</p><dl class="dl"><dt>Owner</dt><dd>${esc(p.owner)}</dd><dt>Overview</dt><dd>${p.d?esc(p.d):'Overview to be added.'}</dd><dt>Highlights</dt><dd>${li(p.hl)}</dd><dt>Technology (requested, to be verified)</dt><dd>${p.tech.map(esc).join(' · ')}</dd><dt>Architecture</dt><dd>${p.arch?esc(p.arch):'Architecture overview to be completed.'}</dd></dl><div class="ctas">${ok(p.demo)?`<a class="btn" href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Live demo</a>`:''}${ok(p.repo)?`<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">Repository</a>`:''}${ok(p.demo)||ok(p.repo)?'':'<span class="meta">Details coming soon</span>'}</div>`;
document.body.style.overflow='hidden';if(!dlg.open)dlg.showModal()}
$('#pj').addEventListener('click',e=>{const c=e.target.closest('.pj');if(c)openP(c.dataset.id,c.querySelector('.vb'))});$('#pj').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.classList.contains('pj'))openP(e.target.dataset.id,e.target)});
$('#dx').onclick=()=>dlg.close();
dlg.addEventListener('mousedown',e=>{dn=e.target===dlg});dlg.addEventListener('click',e=>{if(dn&&e.target===dlg)dlg.close()});
dlg.addEventListener('close',()=>{document.body.style.overflow='';if(opener&&document.contains(opener))opener.focus()});
$('#tb').innerHTML=DV.map((d,i)=>`<button type="button" role="tab" id="t${i}" aria-controls="tp" data-i="${i}">${esc(d.name)}</button>`).join('');
function showT(i,f){document.querySelectorAll('#tb button').forEach((b,j)=>{b.setAttribute('aria-selected',j===i);b.tabIndex=j===i?0:-1;if(j===i&&f)b.focus()});const d=DV[i],rel=PJ.filter(p=>p.div===i);$('#tp').setAttribute('aria-labelledby','t'+i);$('#tp').innerHTML=`<div><h3>${esc(d.name)}</h3><p class="lead">${esc(d.d)}</p></div><div><div class="meta">Capabilities</div><p>${d.caps.map(esc).join(' · ')}</p><div class="meta">Associated projects</div>${rel.length?`<ul class="pl">${rel.map(p=>`<li>${esc(p.name)} <span class="meta">· ${esc(p.owner)}</span></li>`).join('')}</ul>`:'<p class="meta">No projects associated yet.</p>'}</div>`}
$('#tb').addEventListener('click',e=>{const b=e.target.closest('button');if(b)showT(+b.dataset.i,false)});
$('#tb').addEventListener('keydown',e=>{const n=DV.length,c=[...document.querySelectorAll('#tb button')].findIndex(b=>b===document.activeElement);if(c<0)return;let i=c;if(e.key==='ArrowRight')i=(c+1)%n;else if(e.key==='ArrowLeft')i=(c-1+n)%n;else if(e.key==='Home')i=0;else if(e.key==='End')i=n-1;else return;e.preventDefault();showT(i,true)});
showT(0,false);
$('#cp').innerHTML=CONFIG.capabilities.map((c,i)=>`<article class="card rv ${['s4','','','','','s6'][i]}"><span class="n">0${i+1}.</span><h3>${esc(c.t)}</h3><p>${esc(c.p)}</p><dl class="dl"><dt>Input</dt><dd>${esc(c.i)}</dd><dt>System</dt><dd>${esc(c.s)}</dd><dt>Output</dt><dd>${esc(c.o)}</dd></dl>${c.rel&&c.rel.length?`<div class="meta" style="margin-top:14px">Related · ${c.rel.map(esc).join(' · ')}</div>`:''}</article>`).join('');

const ini=n=>String(n).split(/\s+/).map(w=>w[0]||'').join('').slice(0,2).toUpperCase();
function openF(i,btn){const f=CONFIG.founders[i];if(!f)return;opener=btn;const mine=PJ.filter(p=>p.owner===f.name),ph='<span class="muted">To be added in the admin panel.</span>';
$('#dc').innerHTML=`<div class="lg"><div class="lm">${f.photo?`<img class="dimg" style="margin:0;aspect-ratio:1" src="${esc(f.photo)}" alt="Portrait of ${esc(f.name)}">`:`<div class="mono" aria-hidden="true">${esc(ini(f.name))}</div>`}${f.email?`<a class="btn" href="mailto:${esc(f.email)}">Email</a>`:''}${(f.links||[]).filter(l=>ok(l.url)).map(l=>`<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}</a>`).join('')}</div><div><div class="role">${esc(f.role)}</div><h3 id="dt">${esc(f.name)}</h3><p class="lead" style="margin:10px 0">${f.bio?esc(f.bio):ph}</p><dl class="dl"><dt>Focus areas</dt><dd>${(f.skills||[]).length?f.skills.map(esc).join(' · '):ph}</dd><dt>Responsibilities</dt><dd>${(f.resp||[]).length?li(f.resp):ph}</dd><dt>Projects</dt><dd>${mine.length?`<ul class="pl">${mine.map(p=>`<li><button type="button" class="lnk" data-pid="${esc(p.id)}">${esc(p.name)}</button><span class="meta">${esc(p.cat)} · ${esc(p.status)}</span></li>`).join('')}</ul>`:'None listed.'}</dd></dl></div></div>`;
document.body.style.overflow='hidden';if(!dlg.open)dlg.showModal()}
$('#dc').addEventListener('click',e=>{const b=e.target.closest('[data-pid]');if(b)openP(b.dataset.pid,opener)});
$('#fd').addEventListener('click',e=>{const a=e.target.closest('.fo');if(a)openF(+a.dataset.i,a)});
$('#fd').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('fo')){e.preventDefault();openF(+e.target.dataset.i,e.target)}});
if(!PV&&CONFIG.dataUrl)fetch(CONFIG.dataUrl,{cache:'no-store'}).then(r=>r.ok?r.json():null).then(d=>{if(d&&Array.isArray(d.projects)&&Array.isArray(d.founders)){PJ.length=0;PJ.push(...d.projects);CONFIG.founders.length=0;CONFIG.founders.push(...d.founders);renderP(true);renderF();showT(0,false)}}).catch(()=>{});
$('#tt').onclick=()=>scrollTo({top:0,behavior:RM?'auto':'smooth'});

$('#ft').innerHTML=`© ${new Date().getFullYear()} ${CONFIG.company}`+(CONFIG.email?` · <a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>`:'')+CONFIG.socials.filter(s=>ok(s.url)).map(s=>` · <a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a>`).join('');
$('#fd').addEventListener('pointermove',e=>{const a=e.target.closest('.fo');if(!a)return;const r=a.getBoundingClientRect();a.querySelector('[data-f]').style.setProperty('--x',((e.clientX-r.left)/r.width*100)+'%')});
/* nav */
const hd=$('#hd'),lk=$('#lk'),bg=$('#bg');
function menu(o){lk.classList.toggle('o',o);bg.setAttribute('aria-expanded',o);bg.textContent=o?'✕':'☰';bg.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':''}
bg.onclick=()=>menu(!lk.classList.contains('o'));lk.onclick=e=>{if(e.target.tagName==='A')menu(false)};
addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
/* intro */
const intro=$('#intro');let introT=0,done=false;
function enter(){if(done)return;done=true;intro.classList.add('x');try{sessionStorage.setItem('mk','1')}catch(e){}}
let seen=false;try{seen=false}catch(e){}
if(seen||RM){done=true;intro.classList.add('x');introT=1}else{requestAnimationFrame(()=>intro.classList.add('a'));setTimeout(enter,3600)}
$('#skip').onclick=enter;intro.addEventListener('click',enter);
/* ===== Particle universe ===== */
const cv=$('#fx'),cx=cv.getContext('2d'),SEC=['home','about','founders','teams','projects','capabilities','contact'].map(id=>document.getElementById(id));
let W,H,DPR,N,P=[],secs=[],sc=0,cc=0,tick=0,run=true,raf=0;
let COL=['#38bdf8','#2f7bff','#9cc7ff','#ffb454'];
function build(){DPR=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;cx.setTransform(DPR,0,0,DPR,0,0);
 const n=RM?70:W<700?90:W<1100?150:230;if(n!==N){N=n;P=Array.from({length:n},(_,i)=>({a:Math.random()*6.283,r:Math.random(),z:Math.random(),u:Math.random(),v:Math.random(),x:(Math.random()-.5)*W,y:(Math.random()-.5)*H,k:i%11==0?3:i%3,s:TK[i%TK.length]}))}
 secs=SEC.map(s=>({t:s.offsetTop,h:s.offsetHeight}));buildCode();buildStars()}
/* decorative code layer: same canvas, same loop */
const SN=[[["const ",0],["systemStatus ",3],["= ",4],['"INITIALIZING DIGITAL SYSTEMS"',2],[";",4]],[["const ",0],["particleField ",3],["= ",4],["createParticleField",1],["();",4]],[["function ",0],["renderExperience",1],["(progress) { ",4],["/* ... */",5],[" }",4]],[["interface ",0],["ProjectConfig ",1],["{ title: string; category: string; }",4]],[["const ",0],["motion ",3],["= { smooth: ",4],["true",0],[", adaptive: ",4],["true",0],[" };",4]]];
const AN=[[.7,.5,.6,1,-.3],[.8,.4,.38,.55,-.2],[.5,.5,.85,.26,0],[.2,.78,.4,.5,.3],[.5,.5,.9,.22,.1],[.5,.5,.9,.22,-.1],[.5,.5,.7,.4,0]];
let ANb=AN[0],DS=1,GA=1,GS=0,BH='255,180,84';
const TK=['const','=>','{ }','</>','async','0x1F','fn()','let','if','&&','[ ]','await','import','===','null','++','#!','.map()','return','0101'];
let LF=1,CF=[],CC=['#2f7bff','#38bdf8','#ffb454','#7fa4d8','#7fa4d8','#7fa4d8'];
function readCols(){const s=getComputedStyle(document.documentElement),g=v=>s.getPropertyValue(v).trim();CC=[g('--p2'),g('--p1'),g('--p4'),g('--code'),g('--code'),g('--mute')];COL=[g('--p1'),g('--p2'),g('--p3'),g('--p4')];LF=document.documentElement.dataset.theme==='light'?.7:1;BH=document.documentElement.dataset.theme==='light'?'37,99,235':g('--amr')}
function buildCode(){const nf=0;CF=Array.from({length:nf},(_,i)=>{const z=.25+((i*37)%10)/14,sz=10+z*4;cx.font=sz+'px "JetBrains Mono",ui-monospace,monospace';let w=0;const sg=SN[i%SN.length].map(([t,c])=>{const m=cx.measureText(t).width;w+=m;return[t,c,m]});return{sg,z,sz,w,x:((i*.618)%1)*(W+100)-50,y:((i*.37)%1)*H+i*53,sp:6+z*16,dg:(i%2?1:-1)*.12}})}
function gal(p,t){const m=Math.min(W,H),mob=W<700,ax=mob?.5:ANb[0],ay=ANb[1],sz=ANb[2]*(mob?.75:1),tl=ANb[4],tt=p.r;let x,y;
if(p.k===3){const r=m*sz*.13*(1+.18*p.v),a=p.a+(RM?0:t*.0006)+GS;x=Math.cos(a)*r;y=Math.sin(a)*r*.4}
else{const arm=Math.floor(p.u*3),r=m*sz*(.14+Math.pow(tt,.85)*.86)*DS,a=arm*2.0944+tt*5.2+(RM?0:t*(.00022/(.25+tt)+.00004))+GS+(p.v-.5)*.45/(.3+tt);x=Math.cos(a)*r;y=Math.sin(a)*r*.5}
const c=Math.cos(tl),sn=Math.sin(tl);return[(ax-.5)*W+x*c-y*sn,(ay-.5)*H+x*sn+y*c]}
let ST=[];const SC=['{','}','<','>','/','0','1',';','=','+','*','.',':','#'];
function buildStars(){const n=RM?120:W<700?110:W<1100?200:300;if(ST.length===n)return;ST=Array.from({length:n},()=>{const z=Math.random();return{x:Math.random(),y:Math.random(),z,b:z<.4?0:z<.8?1:2,ch:SC[Math.floor(Math.random()*SC.length)],k:Math.random()<.12?3:Math.floor(Math.random()*3),tw:Math.random()*6.28,sp:.3+z*.9,dx:Math.random()<.5?-1:1}});ST.sort((a,b)=>a.b-b.b)}
function chap(){const y=scrollY+H*.5;let c=0;for(let i=0;i<secs.length;i++){const s=secs[i];if(y>=s.t)c=i+Math.min(1,(y-s.t)/Math.max(1,s.h))}return c}
const mix=(a,b,t)=>a+(b-a)*t,sm=t=>t*t*(3-2*t);
/* formation k -> target in px offsets from center */
function form(k,p,t){const m=Math.min(W,H),a=p.a+(RM?0:t*.00012*(.4+p.z)*(k==1||k==6?3:1)),s=W<700?.9:1;
 switch(k){
 case 0:return[(p.u-.5)*W*1.1,(p.v-.5)*H*1.1+Math.sin(a*3+t*.0003)*14];
 case 1:{const r=m*(.2+p.r*.16)*s;return[Math.cos(a)*r*1.5,Math.sin(a)*r*.8]}
 case 2:return[(p.u-.5)*W*(.6+p.z*1.2),(p.v-.5)*H*(.6+p.z*1.2)];
 case 3:{const c=p.k%2?.28:-.28,r=m*(.06+p.r*.22);return[c*W+Math.cos(a)*r*1.4,Math.sin(a)*r*.6]}
 case 4:{const l=(p.u*W*1.2+t*.04*(.3+p.z))%(W*1.2)-W*.6;return[l,((p.k*3+Math.floor(p.v*7))-4)*H*.06+Math.sin(l*.006+p.v*6)*H*.05]}
 case 5:{const per=p.u*4,e=Math.floor(per),f=per-e,w=W*.42,h=H*.3;return[[mix(-w,w,f),-h],[w,mix(-h,h,f)],[mix(w,-w,f),h],[-w,mix(h,-h,f)]][e%4].map((v,i)=>v+(i?Math.sin(a*4)*5:Math.cos(a*4)*5))}
 default:{const r=m*(.05+p.r*.12);return[Math.cos(a)*r*1.4,Math.sin(a)*r*.7+H*.04]}}}
function frame(t){raf=requestAnimationFrame(frame);if(!run)return;
 sc=scrollY;let c=chap();
 const intr=done?1:Math.min(1,t/2400);c=Math.max(c,(1-(1-intr)*(1-intr))*.5*(sc<H?1:0));
 cc=RM?c:cc+(c-cc)*.08;const k=Math.min(5,Math.floor(cc)),f=sm(Math.max(0,Math.min(1,(cc-k-.55)/.45)));ANb=AN[k].map((v,i)=>mix(v,AN[k+1][i],f));const sn=Math.sin(Math.PI*f);DS=1+.5*sn;GA=ANb[3]*(1-.55*sn)*(W<700?.65:1);GS=RM?0:sc*.0009;
 cx.clearRect(0,0,W,H);const ox=W/2,oy=H/2,lerp=RM?1:.07;
 const dt=Math.min(.05,(t-(frame.l||t))/1000);frame.l=t;
 {const mob=W<700,bx=(mob?.5:ANb[0])*W,by=ANb[1]*H,br=Math.min(W,H)*ANb[2]*(mob?.75:1)*.16,lt=LF<1,gr=cx.createRadialGradient(bx,by,br*.2,bx,by,br*2.4);gr.addColorStop(0,'rgba('+(lt?'15,23,42':'0,0,0')+','+((lt?.3:.6)*GA)+')');gr.addColorStop(.4,'rgba('+BH+','+((lt?.10:.11)*GA)+')');gr.addColorStop(1,'rgba('+BH+',0)');cx.fillStyle=gr;cx.fillRect(bx-br*2.5,by-br*2.5,br*5,br*5)}
 {const mob=W<700,bx=(mob?.5:ANb[0])*W,by=ANb[1]*H,R0=Math.min(W,H)*ANb[2]*(mob?.75:1)*1.3,hz=R0*.08,tt=RM?0:t;let lb=-1;cx.textAlign='center';
 for(const q of ST){let X=(((q.x*W+tt*.004*q.sp*q.dx)%W)+W)%W,Y=(((q.y*H-sc*(.04+q.z*.22)+tt*.003*q.sp)%H)+H)%H;
  const dx=X-bx,dy=Y-by,r=Math.hypot(dx,dy)||1,w=Math.exp(-r/R0),ph=w*1.3+(RM?0:(GS*.5+tt*.00006)*w),c1=Math.cos(ph),s2=Math.sin(ph),r2=r*(1-.3*w);
  X=bx+(dx*c1-dy*s2)/r*r2;Y=by+(dx*s2+dy*c1)/r*r2;
  const a=(.1+q.z*.3)*(.6+.4*Math.sin(tt*.0015*q.sp+q.tw))*Math.min(1,Math.max(0,(r2-hz)/(hz*2)))*LF;if(a<.01)continue;
  if(q.b!==lb){cx.font=(6+q.b*2.5)+'px "JetBrains Mono",ui-monospace,monospace';lb=q.b}
  cx.globalAlpha=a;cx.fillStyle=COL[q.k];cx.fillText(q.ch,X,Y)}}
 for(const f of CF){if(!RM){f.y-=f.sp*dt;f.x+=f.sp*f.dg*dt}if(f.x>W+40)f.x=-f.w-20;if(f.x<-f.w-60)f.x=W+20;
  const per=H+120,yy=(((f.y-sc*f.z*.12)%per)+per)%per-60,fade=Math.max(0,Math.min(1,Math.min(yy,H-yy)/90));if(fade<=0)continue;
  cx.font=f.sz+'px "JetBrains Mono",ui-monospace,monospace';cx.globalAlpha=(.07+f.z*.13)*fade;let x=f.x;for(const s of f.sg){cx.fillStyle=CC[s[1]];cx.fillText(s[0],x,yy);x+=s[2]}}
 for(const p of P){const A=gal(p,t),tx=A[0],ty=A[1];
  p.x+=(tx-p.x)*lerp;p.y+=(ty-p.y)*lerp;
  const par=(p.z-.5)*(sc%4000)*.03*(RM?0:1),px=ox+p.x,py=oy+p.y-par;
  cx.globalAlpha=(.35+p.z*.5)*LF*GA;cx.fillStyle=COL[p.k];cx.textAlign='center';cx.font=Math.round(10+p.z*6)+'px "JetBrains Mono",ui-monospace,monospace';cx.fillText(p.s,px,py)}
 cx.globalAlpha=1}
function onScroll(){hd.classList.toggle('s',scrollY>40);const y=scrollY+120;SEC.forEach((s,i)=>{const a=document.querySelector(`.links a[href="#${s.id}"]`);if(a)a.classList.toggle('on',y>=s.offsetTop&&y<s.offsetTop+s.offsetHeight)})}
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{build();onScroll()},120)},{passive:true});
addEventListener('scroll',onScroll,{passive:true});
document.addEventListener('visibilitychange',()=>{run=!document.hidden});
addEventListener('pagehide',()=>cancelAnimationFrame(raf));
/* theme: dark | light | system */
const root=document.documentElement,mq=matchMedia('(prefers-color-scheme:light)');let pref='system';
try{const s=localStorage.getItem('mk_tech_theme');if(s==='dark'||s==='light')pref=s}catch(e){}
function applyTheme(){root.dataset.theme=pref==='system'?(mq.matches?'light':'dark'):pref;document.querySelectorAll('.th button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===pref));const m=$('#tc');if(m)m.content=getComputedStyle(root).getPropertyValue('--bg').trim();readCols()}
mq.addEventListener('change',()=>{if(pref==='system')applyTheme()});
document.querySelectorAll('.th button').forEach(b=>b.onclick=()=>{pref=b.dataset.t;try{pref==='system'?localStorage.removeItem('mk_tech_theme'):localStorage.setItem('mk_tech_theme',pref)}catch(e){}applyTheme()});
applyTheme();
build();onScroll();raf=requestAnimationFrame(frame);
addEventListener('load',build);
/* ===== Contact form (honest: no fake success) ===== */
const F=$('#cf'),st=$('#st');
function msg(t,c){st.hidden=false;st.className=c;st.textContent=t}
F.addEventListener('submit',async e=>{e.preventDefault();
 const v={name:F.name.value.trim(),email:F.email.value.trim(),service:F.service.value,message:F.message.value.trim()};
 $('#e1').textContent=v.name?'':'Please enter your name.';
 $('#e2').textContent=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)?'':'Please enter a valid email.';
 $('#e3').textContent=v.message.length>=10?'':'Please describe your project (at least 10 characters).';
 if($('#e1').textContent||$('#e2').textContent||$('#e3').textContent){msg('Please fix the highlighted fields.','bad');return}
 if(!CONFIG.formEndpoint&&/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(CONFIG.email||"")){const bd="Name: "+v.name+"\nEmail: "+v.email+"\nProject type: "+(v.service||"-")+"\n\n"+v.message;msg("Your email app should open with the message prepared. Nothing is sent until you press send there.","ok");location.href="mailto:"+CONFIG.email+"?subject="+encodeURIComponent("MK.TECH project enquiry from "+v.name)+"&body="+encodeURIComponent(bd);return}
 if(!CONFIG.formEndpoint){msg('This form is not connected yet. Nothing was sent. Set CONFIG.formEndpoint in the site configuration'+(CONFIG.email?' or email '+CONFIG.email:'')+'.','bad');return}
 const b=$('#sb');b.disabled=true;b.textContent='Sending…';st.hidden=true;
 try{const r=await fetch(CONFIG.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(v)});
  if(!r.ok)throw 0;msg('Thank you. Your message was sent.','ok');F.reset()}catch(x){msg('Sending failed. Please try again later.','bad')}
 b.disabled=false;b.textContent='Discuss a project'});
