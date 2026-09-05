window.__GS=(window.__GS||[]);window.__GS.push(
"    ctx.stroke();\n    ctx.strokeStyle = 'rgba(255,255,255,0.45)';\n    "+
"ctx.lineWidth = 2;\n    ctx.beginPath();\n    ctx.arc(W / 2, H * 0.78, W"+
" * 0.22, Math.PI * 1.15, Math.PI * 1.85);\n    ctx.stroke();\n  }\n  func"+
"tion drawRibbonBoard(x, y, w, h, lane) {\n    // sky-blue LED ribbon wi"+
"th optional diegetic GOAL/SAVE/shot\n    const g = ctx.createLinearGrad"+
"ient(x, y, x + w, y);\n    g.addColorStop(0, '#3db8e8');\n    g.addColor"+
"Stop(0.5, '#7ad4f5');\n    g.addColorStop(1, '#3db8e8');\n    ctx.fillSt"+
"yle = g;\n    ctx.fillRect(x, y, w, h);\n    // trapezoid motif + dots ("+
"N64-simple)\n    ctx.fillStyle = 'rgba(255,255,255,0.85)';\n    const tw"+
" = w * 0.22;\n    const tx = x + w * 0.5 - tw / 2;\n    ctx.beginPath();"+
"\n    ctx.moveTo(tx + 8, y + 2);\n    ctx.lineTo(tx + tw - 8, y + 2);\n  "+
"  ctx.lineTo(tx + tw, y + h - 2);\n    ctx.lineTo(tx, y + h - 2);\n    c"+
"tx.closePath();\n    ctx.fill();\n    ctx.fillStyle = '#2aa0d0';\n    for"+
" (let i = 0; i < 4; i++) {\n      ctx.beginPath();\n      ctx.arc(tx + t"+
"w * (0.2 + i * 0.2), y + h / 2, 3, 0, Math.PI * 2);\n      ctx.fill();\n"+
"    }\n    // edge numbers\n    ctx.fillStyle = 'rgba(20,80,120,0.55)';\n"+
"    ctx.font = 'bold ' + Math.floor(h * 0.55) + 'px Arial';\n    ctx.te"+
"xtAlign = 'center';\n    ctx.textBaseline = 'middle';\n    ctx.fillText("+
"String(21 + lane), x + w * 0.08, y + h / 2);\n    ctx.fillText(String(2"+
"2 + lane), x + w * 0.92, y + h / 2);\n\n    // Diegetic UI flash from ba"+
"nner / phase\n    let flash = '';\n    if (state.phase === 'resolve' && "+
"banner && !banner.classList.contains('hidden')) {\n      flash = (banne"+
"r.textContent || '').trim();\n    } else if (state.phase === 'aim' || s"+
"tate.phase === 'flying' || state.phase === 'between') {\n      flash = "+
"'SHOT ' + Math.min(state.shot, TOTAL_SHOTS) + '/' + TOTAL_SHOTS;\n    }"+
" else if (state.phase === 'end') {\n      flash = state.goals + '/' + T"+
"OTAL_SHOTS + ' GOALS';\n    }\n    if (flash) {\n      ctx.fillStyle = la"+
"ne === 0 ? '#0a2030' : '#102838';\n      ctx.fillRect(x + w * 0.28, y +"+
" 1, w * 0.44, h - 2);\n      ctx.fillStyle = '#e8fbff';\n      ctx.font "+
"= 'bold ' + Math.floor(h * 0.62) + 'px Arial Black, Arial';\n      ctx."+
"fillText(flash, x + w / 2, y + h / 2 + 0.5);\n    }\n  }\n  function draw"+
"Bg() {\n    drawProceduralStadium();\n    if (state.bg) {\n      const iw"+
" = state.bg.width;\n      const ih = state.bg.height;\n      const scale"+
" = Math.max(W / iw, H / ih);\n      const dw = iw * scale;\n      const "+
"dh = ih * scale;\n      const dx = (W - dw) / 2;\n      const dy = (H - "+
"dh) / 2;\n      ctx.globalAlpha = 0.5;\n      ctx.drawImage(state.bg, dx"+
", dy, dw, dh);\n      ctx.globalAlpha = 1;\n    }\n    ctx.fillStyle = 'r"+
"gba(255, 80, 40, 0.07)';\n    ctx.fillRect(0, 0, W, H);\n    ctx.fillSty"+
"le = 'rgba(0, 40, 80, 0.12)';\n    ctx.fillRect(0, 0, W, H);\n    const "+
"g = ctx.createRadialGradient(W / 2, H * 0.45, W * 0.2, W / 2, H * 0.5,"+
" W * 0.85);\n    g.addColorStop(0, 'rgba(0,0,0,0)');\n    g.addColorStop"+
"(1, 'rgba(0,0,0,0.4)');\n    ctx.fillStyle = g;\n    ctx.fillRect(0, 0, "+
"W, H);\n    ctx.fillStyle = 'rgba(0,0,0,0.08)';\n    for (let y = 0; y <"+
" H; y += 4) {\n      ctx.fillRect(0, y, W, 1);\n    }\n  }\n  function dra"+
"wGoalFrame() {\n    const x1 = W * field.goalLeft;\n    const x2 = W * f"+
"ield.goalRight;\n    const y1 = H * field.goalTop;\n    const y2 = H * f"+
"ield.goalBottom;\n    // soft net wash so the mouth reads against the b"+
"owl\n    ctx.fillStyle = 'rgba(220, 235, 255, 0.10)';\n    ctx.fillRect("+
"x1, y1, x2 - x1, y2 - y1);\n    ctx.strokeStyle = 'rgba(200, 220, 240, "+
"0.22)';\n    ctx.lineWidth = 1;\n    const cols = 8, rows = 5;\n    for ("+
"let i = 1; i < cols; i++) {\n      const x = x1 + ((x2 - x1) * i) / col"+
"s;\n      ctx.beginPath();\n      ctx.moveTo(x, y1);\n      ctx.lineTo(x,"+
" y2);\n      ctx.stroke();\n    }\n    for (let j = 1; j < rows; j++) {\n "+
"     const y = y1 + ((y2 - y1) * j) / rows;\n      ctx.beginPath();\n   "+
"   ctx.moveTo(x1, y);\n      ctx.lineTo(x2, y);\n      ctx.stroke();\n   "+
" }\n    ctx.strokeStyle = 'rgba(255,255,255,0.92)';\n    ctx.lineWidth ="+
" 5;\n    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);\n    // posts sit on "+
"the grass / goal line\n    ctx.fillStyle = 'rgba(255,255,255,0.95)';\n  "+
"  ctx.fillRect(x1 - 3, y1, 6, y2 - y1 + 2);\n    ctx.fillRect(x2 - 3, y"+
"1, 6, y2 - y1 + 2);\n    ctx.fillRect(x1 - 3, y1 - 3, x2 - x1 + 6, 6);\n"+
"    ctx.strokeStyle = 'rgba(255, 229, 102, 0.28)';\n    ctx.lineWidth ="+
" 2;\n    const zonesX = [0.22, 0.5, 0.78];\n"
);
