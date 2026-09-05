window.__GS=(window.__GS||[]);window.__GS.push(
"ll();\n    ctx.save();\n    ctx.translate(b.x, drawY);\n    ctx"+
".rotate(b.spinning * 0.05);\n    ctx.strokeStyle = '#111';\n  "+
"  ctx.lineWidth = Math.max(1.5, r * 0.08);\n    ctx.beginPath"+
"();\n    for (let i = 0; i < 5; i++) {\n      const a = (i / 5"+
") * Math.PI * 2 - Math.PI / 2;\n      const px = Math.cos(a) "+
"* r * 0.45;\n      const py = Math.sin(a) * r * 0.45;\n      i"+
"f (i === 0) ctx.moveTo(px, py);\n      else ctx.lineTo(px, py"+
");\n    }\n    ctx.closePath();\n    ctx.stroke();\n    ctx.fill"+
"Style = '#111';\n    ctx.beginPath();\n    ctx.arc(0, 0, r * 0"+
".12, 0, Math.PI * 2);\n    ctx.fill();\n    ctx.restore();\n   "+
" if (state.phase === 'aim') {\n      ctx.strokeStyle = 'rgba("+
"255,229,102,0.75)';\n      ctx.lineWidth = 3;\n      ctx.setLi"+
"neDash([6, 6]);\n      ctx.beginPath();\n      ctx.arc(b.x, dr"+
"awY, r * 1.55, 0, Math.PI * 2);\n      ctx.stroke();\n      ct"+
"x.setLineDash([]);\n    }\n    if (state.drag && state.drag.po"+
"ints.length > 1) {\n      const pts = state.drag.points;\n    "+
"  const a = pts[0];\n      const c = pts[pts.length - 1];\n   "+
"   ctx.strokeStyle = 'rgba(61,240,255,0.85)';\n      ctx.line"+
"Width = 4;\n      ctx.beginPath();\n      ctx.moveTo(b.x, b.y)"+
";\n      ctx.lineTo(b.x + (c.x - a.x) * 1.4, b.y + (c.y - a.y"+
") * 1.4);\n      ctx.stroke();\n    }\n  }\n  function drawParti"+
"cles() {\n    for (const p of state.particles) {\n      ctx.gl"+
"obalAlpha = Math.max(0, p.life);\n      ctx.fillStyle = p.col"+
"or;\n      ctx.fillRect(p.x, p.y, p.r, p.r);\n    }\n    ctx.gl"+
"obalAlpha = 1;\n  }\n  function drawArcadeChrome() {\n    ctx.f"+
"illStyle = 'rgba(0,0,0,0.25)';\n    ctx.fillRect(0, H * 0.88,"+
" W, H * 0.12);\n    ctx.fillStyle = 'rgba(255,229,102,0.15)';"+
"\n    ctx.fillRect(0, H * 0.88, W, 3);\n    ctx.strokeStyle = "+
"'rgba(61,240,255,0.55)';\n    ctx.lineWidth = 3;\n    const m "+
"= 10;\n    ctx.beginPath();\n    ctx.moveTo(m, m + 24);\n    ct"+
"x.lineTo(m, m);\n    ctx.lineTo(m + 24, m);\n    ctx.moveTo(W "+
"- m, m + 24);\n    ctx.lineTo(W - m, m);\n    ctx.lineTo(W - m"+
" - 24, m);\n    ctx.moveTo(m, H - m - 24);\n    ctx.lineTo(m, "+
"H - m);\n    ctx.lineTo(m + 24, H - m);\n    ctx.moveTo(W - m,"+
" H - m - 24);\n    ctx.lineTo(W - m, H - m);\n    ctx.lineTo(W"+
" - m - 24, H - m);\n    ctx.stroke();\n  }\n  function render()"+
" {\n    drawBg();\n    drawGoalFrame();\n    drawKeeper();\n    "+
"drawBall();\n    drawParticles();\n    drawArcadeChrome();\n  }"+
"\n  function loop(ts) {\n    if (!state.lastTs) state.lastTs ="+
" ts;\n    const dt = Math.min(0.05, (ts - state.lastTs) / 100"+
"0);\n    state.lastTs = ts;\n    if (state.phase !== 'title' &"+
"& state.phase !== 'end') {\n      update(dt);\n    } else if ("+
"state.keeper) {\n      state.keeper.limbPhase += dt * 3;\n    "+
"}\n    render();\n    requestAnimationFrame(loop);\n  }\n  canva"+
"s.addEventListener('pointerdown', onPointerDown);\n  canvas.a"+
"ddEventListener('pointermove', onPointerMove);\n  canvas.addE"+
"ventListener('pointerup', onPointerUp);\n  canvas.addEventLis"+
"tener('pointercancel', onPointerUp);\n  document.getElementBy"+
"Id('playBtn').addEventListener('click', () => {\n    ensureAu"+
"dio();\n    startMatch();\n  });\n  document.getElementById('re"+
"matchBtn').addEventListener('click', () => {\n    ensureAudio"+
"();\n    startMatch();\n  });\n  muteBtn.addEventListener('clic"+
"k', () => {\n    muted = !muted;\n    muteBtn.textContent = mu"+
"ted ? '\ud83d\udd07' : '\ud83d\udd0a';\n    muteBtn.setAttribute('aria-label', mute"+
"d ? 'Unmute' : 'Mute');\n  });\n  window.addEventListener('res"+
"ize', () => {\n    const wasX = state.ball ? state.ball.x / W"+
" : 0.5;\n    const wasY = state.ball ? state.ball.y / H : 0.7"+
"8;\n    resize();\n    if (state.ball) {\n      state.ball.x = "+
"wasX * W;\n      state.ball.y = wasY * H;\n      state.ball.r "+
"= Math.max(18, W * 0.055);\n    }\n    if (state.keeper) {\n   "+
"   state.keeper.homeX = W * 0.5;\n      state.keeper.homeY = "+
"H * field.goalBottom - 8;\n      state.keeper.w = W * 0.14;\n "+
"     state.keeper.h = H * 0.12;\n      if (state.phase === 'a"+
"im') {\n        state.keeper.x = state.keeper.homeX;\n        "+
"state.keeper.y = state.keeper.homeY;\n      }\n    }\n  });\n  r"+
"esize();\n  resetBall();\n  resetKeeper();\n  loadBg().then(() "+
"=> {\n    requestAnimationFrame(loop);\n  });\n})();\n"
);
