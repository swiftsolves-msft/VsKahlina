window.__GS=(window.__GS||[]);window.__GS.push(
"';\n        endFlavor.textContent = 'You cooked Kristijan Kahlina. Char"+
"lotte FC fans are stunned.';\n      } else if (state.goals === 3) {\n  "+
"      endTitle.textContent = 'SOLID ROUND';\n        endFlavor.textCont"+
"ent = 'Three past the keeper - respectable shootout.';\n      } else if"+
" (state.goals >= 1) {\n        endTitle.textContent = 'HE READ YOU';\n "+
"       endFlavor.textContent = 'Kristijan got a hand to enough. Rematch"+
"?';\n      } else {\n        endTitle.textContent = 'SHUTOUT';\n       "+
" endFlavor.textContent = 'Kristijan Kahlina was unbeatable this round.'"+
";\n      }\n      return;\n    }\n    state.shot += 1;\n    state.phase"+
" = 'aim';\n    const prevEmotion = state.keeper && state.keeper.emotion"+
";\n    const prevHold = state.keeper && state.keeper.emotionHold;\n    "+
"resetBall();\n    resetKeeper();\n    if (prevEmotion && prevEmotion !="+
"= 'ready' && prevHold > 0) {\n      state.keeper.emotion = prevEmotion;"+
"\n      state.keeper.emotionHold = Math.min(0.45, prevHold);\n    }\n  "+
"  state.netBulge = null;\n    state.goalSettle = false;\n    updateHud("+
");\n    hint.classList.remove('hidden');\n    hint.textContent = 'FLICK"+
" THE BALL';\n  }\n  function update(dt) {\n    const b = state.ball;\n "+
"   const k = state.keeper;\n    k.limbPhase += dt * (k.committed ? 10 :"+
" 4);\n    if (k.emotionHold > 0) {\n      k.emotionHold -= dt;\n    } e"+
"lse if (k.emotion !== 'ready' && state.phase === 'aim') {\n      k.emot"+
"ion = 'ready';\n    }\n    if (state.phase === 'flying' || state.phase "+
"=== 'resolve') {\n      if (!k.committed && performance.now() >= k.reac"+
"tAt) {\n        k.committed = true;\n      }\n      if (k.committed) {"+
"\n        k.stretch = Math.min(1, k.stretch + dt * 3.15);\n        cons"+
"t tx = k.homeX + k.diveX * k.stretch;\n        const ty = k.homeY + k.d"+
"iveY * k.stretch;\n        k.x += (tx - k.x) * Math.min(1, dt * 12);\n "+
"       k.y += (ty - k.y) * Math.min(1, dt * 12);\n      }\n    } else i"+
"f (state.phase === 'aim') {\n      k.x += (k.homeX - k.x) * 0.08;\n    "+
"  k.y += (k.homeY - k.y) * 0.08;\n      k.stretch *= 0.9;\n    }\n    i"+
"f (state.phase === 'flying' && b.flying) {\n      b.x += b.vx;\n      b"+
".y += b.vy;\n      b.z += b.vz * (dt * 60);\n      b.vz -= 12.5 * dt;\n"+
"      if (b.z < 0) {\n        b.z = 0;\n        b.vz *= -0.18;\n      }"+
"\n      const progress = Math.min(1, Math.max(0, (field.ballStartY * H "+
"- b.y) / (field.ballStartY * H - field.goalBottom * H)));\n      b.scal"+
"e = 1 - progress * 0.55;\n      // Mild late assist — weaker so central"+
" shots stay punishable\n      if (progress > 0.28 && progress < 0.9) {"+
"\n        const mid = W * 0.5;\n        b.vx += (mid - b.x) * 0.00025 *"+
" (1 - progress);\n      }\n      b.spinning += b.vx * 0.015;\n      sta"+
"te.trail.push({ x: b.x, y: b.y - b.z * 0.35, s: b.scale, life: 1 });\n "+
"     if (state.trail.length > 16) state.trail.shift();\n      b.vx *= 0"+
".993;\n      b.vy *= 0.997;\n      // Early save check while ball still"+
" approaching line (no more ghosting through)\n      if (progress > 0.55"+
" && ballHitsKeeper(b, k)) {\n        resolveShot();\n      } else if (b"+
".y <= H * field.goalBottom + 6) {\n        resolveShot();\n      }\n   "+
"   if (state.phase === 'flying' && (b.x < -50 || b.x > W + 50 || b.y < "+
"-50)) {\n        resolveShot();\n      }\n    }\n    if (state.phase =="+
"= 'resolve') {\n      if (b.flying) {\n        if (state.goalSettle) {"+
"\n          const goalTop = H * field.goalTop;\n          const goalBot"+
"tom = H * field.goalBottom;\n          const backY = goalTop + (goalBot"+
"tom - goalTop) * 0.18;\n          const goalLeft = W * field.goalLeft +"+
" 12;\n          const goalRight = W * field.goalRight - 12;\n          "+
"b.x += b.vx * 0.55;\n          b.y += b.vy * 0.55;\n          b.x = Mat"+
"h.max(goalLeft, Math.min(goalRight, b.x));\n          b.z = Math.max(0,"+
" b.z + b.vz * dt * 40);\n          b.vz -= 22 * dt;\n          b.vx *= "+
"0.92;\n          b.vy *= 0.88;\n          if (b.y < backY) {\n         "+
"   b.y = backY + Math.sin(state.resultTimer * 14) * 1.5;\n            b"+
".vy *= -0.25;\n          }\n          if (state.netBulge) {\n          "+
"  const target = Math.min(1, (1.35 - state.netBulge.life) * 2.2);\n    "+
"        state.netBulge.amount += (target - state.netBulge.amount) * Mat"+
"h.min(1, dt * 10);\n            state.netBulge.x += (b.x - state.netBul"+
"ge.x) * 0.35;\n            state.netBulge.y += (b.y - state.netBulge.y)"+
" * 0.35;\n            state.netBulge.life -= dt;\n          }\n        "+
"  b.scale = Math.max(0.42, b.scale * 0.998);\n        } else {\n       "+
"   b.x += b.vx * 0.5;\n          b.y += b.vy * 0.5;\n          b.z = Ma"+
"th.max(0, b.z + b.vz * dt);\n          b.vz -= 18 * dt;\n        }\n   "+
"   }\n      if (state.netBulge && !state.goalSettle) {\n        state.n"+
"etBulge.amount *= 0.92;\n        state.netBulge.life -= dt;\n      }\n "+
"     state.resultTimer -= dt;\n      if (state.resultTimer <= 0) {\n   "+
"     nextShotOrEnd();\n      }\n    }\n    for (let i = state.particles"+
".length - 1; i >= 0; i--) {\n      const p = state.particles[i];\n     "+
" p.life -= dt;\n      p.x += p.vx;\n      p.y += p.vy;\n      p.vy += 8"+
" * dt;\n      if (p.life <= 0) state.particles.splice(i, 1);\n    }\n  "+
"  for (const t of state.trail) t.life -= dt * 1.8;\n    state.trail = s"+
"tate.trail.filter((t) => t.life > 0);\n  }\n  function drawProceduralSt"+
"adium() {\n    // Virtua Striker / N64 Bank of America Stadium bowl (po"+
"rtrait, behind goal)\n    const sky = ctx.createLinearGradient(0, 0, 0,"+
" H * 0.22);\n    sky.addColorStop(0, '#152a48');\n    sky.addColorStop("+
"1, '#3a7ab8');\n    ctx.fillStyle = sky;\n    ctx.fillRect(0, 0, W, H);"+
"\n\n    // --- Upper blue seats ---\n    const upperTop = H * 0.02;\n  "+
"  const upperH = H * 0.16;\n    ctx.fillStyle = '#6eb4e8';\n    ctx.fil"
);
