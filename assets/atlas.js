/* ============================================================
   ATLAS — interactive constellation of the work
   ============================================================ */
(function(){
  "use strict";
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canvas = document.getElementById('atlas-canvas');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var tip = document.getElementById('atlas-tip');
  var data = window.STH.constellation;
  var groups = data.groups;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W=0, H=0, t=0, hover=null, raf=null, started=false;
  var mx=-999, my=-999;
  var nodes = data.nodes.map(function(n){ return Object.assign({}, n, {px:0, py:0, tw:Math.random()*Math.PI*2}); });
  var idMap = {}; nodes.forEach(function(n){ idMap[n.id]=n; });

  // ambient stars
  var stars = [];
  function seedStars(){
    stars = [];
    var count = Math.round((W*H)/16000);
    for(var i=0;i<count;i++){
      stars.push({ x:Math.random()*W, y:Math.random()*H, r:Math.random()*1.1+0.25,
        a:Math.random()*0.5+0.15, tw:Math.random()*Math.PI*2, sp:Math.random()*0.6+0.3 });
    }
  }

  function cssVar(name){ return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  var COL = {};
  function readColors(){
    COL.bone = cssVar('--bone'); COL.dim = cssVar('--bone-dim'); COL.faint = cssVar('--faint');
    COL.line = cssVar('--line-2'); COL.brass = cssVar('--brass'); COL.brass2 = cssVar('--brass-2');
  }

  function resize(){
    var rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W*dpr; canvas.height = H*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    var padX = W*0.1, padY = H*0.12;
    nodes.forEach(function(n){ n.px = padX + n.x*(W-2*padX); n.py = padY + n.y*(H-2*padY); });
    seedStars();
  }

  function hexA(hex,a){
    var h=hex.replace('#',''); if(h.length===3){h=h.split('').map(function(c){return c+c;}).join('');}
    var n=parseInt(h,16); return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')';
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    // ambient stars
    for(var i=0;i<stars.length;i++){
      var s=stars[i], tw = (reduce||window.STH_calm)?1:(0.6+0.4*Math.sin(t*s.sp+s.tw));
      ctx.globalAlpha = s.a*tw;
      ctx.fillStyle = COL.bone;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha=1;

    // edges
    for(var e=0;e<data.edges.length;e++){
      var a=idMap[data.edges[e][0]], b=idMap[data.edges[e][1]];
      if(!a||!b) continue;
      var lit = hover && (hover.id===a.id || hover.id===b.id);
      ctx.strokeStyle = lit ? hexA(COL.brass,0.55) : COL.line;
      ctx.globalAlpha = lit ? 1 : 0.5;
      ctx.lineWidth = lit ? 1.1 : 0.7;
      ctx.beginPath(); ctx.moveTo(a.px,a.py); ctx.lineTo(b.px,b.py); ctx.stroke();
    }
    ctx.globalAlpha=1;

    // nodes
    for(var k=0;k<nodes.length;k++){
      var n=nodes[k];
      var col = groups[n.g].color;
      var dx=mx-n.px, dy=my-n.py, near = Math.sqrt(dx*dx+dy*dy)<26;
      var isHover = hover && hover.id===n.id;
      var pulse = (reduce||window.STH_calm)?0:(Math.sin(t*1.4+n.tw)*0.5+0.5);
      var rr = n.r + (isHover?4:0) + pulse*0.8;

      // halo
      var grd = ctx.createRadialGradient(n.px,n.py,0,n.px,n.py,rr*4.2);
      grd.addColorStop(0, hexA(col, isHover?0.5:0.28));
      grd.addColorStop(1, hexA(col,0));
      ctx.fillStyle=grd;
      ctx.beginPath(); ctx.arc(n.px,n.py,rr*4.2,0,Math.PI*2); ctx.fill();

      // core
      ctx.fillStyle = col;
      ctx.shadowColor = col; ctx.shadowBlur = isHover?16:8;
      ctx.beginPath(); ctx.arc(n.px,n.py,rr,0,Math.PI*2); ctx.fill();
      ctx.shadowBlur=0;
      // inner bright
      ctx.fillStyle = '#fff';
      ctx.globalAlpha = isHover?0.95:0.7;
      ctx.beginPath(); ctx.arc(n.px,n.py,rr*0.35,0,Math.PI*2); ctx.fill();
      ctx.globalAlpha=1;

      // label
      var showLabel = n.r>=7 || isHover || near;
      if(showLabel){
        ctx.font = (isHover?'600 ':'500 ')+'12px "Space Mono", monospace';
        ctx.fillStyle = isHover ? COL.brass2 : COL.dim;
        ctx.textAlign='center'; ctx.textBaseline='top';
        ctx.fillText(n.name.toUpperCase(), n.px, n.py + rr + 9);
      }
    }
  }

  function loop(){ t+=0.016; draw(); raf=requestAnimationFrame(loop); }

  function hit(x,y){
    var best=null, bd=24;
    for(var i=0;i<nodes.length;i++){
      var n=nodes[i], d=Math.hypot(x-n.px,y-n.py);
      if(d<Math.max(bd,n.r+12) && d<bd+n.r){ if(!best || d<bd){ best=n; bd=d; } }
    }
    return best;
  }

  function moveTip(n,x,y){
    if(!n){ tip.classList.remove('show'); return; }
    tip.querySelector('.t-kind').textContent = n.kind;
    tip.querySelector('.t-name').textContent = n.name;
    tip.querySelector('.t-desc').textContent = n.desc;
    var tw = tip.offsetWidth, th = tip.offsetHeight;
    var tx = x+18, ty = y+18;
    if(tx+tw > W-12) tx = x-tw-18;
    if(ty+th > H-12) ty = y-th-18;
    tip.style.left = Math.max(8,tx)+'px'; tip.style.top = Math.max(8,ty)+'px';
    tip.classList.add('show');
  }

  canvas.addEventListener('mousemove', function(ev){
    var r=canvas.getBoundingClientRect(); mx=ev.clientX-r.left; my=ev.clientY-r.top;
    var n=hit(mx,my);
    hover=n;
    canvas.style.cursor = n?'pointer':'crosshair';
    moveTip(n,mx,my);
  });
  canvas.addEventListener('mouseleave', function(){ hover=null; mx=my=-999; moveTip(null); });

  function start(){
    if(started) return; started=true;
    readColors(); resize();
    if(reduce){ draw(); } else loop();
  }
  // start when section near viewport
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting) start(); });
  }, {threshold:0.05});
  io.observe(document.getElementById('research-map') || canvas);

  var rt;
  window.addEventListener('resize', function(){ clearTimeout(rt); rt=setTimeout(function(){ if(started){readColors();resize();} }, 180); });
  window.addEventListener('sth:theme', function(){ if(started){ readColors(); } });
  document.addEventListener('visibilitychange', function(){
    if(reduce) return;
    if(document.hidden){ if(raf){cancelAnimationFrame(raf); raf=null;} }
    else if(started && !raf){ loop(); }
  });
})();
