window.__GS=(window.__GS||[]);window.__GS.push(
" = 'HE READ YOU';\n        endFlavor.textContent = 'Kristijan got a han"+
"d to enough. Rematch?';\n      } else {\n        endTitle.textContent = "+
"'SHUTOUT';\n        endFlavor.textContent = 'Kristijan Kahlina was unbe"+
"atable this round.';\n      }\n      return;\n    }\n    state.shot += 1;\n"+
"    state.phase = 'aim';\n    const prevEmotion = state.keeper && state"+
".keeper.emotion;\n    const prevHold = state.keeper && state.keeper.emo"+
"tionHold;\n    resetBall();\n    resetKeeper();\n    if (prevEmotion && p"+
"revEmotion !== 'ready' && prevHold > 0) {\n      state.keeper.emotion ="+
" prevEmotion;\n      state.keeper.emotionHold = Math.min(0.45, prevHold"+
");\n    }\n    state.netBulge = null;\n    state.goalSettle = false;\n    "+
"updateHud();\n    hint.classList.remove('hidden');\n    hint.textContent"+
" = 'FLICK THE BALL';\n  }\n  function update(dt) {\n    const b = state.b"+
"all;\n    const k = state.keeper;\n    k.limbPhase += dt * (k.committed "+
"? 10 : 4);\n    if (k.emotionHold > 0) {\n      k.emotionHold -= dt;\n   "+
" } else if (k.emotion !== 'ready' && state.phase === 'aim') {\n      k."+
"emotion = 'ready';\n    }\n    if (state.phase === 'flying' || state.pha"+
"se === 'resolve') {\n      if (!k.committed && performance.now() >= k.r"+
"eactAt) {\n        k.committed = true;\n      }\n      if (k.committed) {"+
"\n        k.stretch = Math.min(1, k.stretch + dt * 3.15);\n        const"+
" tx = k.homeX + k.diveX * k.stretch;\n        const ty = k.homeY + k.di"+
"veY * k.stretch;\n        k.x += (tx - k.x) * Math.min(1, dt * 12);\n   "+
"     k.y += (ty - k.y) * Math.min(1, dt * 12);\n      }\n    } else if ("+
"state.phase === 'aim') {\n      k.x += (k.homeX - k.x) * 0.08;\n      k."+
"y += (k.homeY - k.y) * 0.08;\n      k.stretch *= 0.9;\n    }\n    if (sta"+
"te.phase === 'flying' && b.flying) {\n      b.x += b.vx;\n      b.y += b"+
".vy;\n      b.z += b.vz * (dt * 60);\n      b.vz -= 12.5 * dt;\n      if "+
"(b.z < 0) {\n        b.z = 0;\n        b.vz *= -0.18;\n      }\n      cons"+
"t progress = Math.min(1, Math.max(0, (field.ballStartY * H - b.y) / (f"+
"ield.ballStartY * H - field.goalBottom * H)));\n      b.scale = 1 - pro"+
"gress * 0.55;\n      // Mild late assist — weaker so central shots stay"+
" punishable\n      if (progress > 0.28 && progress < 0.9) {\n        con"+
"st mid = W * 0.5;\n        b.vx += (mid - b.x) * 0.00025 * (1 - progres"+
"s);\n      }\n      b.spinning += b.vx * 0.015;\n      state.trail.push({"+
" x: b.x, y: b.y - b.z * 0.35, s: b.scale, life: 1 });\n      if (state."+
"trail.length > 16) state.trail.shift();\n      b.vx *= 0.993;\n      b.v"+
"y *= 0.997;\n      // Early save check while ball still approaching lin"+
"e (no more ghosting through)\n      if (progress > 0.55 && ballHitsKeep"+
"er(b, k)) {\n        resolveShot();\n      } else if (b.y <= H * field.g"+
"oalBottom + 6) {\n        resolveShot();\n      }\n      if (state.phase "+
"=== 'flying' && (b.x < -50 || b.x > W + 50 || b.y < -50)) {\n        re"+
"solveShot();\n      }\n    }\n    if (state.phase === 'resolve') {\n      "+
"if (b.flying) {\n        if (state.goalSettle) {\n          const goalTo"+
"p = H * field.goalTop;\n          const goalBottom = H * field.goalBott"+
"om;\n          const backY = goalTop + (goalBottom - goalTop) * 0.18;\n "+
"         const goalLeft = W * field.goalLeft + 12;\n          const goa"+
"lRight = W * field.goalRight - 12;\n          b.x += b.vx * 0.55;\n     "+
"     b.y += b.vy * 0.55;\n          b.x = Math.max(goalLeft, Math.min(g"+
"oalRight, b.x));\n          b.z = Math.max(0, b.z + b.vz * dt * 40);\n  "+
"        b.vz -= 22 * dt;\n          b.vx *= 0.92;\n          b.vy *= 0.8"+
"8;\n          if (b.y < backY) {\n            b.y = backY + Math.sin(sta"+
"te.resultTimer * 14) * 1.5;\n            b.vy *= -0.25;\n          }\n   "+
"       if (state.netBulge) {\n            const target = Math.min(1, (1"+
".35 - state.netBulge.life) * 2.2);\n            state.netBulge.amount +"+
"= (target - state.netBulge.amount) * Math.min(1, dt * 10);\n           "+
" state.netBulge.x += (b.x - state.netBulge.x) * 0.35;\n            stat"+
"e.netBulge.y += (b.y - state.netBulge.y) * 0.35;\n            state.net"+
"Bulge.life -= dt;\n          }\n          b.scale = Math.max(0.42, b.sca"+
"le * 0.998);\n        } else {\n          b.x += b.vx * 0.5;\n          b"+
".y += b.vy * 0.5;\n          b.z = Math.max(0, b.z + b.vz * dt);\n      "+
"    b.vz -= 18 * dt;\n        }\n      }\n      if (state.netBulge && !st"+
"ate.goalSettle) {\n        state.netBulge.amount *= 0.92;\n        state"+
".netBulge.life -= dt;\n      }\n      state.resultTimer -= dt;\n      if "+
"(state.resultTimer <= 0) {\n        nextShotOrEnd();\n      }\n    }\n    "+
"for (let i = state.particles.length - 1; i >= 0; i--) {\n      const p "+
"= state.particles[i];\n      p.life -= dt;\n      p.x += p.vx;\n      p.y"+
" += p.vy;\n      p.vy += 8 * dt;\n      if (p.life <= 0) state.particles"+
".splice(i, 1);\n    }\n    for (const t of state.trail) t.life -= dt * 1"+
".8;\n    state.trail = state.trail.filter((t) => t.life > 0);\n  }\n  fun"+
"ction drawProceduralStadium() {\n    // Virtua Striker / N64 Bank of Am"+
"erica Stadium bowl (portrait, behind goal)\n    const sky = ctx.createL"+
"inearGradient(0, 0, 0, H * 0.22);\n    sky.addColorStop(0, '#152a48');\n"+
"    sky.addColorStop(1, '#3a7ab8');\n    ctx.fillStyle = sky;\n    ctx.f"+
"illRect(0, 0, W, H);\n\n    // --- Upper blue seats ---\n    const upperT"+
"op = H * 0.02;\n    const upperH = H * 0.16;\n    ctx.fillStyle = '#6eb4"+
"e8';\n    ctx.fillRect(0, upperTop, W, upperH);\n    for (let row = 0; r"+
"ow < 10; row++) {\n      for (let col = 0; col < 36; col++) {\n        c"+
"onst x = (col / 36) * W + (row % 2) * 3;\n        const y = upperTop + "+
"4 + row * (upperH / 11);\n        if ((col + row * 3) % 17 === 0) conti"+
"nue; // aisle gaps\n        ctx.fillStyle = '#5aa3dc';\n        ctx.fill"+
"Rect(x, y, 5, 4);\n        // sparse upper crowd\n        if (Math.sin(r"
);
