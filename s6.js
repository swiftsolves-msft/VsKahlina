window.__GS=(window.__GS||[]);window.__GS.push(
"x2 - x1 + 6, 6);\n    ctx.strokeStyle = 'rgba(255, 229, 102, 0.28)';\n    ctx.li"+
"neWidth = 2;\n    const zonesX = [0.22, 0.5, 0.78];\n    const zonesY = [field.g"+
"oalTop + 0.035, field.goalTop + (field.goalBottom - field.goalTop) * 0.55];\n  "+
"  for (const zx of zonesX) {\n      for (const zy of zonesY) {\n        ctx.begi"+
"nPath();\n        ctx.arc(W * zx, H * zy, 11, 0, Math.PI * 2);\n        ctx.stro"+
"ke();\n      }\n    }\n  }\nfunction drawKeeper() {\n    const k = state.keeper;\n  "+
"  const stretch = k.stretch;\n    const lean = k.diveDir * stretch;\n    ctx.sav"+
"e();\n    ctx.translate(k.x, k.y);\n    ctx.rotate(lean * 0.55);\n    const scale"+
"Y = 1 - Math.abs(stretch) * 0.08;\n    ctx.scale(1 + Math.abs(lean) * 0.12, sca"+
"leY);\n    const bodyW = k.w * 0.38;\n    const bodyH = k.h * 0.48;\n    const di"+
"ve = stretch;\n    ctx.fillStyle = 'rgba(0,0,0,0.35)';\n    ctx.beginPath();\n   "+
" ctx.ellipse(0, 10, k.w * 0.42, 7, 0, 0, Math.PI * 2);\n    ctx.fill();\n    ctx"+
".fillStyle = '#0d0d12';\n    roundRect(-bodyW * 0.38, -2, bodyW * 0.34, bodyH *"+
" 0.85, 3);\n    ctx.fill();\n    roundRect(bodyW * 0.04, -2, bodyW * 0.34, bodyH"+
" * 0.85, 3);\n    ctx.fill();\n    ctx.fillStyle = '#f5f5f5';\n    roundRect(-bod"+
"yW * 0.42, bodyH * 0.78, bodyW * 0.38, 8, 2);\n    ctx.fill();\n    roundRect(bo"+
"dyW * 0.04, bodyH * 0.78, bodyW * 0.38, 8, 2);\n    ctx.fill();\n    ctx.fillSty"+
"le = '#7dff4a';\n    ctx.fillRect(-bodyW * 0.42, bodyH * 0.86, bodyW * 0.38, 2)"+
";\n    ctx.fillRect(bodyW * 0.04, bodyH * 0.86, bodyW * 0.38, 2);\n    const jer"+
"sey = ctx.createLinearGradient(-bodyW, -bodyH, bodyW, 0);\n    jersey.addColorS"+
"top(0, '#1e5fd4');\n    jersey.addColorStop(0.5, '#2a6fff');\n    jersey.addColo"+
"rStop(1, '#1548a8');\n    ctx.fillStyle = jersey;\n    roundRect(-bodyW / 2, -bo"+
"dyH, bodyW, bodyH * 0.95, 5);\n    ctx.fill();\n    ctx.fillStyle = '#d8dde6';\n "+
"   const armReach = k.w * (0.32 + dive * 0.5);\n    const armY = -bodyH * 0.55 "+
"- k.diveHeight * dive * 16;\n    ctx.save();\n    ctx.translate(-bodyW * 0.45, -"+
"bodyH * 0.55);\n    ctx.rotate(-0.35 - dive * 0.4 * (k.diveDir <= 0 ? 1 : 0.3))"+
";\n    roundRect(-6, -4, 14, armReach * 0.55, 4);\n    ctx.fill();\n    ctx.resto"+
"re();\n    ctx.save();\n    ctx.translate(bodyW * 0.45, -bodyH * 0.55);\n    ctx."+
"rotate(0.35 + dive * 0.4 * (k.diveDir >= 0 ? 1 : 0.3));\n    roundRect(-8, -4, "+
"14, armReach * 0.55, 4);\n    ctx.fill();\n    ctx.restore();\n    ctx.fillStyle "+
"= 'rgba(255,255,255,0.85)';\n    ctx.fillRect(-bodyW * 0.28, -bodyH * 0.55, bod"+
"yW * 0.56, 6);\n    // Head + Virtua Striker low-poly face\n    const hx = 0;\n  "+
"  const hy = -bodyH - 11;\n    ctx.fillStyle = '#e8b892';\n    ctx.beginPath();\n"+
"    ctx.arc(hx, hy, 11, 0, Math.PI * 2);\n    ctx.fill();\n    ctx.fillStyle = '"+
"#c4a06a';\n    ctx.beginPath();\n    ctx.ellipse(hx, hy - 5, 10, 6, 0, Math.PI, "+
"0);\n    ctx.fill();\n    const mood = k.emotion || 'ready';\n    const hold = Ma"+
"th.max(0, Math.min(1, k.emotionHold));\n    // Eyes\n    ctx.fillStyle = '#2a1a1"+
"2';\n    if (mood === 'frustrated') {\n      // angry brows + narrowed eyes\n    "+
"  ctx.strokeStyle = '#3a2a20';\n      ctx.lineWidth = 2;\n      ctx.beginPath();"+
"\n      ctx.moveTo(hx - 7, hy - 4);\n      ctx.lineTo(hx - 2, hy - 2);\n      ctx"+
".moveTo(hx + 7, hy - 4);\n      ctx.lineTo(hx + 2, hy - 2);\n      ctx.stroke();"+
"\n      ctx.fillRect(hx - 5, hy - 1, 3, 2);\n      ctx.fillRect(hx + 2, hy - 1, "+
"3, 2);\n    } else if (mood === 'smug') {\n      ctx.fillRect(hx - 5, hy - 2, 3,"+
" 2);\n      ctx.fillRect(hx + 2, hy - 2, 3, 2);\n      ctx.strokeStyle = '#3a2a2"+
"0';\n      ctx.lineWidth = 1.5;\n      ctx.beginPath();\n      ctx.moveTo(hx - 7,"+
" hy - 4);\n      ctx.lineTo(hx - 2, hy - 5);\n      ctx.moveTo(hx + 2, hy - 5);\n"+
"      ctx.lineTo(hx + 7, hy - 4);\n      ctx.stroke();\n    } else if (mood === "+
"'relief') {\n      // soft closed-ish eyes\n      ctx.strokeStyle = '#3a2a20';\n "+
"     ctx.lineWidth = 1.8;\n      ctx.beginPath();\n      ctx.arc(hx - 3.5, hy - "+
"1, 2.2, Math.PI * 0.15, Math.PI * 0.85);\n      ctx.stroke();\n      ctx.beginPa"+
"th();\n      ctx.arc(hx + 3.5, hy - 1, 2.2, Math.PI * 0.15, Math.PI * 0.85);\n  "+
"    ctx.stroke();\n    } else {\n      ctx.fillRect(hx - 5, hy - 2, 2, 2);\n     "+
" ctx.fillRect(hx + 3, hy - 2, 2, 2);\n    }\n    // Mouth\n    ctx.strokeStyle = "+
"'#5a3030';\n    ctx.lineWidth = 1.6;\n    ctx.beginPath();\n    if (mood === 'fru"+
"strated') {\n      ctx.moveTo(hx - 4, hy + 5);\n      ctx.quadraticCurveTo(hx, h"+
"y + 2, hx + 4, hy + 5);\n    } else if (mood === 'smug') {\n      ctx.moveTo(hx "+
"- 4, hy + 3);\n      ctx.quadraticCurveTo(hx + 1, hy + 7, hx + 5, hy + 3);\n    "+
"} else if (mood === 'relief') {\n      ctx.moveTo(hx - 3, hy + 4);\n      ctx.qu"+
"adraticCurveTo(hx, hy + 6, hx + 3, hy + 4);\n    } else {\n      ctx.moveTo(hx -"+
" 3, hy + 4);\n      ctx.lineTo(hx + 3, hy + 4);\n    }\n    ctx.stroke();\n    // "+
"Brief flash of emotion intensity on banner beat\n    if (hold > 0.4 && mood !=="+
" 'ready') {\n      ctx.globalAlpha = 0.25 * hold;\n      ctx.fillStyle = mood =="+
"= 'frustrated' ? '#ff4d4d' : mood === 'smug' ? '#3df0ff' : '#ffe566';\n      ct"+
"x.beginPath();\n      ctx.arc(hx, hy, 14, 0, Math.PI * 2);\n      ctx.fill();\n  "+
"    ctx.globalAlpha = 1;\n    }\n    function drawGlove(gx, gy) {\n      ctx.fill"+
"Style = '#ffffff';\n      ctx.beginPath();\n      ctx.ellipse(gx, gy, 11, 9, 0, "+
"0, Math.PI * 2);\n      ctx.fill();\n      ctx.strokeStyle = '#c8c8d0';\n      ct"+
"x.lineWidth = 2;\n      ctx.stroke();\n      ctx.fillStyle = '#f0f0f5';\n      fo"+
"r (let i = -1; i <= 1; i++) {\n        ctx.beginPath();\n        ctx.arc(gx + i "+
"* 5, gy - 7, 3.5, 0, Math.PI * 2);\n        ctx.fill();\n      }\n    }\n    drawG"+
"love(-armReach * 0.85, armY);\n  "
);
