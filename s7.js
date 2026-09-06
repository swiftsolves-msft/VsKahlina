window.__GS=(window.__GS||[]);window.__GS.push(
"4);\n    } else if (mood === 'crying') {\n      ctx.moveTo(hx - 5, hy + "+
"6);\n      ctx.quadraticCurveTo(hx, hy + 2.5, hx + 5, hy + 6);\n      ct"+
"x.moveTo(hx - 2.5, hy + 7.5);\n      ctx.quadraticCurveTo(hx, hy + 11, "+
"hx + 2.5, hy + 7.5);\n    } else {\n      ctx.moveTo(hx - 3, hy + 4);\n  "+
"    ctx.lineTo(hx + 3, hy + 4);\n    }\n    ctx.stroke();\n    // Brief f"+
"lash of emotion intensity on banner beat\n    if (hold > 0.4 && mood !="+
"= 'ready') {\n      ctx.globalAlpha = 0.25 * hold;\n      ctx.fillStyle "+
"= mood === 'frustrated' ? '#ff4d4d' : mood === 'smug' ? '#3df0ff' : mo"+
"od === 'crying' ? '#6ec8ff' : '#ffe566';\n      ctx.beginPath();\n      "+
"ctx.arc(hx, hy, 14, 0, Math.PI * 2);\n      ctx.fill();\n      ctx.globa"+
"lAlpha = 1;\n    }\n    function drawGlove(gx, gy) {\n      ctx.fillStyle"+
" = '#ffffff';\n      ctx.beginPath();\n      ctx.ellipse(gx, gy, 11, 9, "+
"0, 0, Math.PI * 2);\n      ctx.fill();\n      ctx.strokeStyle = '#c8c8d0"+
"';\n      ctx.lineWidth = 2;\n      ctx.stroke();\n      ctx.fillStyle = "+
"'#f0f0f5';\n      for (let i = -1; i <= 1; i++) {\n        ctx.beginPath"+
"();\n        ctx.arc(gx + i * 5, gy - 7, 3.5, 0, Math.PI * 2);\n        "+
"ctx.fill();\n      }\n    }\n    drawGlove(-armReach * 0.85, armY);\n    d"+
"rawGlove(armReach * 0.85, armY + (k.diveDir === 0 ? -5 : 4));\n    if ("+
"stretch < 0.25) {\n      ctx.fillStyle = 'rgba(0,0,0,0.5)';\n      ctx.f"+
"illRect(-32, bodyH * 0.45, 64, 14);\n      ctx.fillStyle = '#3df0ff';\n "+
"     ctx.font = 'bold 9px Arial';\n      ctx.textAlign = 'center';\n    "+
"  ctx.fillText('KAHLINA', 0, bodyH * 0.45 + 10);\n    }\n    ctx.restore"+
"();\n  }\n  function roundRect(x, y, w, h, r) {\n    ctx.beginPath();\n   "+
" ctx.moveTo(x + r, y);\n    ctx.arcTo(x + w, y, x + w, y + h, r);\n    c"+
"tx.arcTo(x + w, y + h, x, y + h, r);\n    ctx.arcTo(x, y + h, x, y, r);"+
"\n    ctx.arcTo(x, y, x + w, y, r);\n    ctx.closePath();\n  }\n  function"+
" drawBall() {\n    const b = state.ball;\n    for (const t of state.trai"+
"l) {\n      ctx.globalAlpha = Math.max(0, t.life) * 0.35;\n      ctx.fil"+
"lStyle = '#ffe566';\n      ctx.beginPath();\n      ctx.arc(t.x, t.y, b.r"+
" * t.s * 0.55, 0, Math.PI * 2);\n      ctx.fill();\n    }\n    ctx.global"+
"Alpha = 1;\n    const drawY = b.y - b.z * 0.4;\n    const r = b.r * b.sc"+
"ale;\n    ctx.fillStyle = 'rgba(0,0,0,0.35)';\n    ctx.beginPath();\n    "+
"ctx.ellipse(b.x, b.y + r * 0.35, r * 0.85, r * 0.28, 0, 0, Math.PI * 2"+
");\n    ctx.fill();\n    const grd = ctx.createRadialGradient(b.x - r * "+
"0.3, drawY - r * 0.35, r * 0.2, b.x, drawY, r);\n    grd.addColorStop(0"+
", '#ffffff');\n    grd.addColorStop(0.55, '#e8e8e8');\n    grd.addColorS"+
"top(1, '#9aa0a8');\n    ctx.fillStyle = grd;\n    ctx.beginPath();\n    c"+
"tx.arc(b.x, drawY, r, 0, Math.PI * 2);\n    ctx.fill();\n    ctx.save();"+
"\n    ctx.translate(b.x, drawY);\n    ctx.rotate(b.spinning * 0.05);\n   "+
" ctx.strokeStyle = '#111';\n    ctx.lineWidth = Math.max(1.5, r * 0.08)"+
";\n    ctx.beginPath();\n    for (let i = 0; i < 5; i++) {\n      const a"+
" = (i / 5) * Math.PI * 2 - Math.PI / 2;\n      const px = Math.cos(a) *"+
" r * 0.45;\n      const py = Math.sin(a) * r * 0.45;\n      if (i === 0)"+
" ctx.moveTo(px, py);\n      else ctx.lineTo(px, py);\n    }\n    ctx.clos"+
"ePath();\n    ctx.stroke();\n    ctx.fillStyle = '#111';\n    ctx.beginPa"+
"th();\n    ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);\n    ctx.fill();\n   "+
" ctx.restore();\n    if (state.phase === 'aim') {\n      ctx.strokeStyle"+
" = 'rgba(255,229,102,0.75)';\n      ctx.lineWidth = 3;\n      ctx.setLin"+
"eDash([6, 6]);\n      ctx.beginPath();\n      ctx.arc(b.x, drawY, r * 1."+
"55, 0, Math.PI * 2);\n      ctx.stroke();\n      ctx.setLineDash([]);\n  "+
"  }\n    if (state.drag && state.drag.points.length > 1) {\n      const "+
"pts = state.drag.points;\n      const a = pts[0];\n      const c = pts[p"+
"ts.length - 1];\n      ctx.strokeStyle = 'rgba(61,240,255,0.85)';\n     "+
" ctx.lineWidth = 4;\n      ctx.beginPath();\n      ctx.moveTo(b.x, b.y);"+
"\n      ctx.lineTo(b.x + (c.x - a.x) * 1.4, b.y + (c.y - a.y) * 1.4);\n "+
"     ctx.stroke();\n    }\n  }\n  function drawParticles() {\n    for (con"+
"st p of state.particles) {\n      ctx.globalAlpha = Math.max(0, p.life)"+
";\n      ctx.fillStyle = p.color;\n      ctx.fillRect(p.x, p.y, p.r, p.r"+
");\n    }\n    ctx.globalAlpha = 1;\n  }\n  function drawArcadeChrome() {\n"+
"    ctx.fillStyle = 'rgba(0,0,0,0.25)';\n    ctx.fillRect(0, H * 0.88, "+
"W, H * 0.12);\n    ctx.fillStyle = 'rgba(255,229,102,0.15)';\n    ctx.fi"+
"llRect(0, H * 0.88, W, 3);\n    ctx.strokeStyle = 'rgba(61,240,255,0.55"+
")';\n    ctx.lineWidth = 3;\n    const m = 10;\n    ctx.beginPath();\n    "+
"ctx.moveTo(m, m + 24);\n    ctx.lineTo(m, m);\n    ctx.lineTo(m + 24, m)"+
";\n    ctx.moveTo(W - m, m + 24);\n    ctx.lineTo(W - m, m);\n    ctx.lin"+
"eTo(W - m - 24, m);\n    ctx.moveTo(m, H - m - 24);\n    ctx.lineTo(m, H"+
" - m);\n    ctx.lineTo(m + 24, H - m);\n    ctx.moveTo(W - m, H - m - 24"+
");\n    ctx.lineTo(W - m, H - m);\n    ctx.lineTo(W - m - 24, H - m);\n  "+
"  ctx.stroke();\n  }\n  \n  function beginPerfectCelebrate() {\n    state."+
"phase = 'celebrate';\n    state.camY = 0;\n    const rematchBtn = docume"+
"nt.getElementById('rematchBtn');\n    rematchBtn.disabled = true;\n    r"+
"ematchBtn.classList.add('hidden');\n    const rockets = [];\n    const n"+
" = 3 + Math.floor(Math.random() * 3);\n    const peakCam = H * 0.72;\n  "+
"  for (let i = 0; i < n; i++) {\n      const screenFrac = 0.08 + Math.r"+
"andom() * 0.40; // 8%-48% from top\n      const targetY = screenFrac * "+
"H - peakCam;\n      rockets.push({\n        x: W * (0.15 + Math.random()"+
" * 0.70),\n        y: targetY + H * (0.42 + Math.random() * 0.18),\n    "+
"    targetY,\n        vy: -(6.2 + Math.random() * 3.4),\n        delay: "+
"0.15 + i * 0.28 + Math.random() * 0.12,\n        color: ['#ffe566', '#f"+
"f3d6e', '#3df0ff', '#b8ff66', '#ff9a3d'][i % 5],\n        exploded: fal"+
"se,\n      });\n    }\n    state.celebrate = {\n      t: 0,\n      fwDur: 4"+
".2,\n      panDownDur: 1.25,\n      cryDur: 10,\n      stage: 'fireworks'"+
",\n      rockets,\n      bursts: [],\n      peakCam,\n    };\n    endOverla"+
"y.classList.add('hidden');\n    showBanner('PERFECT 5/5!', 'goal');\n   "+
" sfx('goal');\n  }\n  function explodeFirework(r) {\n    const cols = ['#"+
"ffe566', '#ff3d6e', '#3df0ff', '#b8ff66', '#ff9a3d', '#ffffff', '#c77d"+
"ff', '#66ffcc'];\n    for (let i = 0; i < 28 + (Math.random() * 18 | 0)"+
"; i++) {\n      const a = Math.random() * Math.PI * 2, sp = 1.2 + Math."+
"random() * 4.5;\n      state.celebrate.bursts.push({\n        x: r.x, y:"+
" r.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 0.6,\n        life: "+
"0.55 + Math.random() * 0.7, color: cols[(Math.random() * cols.length) "+
"| 0],\n        r: 2 + Math.random() * 3.5,\n      });\n    }\n    spawnBur"+
"st(r.x, r.y, cols[(Math.random() * cols.length) | 0], 10);\n    sfx('sa"+
"ve');\n  }\n  function updateCelebrate(dt) {\n    const c = state.celebra"+
"te;\n    if (!c) return;\n    c.t += dt;\n    if (state.keeper) state.kee"+
"per.limbPhase += dt * 3;\n    if (c.stage === 'fireworks') {\n      cons"+
"t pan = Math.min(1, c.t / 1.15);\n      state.camY = pan * pan * c.peak"+
"Cam;\n      for (const r of c.rockets) {\n        if (r.exploded) contin"+
"ue;\n        if (r.delay > 0) { r.delay -= dt; continue; }\n        r.y "+
"+= r.vy * (dt * 60) * 0.35;\n        r.vy += 0.035;\n        if (r.y <= "+
"r.targetY) { r.y = r.targetY; r.exploded = true; explodeFirework(r); }"+
"\n      }\n      for (let i = c.bursts.length - 1; i >= 0; i--) {\n      "+
"  const p = c.bursts[i];\n        p.life -= dt; p.x += p.vx; p.y += p.v"+
"y; p.vy += 6 * dt; p.vx *= 0.99;\n        if (p.life <= 0) c.bursts.spl"+
"ice(i, 1);\n      }\n      if (c.t >= c.fwDur) {\n        c.stage = 'panD"+
"own';\n        c.stageT = 0;\n        c.panFrom = state.camY;\n        ba"+
"nner.classList.add('hidden');\n        if (state.keeper) {\n          st"+
"ate.keeper.emotion = 'crying';\n          state.keeper.emotionHold = c."+
"cryDur + c.panDownDur;\n          state.keeper.diveDir = 0;\n          s"+
"tate.keeper.stretch = 0;\n          state.keeper.x = state.keeper.homeX"+
";\n          state.keeper.y = state.keeper.homeY;\n        }\n      }\n   "+
" } else if (c.stage === 'panDown') {\n      c.stageT += dt;\n      const"+
" u = Math.min(1, c.stageT / c.panDownDur);\n      const ease = 1 - (1 -"+
" u) * (1 - u);\n      state.camY = c.panFrom * (1 - ease);\n      for (l"+
"et i = c.bursts.length - 1; i >= 0; i--) {\n        const p = c.bursts["+
"i];\n        p.life -= dt; p.x += p.vx; p.y += p.vy; p.vy += 6 * dt; p."+
"vx *= 0.99;\n        if (p.life <= 0) c.bursts.splice(i, 1);\n      }\n  "+
"    if (u >= 1) {\n        state.camY = 0;\n        c.stage = 'cry';\n   "+
"     c.stageT = 0;\n        showBanner('Kahlina...', 'miss');\n      }\n "+
"   } else if (c.stage === 'cry') {\n      c.stageT += dt;\n      state.c"+
"amY = 0;\n      if (state.keeper) {\n        state.keeper.emotion = 'cry"+
"ing';\n        state.keeper.emotionHold = Math.max(0.2, c.cryDur - c.st"+
"ageT);\n      }\n      if (c.stageT >= c.cryDur) {\n        state.phase ="+
" 'end';\n        state.celebrate = null;\n        banner.classList.add('"+
"hidden');\n        const rematchBtn = document.getElementById('rematchB"+
"tn');\n        rematchBtn.disabled = false;\n        rematchBtn.classLis"+
"t.remove('hidden');\n        endOverlay.classList.remove('hidden');\n   "+
"   }\n    }\n  }\n  function drawNightSkyOverlay() {\n    const cy = state"+
".camY || 0;\n    if (cy < 2 && state.phase !== 'celebrate') return;\n   "+
" const skyH = Math.min(H, cy + H * 0.35);\n    const g = ctx.createLine"+
"arGradient(0, -cy, 0, skyH - cy);\n    g.addColorStop(0, '#02040a'); g."+
"addColorStop(0.55, '#0a1020'); g.addColorStop(1, '#152a48');\n    ctx.f"+
"illStyle = g; ctx.fillRect(0, -cy, W, skyH + 4);\n    ctx.fillStyle = '"+
"rgba(255,255,255,0.85)';\n    for (let i = 0; i < 40; i++) ctx.fillRect"+
"(((i * 97) % 100) / 100 * W, -cy + ((i * 53) % 100) / 100 * skyH * 0.7"+
", 2, 2);\n    const mx = W * 0.16, my = -cy + H * 0.16;\n    ctx.fillSty"+
"le = '#f5e6a8'; ctx.beginPath(); ctx.arc(mx, my, 28, 0, Math.PI * 2); "+
"ctx.fill();\n    ctx.fillStyle = '#02040a'; ctx.beginPath(); ctx.arc(mx"+
" + 12, my - 4, 24, 0, Math.PI * 2); ctx.fill();\n  }\n  function drawCel"+
"ebrateFX() {\n    const c = state.celebrate; if (!c) return;\n    for (c"+
"onst r of c.rockets) {\n      if (r.exploded) continue;\n      ctx.fillS"+
"tyle = r.color; ctx.beginPath(); ctx.arc(r.x, r.y, 3.5, 0, Math.PI * 2"+
"); ctx.fill();\n      ctx.strokeStyle = 'rgba(255,230,150,0.55)'; ctx.l"+
"ineWidth = 2;\n      ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo("+
"r.x, r.y + 16); ctx.stroke();\n    }\n    for (const p of c.bursts) {\n  "+
"    ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.4));\n      ct"+
"x.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math"+
".PI * 2); ctx.fill();\n    }\n    ctx.globalAlpha = 1;\n  }\n\n  function r"+
"ender() {\n    ctx.save();\n    ctx.translate(0, state.camY || 0);\n    d"+
"rawBg();\n    if (state.phase === 'celebrate' || (state.camY || 0) > 1)"+
" drawNightSkyOverlay();\n    drawGoalFrame();\n    drawKeeper();\n    dra"+
"wBall();\n    drawParticles();\n    drawCelebrateFX();\n    drawArcadeChr"+
"ome();\n    ctx.restore();\n  }\n  function loop(ts) {\n    if (!state.las"+
"tTs) state.lastTs = ts;\n    const dt = Math.min(0.05, (ts - state.last"+
"Ts) / 1000);\n    state.lastTs = ts;\n    if (state.phase === 'celebrate"+
"') {\n      updateCelebrate(dt);\n    } else if (state.phase !== 'title'"+
" && state.phase !== 'end') {\n      update(dt);\n    } else if (state.ke"+
"eper) {\n      state.keeper.limbPhase += dt * 3;\n    }\n    if (state.ph"+
"ase !== 'celebrate' && state.camY) {\n      state.camY *= 0.85;\n      i"+
"f (state.camY < 0.5) state.camY = 0;\n    }\n    render();\n    requestAn"+
"imationFrame(loop);\n  }\n  canvas.addEventListener('pointerdown', onPoi"+
"nterDown);\n  canvas.addEventListener('pointermove', onPointerMove);\n  "+
"canvas.addEventListener('pointerup', onPointerUp);\n  canvas.addEventLi"+
"stener('pointercancel', onPointerUp);\n  document.getElementById('playB"+
"tn').addEventListener('click', () => {\n    ensureAudio();\n    startMat"+
"ch();\n  });\n  document.getElementById('rematchBtn').addEventListener('"+
"click', () => {\n    ensureAudio();\n    startMatch();\n  });\n  muteBtn.a"+
"ddEventListener('click', () => {\n    muted = !muted;\n    muteBtn.textC"+
"ontent = muted ? '🔇' : '🔊';\n    muteBtn.setAttribute('aria-label', mut"+
"ed ? 'Unmute' : 'Mute');\n  });\n  window.addEventListener('resize', () "+
"=> {\n    const wasX = state.ball ? state.ball.x / W : 0.5;\n    const w"+
"asY = state.ball ? state.ball.y / H : 0.78;\n    resize();\n    if (stat"+
"e.ball) {\n      state.ball.x = wasX * W;\n      state.ball.y = wasY * H"+
";\n      state.ball.r = Math.max(18, W * 0.055);\n    }\n    if (state.ke"+
"eper) {\n      state.keeper.homeX = W * 0.5;\n      state.keeper.homeY ="+
" H * field.goalBottom - Math.max(6, H * 0.01);\n      state.keeper.w = "+
"W * 0.16;\n      state.keeper.h = H * 0.135;\n      if (state.phase === "+
"'aim') {\n        state.keeper.x = state.keeper.homeX;\n        state.ke"+
"eper.y = state.keeper.homeY;\n      }\n    }\n  });\n  resize();\n  resetBa"+
"ll();\n  resetKeeper();\n  loadBg().then(() => {\n    requestAnimationFra"+
"me(loop);\n  });\n})();\n"
);
