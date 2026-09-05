window.__GS=(window.__GS||[]);window.__GS.push(
"(state.phase !== 'aim') return;\n    const p = clientToCanvas(e);\n    const b ="+
" state.ball;\n    const dx = p.x - b.x;\n    const dy = p.y - b.y;\n    const hit"+
"R = b.r * 2.2;\n    if (dx * dx + dy * dy > hitR * hitR) return;\n    state.poin"+
"terId = e.pointerId;\n    try { canvas.setPointerCapture(e.pointerId); } catch "+
"(_) {}\n    state.drag = {\n      points: [{ x: p.x, y: p.y, t: performance.now("+
"), force: p.force }],\n      maxForce: p.force || 0,\n    };\n    state.keeper.co"+
"mmitted = false;\n    state.keeper.t = 0;\n    state.keeper.readBias = (Math.ran"+
"dom() - 0.5) * 0.35;\n    hint.classList.add('hidden');\n  }\n  function onPointe"+
"rMove(e) {\n    if (state.pointerId !== e.pointerId || !state.drag) return;\n   "+
" const p = clientToCanvas(e);\n    state.drag.points.push({ x: p.x, y: p.y, t: "+
"performance.now(), force: p.force });\n    if (p.force > state.drag.maxForce) s"+
"tate.drag.maxForce = p.force;\n    if (state.drag.points.length > 24) state.dra"+
"g.points.shift();\n    const pts = state.drag.points;\n    if (pts.length >= 3) "+
"{\n      const a = pts[0];\n      const c = pts[pts.length - 1];\n      const dir"+
"X = c.x - a.x;\n      const aimX = bNormX(state.ball.x + dirX * 2.2);\n      sta"+
"te.keeper.x += (aimX * W * 0.15 + state.keeper.homeX * 0.85 - state.keeper.x) "+
"* 0.08;\n      state.keeper.limbPhase += 0.25;\n    }\n  }\n  function bNormX(x) {"+
"\n    return Math.max(0.05, Math.min(0.95, x / W));\n  }\n  function onPointerUp("+
"e) {\n    if (state.pointerId !== e.pointerId || !state.drag) return;\n    const"+
" pts = state.drag.points;\n    state.pointerId = null;\n    if (pts.length < 2) "+
"{\n      state.drag = null;\n      hint.classList.remove('hidden');\n      return"+
";\n    }\n    const end = pts[pts.length - 1];\n    let start = pts[0];\n    for ("+
"let i = pts.length - 2; i >= 0; i--) {\n      if (end.t - pts[i].t > 90) {\n    "+
"    start = pts[i];\n        break;\n      }\n      start = pts[i];\n    }\n    con"+
"st dt = Math.max(16, end.t - start.t);\n    let vx = (end.x - start.x) / dt;\n  "+
"  let vy = (end.y - start.y) / dt;\n    if (vy > -0.05) {\n      state.drag = nu"+
"ll;\n      hint.classList.remove('hidden');\n      hint.textContent = 'FLICK UP "+
"AT GOAL';\n      return;\n    }\n    const speed = Math.hypot(vx, vy);\n    const "+
"forceBoost = 1 + Math.min(0.28, (state.drag.maxForce || 0) * 0.36);\n    // Sof"+
"t power curve kept, but central/weak flicks less automatic\n    const raw = spe"+
"ed * 10.2 * forceBoost;\n    const power = Math.min(2.05, Math.max(0.68, 0.52 +"+
" Math.pow(Math.min(raw, 2.35), 0.84)));\n    let nx = vx / (speed || 1);\n    le"+
"t ny = vy / (speed || 1);\n    // Less extreme left/right from diagonal flicks\n"+
"    nx *= 0.62;\n    // Mild aim assist — keep good flicks on frame, don't pull"+
" everything central\n    if (ny < -0.28) {\n      const assist = 0.22;\n      nx "+
"= nx * (1 - assist);\n    }\n    // Clamp lateral so casual flicks stay near the"+
" posts\n    nx = Math.max(-0.78, Math.min(0.78, nx));\n    const b = state.ball;"+
"\n    b.vx = nx * power * W * 0.0105;\n    b.vy = ny * power * H * 0.0155;\n    b"+
".vz = power * 2.45 + 0.35;\n    b.z = 0;\n    b.flying = true;\n    b.spinning = "+
"nx * 12;\n    b.scale = 1;\n    commitKeeper(nx, ny, power, end.x);\n    state.ph"+
"ase = 'flying';\n    state.drag = null;\n    sfx('flick');\n  }\n  function commit"+
"Keeper(nx, ny, power, releaseX) {\n    const k = state.keeper;\n    // Stronger "+
"anticipation: trust ball path + release side\n    const aimNorm = (releaseX / W"+
" - 0.5) * 0.78 + nx * 1.15 + k.readBias * 0.55;\n    let diveDir = 0;\n    // Na"+
"rrower \"stay central\" band — more decisive dives\n    if (aimNorm < -0.055) div"+
"eDir = -1;\n    else if (aimNorm > 0.055) diveDir = 1;\n    // Central / weak sh"+
"ots: prefer hold or short dive toward ball, rarely wrong-foot\n    const centra"+
"lWeak = Math.abs(nx) < 0.22 && power < 1.15;\n    let wrongChance = 0.16;\n    i"+
"f (centralWeak) wrongChance = 0.06;\n    else if (Math.abs(nx) > 0.55 && power "+
"> 1.45) wrongChance = 0.22; // big corner flicks still beat him sometimes\n    "+
"const wrong = Math.random() < wrongChance;\n    if (wrong) diveDir = -diveDir |"+
"| (Math.random() < 0.5 ? -1 : 1);\n    if (centralWeak && !wrong && diveDir ==="+
" 0) {\n      diveDir = nx < -0.04 ? -1 : nx > 0.04 ? 1 : (Math.random() < 0.5 ?"+
" -1 : 1);\n    }\n    let diveHeight = 0;\n    if (Math.abs(ny) > 0.82 && power >"+
" 1.35) diveHeight = 1;\n    else if (power < 0.9) diveHeight = -1;\n    // Faste"+
"r reaction, fewer long freezes\n    const react = 70 + Math.random() * 110 + (w"+
"rong ? 45 : 0) - Math.min(35, power * 10);\n    k.diveDir = diveDir;\n    k.dive"+
"Height = diveHeight;\n    k.reactAt = performance.now() + Math.max(40, react);\n"+
"    k.committed = false;\n    k.stretch = 0;\n    k.emotion = 'ready';\n    k.emo"+
"tionHold = 0;\n    // Better reach across the mouth\n    k.diveX = diveDir * W *"+
" (0.18 + Math.random() * 0.08 + (centralWeak ? 0.04 : 0));\n    k.diveY = diveH"+
"eight * H * 0.035 - H * 0.01;\n  }\n  function spawnBurst(x, y, color, n) {\n    "+
"for (let i = 0; i < n; i++) {\n      const a = Math.random() * Math.PI * 2;\n   "+
"   const s = 1 + Math.random() * 4;\n      state.particles.push({\n        x, y,"+
"\n        vx: Math.cos(a) * s,\n        vy: Math.sin(a) * s - 1,\n        life: 0"+
".4 + Math.random() * 0.5,\n        color,\n        r: 2 + Math.random() * 3,\n   "+
"   });\n    }\n  }\n  function keeperContactPoints(k) {\n    const stretch = k.str"+
"etch;\n    const bodyW = k.w * 0.38;\n    const bodyH = k.h * 0.48;\n    const di"+
"ve = stretch;\n    const armReach = k.w * (0.32 + dive * 0.55);\n    const armY "+
"= -bodyH * 0.55 - k.diveHeight * dive * 16;\n    const lean = k.diveDir * stret"+
"ch;\n    const cos = Math.cos(lea"
);
