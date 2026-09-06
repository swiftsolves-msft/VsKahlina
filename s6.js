window.__GS=(window.__GS||[]);window.__GS.push(
"x.stroke();\n    }\n    for (let j = 0; j <= rows; j++) {\n      const "+
"y = y1 + ((y2 - y1) * j) / rows;\n      ctx.beginPath();\n      for (le"+
"t i = 0; i <= cols; i++) {\n        const x = x1 + ((x2 - x1) * i) / co"+
"ls;\n        const p = netWarp(x, y);\n        if (i === 0) ctx.moveTo("+
"p.x, p.y);\n        else ctx.lineTo(p.x, p.y);\n      }\n      ctx.stro"+
"ke();\n    }\n    ctx.strokeStyle = 'rgba(255,255,255,0.92)';\n    ctx."+
"lineWidth = 5;\n    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);\n    ctx."+
"fillStyle = 'rgba(255,255,255,0.95)';\n    ctx.fillRect(x1 - 3, y1, 6, "+
"y2 - y1 + 2);\n    ctx.fillRect(x2 - 3, y1, 6, y2 - y1 + 2);\n    ctx.f"+
"illRect(x1 - 3, y1 - 3, x2 - x1 + 6, 6);\n    ctx.strokeStyle = 'rgba(2"+
"55, 229, 102, 0.28)';\n    ctx.lineWidth = 2;\n    const zonesX = [0.22"+
", 0.5, 0.78];\n    const zonesY = [field.goalTop + 0.035, field.goalTop"+
" + (field.goalBottom - field.goalTop) * 0.55];\n    for (const zx of zo"+
"nesX) {\n      for (const zy of zonesY) {\n        ctx.beginPath();\n  "+
"      ctx.arc(W * zx, H * zy, 11, 0, Math.PI * 2);\n        ctx.stroke("+
");\n      }\n    }\n  }\nfunction drawKeeper() {\n    const k = state.k"+
"eeper;\n    const stretch = k.stretch;\n    const lean = k.diveDir * st"+
"retch;\n    ctx.save();\n    ctx.translate(k.x, k.y);\n    ctx.rotate(l"+
"ean * 0.55);\n    const scaleY = 1 - Math.abs(stretch) * 0.08;\n    ctx"+
".scale(1 + Math.abs(lean) * 0.12, scaleY);\n    const bodyW = k.w * 0.3"+
"8;\n    const bodyH = k.h * 0.48;\n    const dive = stretch;\n    ctx.f"+
"illStyle = 'rgba(0,0,0,0.35)';\n    ctx.beginPath();\n    ctx.ellipse(0"+
", 10, k.w * 0.42, 7, 0, 0, Math.PI * 2);\n    ctx.fill();\n    ctx.fill"+
"Style = '#0d0d12';\n    roundRect(-bodyW * 0.38, -2, bodyW * 0.34, body"+
"H * 0.85, 3);\n    ctx.fill();\n    roundRect(bodyW * 0.04, -2, bodyW *"+
" 0.34, bodyH * 0.85, 3);\n    ctx.fill();\n    ctx.fillStyle = '#f5f5f5"+
"';\n    roundRect(-bodyW * 0.42, bodyH * 0.78, bodyW * 0.38, 8, 2);\n  "+
"  ctx.fill();\n    roundRect(bodyW * 0.04, bodyH * 0.78, bodyW * 0.38, "+
"8, 2);\n    ctx.fill();\n    ctx.fillStyle = '#7dff4a';\n    ctx.fillRe"+
"ct(-bodyW * 0.42, bodyH * 0.86, bodyW * 0.38, 2);\n    ctx.fillRect(bod"+
"yW * 0.04, bodyH * 0.86, bodyW * 0.38, 2);\n    const jersey = ctx.crea"+
"teLinearGradient(-bodyW, -bodyH, bodyW, 0);\n    jersey.addColorStop(0,"+
" '#1e5fd4');\n    jersey.addColorStop(0.5, '#2a6fff');\n    jersey.addC"+
"olorStop(1, '#1548a8');\n    ctx.fillStyle = jersey;\n    roundRect(-bo"+
"dyW / 2, -bodyH, bodyW, bodyH * 0.95, 5);\n    ctx.fill();\n    ctx.fil"+
"lStyle = '#d8dde6';\n    const armReach = k.w * (0.32 + dive * 0.5);\n "+
"   const armY = -bodyH * 0.55 - k.diveHeight * dive * 16;\n    ctx.save"+
"();\n    ctx.translate(-bodyW * 0.45, -bodyH * 0.55);\n    ctx.rotate(-"+
"0.35 - dive * 0.4 * (k.diveDir <= 0 ? 1 : 0.3));\n    roundRect(-6, -4,"+
" 14, armReach * 0.55, 4);\n    ctx.fill();\n    ctx.restore();\n    ctx"+
".save();\n    ctx.translate(bodyW * 0.45, -bodyH * 0.55);\n    ctx.rota"+
"te(0.35 + dive * 0.4 * (k.diveDir >= 0 ? 1 : 0.3));\n    roundRect(-8, "+
"-4, 14, armReach * 0.55, 4);\n    ctx.fill();\n    ctx.restore();\n    "+
"ctx.fillStyle = 'rgba(255,255,255,0.85)';\n    ctx.fillRect(-bodyW * 0."+
"28, -bodyH * 0.55, bodyW * 0.56, 6);\n    // Head + Virtua Striker low-"+
"poly face\n    const hx = 0;\n    const hy = -bodyH - 11;\n    ctx.fill"+
"Style = '#e8b892';\n    ctx.beginPath();\n    ctx.arc(hx, hy, 11, 0, Ma"+
"th.PI * 2);\n    ctx.fill();\n    ctx.fillStyle = '#c4a06a';\n    ctx.b"+
"eginPath();\n    ctx.ellipse(hx, hy - 5, 10, 6, 0, Math.PI, 0);\n    ct"+
"x.fill();\n    const mood = k.emotion || 'ready';\n    const hold = Mat"+
"h.max(0, Math.min(1, k.emotionHold));\n    // Eyes\n    ctx.fillStyle ="+
" '#2a1a12';\n    if (mood === 'frustrated') {\n      // angry brows + n"+
"arrowed eyes\n      ctx.strokeStyle = '#3a2a20';\n      ctx.lineWidth ="+
" 2;\n      ctx.beginPath();\n      ctx.moveTo(hx - 7, hy - 4);\n      c"+
"tx.lineTo(hx - 2, hy - 2);\n      ctx.moveTo(hx + 7, hy - 4);\n      ct"+
"x.lineTo(hx + 2, hy - 2);\n      ctx.stroke();\n      ctx.fillRect(hx -"+
" 5, hy - 1, 3, 2);\n      ctx.fillRect(hx + 2, hy - 1, 3, 2);\n    } el"+
"se if (mood === 'smug') {\n      ctx.fillRect(hx - 5, hy - 2, 3, 2);\n "+
"     ctx.fillRect(hx + 2, hy - 2, 3, 2);\n      ctx.strokeStyle = '#3a2"+
"a20';\n      ctx.lineWidth = 1.5;\n      ctx.beginPath();\n      ctx.mo"+
"veTo(hx - 7, hy - 4);\n      ctx.lineTo(hx - 2, hy - 5);\n      ctx.mov"+
"eTo(hx + 2, hy - 5);\n      ctx.lineTo(hx + 7, hy - 4);\n      ctx.stro"+
"ke();\n    } else if (mood === 'relief') {\n      // soft closed-ish ey"+
"es\n      ctx.strokeStyle = '#3a2a20';\n      ctx.lineWidth = 1.8;\n   "+
"   ctx.beginPath();\n      ctx.arc(hx - 3.5, hy - 1, 2.2, Math.PI * 0.1"+
"5, Math.PI * 0.85);\n      ctx.stroke();\n      ctx.beginPath();\n     "+
" ctx.arc(hx + 3.5, hy - 1, 2.2, Math.PI * 0.15, Math.PI * 0.85);\n     "+
" ctx.stroke();\n    } else if (mood === 'crying') {\n      // sad brows"+
" (tears fall separately so they reach the grass)\n      ctx.strokeStyle"+
" = '#3a2a20';\n      ctx.lineWidth = 2;\n      ctx.beginPath();\n      "+
"ctx.moveTo(hx - 7, hy - 5);\n      ctx.lineTo(hx - 2, hy - 3);\n      c"+
"tx.moveTo(hx + 7, hy - 5);\n      ctx.lineTo(hx + 2, hy - 3);\n      ct"+
"x.stroke();\n      ctx.fillRect(hx - 5, hy - 1, 3, 2);\n      ctx.fillR"+
"ect(hx + 2, hy - 1, 3, 2);\n    } else {\n      ctx.fillRect(hx - 5, hy"+
" - 2, 2, 2);\n      ctx.fillRect(hx + 3, hy - 2, 2, 2);\n    }\n    // "+
"Mouth\n    ctx.strokeStyle = '#5a3030';\n    ctx.lineWidth = 1.6;\n    "+
"ctx.beginPath();\n    if (mood === 'frustrated') {\n      ctx.moveTo(hx"+
" - 4, hy + 5);\n      ctx.quadraticCurveTo(hx, hy + 2, hx + 4, hy + 5);"+
"\n    } else if (mood === 'smug') {\n      ctx.moveTo(hx - 4, hy + 3);"+
"\n      ctx.quadraticCurveTo(hx + 1, hy + 7, hx + 5, hy + 3);\n    } el"
);
