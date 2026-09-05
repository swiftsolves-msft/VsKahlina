window.__GS=(window.__GS||[]);window.__GS.push(
"per.emotionHold;\n    resetBall();\n    resetKeeper();\n    if (prevEmotion && pr"+
"evEmotion !== 'ready' && prevHold > 0) {\n      state.keeper.emotion = prevEmot"+
"ion;\n      state.keeper.emotionHold = Math.min(0.45, prevHold);\n    }\n    stat"+
"e.netBulge = null;\n    state.goalSettle = false;\n    updateHud();\n    hint.cla"+
"ssList.remove('hidden');\n    hint.textContent = 'FLICK THE BALL';\n  }\n  functi"+
"on update(dt) {\n    const b = state.ball;\n    const k = state.keeper;\n    k.li"+
"mbPhase += dt * (k.committed ? 10 : 4);\n    if (k.emotionHold > 0) {\n      k.e"+
"motionHold -= dt;\n    } else if (k.emotion !== 'ready' && state.phase === 'aim"+
"') {\n      k.emotion = 'ready';\n    }\n    if (state.phase === 'flying' || stat"+
"e.phase === 'resolve') {\n      if (!k.committed && performance.now() >= k.reac"+
"tAt) {\n        k.committed = true;\n      }\n      if (k.committed) {\n        k."+
"stretch = Math.min(1, k.stretch + dt * 3.15);\n        const tx = k.homeX + k.d"+
"iveX * k.stretch;\n        const ty = k.homeY + k.diveY * k.stretch;\n        k."+
"x += (tx - k.x) * Math.min(1, dt * 12);\n        k.y += (ty - k.y) * Math.min(1"+
", dt * 12);\n      }\n    } else if (state.phase === 'aim') {\n      k.x += (k.ho"+
"meX - k.x) * 0.08;\n      k.y += (k.homeY - k.y) * 0.08;\n      k.stretch *= 0.9"+
";\n    }\n    if (state.phase === 'flying' && b.flying) {\n      b.x += b.vx;\n   "+
"   b.y += b.vy;\n      b.z += b.vz * (dt * 60);\n      b.vz -= 12.5 * dt;\n      "+
"if (b.z < 0) {\n        b.z = 0;\n        b.vz *= -0.18;\n      }\n      const pro"+
"gress = Math.min(1, Math.max(0, (field.ballStartY * H - b.y) / (field.ballStar"+
"tY * H - field.goalBottom * H)));\n      b.scale = 1 - progress * 0.55;\n      /"+
"/ Mild late assist — weaker so central shots stay punishable\n      if (progres"+
"s > 0.28 && progress < 0.9) {\n        const mid = W * 0.5;\n        b.vx += (mi"+
"d - b.x) * 0.00135 * (1 - progress);\n      }\n      b.spinning += b.vx * 0.015;"+
"\n      state.trail.push({ x: b.x, y: b.y - b.z * 0.35, s: b.scale, life: 1 });"+
"\n      if (state.trail.length > 16) state.trail.shift();\n      b.vx *= 0.993;\n"+
"      b.vy *= 0.997;\n      // Early save check while ball still approaching li"+
"ne (no more ghosting through)\n      if (progress > 0.55 && ballHitsKeeper(b, k"+
")) {\n        resolveShot();\n      } else if (b.y <= H * field.goalBottom + 6) "+
"{\n        resolveShot();\n      }\n      if (state.phase === 'flying' && (b.x < "+
"-50 || b.x > W + 50 || b.y < -50)) {\n        resolveShot();\n      }\n    }\n    "+
"if (state.phase === 'resolve') {\n      if (b.flying) {\n        if (state.goalS"+
"ettle) {\n          const goalTop = H * field.goalTop;\n          const goalBott"+
"om = H * field.goalBottom;\n          const backY = goalTop + (goalBottom - goa"+
"lTop) * 0.18;\n          const goalLeft = W * field.goalLeft + 12;\n          co"+
"nst goalRight = W * field.goalRight - 12;\n          b.x += b.vx * 0.55;\n      "+
"    b.y += b.vy * 0.55;\n          b.x = Math.max(goalLeft, Math.min(goalRight,"+
" b.x));\n          b.z = Math.max(0, b.z + b.vz * dt * 40);\n          b.vz -= 2"+
"2 * dt;\n          b.vx *= 0.92;\n          b.vy *= 0.88;\n          if (b.y < ba"+
"ckY) {\n            b.y = backY + Math.sin(state.resultTimer * 14) * 1.5;\n     "+
"       b.vy *= -0.25;\n          }\n          if (state.netBulge) {\n            "+
"const target = Math.min(1, (1.35 - state.netBulge.life) * 2.2);\n            st"+
"ate.netBulge.amount += (target - state.netBulge.amount) * Math.min(1, dt * 10)"+
";\n            state.netBulge.x += (b.x - state.netBulge.x) * 0.35;\n           "+
" state.netBulge.y += (b.y - state.netBulge.y) * 0.35;\n            state.netBul"+
"ge.life -= dt;\n          }\n          b.scale = Math.max(0.42, b.scale * 0.998)"+
";\n        } else {\n          b.x += b.vx * 0.5;\n          b.y += b.vy * 0.5;\n "+
"         b.z = Math.max(0, b.z + b.vz * dt);\n          b.vz -= 18 * dt;\n      "+
"  }\n      }\n      if (state.netBulge && !state.goalSettle) {\n        state.net"+
"Bulge.amount *= 0.92;\n        state.netBulge.life -= dt;\n      }\n      state.r"+
"esultTimer -= dt;\n      if (state.resultTimer <= 0) {\n        nextShotOrEnd();"+
"\n      }\n    }\n    for (let i = state.particles.length - 1; i >= 0; i--) {\n   "+
"   const p = state.particles[i];\n      p.life -= dt;\n      p.x += p.vx;\n      "+
"p.y += p.vy;\n      p.vy += 8 * dt;\n      if (p.life <= 0) state.particles.spli"+
"ce(i, 1);\n    }\n    for (const t of state.trail) t.life -= dt * 1.8;\n    state"+
".trail = state.trail.filter((t) => t.life > 0);\n  }\n  function drawProceduralS"+
"tadium() {\n    // Virtua Striker / N64 Bank of America Stadium bowl (portrait,"+
" behind goal)\n    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.22);\n   "+
" sky.addColorStop(0, '#152a48');\n    sky.addColorStop(1, '#3a7ab8');\n    ctx.f"+
"illStyle = sky;\n    ctx.fillRect(0, 0, W, H);\n\n    // --- Upper blue seats ---"+
"\n    const upperTop = H * 0.02;\n    const upperH = H * 0.16;\n    ctx.fillStyle"+
" = '#6eb4e8';\n    ctx.fillRect(0, upperTop, W, upperH);\n    for (let row = 0; "+
"row < 10; row++) {\n      for (let col = 0; col < 36; col++) {\n        const x "+
"= (col / 36) * W + (row % 2) * 3;\n        const y = upperTop + 4 + row * (uppe"+
"rH / 11);\n        if ((col + row * 3) % 17 === 0) continue; // aisle gaps\n    "+
"    ctx.fillStyle = '#5aa3dc';\n        ctx.fillRect(x, y, 5, 4);\n        // sp"+
"arse upper crowd\n        if (Math.sin(row * 9.1 + col * 4.7) > 0.55) {\n       "+
"   const colors = ['#1a1a28','#c03040','#f0e8e0','#203060','#e8e8f0','#102040'"+
",'#ffffff'];\n          ctx.fillStyle = colors[(row * 17 + col * 13) % colors.l"+
"ength];\n          ctx.fillRect(x + 1, y - 3, 3, 4);\n        }\n      }\n    }\n  "+
"  // aisle concrete stripes\n    "
);
