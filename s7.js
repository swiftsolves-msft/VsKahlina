window.__GS=(window.__GS||[]);window.__GS.push(
"    ctx.fillStyle = 'rgba(0,0,0,0.35)';\n    ctx.beginPath();\n    ctx.e"+
"llipse(b.x, b.y + r * 0.35, r * 0.85, r * 0.28, 0, 0, Math.PI * 2);\n  "+
"  ctx.fill();\n    const grd = ctx.createRadialGradient(b.x - r * 0.3, "+
"drawY - r * 0.35, r * 0.2, b.x, drawY, r);\n    grd.addColorStop(0, '#f"+
"fffff');\n    grd.addColorStop(0.55, '#e8e8e8');\n    grd.addColorStop(1"+
", '#9aa0a8');\n    ctx.fillStyle = grd;\n    ctx.beginPath();\n    ctx.ar"+
"c(b.x, drawY, r, 0, Math.PI * 2);\n    ctx.fill();\n    ctx.save();\n    "+
"ctx.translate(b.x, drawY);\n    ctx.rotate(b.spinning * 0.05);\n    ctx."+
"strokeStyle = '#111';\n    ctx.lineWidth = Math.max(1.5, r * 0.08);\n   "+
" ctx.beginPath();\n    for (let i = 0; i < 5; i++) {\n      const a = (i"+
" / 5) * Math.PI * 2 - Math.PI / 2;\n      const px = Math.cos(a) * r * "+
"0.45;\n      const py = Math.sin(a) * r * 0.45;\n      if (i === 0) ctx."+
"moveTo(px, py);\n      else ctx.lineTo(px, py);\n    }\n    ctx.closePath"+
"();\n    ctx.stroke();\n    ctx.fillStyle = '#111';\n    ctx.beginPath();"+
"\n    ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);\n    ctx.fill();\n    ctx."+
"restore();\n    if (state.phase === 'aim') {\n      ctx.strokeStyle = 'r"+
"gba(255,229,102,0.75)';\n      ctx.lineWidth = 3;\n      ctx.setLineDash"+
"([6, 6]);\n      ctx.beginPath();\n      ctx.arc(b.x, drawY, r * 1.55, 0"+
", Math.PI * 2);\n      ctx.stroke();\n      ctx.setLineDash([]);\n    }\n "+
"   if (state.drag && state.drag.points.length > 1) {\n      const pts ="+
" state.drag.points;\n      const a = pts[0];\n      const c = pts[pts.le"+
"ngth - 1];\n      ctx.strokeStyle = 'rgba(61,240,255,0.85)';\n      ctx."+
"lineWidth = 4;\n      ctx.beginPath();\n      ctx.moveTo(b.x, b.y);\n    "+
"  ctx.lineTo(b.x + (c.x - a.x) * 1.4, b.y + (c.y - a.y) * 1.4);\n      "+
"ctx.stroke();\n    }\n  }\n  function drawParticles() {\n    for (const p "+
"of state.particles) {\n      ctx.globalAlpha = Math.max(0, p.life);\n   "+
"   ctx.fillStyle = p.color;\n      ctx.fillRect(p.x, p.y, p.r, p.r);\n  "+
"  }\n    ctx.globalAlpha = 1;\n  }\n  function drawArcadeChrome() {\n    c"+
"tx.fillStyle = 'rgba(0,0,0,0.25)';\n    ctx.fillRect(0, H * 0.88, W, H "+
"* 0.12);\n    ctx.fillStyle = 'rgba(255,229,102,0.15)';\n    ctx.fillRec"+
"t(0, H * 0.88, W, 3);\n    ctx.strokeStyle = 'rgba(61,240,255,0.55)';\n "+
"   ctx.lineWidth = 3;\n    const m = 10;\n    ctx.beginPath();\n    ctx.m"+
"oveTo(m, m + 24);\n    ctx.lineTo(m, m);\n    ctx.lineTo(m + 24, m);\n   "+
" ctx.moveTo(W - m, m + 24);\n    ctx.lineTo(W - m, m);\n    ctx.lineTo(W"+
" - m - 24, m);\n    ctx.moveTo(m, H - m - 24);\n    ctx.lineTo(m, H - m)"+
";\n    ctx.lineTo(m + 24, H - m);\n    ctx.moveTo(W - m, H - m - 24);\n  "+
"  ctx.lineTo(W - m, H - m);\n    ctx.lineTo(W - m - 24, H - m);\n    ctx"+
".stroke();\n  }\n  function render() {\n    drawBg();\n    drawGoalFrame()"+
";\n    drawKeeper();\n    drawBall();\n    drawParticles();\n    drawArcad"+
"eChrome();\n  }\n  function loop(ts) {\n    if (!state.lastTs) state.last"+
"Ts = ts;\n    const dt = Math.min(0.05, (ts - state.lastTs) / 1000);\n  "+
"  state.lastTs = ts;\n    if (state.phase !== 'title' && state.phase !="+
"= 'end') {\n      update(dt);\n    } else if (state.keeper) {\n      stat"+
"e.keeper.limbPhase += dt * 3;\n    }\n    render();\n    requestAnimation"+
"Frame(loop);\n  }\n  canvas.addEventListener('pointerdown', onPointerDow"+
"n);\n  canvas.addEventListener('pointermove', onPointerMove);\n  canvas."+
"addEventListener('pointerup', onPointerUp);\n  canvas.addEventListener("+
"'pointercancel', onPointerUp);\n  document.getElementById('playBtn').ad"+
"dEventListener('click', () => {\n    ensureAudio();\n    startMatch();\n "+
" });\n  document.getElementById('rematchBtn').addEventListener('click',"+
" () => {\n    ensureAudio();\n    startMatch();\n  });\n  muteBtn.addEvent"+
"Listener('click', () => {\n    muted = !muted;\n    muteBtn.textContent "+
"= muted ? '🔇' : '🔊';\n    muteBtn.setAttribute('aria-label', muted ? "+
"'Unmute' : 'Mute');\n  });\n  window.addEventListener('resize', () => {\n"+
"    const wasX = state.ball ? state.ball.x / W : 0.5;\n    const wasY ="+
" state.ball ? state.ball.y / H : 0.78;\n    resize();\n    if (state.bal"+
"l) {\n      state.ball.x = wasX * W;\n      state.ball.y = wasY * H;\n   "+
"   state.ball.r = Math.max(18, W * 0.055);\n    }\n    if (state.keeper)"+
" {\n      state.keeper.homeX = W * 0.5;\n      state.keeper.homeY = H * "+
"field.goalBottom - Math.max(6, H * 0.01);\n      state.keeper.w = W * 0"+
".14;\n      state.keeper.h = H * 0.12;\n      if (state.phase === 'aim')"+
" {\n        state.keeper.x = state.keeper.homeX;\n        state.keeper.y"+
" = state.keeper.homeY;\n      }\n    }\n  });\n  resize();\n  resetBall();\n"+
"  resetKeeper();\n  loadBg().then(() => {\n    requestAnimationFrame(loo"+
"p);\n  });\n})();\n"
);
