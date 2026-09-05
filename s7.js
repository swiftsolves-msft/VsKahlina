window.__GS=(window.__GS||[]);window.__GS.push(
"  drawGlove(armReach * 0.85, armY + (k.diveDir === 0 ? -5 : 4));\n    if (stret"+
"ch < 0.25) {\n      ctx.fillStyle = 'rgba(0,0,0,0.5)';\n      ctx.fillRect(-32, "+
"bodyH * 0.45, 64, 14);\n      ctx.fillStyle = '#3df0ff';\n      ctx.font = 'bold"+
" 9px Arial';\n      ctx.textAlign = 'center';\n      ctx.fillText('KAHLINA', 0, "+
"bodyH * 0.45 + 10);\n    }\n    ctx.restore();\n  }\n  function roundRect(x, y, w,"+
" h, r) {\n    ctx.beginPath();\n    ctx.moveTo(x + r, y);\n    ctx.arcTo(x + w, y"+
", x + w, y + h, r);\n    ctx.arcTo(x + w, y + h, x, y + h, r);\n    ctx.arcTo(x,"+
" y + h, x, y, r);\n    ctx.arcTo(x, y, x + w, y, r);\n    ctx.closePath();\n  }\n "+
" function drawBall() {\n    const b = state.ball;\n    for (const t of state.tra"+
"il) {\n      ctx.globalAlpha = Math.max(0, t.life) * 0.35;\n      ctx.fillStyle "+
"= '#ffe566';\n      ctx.beginPath();\n      ctx.arc(t.x, t.y, b.r * t.s * 0.55, "+
"0, Math.PI * 2);\n      ctx.fill();\n    }\n    ctx.globalAlpha = 1;\n    const dr"+
"awY = b.y - b.z * 0.4;\n    const r = b.r * b.scale;\n    ctx.fillStyle = 'rgba("+
"0,0,0,0.35)';\n    ctx.beginPath();\n    ctx.ellipse(b.x, b.y + r * 0.35, r * 0."+
"85, r * 0.28, 0, 0, Math.PI * 2);\n    ctx.fill();\n    const grd = ctx.createRa"+
"dialGradient(b.x - r * 0.3, drawY - r * 0.35, r * 0.2, b.x, drawY, r);\n    grd"+
".addColorStop(0, '#ffffff');\n    grd.addColorStop(0.55, '#e8e8e8');\n    grd.ad"+
"dColorStop(1, '#9aa0a8');\n    ctx.fillStyle = grd;\n    ctx.beginPath();\n    ct"+
"x.arc(b.x, drawY, r, 0, Math.PI * 2);\n    ctx.fill();\n    ctx.save();\n    ctx."+
"translate(b.x, drawY);\n    ctx.rotate(b.spinning * 0.05);\n    ctx.strokeStyle "+
"= '#111';\n    ctx.lineWidth = Math.max(1.5, r * 0.08);\n    ctx.beginPath();\n  "+
"  for (let i = 0; i < 5; i++) {\n      const a = (i / 5) * Math.PI * 2 - Math.P"+
"I / 2;\n      const px = Math.cos(a) * r * 0.45;\n      const py = Math.sin(a) *"+
" r * 0.45;\n      if (i === 0) ctx.moveTo(px, py);\n      else ctx.lineTo(px, py"+
");\n    }\n    ctx.closePath();\n    ctx.stroke();\n    ctx.fillStyle = '#111';\n  "+
"  ctx.beginPath();\n    ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);\n    ctx.fill()"+
";\n    ctx.restore();\n    if (state.phase === 'aim') {\n      ctx.strokeStyle = "+
"'rgba(255,229,102,0.75)';\n      ctx.lineWidth = 3;\n      ctx.setLineDash([6, 6"+
"]);\n      ctx.beginPath();\n      ctx.arc(b.x, drawY, r * 1.55, 0, Math.PI * 2)"+
";\n      ctx.stroke();\n      ctx.setLineDash([]);\n    }\n    if (state.drag && s"+
"tate.drag.points.length > 1) {\n      const pts = state.drag.points;\n      cons"+
"t a = pts[0];\n      const c = pts[pts.length - 1];\n      ctx.strokeStyle = 'rg"+
"ba(61,240,255,0.85)';\n      ctx.lineWidth = 4;\n      ctx.beginPath();\n      ct"+
"x.moveTo(b.x, b.y);\n      ctx.lineTo(b.x + (c.x - a.x) * 1.4, b.y + (c.y - a.y"+
") * 1.4);\n      ctx.stroke();\n    }\n  }\n  function drawParticles() {\n    for ("+
"const p of state.particles) {\n      ctx.globalAlpha = Math.max(0, p.life);\n   "+
"   ctx.fillStyle = p.color;\n      ctx.fillRect(p.x, p.y, p.r, p.r);\n    }\n    "+
"ctx.globalAlpha = 1;\n  }\n  function drawArcadeChrome() {\n    ctx.fillStyle = '"+
"rgba(0,0,0,0.25)';\n    ctx.fillRect(0, H * 0.88, W, H * 0.12);\n    ctx.fillSty"+
"le = 'rgba(255,229,102,0.15)';\n    ctx.fillRect(0, H * 0.88, W, 3);\n    ctx.st"+
"rokeStyle = 'rgba(61,240,255,0.55)';\n    ctx.lineWidth = 3;\n    const m = 10;\n"+
"    ctx.beginPath();\n    ctx.moveTo(m, m + 24);\n    ctx.lineTo(m, m);\n    ctx."+
"lineTo(m + 24, m);\n    ctx.moveTo(W - m, m + 24);\n    ctx.lineTo(W - m, m);\n  "+
"  ctx.lineTo(W - m - 24, m);\n    ctx.moveTo(m, H - m - 24);\n    ctx.lineTo(m, "+
"H - m);\n    ctx.lineTo(m + 24, H - m);\n    ctx.moveTo(W - m, H - m - 24);\n    "+
"ctx.lineTo(W - m, H - m);\n    ctx.lineTo(W - m - 24, H - m);\n    ctx.stroke();"+
"\n  }\n  function render() {\n    drawBg();\n    drawGoalFrame();\n    drawKeeper()"+
";\n    drawBall();\n    drawParticles();\n    drawArcadeChrome();\n  }\n  function "+
"loop(ts) {\n    if (!state.lastTs) state.lastTs = ts;\n    const dt = Math.min(0"+
".05, (ts - state.lastTs) / 1000);\n    state.lastTs = ts;\n    if (state.phase !"+
"== 'title' && state.phase !== 'end') {\n      update(dt);\n    } else if (state."+
"keeper) {\n      state.keeper.limbPhase += dt * 3;\n    }\n    render();\n    requ"+
"estAnimationFrame(loop);\n  }\n  canvas.addEventListener('pointerdown', onPointe"+
"rDown);\n  canvas.addEventListener('pointermove', onPointerMove);\n  canvas.addE"+
"ventListener('pointerup', onPointerUp);\n  canvas.addEventListener('pointercanc"+
"el', onPointerUp);\n  document.getElementById('playBtn').addEventListener('clic"+
"k', () => {\n    ensureAudio();\n    startMatch();\n  });\n  document.getElementBy"+
"Id('rematchBtn').addEventListener('click', () => {\n    ensureAudio();\n    star"+
"tMatch();\n  });\n  muteBtn.addEventListener('click', () => {\n    muted = !muted"+
";\n    muteBtn.textContent = muted ? '🔇' : '🔊';\n    muteBtn.setAttribute('ari"+
"a-label', muted ? 'Unmute' : 'Mute');\n  });\n  window.addEventListener('resize'"+
", () => {\n    const wasX = state.ball ? state.ball.x / W : 0.5;\n    const wasY"+
" = state.ball ? state.ball.y / H : 0.78;\n    resize();\n    if (state.ball) {\n "+
"     state.ball.x = wasX * W;\n      state.ball.y = wasY * H;\n      state.ball."+
"r = Math.max(18, W * 0.055);\n    }\n    if (state.keeper) {\n      state.keeper."+
"homeX = W * 0.5;\n      state.keeper.homeY = H * field.goalBottom - Math.max(6,"+
" H * 0.01);\n      state.keeper.w = W * 0.16;\n      state.keeper.h = H * 0.135;"+
"\n      if (state.phase === 'aim') {\n        state.keeper.x = state.keeper.home"+
"X;\n        state.keeper.y = state.keeper.homeY;\n      }\n    }\n  });\n  resize()"+
";\n  resetBall();\n  resetKeeper();\n  loadBg().then(() => {\n    requestAnimation"+
"Frame(loop);\n  });\n})();\n"
);
