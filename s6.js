window.__GS=(window.__GS||[]);window.__GS.push(
"l();\n    ctx.fillStyle = '#0d0d12';\n    roundRect(-bodyW * 0"+
".38, -2, bodyW * 0.34, bodyH * 0.85, 3);\n    ctx.fill();\n   "+
" roundRect(bodyW * 0.04, -2, bodyW * 0.34, bodyH * 0.85, 3);"+
"\n    ctx.fill();\n    ctx.fillStyle = '#f5f5f5';\n    roundRec"+
"t(-bodyW * 0.42, bodyH * 0.78, bodyW * 0.38, 8, 2);\n    ctx."+
"fill();\n    roundRect(bodyW * 0.04, bodyH * 0.78, bodyW * 0."+
"38, 8, 2);\n    ctx.fill();\n    ctx.fillStyle = '#7dff4a';\n  "+
"  ctx.fillRect(-bodyW * 0.42, bodyH * 0.86, bodyW * 0.38, 2)"+
";\n    ctx.fillRect(bodyW * 0.04, bodyH * 0.86, bodyW * 0.38,"+
" 2);\n    const jersey = ctx.createLinearGradient(-bodyW, -bo"+
"dyH, bodyW, 0);\n    jersey.addColorStop(0, '#1e5fd4');\n    j"+
"ersey.addColorStop(0.5, '#2a6fff');\n    jersey.addColorStop("+
"1, '#1548a8');\n    ctx.fillStyle = jersey;\n    roundRect(-bo"+
"dyW / 2, -bodyH, bodyW, bodyH * 0.95, 5);\n    ctx.fill();\n  "+
"  ctx.fillStyle = '#d8dde6';\n    const armReach = k.w * (0.3"+
"2 + dive * 0.5);\n    const armY = -bodyH * 0.55 - k.diveHeig"+
"ht * dive * 16;\n    ctx.save();\n    ctx.translate(-bodyW * 0"+
".45, -bodyH * 0.55);\n    ctx.rotate(-0.35 - dive * 0.4 * (k."+
"diveDir <= 0 ? 1 : 0.3));\n    roundRect(-6, -4, 14, armReach"+
" * 0.55, 4);\n    ctx.fill();\n    ctx.restore();\n    ctx.save"+
"();\n    ctx.translate(bodyW * 0.45, -bodyH * 0.55);\n    ctx."+
"rotate(0.35 + dive * 0.4 * (k.diveDir >= 0 ? 1 : 0.3));\n    "+
"roundRect(-8, -4, 14, armReach * 0.55, 4);\n    ctx.fill();\n "+
"   ctx.restore();\n    ctx.fillStyle = 'rgba(255,255,255,0.85"+
")';\n    ctx.fillRect(-bodyW * 0.28, -bodyH * 0.55, bodyW * 0"+
".56, 6);\n    ctx.fillStyle = '#e8b892';\n    ctx.beginPath();"+
"\n    ctx.arc(0, -bodyH - 11, 11, 0, Math.PI * 2);\n    ctx.fi"+
"ll();\n    ctx.fillStyle = '#c4a06a';\n    ctx.beginPath();\n  "+
"  ctx.ellipse(0, -bodyH - 16, 10, 6, 0, Math.PI, 0);\n    ctx"+
".fill();\n    ctx.fillStyle = '#3a2a20';\n    ctx.fillRect(-5,"+
" -bodyH - 12, 2, 2);\n    ctx.fillRect(3, -bodyH - 12, 2, 2);"+
"\n    const gloveL = { x: -armReach, y: armY };\n    const glo"+
"veR = { x: armReach, y: armY + (k.diveDir === 0 ? -4 : 3) };"+
"\n    const glx = -bodyW * 0.45 - Math.cos(0.9) * armReach * "+
"0.7;\n    const gry = -bodyH * 0.55 + armY * 0.15;\n    functi"+
"on drawGlove(gx, gy) {\n      ctx.fillStyle = '#ffffff';\n    "+
"  ctx.beginPath();\n      ctx.ellipse(gx, gy, 11, 9, 0, 0, Ma"+
"th.PI * 2);\n      ctx.fill();\n      ctx.strokeStyle = '#c8c8"+
"d0';\n      ctx.lineWidth = 2;\n      ctx.stroke();\n      ctx."+
"fillStyle = '#f0f0f5';\n      for (let i = -1; i <= 1; i++) {"+
"\n        ctx.beginPath();\n        ctx.arc(gx + i * 5, gy - 7"+
", 3.5, 0, Math.PI * 2);\n        ctx.fill();\n      }\n    }\n  "+
"  drawGlove(-armReach * 0.85, armY);\n    drawGlove(armReach "+
"* 0.85, armY + (k.diveDir === 0 ? -5 : 4));\n    if (stretch "+
"< 0.25) {\n      ctx.fillStyle = 'rgba(0,0,0,0.5)';\n      ctx"+
".fillRect(-32, bodyH * 0.45, 64, 14);\n      ctx.fillStyle = "+
"'#3df0ff';\n      ctx.font = 'bold 9px Arial';\n      ctx.text"+
"Align = 'center';\n      ctx.fillText('KAHLINA', 0, bodyH * 0"+
".45 + 10);\n    }\n    ctx.restore();\n  }\n  function roundRect"+
"(x, y, w, h, r) {\n    ctx.beginPath();\n    ctx.moveTo(x + r,"+
" y);\n    ctx.arcTo(x + w, y, x + w, y + h, r);\n    ctx.arcTo"+
"(x + w, y + h, x, y + h, r);\n    ctx.arcTo(x, y + h, x, y, r"+
");\n    ctx.arcTo(x, y, x + w, y, r);\n    ctx.closePath();\n  "+
"}\n  function drawBall() {\n    const b = state.ball;\n    for "+
"(const t of state.trail) {\n      ctx.globalAlpha = Math.max("+
"0, t.life) * 0.35;\n      ctx.fillStyle = '#ffe566';\n      ct"+
"x.beginPath();\n      ctx.arc(t.x, t.y, b.r * t.s * 0.55, 0, "+
"Math.PI * 2);\n      ctx.fill();\n    }\n    ctx.globalAlpha = "+
"1;\n    const drawY = b.y - b.z * 0.4;\n    const r = b.r * b."+
"scale;\n    ctx.fillStyle = 'rgba(0,0,0,0.35)';\n    ctx.begin"+
"Path();\n    ctx.ellipse(b.x, b.y + r * 0.35, r * 0.85, r * 0"+
".28, 0, 0, Math.PI * 2);\n    ctx.fill();\n    const grd = ctx"+
".createRadialGradient(b.x - r * 0.3, drawY - r * 0.35, r * 0"+
".2, b.x, drawY, r);\n    grd.addColorStop(0, '#ffffff');\n    "+
"grd.addColorStop(0.55, '#e8e8e8');\n    grd.addColorStop(1, '"+
"#9aa0a8');\n    ctx.fillStyle = grd;\n    ctx.beginPath();\n   "+
" ctx.arc(b.x, drawY, r, 0, Math.PI * 2);\n    ctx.fi"
);
