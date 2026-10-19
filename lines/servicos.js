const {mk,disposer,pointer,register,reducedMotion}=HL;
function mount({stage,svg,read}){
 const bag=disposer(), root=mk('g',{},svg);
 const surface=mk('g',{'aria-label':'superfície'},root);
 // Two individual masonry blocks, laid end to end with a narrow joint.
 const brick1=mk('g',{'aria-label':'primeiro tijolo'},surface);
 mk('path',{class:'sil',d:'M74 199 L179 145 Q181 144 184 146 L243 176 L138 231 L138 261 L76 231 Q73 230 73 227 L73 201 Q73 200 74 199 Z'},brick1);
 mk('path',{class:'nf lo',d:'M74 199 L138 231 L243 176 M138 231 L138 261'},brick1);
 const brick2=mk('g',{'aria-label':'segundo tijolo'},surface);
 mk('path',{class:'sil',d:'M141 233 L246 179 L307 209 Q310 211 307 213 L206 265 Q203 266 201 265 L141 235 L141 263 L201 293 Q203 294 206 293 L306 241 Q309 240 309 237 L309 211'},brick2);
 mk('path',{class:'nf lo',d:'M141 233 L202 264 Q204 265 206 264 L308 211 M203 265 L203 293'},brick2);
 const defs=mk('defs',{},svg), clip=mk('clipPath',{id:'mortar-reveal'},defs), reveal=mk('path',{d:''},clip);
 const mortar=mk('g',{'aria-label':'argamassa','clip-path':'url(#mortar-reveal)'},root);
 // The strip follows the long axis of both top faces, across their joint.
 mk('path',{d:'M106 198 Q111 201 117 201 L132 209 Q138 210 143 214 L160 222 Q166 223 171 227 L188 235 Q194 236 199 240 L207 244 Q211 246 215 244 L229 237 Q234 237 239 233 L253 226 L253 229 L239 236 Q234 240 229 240 L215 247 Q211 249 207 247 L199 243 Q194 239 188 238 L171 230 Q166 226 160 225 L143 217 Q138 213 132 212 L117 204 Q111 204 106 201 Z',fill:'var(--ink)','fill-opacity':'.13',stroke:'var(--ink)','stroke-opacity':'.55','stroke-width':'.7','stroke-linejoin':'round'},mortar);
 mk('path',{d:'M106 198 Q108 195 114 194 L126 188 Q132 187 137 183 L151 176 Q157 176 162 172 Q166 170 171 173 L184 179 Q189 180 194 184 L211 192 Q217 193 222 197 L239 205 Q245 206 250 210 L259 215 Q262 217 258 219 L248 224 Q243 225 239 228 L225 235 Q219 236 215 240 L207 244 Q203 246 199 243 L188 238 Q183 237 178 233 L162 225 Q156 224 151 220 L134 212 Q128 211 123 207 L112 202 Q107 202 106 198 Z',fill:'var(--ink)','fill-opacity':'.20',stroke:'var(--ink)','stroke-opacity':'.7','stroke-width':'.8','stroke-linejoin':'round'},mortar);
 mk('path',{class:'nf lo',d:'M116 197 Q123 195 130 192 M149 211 Q156 209 163 206 M185 228 Q192 226 199 223 M218 216 Q225 214 231 211'},mortar);
 const tool=mk('g',{'aria-label':'colher de pedreiro'},root);
 const blade=mk('g',{'aria-label':'lâmina'},tool);
 mk('path',{class:'sil hi',d:'M180 220 Q175 222 172 219 Q170 216 172 212 L197 161 Q200 155 207 153 Q211 152 216 153 L252 161 Q258 162 258 166 Q258 169 254 172 Z'},blade);
 mk('path',{class:'nf lo',d:'M176 220 Q179 223 183 222 L255 175 Q259 172 258 168'},blade);
 const shank=mk('g',{'aria-label':'haste'},tool);
 mk('path',{class:'sil',d:'M221 166 Q219 168 217 166 Q216 164 218 162 L224 156 Q226 154 223 152 L220 150 Q217 148 219 144 L228 126 L233 129 L224 146 Q223 147 225 148 L228 150 Q232 153 229 157 Z'},shank);
 const handle=mk('g',{'aria-label':'cabo'},tool);
 mk('path',{class:'sil',d:'M227 128 Q225 126 226 123 L244 84 Q247 78 252 79 Q257 80 259 84 Q260 87 258 91 L239 130 Q237 134 233 133 Z'},handle);
 mk('path',{class:'nf lo',d:'M227 122 Q232 121 238 126 M243 87 Q249 86 257 91 M231 130 Q233 128 238 130'},handle);
 let started=performance.now();
 const ease=t=>{t=Math.max(0,Math.min(1,t));return 1-Math.pow(1-t,3)};
 function draw(now){
  const t=reducedMotion()?1500:now-started;
  const prep=ease(t/200), approach=ease((t-120)/370), spread=ease((t-440)/700), finish=ease((t-1140)/260);
  surface.style.opacity=prep; tool.style.opacity=ease((t-120)/120);
  const dx=-75+120*spread, dy=-37+59*spread;
  tool.setAttribute('transform',`translate(${dx} ${dy-18*(1-approach)-5*finish})`);
  const a=172+dx, b=219+dy, c=254+dx, d=172+dy;
  reveal.setAttribute('d',spread>0?`M -200 -200 L ${c+600} ${d-344} L ${c} ${d} L ${a} ${b} L ${a-600} ${b+344} L -200 600 Z`:''); return t<1400;
 }
 const loop=register(stage,(_dt,now)=>draw(now));bag.add(loop.unregister);draw(started);loop.wake();
 const replay=document.createElement('button');replay.type='button';replay.textContent='Replay';replay.setAttribute('aria-label','Repetir anima??o');document.querySelector('.controls').append(replay);
 const restart=()=>{started=performance.now();draw(started);loop.wake()};replay.addEventListener('click',restart);bag.add(()=>{replay.removeEventListener('click',restart);replay.remove()});
 read.textContent='rest';
 bag.add(pointer(stage,{move:([x,y])=>{read.textContent=x>160&&x<270&&y>75&&y<225?'colher':'rest'},leave:()=>{read.textContent='rest'}}));
 bag.add(()=>svg.replaceChildren()); return {set(){},destroy:bag.dispose};
}
hairline({name:'servicos',means:'Uma colher de pedreiro espalha argamassa sobre uma pequena superfície de alvenaria.',rules:[4,5,6,9,10],range:[0,.5,1],tour:[[210,170],[230,120],[190,200],null],mount});

