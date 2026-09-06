window.__GS=(window.__GS||[]);window.__GS.push(
"ial';\n      ctx.textAlign = 'center';\n      ctx.textBaseline = 'middl"+
"e';\n      ctx.fillText(a.t, i * aw + aw / 2, adY + adH / 2);\n    });"+
"\n\n    // grass — goal line / net base sits on this plane\n    const g"+
"rass = ctx.createLinearGradient(0, grassTop, 0, H);\n    grass.addColor"+
"Stop(0, '#2d8a3e');\n    grass.addColorStop(1, '#1a5a28');\n    ctx.fil"+
"lStyle = grass;\n    ctx.fillRect(0, grassTop, W, H - grassTop);\n    f"+
"or (let i = 0; i < 8; i++) {\n      ctx.fillStyle = i % 2 ? 'rgba(255,2"+
"55,255,0.04)' : 'rgba(0,0,0,0.05)';\n      ctx.fillRect(0, grassTop + i"+
" * H * 0.05, W, H * 0.05);\n    }\n    // goal-line chalk on the grass "+
"plane\n    ctx.strokeStyle = 'rgba(255,255,255,0.7)';\n    ctx.lineWidt"+
"h = 3;\n    ctx.beginPath();\n    ctx.moveTo(W * field.goalLeft - 8, gr"+
"assTop + 1);\n    ctx.lineTo(W * field.goalRight + 8, grassTop + 1);\n "+
"   ctx.stroke();\n    ctx.strokeStyle = 'rgba(255,255,255,0.45)';\n    "+
"ctx.lineWidth = 2;\n    ctx.beginPath();\n    ctx.arc(W / 2, H * 0.78, "+
"W * 0.22, Math.PI * 1.15, Math.PI * 1.85);\n    ctx.stroke();\n  }\n  f"+
"unction drawRibbonBoard(x, y, w, h, lane) {\n    // sky-blue LED ribbon"+
" with optional diegetic GOAL/SAVE/shot\n    const g = ctx.createLinearG"+
"radient(x, y, x + w, y);\n    g.addColorStop(0, '#3db8e8');\n    g.addC"+
"olorStop(0.5, '#7ad4f5');\n    g.addColorStop(1, '#3db8e8');\n    ctx.f"+
"illStyle = g;\n    ctx.fillRect(x, y, w, h);\n    // trapezoid motif + "+
"dots (N64-simple)\n    ctx.fillStyle = 'rgba(255,255,255,0.85)';\n    c"+
"onst tw = w * 0.22;\n    const tx = x + w * 0.5 - tw / 2;\n    ctx.begi"+
"nPath();\n    ctx.moveTo(tx + 8, y + 2);\n    ctx.lineTo(tx + tw - 8, y"+
" + 2);\n    ctx.lineTo(tx + tw, y + h - 2);\n    ctx.lineTo(tx, y + h -"+
" 2);\n    ctx.closePath();\n    ctx.fill();\n    ctx.fillStyle = '#2aa0"+
"d0';\n    for (let i = 0; i < 4; i++) {\n      ctx.beginPath();\n      "+
"ctx.arc(tx + tw * (0.2 + i * 0.2), y + h / 2, 3, 0, Math.PI * 2);\n    "+
"  ctx.fill();\n    }\n    // edge numbers\n    ctx.fillStyle = 'rgba(20"+
",80,120,0.55)';\n    ctx.font = 'bold ' + Math.floor(h * 0.55) + 'px Ar"+
"ial';\n    ctx.textAlign = 'center';\n    ctx.textBaseline = 'middle';"+
"\n    ctx.fillText(String(21 + lane), x + w * 0.08, y + h / 2);\n    ct"+
"x.fillText(String(22 + lane), x + w * 0.92, y + h / 2);\n\n    // Diege"+
"tic UI flash from banner / phase\n    let flash = '';\n    if (state.ph"+
"ase === 'resolve' && banner && !banner.classList.contains('hidden')) {"+
"\n      flash = (banner.textContent || '').trim();\n    } else if (stat"+
"e.phase === 'aim' || state.phase === 'flying' || state.phase === 'betwe"+
"en') {\n      flash = 'SHOT ' + Math.min(state.shot, TOTAL_SHOTS) + '/'"+
" + TOTAL_SHOTS;\n    } else if (state.phase === 'end') {\n      flash ="+
" state.goals + '/' + TOTAL_SHOTS + ' GOALS';\n    }\n    if (flash) {\n"+
"      ctx.fillStyle = lane === 0 ? '#0a2030' : '#102838';\n      ctx.fi"+
"llRect(x + w * 0.28, y + 1, w * 0.44, h - 2);\n      ctx.fillStyle = '#"+
"e8fbff';\n      ctx.font = 'bold ' + Math.floor(h * 0.62) + 'px Arial B"+
"lack, Arial';\n      ctx.fillText(flash, x + w / 2, y + h / 2 + 0.5);\n"+
"    }\n  }\n  function drawBg() {\n    drawProceduralStadium();\n    if"+
" (state.bg) {\n      const iw = state.bg.width;\n      const ih = state"+
".bg.height;\n      const scale = Math.max(W / iw, H / ih);\n      const"+
" dw = iw * scale;\n      const dh = ih * scale;\n      const dx = (W - "+
"dw) / 2;\n      const dy = (H - dh) / 2;\n      ctx.globalAlpha = 0.5;"+
"\n      ctx.drawImage(state.bg, dx, dy, dw, dh);\n      ctx.globalAlpha"+
" = 1;\n    }\n    ctx.fillStyle = 'rgba(255, 80, 40, 0.07)';\n    ctx.f"+
"illRect(0, 0, W, H);\n    ctx.fillStyle = 'rgba(0, 40, 80, 0.12)';\n   "+
" ctx.fillRect(0, 0, W, H);\n    const g = ctx.createRadialGradient(W / "+
"2, H * 0.45, W * 0.2, W / 2, H * 0.5, W * 0.85);\n    g.addColorStop(0,"+
" 'rgba(0,0,0,0)');\n    g.addColorStop(1, 'rgba(0,0,0,0.4)');\n    ctx."+
"fillStyle = g;\n    ctx.fillRect(0, 0, W, H);\n    ctx.fillStyle = 'rgb"+
"a(0,0,0,0.08)';\n    for (let y = 0; y < H; y += 4) {\n      ctx.fillRe"+
"ct(0, y, W, 1);\n    }\n  }\n  function drawGoalFrame() {\n    const x1"+
" = W * field.goalLeft;\n    const x2 = W * field.goalRight;\n    const "+
"y1 = H * field.goalTop;\n    const y2 = H * field.goalBottom;\n    cons"+
"t bulge = state.netBulge;\n    function netWarp(x, y) {\n      if (!bul"+
"ge || bulge.amount <= 0.01) return { x, y };\n      const dx = x - bulg"+
"e.x;\n      const dy = y - bulge.y;\n      const dist = Math.hypot(dx, "+
"dy) + 0.001;\n      const influence = Math.exp(-(dist * dist) / (Math.p"+
"ow(W * 0.16, 2)));\n      const pull = bulge.amount * influence * 22;\n"+
"      // Pull toward bulge center then push \"back\" (up-screen) for de"+
"pth\n      return {\n        x: x + (dx / dist) * pull * 0.35,\n       "+
" y: y - pull * 0.85 + (dy / dist) * pull * 0.2,\n      };\n    }\n    c"+
"tx.fillStyle = 'rgba(220, 235, 255, 0.10)';\n    ctx.fillRect(x1, y1, x"+
"2 - x1, y2 - y1);\n    if (bulge && bulge.amount > 0.05) {\n      const"+
" g = ctx.createRadialGradient(bulge.x, bulge.y, 4, bulge.x, bulge.y, W "+
"* 0.18);\n      g.addColorStop(0, 'rgba(255,255,255,' + (0.18 * bulge.a"+
"mount) + ')');\n      g.addColorStop(1, 'rgba(255,255,255,0)');\n      "+
"ctx.fillStyle = g;\n      ctx.beginPath();\n      ctx.arc(bulge.x, bulg"+
"e.y, W * 0.18, 0, Math.PI * 2);\n      ctx.fill();\n    }\n    ctx.stro"+
"keStyle = 'rgba(200, 220, 240, 0.28)';\n    ctx.lineWidth = 1.2;\n    c"+
"onst cols = 8, rows = 5;\n    for (let i = 0; i <= cols; i++) {\n      "+
"const x = x1 + ((x2 - x1) * i) / cols;\n      ctx.beginPath();\n      f"+
"or (let j = 0; j <= rows; j++) {\n        const y = y1 + ((y2 - y1) * j"+
") / rows;\n        const p = netWarp(x, y);\n        if (j === 0) ctx.m"+
"oveTo(p.x, p.y);\n        else ctx.lineTo(p.x, p.y);\n      }\n      ct"
);
