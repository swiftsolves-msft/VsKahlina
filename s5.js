window.__GS=(window.__GS||[]);window.__GS.push(
");\n  }\n  function drawRibbonBoard(x, y, w, h, lane) {\n    //"+
" sky-blue LED ribbon with optional diegetic GOAL/SAVE/shot\n "+
"   const g = ctx.createLinearGradient(x, y, x + w, y);\n    g"+
".addColorStop(0, '#3db8e8');\n    g.addColorStop(0.5, '#7ad4f"+
"5');\n    g.addColorStop(1, '#3db8e8');\n    ctx.fillStyle = g"+
";\n    ctx.fillRect(x, y, w, h);\n    // trapezoid motif + dot"+
"s (N64-simple)\n    ctx.fillStyle = 'rgba(255,255,255,0.85)';"+
"\n    const tw = w * 0.22;\n    const tx = x + w * 0.5 - tw / "+
"2;\n    ctx.beginPath();\n    ctx.moveTo(tx + 8, y + 2);\n    c"+
"tx.lineTo(tx + tw - 8, y + 2);\n    ctx.lineTo(tx + tw, y + h"+
" - 2);\n    ctx.lineTo(tx, y + h - 2);\n    ctx.closePath();\n "+
"   ctx.fill();\n    ctx.fillStyle = '#2aa0d0';\n    for (let i"+
" = 0; i < 4; i++) {\n      ctx.beginPath();\n      ctx.arc(tx "+
"+ tw * (0.2 + i * 0.2), y + h / 2, 3, 0, Math.PI * 2);\n     "+
" ctx.fill();\n    }\n    // edge numbers\n    ctx.fillStyle = '"+
"rgba(20,80,120,0.55)';\n    ctx.font = 'bold ' + Math.floor(h"+
" * 0.55) + 'px Arial';\n    ctx.textAlign = 'center';\n    ctx"+
".textBaseline = 'middle';\n    ctx.fillText(String(21 + lane)"+
", x + w * 0.08, y + h / 2);\n    ctx.fillText(String(22 + lan"+
"e), x + w * 0.92, y + h / 2);\n\n    // Diegetic UI flash from"+
" banner / phase\n    let flash = '';\n    if (state.phase === "+
"'resolve' && banner && !banner.classList.contains('hidden'))"+
" {\n      flash = (banner.textContent || '').trim();\n    } el"+
"se if (state.phase === 'aim' || state.phase === 'flying' || "+
"state.phase === 'between') {\n      flash = 'SHOT ' + Math.mi"+
"n(state.shot, TOTAL_SHOTS) + '/' + TOTAL_SHOTS;\n    } else i"+
"f (state.phase === 'end') {\n      flash = state.goals + '/' "+
"+ TOTAL_SHOTS + ' GOALS';\n    }\n    if (flash) {\n      ctx.f"+
"illStyle = lane === 0 ? '#0a2030' : '#102838';\n      ctx.fil"+
"lRect(x + w * 0.28, y + 1, w * 0.44, h - 2);\n      ctx.fillS"+
"tyle = '#e8fbff';\n      ctx.font = 'bold ' + Math.floor(h * "+
"0.62) + 'px Arial Black, Arial';\n      ctx.fillText(flash, x"+
" + w / 2, y + h / 2 + 0.5);\n    }\n  }\n  function drawBg() {\n"+
"    drawProceduralStadium();\n    if (state.bg) {\n      const"+
" iw = state.bg.width;\n      const ih = state.bg.height;\n    "+
"  const scale = Math.max(W / iw, H / ih);\n      const dw = i"+
"w * scale;\n      const dh = ih * scale;\n      const dx = (W "+
"- dw) / 2;\n      const dy = (H - dh) / 2;\n      ctx.globalAl"+
"pha = 0.5;\n      ctx.drawImage(state.bg, dx, dy, dw, dh);\n  "+
"    ctx.globalAlpha = 1;\n    }\n    ctx.fillStyle = 'rgba(255"+
", 80, 40, 0.07)';\n    ctx.fillRect(0, 0, W, H);\n    ctx.fill"+
"Style = 'rgba(0, 40, 80, 0.12)';\n    ctx.fillRect(0, 0, W, H"+
");\n    const g = ctx.createRadialGradient(W / 2, H * 0.45, W"+
" * 0.2, W / 2, H * 0.5, W * 0.85);\n    g.addColorStop(0, 'rg"+
"ba(0,0,0,0)');\n    g.addColorStop(1, 'rgba(0,0,0,0.4)');\n   "+
" ctx.fillStyle = g;\n    ctx.fillRect(0, 0, W, H);\n    ctx.fi"+
"llStyle = 'rgba(0,0,0,0.08)';\n    for (let y = 0; y < H; y +"+
"= 4) {\n      ctx.fillRect(0, y, W, 1);\n    }\n  }\n  function "+
"drawGoalFrame() {\n    const x1 = W * field.goalLeft;\n    con"+
"st x2 = W * field.goalRight;\n    const y1 = H * field.goalTo"+
"p;\n    const y2 = H * field.goalBottom;\n    ctx.strokeStyle "+
"= 'rgba(255,255,255,0.85)';\n    ctx.lineWidth = 4;\n    ctx.s"+
"trokeRect(x1, y1, x2 - x1, y2 - y1);\n    ctx.strokeStyle = '"+
"rgba(255, 229, 102, 0.25)';\n    ctx.lineWidth = 2;\n    const"+
" zones = [0.28, 0.5, 0.72];\n    for (const zx of zones) {\n  "+
"    for (const zy of [0.28, 0.36]) {\n        const cx = W * "+
"zx;\n        const cy = H * zy;\n        ctx.beginPath();\n    "+
"    ctx.arc(cx, cy, 10, 0, Math.PI * 2);\n        ctx.stroke("+
");\n      }\n    }\n  }\nfunction drawKeeper() {\n    const k = s"+
"tate.keeper;\n    const stretch = k.stretch;\n    const lean ="+
" k.diveDir * stretch;\n    ctx.save();\n    ctx.translate(k.x,"+
" k.y);\n    ctx.rotate(lean * 0.55);\n    const scaleY = 1 - M"+
"ath.abs(stretch) * 0.08;\n    ctx.scale(1 + Math.abs(lean) * "+
"0.12, scaleY);\n    const bodyW = k.w * 0.38;\n    const bodyH"+
" = k.h * 0.48;\n    const dive = stretch;\n    ctx.fillStyle ="+
" 'rgba(0,0,0,0.35)';\n    ctx.beginPath();\n    ctx.ellipse(0,"+
" 10, k.w * 0.42, 7, 0, 0, Math.PI * 2);\n    ctx.fil"
);
