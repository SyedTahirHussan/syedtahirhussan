/* ============================================================
   TWEAKS — vanilla panel wired to the host edit-mode protocol
   ============================================================ */
(function(){
  "use strict";
  var LS='sth-tweaks';
  var ACCENTS={
    brass:    {n:"Brass",     a:"#d8a43f", b:"#e9c074", d:"#a9781f", g:"216,164,63"},
    starlight:{n:"Starlight", a:"#7fb1e6", b:"#a9cdf5", d:"#4f86c4", g:"127,177,230"},
    verdigris:{n:"Verdigris", a:"#54c7b8", b:"#86e3d6", d:"#2f8e82", g:"84,199,184"},
    ember:    {n:"Ember",     a:"#e2683f", b:"#f0926f", d:"#b54a26", g:"226,104,63"},
    amethyst: {n:"Amethyst",  a:"#b48bff", b:"#cdb0ff", d:"#8456d6", g:"180,139,255"}
  };
  var FONTS={
    instrument:{n:"Instrument Serif", css:"'Instrument Serif',Georgia,serif"},
    newsreader:{n:"Newsreader",       css:"'Newsreader',Georgia,serif"},
    fraunces:  {n:"Spectral",         css:"'Spectral',Georgia,serif"}
  };
  var defaults={ accent:"brass", font:"instrument", motion:"full" };
  var state=Object.assign({},defaults);
  try{ var s=JSON.parse(localStorage.getItem(LS)||'{}'); state=Object.assign(state,s); }catch(e){}

  // dynamic font loading for alt display faces
  var fontLink=document.createElement('link'); fontLink.rel='stylesheet';
  fontLink.href='https://fonts.googleapis.com/css2?family=Newsreader:ital@0;1&family=Spectral:ital,wght@0,400;1,400&display=swap';
  document.head.appendChild(fontLink);

  function apply(){
    var root=document.documentElement;
    var ac=ACCENTS[state.accent]||ACCENTS.brass;
    root.style.setProperty('--brass',ac.a);
    root.style.setProperty('--brass-2',ac.b);
    root.style.setProperty('--brass-deep',ac.d);
    root.style.setProperty('--glow','rgba('+ac.g+',.5)');
    var f=FONTS[state.font]||FONTS.instrument;
    root.style.setProperty('--f-disp',f.css);
    window.STH_calm = (state.motion==='calm');
    root.setAttribute('data-motion', state.motion);
    window.dispatchEvent(new Event('sth:theme'));
    try{ localStorage.setItem(LS, JSON.stringify(state)); }catch(e){}
  }
  apply();

  // tie the constellation group colors loosely to accent? keep group palette stable.

  /* ---------- panel UI ---------- */
  var STYLE='\
  .twkp{position:fixed;right:18px;bottom:18px;z-index:2147483646;width:268px;\
    background:color-mix(in srgb,var(--ink-2,#0e1016) 94%,transparent);color:var(--bone,#ece6d8);\
    border:1px solid var(--line-2,rgba(236,230,216,.18));border-radius:14px;\
    -webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);\
    box-shadow:0 30px 70px -20px rgba(0,0,0,.8);overflow:hidden;\
    font-family:var(--f-body,system-ui);display:none}\
  .twkp.open{display:block}\
  .twkp-hd{display:flex;align-items:center;justify-content:space-between;padding:14px 12px 14px 16px;\
    border-bottom:1px solid var(--line,rgba(236,230,216,.1));cursor:move;user-select:none}\
  .twkp-hd b{font-family:var(--f-mono,monospace);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--brass,#d8a43f)}\
  .twkp-x{appearance:none;border:0;background:transparent;color:var(--bone-dim,#a39e90);width:24px;height:24px;\
    border-radius:6px;cursor:pointer;font-size:14px;line-height:1}\
  .twkp-x:hover{background:var(--panel-2,rgba(255,255,255,.05));color:var(--bone)}\
  .twkp-body{padding:16px;display:flex;flex-direction:column;gap:18px}\
  .twkp-sect{font-family:var(--f-mono,monospace);font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;\
    color:var(--faint,#6b6657);margin-bottom:9px}\
  .twkp-chips{display:flex;gap:7px}\
  .twkp-chip{flex:1;height:30px;border-radius:8px;border:1px solid var(--line-2);cursor:pointer;position:relative;\
    transition:transform .12s,box-shadow .12s}\
  .twkp-chip:hover{transform:translateY(-1px)}\
  .twkp-chip[data-on="1"]{box-shadow:0 0 0 2px var(--ink-2),0 0 0 3.5px currentColor}\
  .twkp-seg{display:flex;padding:3px;border-radius:9px;background:var(--panel-2,rgba(255,255,255,.05));gap:2px}\
  .twkp-seg button{flex:1;border:0;background:transparent;color:var(--bone-dim);font-family:var(--f-mono,monospace);\
    font-size:10.5px;letter-spacing:.04em;padding:7px 4px;border-radius:6px;cursor:pointer;transition:.18s}\
  .twkp-seg button[data-on="1"]{background:var(--brass);color:var(--ink,#0a0b0f);font-weight:700}\
  .twkp-row{display:flex;align-items:center;justify-content:space-between;gap:10px}\
  .twkp-row .lbl{font-size:12.5px;color:var(--bone)}\
  .twkp-toggle{position:relative;width:38px;height:21px;border:0;border-radius:999px;background:var(--line-2);cursor:pointer;transition:.18s}\
  .twkp-toggle[data-on="1"]{background:var(--brass)}\
  .twkp-toggle i{position:absolute;top:2px;left:2px;width:17px;height:17px;border-radius:50%;background:#fff;transition:transform .18s}\
  .twkp-toggle[data-on="1"] i{transform:translateX(17px)}\
  .twkp-note{font-family:var(--f-mono,monospace);font-size:9.5px;letter-spacing:.04em;color:var(--faint);line-height:1.6}';
  var st=document.createElement('style'); st.textContent=STYLE; document.head.appendChild(st);

  var panel=document.createElement('div'); panel.className='twkp'; panel.setAttribute('data-omelette-chrome','');
  panel.innerHTML=
    '<div class="twkp-hd" id="twkpHd"><b>Tweaks</b><button class="twkp-x" id="twkpX" aria-label="Close">✕</button></div>'+
    '<div class="twkp-body">'+
      '<div><div class="twkp-sect">Accent</div><div class="twkp-chips" id="twkpAccent"></div></div>'+
      '<div><div class="twkp-sect">Display typeface</div><div class="twkp-seg" id="twkpFont"></div></div>'+
      '<div><div class="twkp-sect">Motion</div><div class="twkp-seg" id="twkpMotion"></div></div>'+
      '<div class="twkp-row"><span class="lbl">Light theme</span><button class="twkp-toggle" id="twkpTheme" aria-label="Toggle theme"><i></i></button></div>'+
      '<div class="twkp-note">Choices persist on this device. Press ⌘K / Ctrl K for the command palette.</div>'+
    '</div>';
  document.body.appendChild(panel);

  var accWrap=panel.querySelector('#twkpAccent');
  Object.keys(ACCENTS).forEach(function(k){
    var c=ACCENTS[k], b=document.createElement('button');
    b.className='twkp-chip'; b.title=c.n; b.style.background=c.a; b.style.color=c.a;
    b.dataset.k=k; b.dataset.on = state.accent===k?'1':'0';
    b.addEventListener('click', function(){ state.accent=k; apply(); syncAccent(); });
    accWrap.appendChild(b);
  });
  function syncAccent(){ Array.prototype.forEach.call(accWrap.children,function(b){ b.dataset.on = state.accent===b.dataset.k?'1':'0'; b.style.color=ACCENTS[b.dataset.k].a; }); }

  function buildSeg(wrap, map, cur, cb){
    Object.keys(map).forEach(function(k){
      var b=document.createElement('button'); b.textContent=map[k].n||map[k];
      b.dataset.k=k; b.dataset.on = cur()===k?'1':'0';
      b.addEventListener('click', function(){ cb(k); Array.prototype.forEach.call(wrap.children,function(x){x.dataset.on=cur()===x.dataset.k?'1':'0';}); });
      wrap.appendChild(b);
    });
  }
  buildSeg(panel.querySelector('#twkpFont'), {instrument:{n:"Serif"},newsreader:{n:"News"},fraunces:{n:"Spectral"}}, function(){return state.font;}, function(k){ state.font=k; apply(); });
  buildSeg(panel.querySelector('#twkpMotion'), {full:{n:"Full"},calm:{n:"Calm"}}, function(){return state.motion;}, function(k){ state.motion=k; apply(); });

  var themeToggle=panel.querySelector('#twkpTheme');
  function syncTheme(){ themeToggle.dataset.on = document.documentElement.getAttribute('data-theme')==='light'?'1':'0'; }
  syncTheme();
  themeToggle.addEventListener('click', function(){
    var next=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
    if(window.STH_setTheme) window.STH_setTheme(next); syncTheme();
  });
  window.addEventListener('sth:theme', syncTheme);

  /* ---------- drag ---------- */
  var hd=panel.querySelector('#twkpHd');
  hd.addEventListener('mousedown', function(e){
    if(e.target.id==='twkpX') return;
    var r=panel.getBoundingClientRect(), sx=e.clientX, sy=e.clientY;
    var sr=window.innerWidth-r.right, sb=window.innerHeight-r.bottom;
    function mv(ev){ panel.style.right=Math.max(8,sr-(ev.clientX-sx))+'px'; panel.style.bottom=Math.max(8,sb-(ev.clientY-sy))+'px'; }
    function up(){ window.removeEventListener('mousemove',mv); window.removeEventListener('mouseup',up); }
    window.addEventListener('mousemove',mv); window.addEventListener('mouseup',up);
  });

  /* ---------- host protocol ---------- */
  function show(){ panel.classList.add('open'); }
  function hide(){ panel.classList.remove('open'); }
  panel.querySelector('#twkpX').addEventListener('click', function(){ hide(); try{window.parent.postMessage({type:'__edit_mode_dismissed'},'*');}catch(e){} });
  window.addEventListener('message', function(e){
    var t=e&&e.data&&e.data.type;
    if(t==='__activate_edit_mode') show();
    else if(t==='__deactivate_edit_mode') hide();
  });
  try{ window.parent.postMessage({type:'__edit_mode_available'},'*'); }catch(e){}
})();
