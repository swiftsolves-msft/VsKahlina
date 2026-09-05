window.__GS=(window.__GS||[]);window.__GS.push(
"keeper.emotionHold;\n    resetBall();\n    resetKeeper();\n    if (prevEmotion &&"+
" prevEmotion !== 'ready' && prevHold > 0) {\n      state.keeper.emotion = prevE"+
"motion;\n      state.keeper.emotionHold = Math.min(0.45, prevHold);\n    }\n    s"+
"tate.netBulge = null;\n    state.goalSettle = false;\n    updateHud();\n    hint."+
"classList.remove('hidden');\n    hint.textContent = 'FLICK THE BALL';\n  }\n  fun"+
"ction update(dt) {\n    const b = state.ball;\n    const k = state.keeper;\n    k"+
".limbPhase += dt * (k.committed ? 10 : 4);\n    if (k.emotionHold > 0) {\n      "+
"k.emotionHold -= dt;\n    } else if (k.emotion !== 'ready' && state.phase === '"+
"aim') {\n      k.emotion = 'ready';\n    }\n    if (state.phase === 'flying' || s"+
"tate.phase === 'resolve') {\n      if (!k.committed && performance.now() >= k.r"+
"eactAt) {\n        k.committed = true;\n      }\n      if (k.committed) {\n       "+
" k.stretch = Math.min(1, k.stretch + dt * 3.15);\n        const tx = k.homeX + "+
"k.diveX * k.stretch;\n        const ty = k.homeY + k.diveY * k.stretch;\n       "+
" k.x += (tx - k.x) * Math.min(1, dt * 12);\n        k.y += (ty - k.y) * Math.mi"+
"n(1, dt * 12);\n      }\n    } else if (state.phase === 'aim') {\n      k.x += (k"+
".homeX - k.x) * 0.08;\n      k.y += (k.homeY - k.y) * 0.08;\n      k.stretch *= "+
"0.9;\n    }\n    if (state.phase === 'flying' && b.flying) {\n      b.x += b.vx;\n"+
"      b.y += b.vy;\n      b.z += b.vz * (dt * 60);\n      b.vz -= 12.5 * dt;\n   "+
"   if (b.z < 0) {\n        b.z = 0;\n        b.vz *= -0.18;\n      }\n      const "+
"progress = Math.min(1, Math.max(0, (field.ballStartY * H - b.y) / (field.ballS"+
"tartY * H - field.goalBottom * H)));\n      b.scale = 1 - progress * 0.55;\n    "+
"  // Mild late assist — weaker so central shots stay punishable\n      if (prog"+
"ress > 0.28 && progress < 0.9) {\n        const mid = W * 0.5;\n        b.vx += "+
"(mid - b.x) * 0.00135 * (1 - progress);\n      }\n      b.spinning += b.vx * 0.0"+
"15;\n      state.trail.push({ x: b.x, y: b.y - b.z * 0.35, s: b.scale, life: 1 "+
"});\n      if (state.trail.length > 16) state.trail.shift();\n      b.vx *= 0.99"+
"3;\n      b.vy *= 0.997;\n      // Early save check while ball still approaching"+
" line (no more ghosting through)\n      if (progress > 0.55 && ballHitsKeeper(b"+
", k)) {\n        resolveShot();\n      } else if (b.y <= H * field.goalBottom + "+
"6) {\n        resolveShot();\n      }\n      if (state.phase === 'flying' && (b.x"+
" < -50 || b.x > W + 50 || b.y < -50)) {\n        resolveShot();\n      }\n    }\n "+
"   if (state.phase === 'resolve') {\n      if (b.flying) {\n        if (state.go"+
"alSettle) {\n          const goalTop = H * field.goalTop;\n          const goalB"+
"ottom = H * field.goalBottom;\n          const backY = goalTop + (goalBottom - "+
"goalTop) * 0.18;\n          const goalLeft = W * field.goalLeft + 12;\n         "+
" const goalRight = W * field.goalRight - 12;\n          b.x += b.vx * 0.55;\n   "+
"       b.y += b.vy * 0.55;\n          b.x = Math.max(goalLeft, Math.min(goalRig"+
"ht, b.x));\n          b.z = Math.max(0, b.z + b.vz * dt * 40);\n          b.vz -"+
"= 22 * dt;\n          b.vx *= 0.92;\n          b.vy *= 0.88;\n          if (b.y <"+
" backY) {\n            b.y = backY + Math.sin(state.resultTimer * 14) * 1.5;\n  "+
"          b.vy *= -0.25;\n          }\n          if (state.netBulge) {\n         "+
"   const target = Math.min(1, (1.35 - state.netBulge.life) * 2.2);\n           "+
" state.netBulge.amount += (target - state.netBulge.amount) * Math.min(1, dt * "+
"10);\n            state.netBulge.x += (b.x - state.netBulge.x) * 0.35;\n        "+
"    state.netBulge.y += (b.y - state.netBulge.y) * 0.35;\n            state.net"+
"Bulge.life -= dt;\n          }\n          b.scale = Math.max(0.42, b.scale * 0.9"+
"98);\n        } else {\n          b.x += b.vx * 0.5;\n          b.y += b.vy * 0.5"+
";\n          b.z = Math.max(0, b.z + b.vz * dt);\n          b.vz -= 18 * dt;\n   "+
"     }\n      }\n      if (state.netBulge && !state.goalSettle) {\n        state."+
"netBulge.amount *= 0.92;\n        state.netBulge.life -= dt;\n      }\n      stat"+
"e.resultTimer -= dt;\n      if (state.resultTimer <= 0) {\n        nextShotOrEnd"+
"();\n      }\n    }\n    for (let i = state.particles.length - 1; i >= 0; i--) {\n"+
"      const p = state.particles[i];\n      p.life -= dt;\n      p.x += p.vx;\n   "+
"   p.y += p.vy;\n      p.vy += 8 * dt;\n      if (p.life <= 0) state.particles.s"+
"plice(i, 1);\n    }\n    for (const t of state.trail) t.life -= dt * 1.8;\n    st"+
"ate.trail = state.trail.filter((t) => t.life > 0);\n  }\n  function drawProcedur"+
"alStadium() {\n    // Virtua Striker / N64 Bank of America Stadium bowl (portra"+
"it, behind goal)\n    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.22);\n"+
"    sky.addColorStop(0, '#152a48');\n    sky.addColorStop(1, '#3a7ab8');\n    ct"+
"x.fillStyle = sky;\n    ctx.fillRect(0, 0, W, H);\n\n    // --- Upper blue seats "+
"---\n    const upperTop = H * 0.02;\n    const upperH = H * 0.16;\n    ctx.fillSt"+
"yle = '#6eb4e8';\n    ctx.fillRect(0, upperTop, W, upperH);\n    for (let row = "+
"0; row < 10; row++) {\n      for (let col = 0; col < 36; col++) {\n        const"+
" x = (col / 36) * W + (row % 2) * 3;\n        const y = upperTop + 4 + row * (u"+
"pperH / 11);\n        if ((col + row * 3) % 17 === 0) continue; // aisle gaps\n "+
"       ctx.fillStyle = '#5aa3dc';\n        ctx.fillRect(x, y, 5, 4);\n        //"+
" sparse upper crowd\n        if (Math.sin(row * 9.1 + col * 4.7) > 0.55) {\n    "+
"      const colors = ['#1a1a28','#c03040','#f0e8e0','#203060','#e8e8f0','#1020"+
"40','#ffffff'];\n          ctx.fillStyle = colors[(row * 17 + col * 13) % color"+
"s.length];\n          ctx.fillRect(x + 1, y - 3, 3, 4);\n        }\n      }\n    }"+
"\n    // aisle concrete stripes\n"
);
