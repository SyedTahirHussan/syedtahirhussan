/* ============================================================
   PORTFOLIO — interactions & renderers
   ============================================================ */
(function(){
  "use strict";
  var D = window.STH;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  var isMac = /Mac|iPhone|iPad/.test(navigator.platform) || /Mac/.test(navigator.userAgent);
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };

  $('#yr').textContent = new Date().getFullYear();
  var kb = $('#kbdHint'); if(kb) kb.textContent = isMac ? '⌘K' : 'Ctrl K';

  /* ---------- render experience ---------- */
  var log = $('#log');
  D.experience.forEach(function(e,i){
    var item = document.createElement('div');
    item.className = 'log-item reveal' + (i%2?' d1':'');
    var visible = e.pts.slice(0,3), hidden = e.pts.slice(3);
    var lis = visible.map(function(p){return '<li>'+p+'</li>';}).join('') +
              hidden.map(function(p){return '<li class="hidden-pts">'+p+'</li>';}).join('');
    var moreBtn = hidden.length ? '<button class="log-more" type="button">+ '+hidden.length+' more</button>' : '';
    item.innerHTML =
      '<div class="log-card">'+
        '<div class="log-head"><div class="log-role">'+e.role+'</div><div class="log-date">'+e.date+' · '+e.span+'</div></div>'+
        '<div class="log-co"><b>'+e.co+'</b> <span class="loc">— '+e.loc+'</span></div>'+
        '<ul>'+lis+'</ul>'+ moreBtn +
      '</div>';
    if(hidden.length){
      var card = item.querySelector('.log-card');
      var btn = item.querySelector('.log-more');
      btn.addEventListener('click', function(){
        var open = card.classList.toggle('exp');
        btn.textContent = open ? '— less' : '+ '+hidden.length+' more';
      });
    }
    log.appendChild(item);
  });

  /* ---------- render certifications ---------- */
  var grid = $('#certGrid'), bar = $('#certBar');
  var filters = [{k:'all',l:'All'}].concat(D.mainProviders.map(function(p){return {k:p,l:p};}),[{k:'other',l:'Other'}]);
  var active='all';
  filters.forEach(function(f){
    var b=document.createElement('button');
    b.className='fbtn'+(f.k==='all'?' on':''); b.textContent=f.l; b.dataset.k=f.k;
    b.addEventListener('click', function(){ active=f.k; $$('.fbtn',bar).forEach(function(x){x.classList.toggle('on',x.dataset.k===f.k);}); renderCerts(); });
    bar.appendChild(b);
  });
  var countEl=document.createElement('span'); countEl.className='cert-count'; bar.appendChild(countEl);
  function renderCerts(){
    var list=D.certs.filter(function(c){
      if(active==='all') return true;
      if(active==='other') return D.mainProviders.indexOf(c.p)===-1;
      return c.p===active;
    });
    grid.innerHTML='';
    list.forEach(function(c){
      var d=document.createElement('div'); d.className='cert';
      d.innerHTML='<span class="cdot" style="background:'+(D.providers[c.p]||'#d8a43f')+'"></span>'+
        '<div><div class="cname">'+c.n+'</div><div class="cmeta">'+c.p+(c.s?' · Specialization':'')+'</div></div>';
      grid.appendChild(d);
    });
    countEl.textContent = list.length+' / '+D.certs.length+' shown';
  }
  renderCerts();

  /* ---------- typewriter ---------- */
  var roles=['AI · ML · DL Researcher','Distinguished Engineer','LLM & Generative-AI Specialist','Cloud & Systems Architect','Doctoral Researcher','Engineering Leader'];
  var typed=$('#typed'), ri=0,ci=0,del=false;
  function type(){
    var w=roles[ri]; typed.textContent=w.substring(0,ci);
    if(!del && ci<w.length){ci++;setTimeout(type,62);}
    else if(!del && ci===w.length){del=true;setTimeout(type,1700);}
    else if(del && ci>0){ci--;setTimeout(type,28);}
    else{del=false;ri=(ri+1)%roles.length;setTimeout(type,300);}
  }
  if(reduce){ typed.textContent=roles[0]; } else type();

  /* ---------- hero starfield ---------- */
  var hc=$('#hero-canvas'), hctx=hc?hc.getContext('2d'):null;
  var sf=$('#starfield'), sfx=sf?sf.getContext('2d'):null;
  var dpr=Math.min(window.devicePixelRatio||1,2);
  var HW,HH, hstars=[], shooters=[], hmx=0,hmy=0, htick=0, hraf=null;
  function brass(a){ return 'rgba(216,164,63,'+a+')'; }
  function bone(a){ return 'rgba(236,230,216,'+a+')'; }
  function sizeHero(){
    if(!hc) return;
    HW=hc.offsetWidth; HH=hc.offsetHeight;
    hc.width=HW*dpr; hc.height=HH*dpr; hctx.setTransform(dpr,0,0,dpr,0,0);
    if(sf){ sf.width=window.innerWidth*dpr; sf.height=window.innerHeight*dpr; sf.style.width=window.innerWidth+'px'; sf.style.height=window.innerHeight+'px'; sfx.setTransform(dpr,0,0,dpr,0,0); }
    hstars=[];
    var n = HW<700?70:130;
    for(var i=0;i<n;i++){
      hstars.push({ x:Math.random()*HW, y:Math.random()*HH, z:Math.random()*0.8+0.2,
        r:Math.random()*1.3+0.2, tw:Math.random()*Math.PI*2, sp:Math.random()*0.8+0.3,
        warm:Math.random()<0.18 });
    }
  }
  function drawHero(){
    if(!hc) return;
    hctx.clearRect(0,0,HW,HH);
    var ox=(hmx-HW/2)*0.012, oy=(hmy-HH/2)*0.012;
    for(var i=0;i<hstars.length;i++){
      var s=hstars[i];
      var tw = (reduce||window.STH_calm)?0.8:(0.55+0.45*Math.sin(htick*s.sp+s.tw));
      var x=s.x+ox*s.z, y=s.y+oy*s.z;
      hctx.globalAlpha = (0.25+0.55*s.z)*tw;
      hctx.fillStyle = s.warm ? brass(1) : bone(1);
      if(s.warm){ hctx.shadowColor='rgba(216,164,63,.8)'; hctx.shadowBlur=5; }
      hctx.beginPath(); hctx.arc(x,y,s.r*(0.6+s.z),0,Math.PI*2); hctx.fill();
      hctx.shadowBlur=0;
    }
    hctx.globalAlpha=1;
    // shooting stars
    if(!reduce && !window.STH_calm){
      if(Math.random()<0.004 && shooters.length<2){
        shooters.push({ x:Math.random()*HW*0.6, y:Math.random()*HH*0.4, vx:6+Math.random()*4, vy:2+Math.random()*2, life:1 });
      }
      for(var j=shooters.length-1;j>=0;j--){
        var sh=shooters[j]; sh.x+=sh.vx; sh.y+=sh.vy; sh.life-=0.018;
        var grd=hctx.createLinearGradient(sh.x,sh.y,sh.x-sh.vx*7,sh.y-sh.vy*7);
        grd.addColorStop(0,brass(Math.max(0,sh.life))); grd.addColorStop(1,brass(0));
        hctx.strokeStyle=grd; hctx.lineWidth=1.4; hctx.beginPath();
        hctx.moveTo(sh.x,sh.y); hctx.lineTo(sh.x-sh.vx*7,sh.y-sh.vy*7); hctx.stroke();
        if(sh.life<=0||sh.x>HW||sh.y>HH) shooters.splice(j,1);
      }
    }
  }
  function heroLoop(){ htick+=0.016; drawHero(); hraf=requestAnimationFrame(heroLoop); }
  if(hc){
    sizeHero();
    if(reduce) drawHero(); else heroLoop();
    if(fine && !reduce){
      window.addEventListener('mousemove', function(e){ hmx=e.clientX; hmy=e.clientY; });
    }
    var hrt; window.addEventListener('resize', function(){ clearTimeout(hrt); hrt=setTimeout(sizeHero,160); });
    document.addEventListener('visibilitychange', function(){
      if(reduce) return;
      if(document.hidden){ if(hraf){cancelAnimationFrame(hraf);hraf=null;} }
      else if(!hraf){ heroLoop(); }
    });
  }

  /* ---------- reveal ---------- */
  var revObs=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); revObs.unobserve(e.target);} });
  },{threshold:0.12,rootMargin:'0px 0px -7% 0px'});
  $$('.reveal').forEach(function(el){ revObs.observe(el); });

  /* ---------- counters ---------- */
  var statObs=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      var el=e.target, target=+el.dataset.target, suf=el.dataset.suffix||'', t0=null, dur=1400;
      function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1), ease=1-Math.pow(1-p,3);
        el.textContent=Math.round(target*ease)+suf; if(p<1)requestAnimationFrame(step); }
      requestAnimationFrame(step); statObs.unobserve(el);
    });
  },{threshold:0.6});
  $$('[data-target]').forEach(function(el){ if(reduce){el.textContent=el.dataset.target+(el.dataset.suffix||'');} else statObs.observe(el); });

  /* ---------- nav: dock + active + scan ---------- */
  var nav=$('#nav'), scan=$('#scan'), totop=$('#totop');
  function onScroll(){
    var st=window.scrollY||document.documentElement.scrollTop;
    var h=document.documentElement.scrollHeight-window.innerHeight;
    scan.style.width=(h>0?(st/h*100):0)+'%';
    nav.classList.toggle('docked', st>40);
    totop.classList.toggle('show', st>700);
  }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  totop.addEventListener('click', function(){ window.scrollTo({top:0,behavior:reduce?'auto':'smooth'}); });

  var navLinks=$$('#navLinks a');
  var navObs=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){
      navLinks.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href')==='#'+e.target.id); });
    }});
  },{rootMargin:'-45% 0px -50% 0px'});
  navLinks.forEach(function(a){ var s=$(a.getAttribute('href')); if(s) navObs.observe(s); });

  /* ---------- mobile menu ---------- */
  var burger=$('#burger'), mm=$('#mobileMenu');
  burger.addEventListener('click', function(){ mm.classList.toggle('open'); });
  $$('a',mm).forEach(function(a){ a.addEventListener('click', function(){ mm.classList.remove('open'); }); });

  /* ---------- copy email ---------- */
  var EMAIL='tahirsherazi786@gmail.com';
  $$('.mailcopy').forEach(function(btn){
    var label=btn.querySelector('.lbl');
    btn.addEventListener('click', function(){
      function done(){ var o=label.textContent; label.textContent='Copied ✓'; setTimeout(function(){label.textContent=o;},1500); }
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(EMAIL).then(done).catch(done); }
      else { var ta=document.createElement('textarea'); ta.value=EMAIL; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy');}catch(e){} document.body.removeChild(ta); done(); }
    });
  });

  /* ---------- theme ---------- */
  var SUN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
  var themeBtn=$('#themeBtn');
  window.STH_setTheme=function(tm){
    document.documentElement.setAttribute('data-theme',tm);
    themeBtn.innerHTML = tm==='dark'?MOON:SUN;
    try{ localStorage.setItem('sth-theme',tm); }catch(e){}
    window.dispatchEvent(new Event('sth:theme'));
  };
  var savedTheme='dark'; try{ savedTheme=localStorage.getItem('sth-theme')||'dark'; }catch(e){}
  window.STH_setTheme(savedTheme);
  themeBtn.addEventListener('click', function(){
    window.STH_setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark');
  });

  /* ---------- command palette ---------- */
  var overlay=$('#cmdOverlay'), input=$('#cmdInput'), listEl=$('#cmdList');
  var ITEMS=[
    {l:'About',a:'#about',t:'go',i:'§'},
    {l:'Constellation of Work',a:'#research-map',t:'go',i:'§'},
    {l:'Flagship Systems',a:'#projects',t:'go',i:'§'},
    {l:'Experience Log',a:'#experience',t:'go',i:'§'},
    {l:'Education',a:'#education',t:'go',i:'§'},
    {l:'Research & Publications',a:'#research',t:'go',i:'§'},
    {l:'Certifications',a:'#certs',t:'go',i:'§'},
    {l:'Contact',a:'#contact',t:'go',i:'§'},
    {l:'Email Tahir',a:'mailto:'+EMAIL,t:'do',i:'@'},
    {l:'Copy email address',a:'copyemail',t:'do',i:'@'},
    {l:'Open LinkedIn',a:'https://linkedin.com/in/syedtahirhussan',t:'ext',i:'↗'},
    {l:'Open GitHub',a:'https://github.com/syedtahirhussan',t:'ext',i:'↗'},
    {l:'Message on WhatsApp',a:'https://wa.me/923161589969',t:'ext',i:'↗'},
    {l:'Toggle light / dark',a:'theme',t:'do',i:'◐'}
  ];
  var sel=0, filtered=ITEMS.slice();
  function drawCmd(){
    listEl.innerHTML='';
    if(!filtered.length){ listEl.innerHTML='<div class="cmd-empty">No matches</div>'; return; }
    filtered.forEach(function(it,idx){
      var d=document.createElement('div'); d.className='cmd-item'+(idx===sel?' sel':'');
      d.innerHTML='<span class="ci">'+it.i+'</span><span class="ct">'+it.l+'</span><span class="ck">'+it.t+'</span>';
      d.addEventListener('mouseenter',function(){sel=idx;drawCmd();});
      d.addEventListener('click',function(){exec(it);});
      listEl.appendChild(d);
    });
  }
  function openCmd(){ overlay.classList.add('open'); input.value=''; filtered=ITEMS.slice(); sel=0; drawCmd(); setTimeout(function(){input.focus();},30); }
  function closeCmd(){ overlay.classList.remove('open'); }
  function exec(it){
    closeCmd();
    if(it.a.charAt(0)==='#'){ var el=$(it.a); if(el) el.scrollIntoView({behavior:reduce?'auto':'smooth'}); }
    else if(it.a==='theme'){ themeBtn.click(); }
    else if(it.a==='copyemail'){ var c=$('#contact'); if(c) c.scrollIntoView({behavior:reduce?'auto':'smooth'}); var mc=$('.mailcopy'); if(mc) mc.click(); }
    else if(it.a.indexOf('mailto')===0){ window.location.href=it.a; }
    else { window.open(it.a,'_blank','noopener'); }
  }
  $('#cmdOpen').addEventListener('click', openCmd);
  input.addEventListener('input', function(){
    var q=input.value.toLowerCase().trim();
    filtered=ITEMS.filter(function(it){ return it.l.toLowerCase().indexOf(q)>-1 || it.t.indexOf(q)>-1; });
    sel=0; drawCmd();
  });
  document.addEventListener('keydown', function(e){
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); overlay.classList.contains('open')?closeCmd():openCmd(); return; }
    if(e.key==='/'&&!overlay.classList.contains('open')&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){ e.preventDefault(); openCmd(); return; }
    if(!overlay.classList.contains('open')) return;
    if(e.key==='Escape') closeCmd();
    else if(e.key==='ArrowDown'){ e.preventDefault(); sel=Math.min(sel+1,filtered.length-1); drawCmd(); ensure(); }
    else if(e.key==='ArrowUp'){ e.preventDefault(); sel=Math.max(sel-1,0); drawCmd(); ensure(); }
    else if(e.key==='Enter'){ e.preventDefault(); if(filtered[sel]) exec(filtered[sel]); }
  });
  function ensure(){ var el=listEl.children[sel]; if(el&&el.scrollIntoView) el.scrollIntoView({block:'nearest'}); }
  overlay.addEventListener('click', function(e){ if(e.target===overlay) closeCmd(); });
})();
