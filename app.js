(()=>{const S=[...document.querySelectorAll('.s')],st=document.getElementById('stage'),$=id=>document.getElementById(id),R=matchMedia('(prefers-reduced-motion:reduce)').matches;
let c=-1,busy=0;
const TY=[0,'camera','sweep','sweep','torn','camera','portal','sweep','sweep','sweep','sweep','sweep','torn','sweep','portal','camera','finale'];
const PAL=[['#ecc45a','#dcbba4'],['#a9bfdc','#efdcb6'],['#e8b2a6','#f3dea4'],['#b4cfb8','#eadab0']];
S.forEach((s,i)=>{s.querySelectorAll('.r').forEach((e,j)=>e.style.setProperty('--i',j));const p=PAL[i%4];s.style.setProperty('--b1',p[0]);s.style.setProperty('--b2',p[1]);
const n=(s.dataset.ch||'').slice(0,2);s.insertAdjacentHTML('afterbegin','<div class="bg"><i class="b1"></i><i class="b2"></i>'+(n?'<span class="gh">'+n+'</span>':'')+'</div>')});
function fit(){const k=Math.min(innerWidth/1920,innerHeight/1080);st.style.transform='scale('+k+')';st.style.left=(innerWidth-1920*k)/2+'px';st.style.top=(innerHeight-1080*k)/2+'px'}
function ui(s){st.classList.toggle('dk',s.classList.contains('dark'));st.classList.toggle('hide',s.classList.contains('cv'));
$('ch').textContent=s.dataset.ch||'';$('who').textContent=s.dataset.who||'';$('num').textContent=String(c+1).padStart(2,'0')+' / '+String(S.length).padStart(2,'0');
$('bar').style.width=((c+1)/S.length*100)+'%';$('hint').style.opacity=c===0?1:0;history.replaceState(null,'','#'+(c+1))}
function sweep(D){if(R)return;$('sw').animate([{transform:'translateX(-120%) skewX(-14deg)',opacity:.9},{transform:'translateX(560%) skewX(-14deg)',opacity:.9}],{duration:D*.9,easing:'cubic-bezier(.45,0,.2,1)'})}
const ease=p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
function go(n){n=Math.max(0,Math.min(S.length-1,n));if(n===c||busy)return;
const prev=c>=0?S[c]:null,nx=S[n],dir=n>c?1:-1,ty=TY[n]||'camera';c=n;ui(nx);
if(!prev||R){S.forEach(s=>s.classList.remove('on','out'));nx.classList.add('on');return}
busy=1;prev.classList.remove('on');prev.classList.add('out');nx.classList.add('on');nx.style.zIndex=3;prev.style.zIndex=1;
const D=ty==='finale'?2000:1400,E='cubic-bezier(.65,0,.2,1)',o={duration:D,easing:E,fill:'both'},an=[];sweep(D);
const back=(sc,bl)=>an.push(prev.animate([{transform:'scale(1)',filter:'blur(0)',opacity:1},{transform:'scale('+sc+')',filter:'blur('+bl+'px)',opacity:.25}],o));
if(ty==='portal'||ty==='finale'){const p=ty==='finale'?'50% 50%':(dir>0?'86% 92%':'80% 92%');
an.push(nx.animate([{clipPath:'circle(0% at '+p+')'},{clipPath:'circle(150% at '+p+')'}],o));back(.88,10)}
else if(ty==='camera'){an.push(nx.animate([{transform:'scale(1.16)',filter:'blur(18px)',opacity:0},{transform:'scale(1)',filter:'blur(0)',opacity:1}],o));back(.9,12)}
else if(ty==='sweep'){const f=dir;an.push(nx.animate([{clipPath:f>0?'inset(0 0 0 100%)':'inset(0 100% 0 0)',transform:'translateX('+f*7+'%)'},{clipPath:'inset(0)',transform:'none'}],o));
an.push(prev.animate([{transform:'translateX(0)',filter:'blur(0)',opacity:1},{transform:'translateX('+(-f*14)+'%)',filter:'blur(7px)',opacity:.3}],o))}
else{const off=Array.from({length:24},()=>Math.random()*7),t0=performance.now();back(.95,6);
(function f(t){const p=Math.min(1,(t-t0)/D),b=ease(p)*118-10;const pts=off.map((q,i)=>(dir>0?100-(b+q):b+q).toFixed(2)+'% '+(i/23*100).toFixed(1)+'%').join(',');
nx.style.clipPath=dir>0?'polygon(100% 0,'+pts+',100% 100%)':'polygon(0 0,'+pts+',0 100%)';if(p<1)requestAnimationFrame(f)})(t0)}
setTimeout(()=>{prev.classList.remove('out');an.forEach(a=>a.cancel());nx.style.clipPath='';prev.style.zIndex=nx.style.zIndex='';busy=0},D+80)}
function fs(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()}
addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey)return;const k=e.key;
if(['ArrowRight','ArrowDown','PageDown',' ','Enter'].includes(k)){e.preventDefault();if(!e.repeat)go(c+1)}
else if(['ArrowLeft','ArrowUp','PageUp','Backspace'].includes(k)){e.preventDefault();if(!e.repeat)go(c-1)}
else if(k==='Home'){e.preventDefault();go(0)}else if(k==='End'){e.preventDefault();go(S.length-1)}else if(k==='f'||k==='F')fs()});
addEventListener('mousemove',e=>{st.style.setProperty('--mx',(e.clientX/innerWidth-.5)*2);st.style.setProperty('--my',(e.clientY/innerHeight-.5)*2)});
$('prev').onclick=()=>go(c-1);$('next').onclick=()=>go(c+1);$('fs').onclick=fs;addEventListener('resize',fit);fit();
const cv=$('dust'),cx=cv.getContext('2d'),P=Array.from({length:48},()=>({x:Math.random()*1920,y:Math.random()*1080,r:1+Math.random()*2.6,vx:(Math.random()-.5)*.25,vy:-.1-Math.random()*.3,a:Math.random()*6.28}));
(function d(){cx.clearRect(0,0,1920,1080);const dk=st.classList.contains('dk');P.forEach(p=>{p.x+=p.vx+Math.sin(p.a)*.15;p.y+=p.vy;p.a+=.012;if(p.y<-10){p.y=1090;p.x=Math.random()*1920}
cx.fillStyle=(dk?'rgba(245,220,150,':'rgba(184,138,0,')+(.16+.3*Math.abs(Math.sin(p.a*2)))+')';cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.3);cx.fill()});if(!R)requestAnimationFrame(d)})();
go((parseInt(location.hash.slice(1))||1)-1)})();
