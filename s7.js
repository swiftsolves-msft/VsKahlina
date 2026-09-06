window.__GS=(window.__GS||[]);window.__GS.push(
"  drawGlove(armReach * 0.85, armY + (k.diveDir === 0 ? -5 : 4));\n    if (stretc"+
"h < 0.25) {\n      ctx.fillStyle = 'rgba(0,0,0,0.5)';\n      ctx.fillRect(-32, b"+
"odyH * 0.45, 64, 14);\n      ctx.fillStyle = '#3df0ff';\n      ctx.font = 'bold "+
"9px Arial';\n      ctx.textAlign = 'center';\n      ctx.fillText('KAHLINA', 0, b"+
"odyH * 0.45 + 10);\n    }\n    ctx.restore();\n  }\n  function roundRect(x, y, w"+
", h, r) {\n    ctx.beginPath();\n    ctx.moveTo(x + r, y);\n    ctx.arcTo(x + w,"+
" y, x + w, y + h, r);\n    ctx.arcTo(x + w, y + h, x, y + h, r);\n    ctx.arcTo("+
"x, y + h, x, y, r);\n    ctx.arcTo(x, y, x + w, y, r);\n    ctx.closePath();\n  "+
"}\n  function drawBall() {\n    const b = state.ball;\n    for (const t of state"+
".trail) {\n      ctx.globalAlpha = Math.max(0, t.life) * 0.35;\n      ctx.fillSt"+
"yle = '#ffe566';\n      ctx.beginPath();\n      ctx.arc(t.x, t.y, b.r * t.s * 0."+
"55, 0, Math.PI * 2);\n      ctx.fill();\n    }\n    ctx.globalAlpha = 1;\n    co"+
"nst drawY = b.y - b.z * 0.4;\n    const r = b.r * b.scale;\n    ctx.fillStyle = "+
"'rgba(0,0,0,0.35)';\n    ctx.beginPath();\n    ctx.ellipse(b.x, b.y + r * 0.35, "+
"r * 0.85, r * 0.28, 0, 0, Math.PI * 2);\n    ctx.fill();\n    const grd = ctx.cr"+
"eateRadialGradient(b.x - r * 0.3, drawY - r * 0.35, r * 0.2, b.x, drawY, r);\n  "+
"  grd.addColorStop(0, '#ffffff');\n    grd.addColorStop(0.55, '#e8e8e8');\n    g"+
"rd.addColorStop(1, '#9aa0a8');\n    ctx.fillStyle = grd;\n    ctx.beginPath();\n"+
"    ctx.arc(b.x, drawY, r, 0, Math.PI * 2);\n    ctx.fill();\n    ctx.save();\n "+
"   ctx.translate(b.x, drawY);\n    ctx.rotate(b.spinning * 0.05);\n    ctx.strok"+
"eStyle = '#111';\n    ctx.lineWidth = Math.max(1.5, r * 0.08);\n    ctx.beginPat"+
"h();\n    for (let i = 0; i < 5; i++) {\n      const a = (i / 5) * Math.PI * 2 -"+
" Math.PI / 2;\n      const px = Math.cos(a) * r * 0.45;\n      const py = Math.s"+
"in(a) * r * 0.45;\n      if (i === 0) ctx.moveTo(px, py);\n      else ctx.lineTo"+
"(px, py);\n    }\n    ctx.closePath();\n    ctx.stroke();\n    ctx.fillStyle = '"+
"#111';\n    ctx.beginPath();\n    ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);\n    "+
"ctx.fill();\n    ctx.restore();\n    if (state.phase === 'aim') {\n      ctx.str"+
"okeStyle = 'rgba(255,229,102,0.75)';\n      ctx.lineWidth = 3;\n      ctx.setLin"+
"eDash([6, 6]);\n      ctx.beginPath();\n      ctx.arc(b.x, drawY, r * 1.55, 0, M"+
"ath.PI * 2);\n      ctx.stroke();\n      ctx.setLineDash([]);\n    }\n    if (st"+
"ate.drag && state.drag.points.length > 1) {\n      const pts = state.drag.points"+
";\n      const a = pts[0];\n      const c = pts[pts.length - 1];\n      ctx.stro"+
"keStyle = 'rgba(61,240,255,0.85)';\n      ctx.lineWidth = 4;\n      ctx.beginPat"+
"h();\n      ctx.moveTo(b.x, b.y);\n      ctx.lineTo(b.x + (c.x - a.x) * 1.4, b.y"+
" + (c.y - a.y) * 1.4);\n      ctx.stroke();\n    }\n  }\n  function drawParticle"+
"s() {\n    for (const p of state.particles) {\n      ctx.globalAlpha = Math.max("+
"0, p.life);\n      ctx.fillStyle = p.color;\n      ctx.fillRect(p.x, p.y, p.r, p"+
".r);\n    }\n    ctx.globalAlpha = 1;\n  }\n  function drawArcadeChrome() {\n   "+
" ctx.fillStyle = 'rgba(0,0,0,0.25)';\n    ctx.fillRect(0, H * 0.88, W, H * 0.12)"+
";\n    ctx.fillStyle = 'rgba(255,229,102,0.15)';\n    ctx.fillRect(0, H * 0.88, "+
"W, 3);\n    ctx.strokeStyle = 'rgba(61,240,255,0.55)';\n    ctx.lineWidth = 3;\n"+
"    const m = 10;\n    ctx.beginPath();\n    ctx.moveTo(m, m + 24);\n    ctx.lin"+
"eTo(m, m);\n    ctx.lineTo(m + 24, m);\n    ctx.moveTo(W - m, m + 24);\n    ctx."+
"lineTo(W - m, m);\n    ctx.lineTo(W - m - 24, m);\n    ctx.moveTo(m, H - m - 24)"+
";\n    ctx.lineTo(m, H - m);\n    ctx.lineTo(m + 24, H - m);\n    ctx.moveTo(W -"+
" m, H - m - 24);\n    ctx.lineTo(W - m, H - m);\n    ctx.lineTo(W - m - 24, H - "+
"m);\n    ctx.stroke();\n  }\n  \n  function beginPerfectCelebrate() {\n    state"+
".phase = 'celebrate';\n    state.camY = 0;\n    const rockets = [];\n    const n"+
" = 3 + Math.floor(Math.random() * 3);\n    for (let i = 0; i < n; i++) {\n      "+
"rockets.push({\n        x: W * (0.18 + Math.random() * 0.64), y: H * 0.55,\n    "+
"    vy: -(4.2 + Math.random() * 2.4),\n        life: 0.55 + Math.random() * 0.45"+
" + i * 0.18,\n        color: ['#ffe566', '#ff3d6e', '#3df0ff', '#b8ff66', '#ff9a"+
"3d'][i % 5],\n        exploded: false,\n      });\n    }\n    state.celebrate = "+
"{ t: 0, dur: 4.2, rockets, bursts: [] };\n    endOverlay.classList.add('hidden')"+
";\n    showBanner('PERFECT 5/5!', 'goal');\n    sfx('goal');\n  }\n  function ex"+
"plodeFirework(r) {\n    const cols = ['#ffe566', '#ff3d6e', '#3df0ff', '#b8ff66'"+
", '#ff9a3d', '#ffffff', '#c77dff', '#66ffcc'];\n    for (let i = 0; i < 28 + (Ma"+
"th.random() * 18 | 0); i++) {\n      const a = Math.random() * Math.PI * 2, sp ="+
" 1.2 + Math.random() * 4.5;\n      state.celebrate.bursts.push({\n        x: r.x"+
", y: r.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 0.6,\n        life: 0.55 "+
"+ Math.random() * 0.7, color: cols[(Math.random() * cols.length) | 0],\n        "+
"r: 2 + Math.random() * 3.5,\n      });\n    }\n    spawnBurst(r.x, r.y, cols[(Ma"+
"th.random() * cols.length) | 0], 10);\n    sfx('save');\n  }\n  function updateC"+
"elebrate(dt) {\n    const c = state.celebrate;\n    if (!c) return;\n    c.t += "+
"dt;\n    const pan = Math.min(1, c.t / 1.15);\n    state.camY = pan * pan * H * "+
"0.72;\n    for (const r of c.rockets) {\n      if (r.exploded) continue;\n      "+
"r.life -= dt; r.y += r.vy * (dt * 60) * 0.35; r.vy += 0.04;\n      if (r.life <="+
" 0) { r.exploded = true; explodeFirework(r); }\n    }\n    for (let i = c.bursts"+
".length - 1; i >= 0; i--) {\n      const p = c.bursts[i];\n      p.life -= dt; p"+
".x += p.vx; p.y += p.vy; p.vy += 6 * dt; p.vx *= 0.99;\n      if (p.life <= 0) c"+
".bursts.splice(i, 1);\n    }\n    if (c.t >= c.dur) {\n      state.phase = 'end'"+
"; state.celebrate = null;\n      banner.classList.add('hidden');\n      endOverl"+
"ay.classList.remove('hidden');\n    }\n  }\n  function drawNightSkyOverlay() {\n"+
"    const cy = state.camY || 0;\n    if (cy < 2 && state.phase !== 'celebrate') "+
"return;\n    const skyH = Math.min(H, cy + H * 0.35);\n    const g = ctx.createL"+
"inearGradient(0, -cy, 0, skyH - cy);\n    g.addColorStop(0, '#02040a'); g.addCol"+
"orStop(0.55, '#0a1020'); g.addColorStop(1, '#152a48');\n    ctx.fillStyle = g; c"+
"tx.fillRect(0, -cy, W, skyH + 4);\n    ctx.fillStyle = 'rgba(255,255,255,0.85)';"+
"\n    for (let i = 0; i < 40; i++) ctx.fillRect(((i * 97) % 100) / 100 * W, -cy "+
"+ ((i * 53) % 100) / 100 * skyH * 0.7, 2, 2);\n    const mx = W * 0.16, my = -cy"+
" + H * 0.16;\n    ctx.fillStyle = '#f5e6a8'; ctx.beginPath(); ctx.arc(mx, my, 28"+
", 0, Math.PI * 2); ctx.fill();\n    ctx.fillStyle = '#02040a'; ctx.beginPath(); "+
"ctx.arc(mx + 12, my - 4, 24, 0, Math.PI * 2); ctx.fill();\n  }\n  function drawC"+
"elebrateFX() {\n    const c = state.celebrate; if (!c) return;\n    for (const r"+
" of c.rockets) {\n      if (r.exploded) continue;\n      ctx.fillStyle = r.color"+
"; ctx.beginPath(); ctx.arc(r.x, r.y, 3.5, 0, Math.PI * 2); ctx.fill();\n      ct"+
"x.strokeStyle = 'rgba(255,230,150,0.55)'; ctx.lineWidth = 2;\n      ctx.beginPat"+
"h(); ctx.moveTo(r.x, r.y); ctx.lineTo(r.x, r.y + 16); ctx.stroke();\n    }\n    "+
"for (const p of c.bursts) {\n      ctx.globalAlpha = Math.max(0, Math.min(1, p.l"+
"ife * 1.4));\n      ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, "+
"p.r, 0, Math.PI * 2); ctx.fill();\n    }\n    ctx.globalAlpha = 1;\n  }\n\n  fun"+
"ction render() {\n    ctx.save();\n    ctx.translate(0, state.camY || 0);\n    d"+
"rawBg();\n    if (state.phase === 'celebrate' || (state.camY || 0) > 1) drawNigh"+
"tSkyOverlay();\n    drawGoalFrame();\n    drawKeeper();\n    drawBall();\n    dr"+
"awParticles();\n    drawCelebrateFX();\n    drawArcadeChrome();\n    ctx.restore"+
"();\n  }\n  function loop(ts) {\n    if (!state.lastTs) state.lastTs = ts;\n    "+
"const dt = Math.min(0.05, (ts - state.lastTs) / 1000);\n    state.lastTs = ts;\n"+
"    if (state.phase === 'celebrate') {\n      updateCelebrate(dt);\n    } else i"+
"f (state.phase !== 'title' && state.phase !== 'end') {\n      update(dt);\n    }"+
" else if (state.keeper) {\n      state.keeper.limbPhase += dt * 3;\n    }\n    i"+
"f (state.phase !== 'celebrate' && state.camY) {\n      state.camY *= 0.85;\n    "+
"  if (state.camY < 0.5) state.camY = 0;\n    }\n    render();\n    requestAnimat"+
"ionFrame(loop);\n  }\n  canvas.addEventListener('pointerdown', onPointerDown);\n"+
"  canvas.addEventListener('pointermove', onPointerMove);\n  canvas.addEventListe"+
"ner('pointerup', onPointerUp);\n  canvas.addEventListener('pointercancel', onPoi"+
"nterUp);\n  document.getElementById('playBtn').addEventListener('click', () => {"+
"\n    ensureAudio();\n    startMatch();\n  });\n  document.getElementById('remat"+
"chBtn').addEventListener('click', () => {\n    ensureAudio();\n    startMatch();"+
"\n  });\n  muteBtn.addEventListener('click', () => {\n    muted = !muted;\n    m"+
"uteBtn.textContent = muted ? '🔇' : '🔊';\n    muteBtn.setAttribute('aria-label', "+
"muted ? 'Unmute' : 'Mute');\n  });\n  window.addEventListener('resize', () => {\n"+
"    const wasX = state.ball ? state.ball.x / W : 0.5;\n    const wasY = state.ba"+
"ll ? state.ball.y / H : 0.78;\n    resize();\n    if (state.ball) {\n      state"+
".ball.x = wasX * W;\n      state.ball.y = wasY * H;\n      state.ball.r = Math.m"+
"ax(18, W * 0.055);\n    }\n    if (state.keeper) {\n      state.keeper.homeX = W"+
" * 0.5;\n      state.keeper.homeY = H * field.goalBottom - Math.max(6, H * 0.01)"+
";\n      state.keeper.w = W * 0.16;\n      state.keeper.h = H * 0.135;\n      if"+
" (state.phase === 'aim') {\n        state.keeper.x = state.keeper.homeX;\n      "+
"  state.keeper.y = state.keeper.homeY;\n      }\n    }\n  });\n  resize();\n  re"+
"setBall();\n  resetKeeper();\n  loadBg().then(() => {\n    requestAnimationFrame"+
"(loop);\n  });\n})();\n"
);
