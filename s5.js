window.__GS=(window.__GS||[]);window.__GS.push(
"';\n    ctx.lineWidth = 3;\n    ctx.beginPath();\n    ctx.moveTo(W * field.goalLe"+
"ft - 8, grassTop + 1);\n    ctx.lineTo(W * field.goalRight + 8, grassTop + 1);\n"+
"    ctx.stroke();\n    ctx.strokeStyle = 'rgba(255,255,255,0.45)';\n    ctx.line"+
"Width = 2;\n    ctx.beginPath();\n    ctx.arc(W / 2, H * 0.78, W * 0.22, Math.PI"+
" * 1.15, Math.PI * 1.85);\n    ctx.stroke();\n  }\n  function drawRibbonBoard(x, "+
"y, w, h, lane) {\n    // sky-blue LED ribbon with optional diegetic GOAL/SAVE/s"+
"hot\n    const g = ctx.createLinearGradient(x, y, x + w, y);\n    g.addColorStop"+
"(0, '#3db8e8');\n    g.addColorStop(0.5, '#7ad4f5');\n    g.addColorStop(1, '#3d"+
"b8e8');\n    ctx.fillStyle = g;\n    ctx.fillRect(x, y, w, h);\n    // trapezoid "+
"motif + dots (N64-simple)\n    ctx.fillStyle = 'rgba(255,255,255,0.85)';\n    co"+
"nst tw = w * 0.22;\n    const tx = x + w * 0.5 - tw / 2;\n    ctx.beginPath();\n "+
"   ctx.moveTo(tx + 8, y + 2);\n    ctx.lineTo(tx + tw - 8, y + 2);\n    ctx.line"+
"To(tx + tw, y + h - 2);\n    ctx.lineTo(tx, y + h - 2);\n    ctx.closePath();\n  "+
"  ctx.fill();\n    ctx.fillStyle = '#2aa0d0';\n    for (let i = 0; i < 4; i++) {"+
"\n      ctx.beginPath();\n      ctx.arc(tx + tw * (0.2 + i * 0.2), y + h / 2, 3,"+
" 0, Math.PI * 2);\n      ctx.fill();\n    }\n    // edge numbers\n    ctx.fillStyl"+
"e = 'rgba(20,80,120,0.55)';\n    ctx.font = 'bold ' + Math.floor(h * 0.55) + 'p"+
"x Arial';\n    ctx.textAlign = 'center';\n    ctx.textBaseline = 'middle';\n    c"+
"tx.fillText(String(21 + lane), x + w * 0.08, y + h / 2);\n    ctx.fillText(Stri"+
"ng(22 + lane), x + w * 0.92, y + h / 2);\n\n    // Diegetic UI flash from banner"+
" / phase\n    let flash = '';\n    if (state.phase === 'resolve' && banner && !b"+
"anner.classList.contains('hidden')) {\n      flash = (banner.textContent || '')"+
".trim();\n    } else if (state.phase === 'aim' || state.phase === 'flying' || s"+
"tate.phase === 'between') {\n      flash = 'SHOT ' + Math.min(state.shot, TOTAL"+
"_SHOTS) + '/' + TOTAL_SHOTS;\n    } else if (state.phase === 'end') {\n      fla"+
"sh = state.goals + '/' + TOTAL_SHOTS + ' GOALS';\n    }\n    if (flash) {\n      "+
"ctx.fillStyle = lane === 0 ? '#0a2030' : '#102838';\n      ctx.fillRect(x + w *"+
" 0.28, y + 1, w * 0.44, h - 2);\n      ctx.fillStyle = '#e8fbff';\n      ctx.fon"+
"t = 'bold ' + Math.floor(h * 0.62) + 'px Arial Black, Arial';\n      ctx.fillTe"+
"xt(flash, x + w / 2, y + h / 2 + 0.5);\n    }\n  }\n  function drawBg() {\n    dra"+
"wProceduralStadium();\n    if (state.bg) {\n      const iw = state.bg.width;\n   "+
"   const ih = state.bg.height;\n      const scale = Math.max(W / iw, H / ih);\n "+
"     const dw = iw * scale;\n      const dh = ih * scale;\n      const dx = (W -"+
" dw) / 2;\n      const dy = (H - dh) / 2;\n      ctx.globalAlpha = 0.5;\n      ct"+
"x.drawImage(state.bg, dx, dy, dw, dh);\n      ctx.globalAlpha = 1;\n    }\n    ct"+
"x.fillStyle = 'rgba(255, 80, 40, 0.07)';\n    ctx.fillRect(0, 0, W, H);\n    ctx"+
".fillStyle = 'rgba(0, 40, 80, 0.12)';\n    ctx.fillRect(0, 0, W, H);\n    const "+
"g = ctx.createRadialGradient(W / 2, H * 0.45, W * 0.2, W / 2, H * 0.5, W * 0.8"+
"5);\n    g.addColorStop(0, 'rgba(0,0,0,0)');\n    g.addColorStop(1, 'rgba(0,0,0,"+
"0.4)');\n    ctx.fillStyle = g;\n    ctx.fillRect(0, 0, W, H);\n    ctx.fillStyle"+
" = 'rgba(0,0,0,0.08)';\n    for (let y = 0; y < H; y += 4) {\n      ctx.fillRect"+
"(0, y, W, 1);\n    }\n  }\n  function drawGoalFrame() {\n    const x1 = W * field."+
"goalLeft;\n    const x2 = W * field.goalRight;\n    const y1 = H * field.goalTop"+
";\n    const y2 = H * field.goalBottom;\n    const bulge = state.netBulge;\n    f"+
"unction netWarp(x, y) {\n      if (!bulge || bulge.amount <= 0.01) return { x, "+
"y };\n      const dx = x - bulge.x;\n      const dy = y - bulge.y;\n      const d"+
"ist = Math.hypot(dx, dy) + 0.001;\n      const influence = Math.exp(-(dist * di"+
"st) / (Math.pow(W * 0.16, 2)));\n      const pull = bulge.amount * influence * "+
"22;\n      // Pull toward bulge center then push \"back\" (up-screen) for depth\n "+
"     return {\n        x: x + (dx / dist) * pull * 0.35,\n        y: y - pull * "+
"0.85 + (dy / dist) * pull * 0.2,\n      };\n    }\n    ctx.fillStyle = 'rgba(220,"+
" 235, 255, 0.10)';\n    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);\n    if (bulge &"+
"& bulge.amount > 0.05) {\n      const g = ctx.createRadialGradient(bulge.x, bul"+
"ge.y, 4, bulge.x, bulge.y, W * 0.18);\n      g.addColorStop(0, 'rgba(255,255,25"+
"5,' + (0.18 * bulge.amount) + ')');\n      g.addColorStop(1, 'rgba(255,255,255,"+
"0)');\n      ctx.fillStyle = g;\n      ctx.beginPath();\n      ctx.arc(bulge.x, b"+
"ulge.y, W * 0.18, 0, Math.PI * 2);\n      ctx.fill();\n    }\n    ctx.strokeStyle"+
" = 'rgba(200, 220, 240, 0.28)';\n    ctx.lineWidth = 1.2;\n    const cols = 8, r"+
"ows = 5;\n    for (let i = 0; i <= cols; i++) {\n      const x = x1 + ((x2 - x1)"+
" * i) / cols;\n      ctx.beginPath();\n      for (let j = 0; j <= rows; j++) {\n "+
"       const y = y1 + ((y2 - y1) * j) / rows;\n        const p = netWarp(x, y);"+
"\n        if (j === 0) ctx.moveTo(p.x, p.y);\n        else ctx.lineTo(p.x, p.y);"+
"\n      }\n      ctx.stroke();\n    }\n    for (let j = 0; j <= rows; j++) {\n     "+
" const y = y1 + ((y2 - y1) * j) / rows;\n      ctx.beginPath();\n      for (let "+
"i = 0; i <= cols; i++) {\n        const x = x1 + ((x2 - x1) * i) / cols;\n      "+
"  const p = netWarp(x, y);\n        if (i === 0) ctx.moveTo(p.x, p.y);\n        "+
"else ctx.lineTo(p.x, p.y);\n      }\n      ctx.stroke();\n    }\n    ctx.strokeSty"+
"le = 'rgba(255,255,255,0.92)';\n    ctx.lineWidth = 5;\n    ctx.strokeRect(x1, y"+
"1, x2 - x1, y2 - y1);\n    ctx.fillStyle = 'rgba(255,255,255,0.95)';\n    ctx.fi"+
"llRect(x1 - 3, y1, 6, y2 - y1 + 2);\n    ctx.fillRect(x2 - 3, y1, 6, y2 - y1 + "+
"2);\n    ctx.fillRect(x1 - 3, y1"
);
