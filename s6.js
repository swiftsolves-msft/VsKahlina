window.__GS=(window.__GS||[]);window.__GS.push(
" y1 + 2);\n    ctx.fillRect(x2 - 3, y1, 6, y2 - y1 + 2);\n    ctx.fillRe"+
"ct(x1 - 3, y1 - 3, x2 - x1 + 6, 6);\n    ctx.strokeStyle = 'rgba(255, 2"+
"29, 102, 0.28)';\n    ctx.lineWidth = 2;\n    const zonesX = [0.22, 0.5,"+
" 0.78];\n    const zonesY = [field.goalTop + 0.035, field.goalTop + (fi"+
"eld.goalBottom - field.goalTop) * 0.55];\n    for (const zx of zonesX) "+
"{\n      for (const zy of zonesY) {\n        ctx.beginPath();\n        ct"+
"x.arc(W * zx, H * zy, 11, 0, Math.PI * 2);\n        ctx.stroke();\n     "+
" }\n    }\n  }\nfunction drawKeeper() {\n    const k = state.keeper;\n    c"+
"onst stretch = k.stretch;\n    const lean = k.diveDir * stretch;\n    ct"+
"x.save();\n    ctx.translate(k.x, k.y);\n    ctx.rotate(lean * 0.55);\n  "+
"  const scaleY = 1 - Math.abs(stretch) * 0.08;\n    ctx.scale(1 + Math."+
"abs(lean) * 0.12, scaleY);\n    const bodyW = k.w * 0.38;\n    const bod"+
"yH = k.h * 0.48;\n    const dive = stretch;\n    ctx.fillStyle = 'rgba(0"+
",0,0,0.35)';\n    ctx.beginPath();\n    ctx.ellipse(0, 10, k.w * 0.42, 7"+
", 0, 0, Math.PI * 2);\n    ctx.fill();\n    ctx.fillStyle = '#0d0d12';\n "+
"   roundRect(-bodyW * 0.38, -2, bodyW * 0.34, bodyH * 0.85, 3);\n    ct"+
"x.fill();\n    roundRect(bodyW * 0.04, -2, bodyW * 0.34, bodyH * 0.85, "+
"3);\n    ctx.fill();\n    ctx.fillStyle = '#f5f5f5';\n    roundRect(-body"+
"W * 0.42, bodyH * 0.78, bodyW * 0.38, 8, 2);\n    ctx.fill();\n    round"+
"Rect(bodyW * 0.04, bodyH * 0.78, bodyW * 0.38, 8, 2);\n    ctx.fill();\n"+
"    ctx.fillStyle = '#7dff4a';\n    ctx.fillRect(-bodyW * 0.42, bodyH *"+
" 0.86, bodyW * 0.38, 2);\n    ctx.fillRect(bodyW * 0.04, bodyH * 0.86, "+
"bodyW * 0.38, 2);\n    const jersey = ctx.createLinearGradient(-bodyW, "+
"-bodyH, bodyW, 0);\n    jersey.addColorStop(0, '#1e5fd4');\n    jersey.a"+
"ddColorStop(0.5, '#2a6fff');\n    jersey.addColorStop(1, '#1548a8');\n  "+
"  ctx.fillStyle = jersey;\n    roundRect(-bodyW / 2, -bodyH, bodyW, bod"+
"yH * 0.95, 5);\n    ctx.fill();\n    ctx.fillStyle = '#d8dde6';\n    cons"+
"t armReach = k.w * (0.32 + dive * 0.5);\n    const armY = -bodyH * 0.55"+
" - k.diveHeight * dive * 16;\n    ctx.save();\n    ctx.translate(-bodyW "+
"* 0.45, -bodyH * 0.55);\n    ctx.rotate(-0.35 - dive * 0.4 * (k.diveDir"+
" <= 0 ? 1 : 0.3));\n    roundRect(-6, -4, 14, armReach * 0.55, 4);\n    "+
"ctx.fill();\n    ctx.restore();\n    ctx.save();\n    ctx.translate(bodyW"+
" * 0.45, -bodyH * 0.55);\n    ctx.rotate(0.35 + dive * 0.4 * (k.diveDir"+
" >= 0 ? 1 : 0.3));\n    roundRect(-8, -4, 14, armReach * 0.55, 4);\n    "+
"ctx.fill();\n    ctx.restore();\n    ctx.fillStyle = 'rgba(255,255,255,0"+
".85)';\n    ctx.fillRect(-bodyW * 0.28, -bodyH * 0.55, bodyW * 0.56, 6)"+
";\n    // Head + Virtua Striker low-poly face\n    const hx = 0;\n    con"+
"st hy = -bodyH - 11;\n    ctx.fillStyle = '#e8b892';\n    ctx.beginPath("+
");\n    ctx.arc(hx, hy, 11, 0, Math.PI * 2);\n    ctx.fill();\n    ctx.fi"+
"llStyle = '#c4a06a';\n    ctx.beginPath();\n    ctx.ellipse(hx, hy - 5, "+
"10, 6, 0, Math.PI, 0);\n    ctx.fill();\n    const mood = k.emotion || '"+
"ready';\n    const hold = Math.max(0, Math.min(1, k.emotionHold));\n    "+
"// Eyes\n    ctx.fillStyle = '#2a1a12';\n    if (mood === 'frustrated') "+
"{\n      // angry brows + narrowed eyes\n      ctx.strokeStyle = '#3a2a2"+
"0';\n      ctx.lineWidth = 2;\n      ctx.beginPath();\n      ctx.moveTo(h"+
"x - 7, hy - 4);\n      ctx.lineTo(hx - 2, hy - 2);\n      ctx.moveTo(hx "+
"+ 7, hy - 4);\n      ctx.lineTo(hx + 2, hy - 2);\n      ctx.stroke();\n  "+
"    ctx.fillRect(hx - 5, hy - 1, 3, 2);\n      ctx.fillRect(hx + 2, hy "+
"- 1, 3, 2);\n    } else if (mood === 'smug') {\n      ctx.fillRect(hx - "+
"5, hy - 2, 3, 2);\n      ctx.fillRect(hx + 2, hy - 2, 3, 2);\n      ctx."+
"strokeStyle = '#3a2a20';\n      ctx.lineWidth = 1.5;\n      ctx.beginPat"+
"h();\n      ctx.moveTo(hx - 7, hy - 4);\n      ctx.lineTo(hx - 2, hy - 5"+
");\n      ctx.moveTo(hx + 2, hy - 5);\n      ctx.lineTo(hx + 7, hy - 4);"+
"\n      ctx.stroke();\n    } else if (mood === 'relief') {\n      // soft"+
" closed-ish eyes\n      ctx.strokeStyle = '#3a2a20';\n      ctx.lineWidt"+
"h = 1.8;\n      ctx.beginPath();\n      ctx.arc(hx - 3.5, hy - 1, 2.2, M"+
"ath.PI * 0.15, Math.PI * 0.85);\n      ctx.stroke();\n      ctx.beginPat"+
"h();\n      ctx.arc(hx + 3.5, hy - 1, 2.2, Math.PI * 0.15, Math.PI * 0."+
"85);\n      ctx.stroke();\n    } else if (mood === 'crying') {\n      // "+
"sad brows + tears (Virtua Striker low-poly)\n      ctx.strokeStyle = '#"+
"3a2a20';\n      ctx.lineWidth = 2;\n      ctx.beginPath();\n      ctx.mov"+
"eTo(hx - 7, hy - 5);\n      ctx.lineTo(hx - 2, hy - 3);\n      ctx.moveT"+
"o(hx + 7, hy - 5);\n      ctx.lineTo(hx + 2, hy - 3);\n      ctx.stroke("+
");\n      ctx.fillRect(hx - 5, hy - 1, 3, 2);\n      ctx.fillRect(hx + 2"+
", hy - 1, 3, 2);\n      const tearT = ((state.lastTs || 0) / 220) % (Ma"+
"th.PI * 2);\n      const t1 = 0.5 + 0.5 * Math.sin(tearT);\n      const "+
"t2 = 0.5 + 0.5 * Math.sin(tearT + 1.7);\n      ctx.fillStyle = '#6ec8ff"+
"';\n      ctx.globalAlpha = 0.65 + 0.3 * t1;\n      ctx.beginPath();\n   "+
"   ctx.ellipse(hx - 4, hy + 3 + t1 * 3, 1.5, 2.8, 0, 0, Math.PI * 2);\n"+
"      ctx.fill();\n      ctx.globalAlpha = 0.65 + 0.3 * t2;\n      ctx.b"+
"eginPath();\n      ctx.ellipse(hx + 5, hy + 4 + t2 * 3.2, 1.4, 3.0, 0, "+
"0, Math.PI * 2);\n      ctx.fill();\n      ctx.globalAlpha = 1;\n    } el"+
"se {\n      ctx.fillRect(hx - 5, hy - 2, 2, 2);\n      ctx.fillRect(hx +"+
" 3, hy - 2, 2, 2);\n    }\n    // Mouth\n    ctx.strokeStyle = '#5a3030';"+
"\n    ctx.lineWidth = 1.6;\n    ctx.beginPath();\n    if (mood === 'frust"+
"rated') {\n      ctx.moveTo(hx - 4, hy + 5);\n      ctx.quadraticCurveTo"+
"(hx, hy + 2, hx + 4, hy + 5);\n    } else if (mood === 'smug') {\n      "+
"ctx.moveTo(hx - 4, hy + 3);\n      ctx.quadraticCurveTo(hx + 1, hy + 7,"+
" hx + 5, hy + 3);\n    } else if (mood === 'relief') {\n      ctx.moveTo"+
"(hx - 3, hy + 4);\n      ctx.quadraticCurveTo(hx, hy + 6, hx + 3, hy + "
);
