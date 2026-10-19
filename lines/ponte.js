const {Cam,fit,proj,facing,rings,prism,solid,put,mk,seg,disposer,pointer,register,tween,tset,tval,tdone,reducedMotion} = HL;
function mount({stage,svg,read}, value) {
 const bag=disposer(); let intensity=value, active=false, started=performance.now();
 const C=Cam(45,.5,1.55); fit(C,[[0,0,0],[160,42,0],[0,0,85],[160,42,85]],200,166);
 const P=proj(C), front=facing(C), root=mk('g',{},svg);
 function block(parent,x0,y0,x1,y1,z0,z1,r=1.5){const [a,b]=rings(x0,y0,x1,y1,r,.8), s=solid(parent);put(s,prism(P,front,a,b,z0,z1));return {s,a,b,z0,z1};}
 const foundations=mk('g',{},root), supports=mk('g',{},root), deck=mk('g',{},root), rails=mk('g',{},root);
 [25,135].forEach(x=>block(foundations,x-13,1,x+13,41,0,5,2));
 const pillars=[25,135].map(x=>block(supports,x-7,8,x+7,34,5,53,2));
 const slab=block(deck,0,0,160,42,53,62,2);
 function rail(y){const g=mk('g',{},rails);let d=seg(P(3,y,75),P(157,y,75))+seg(P(3,y,69),P(157,y,69)); for(let x=3;x<=157;x+=22) d+=seg(P(x,y,62),P(x,y,75));mk('path',{d,class:'nf sil'},g);return g;}
 const far=rail(1), near=rail(41); slab.s.sil.classList.add('hi'); read.textContent='rest';
 const ease=t=>1-Math.pow(1-Math.max(0,Math.min(1,t)),3);
 function draw(now){const t=reducedMotion()?2000:now-started; const f=ease(t/260), p=ease((t-220)/520), d=ease((t-730)/430), r1=ease((t-1140)/260), r2=ease((t-1320)/260);
 foundations.style.opacity=f; supports.style.visibility=p?'visible':'hidden';
 pillars.forEach(b=>put(b.s,prism(P,front,b.a,b.b,5,5+48*p)));
 deck.style.visibility=d?'visible':'hidden'; deck.setAttribute('transform',`translate(0 ${-(15+20*intensity)*(1-d)})`);
 far.style.opacity=r1; near.style.opacity=r2;
 return t<1580;
 }
 const loop=register(stage,(_dt,now)=>draw(now)); bag.add(loop.unregister); draw(started); loop.wake();
 const replay=document.createElement('button'); replay.type='button'; replay.textContent='Replay'; replay.setAttribute('aria-label','Repetir montagem'); document.querySelector('.controls').append(replay);
 const restart=()=>{started=performance.now();draw(started);loop.wake()}; replay.addEventListener('click',restart); bag.add(()=>{replay.removeEventListener('click',restart);replay.remove()});
 bag.add(pointer(stage,{move:([x,y])=>{const a=x>80&&x<320&&y>75&&y<215;if(a!==active){active=a;slab.s.sil.classList.toggle('hi',true);read.textContent=a?'tabuleiro':'rest';}},leave:()=>{active=false;read.textContent='rest'}}));
 bag.add(()=>svg.replaceChildren()); return {set:v=>{intensity=v},destroy:bag.dispose};
}
hairline({name:'ponte',means:'Uma ponte de concreto em montagem para o estado vazio de orçamentos.',rules:[1,3,4,6,9,10],range:[0,.5,1],tour:[[150,145],[200,130],[250,160],null],mount});

