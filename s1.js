window.__GS=(window.__GS||[]);window.__GS.push(
"webkitForce === 'number' ? Math.min(1, e.webkitForce / 3) : 0),\n    };"+
"\n  }\n  function onPointerDown(e) {\n    if (state.phase !== 'aim') retu"+
"rn;\n    const p = clientToCanvas(e);\n    const b = state.ball;\n    con"+
"st dx = p.x - b.x;\n    const dy = p.y - b.y;\n    const hitR = b.r * 2."+
"2;\n    if (dx * dx + dy * dy > hitR * hitR) return;\n    state.pointerI"+
"d = e.pointerId;\n    try { canvas.setPointerCapture(e.pointerId); } ca"+
"tch (_) {}\n    state.drag = {\n      points: [{ x: p.x, y: p.y, t: perf"+
"ormance.now(), force: p.force }],\n      maxForce: p.force || 0,\n    };"+
"\n    state.keeper.committed = false;\n    state.keeper.t = 0;\n    state"+
".keeper.readBias = (Math.random() - 0.5) * 0.35;\n    hint.classList.ad"+
"d('hidden');\n  }\n  function onPointerMove(e) {\n    if (state.pointerId"+
" !== e.pointerId || !state.drag) return;\n    const p = clientToCanvas("+
"e);\n    state.drag.points.push({ x: p.x, y: p.y, t: performance.now(),"+
" force: p.force });\n    if (p.force > state.drag.maxForce) state.drag."+
"maxForce = p.force;\n    if (state.drag.points.length > 24) state.drag."+
"points.shift();\n    const pts = state.drag.points;\n    if (pts.length "+
">= 3) {\n      const a = pts[0];\n      const c = pts[pts.length - 1];\n "+
"     const dirX = c.x - a.x;\n      const aimX = bNormX(state.ball.x + "+
"dirX * 2.2);\n      state.keeper.x += (aimX * W * 0.15 + state.keeper.h"+
"omeX * 0.85 - state.keeper.x) * 0.08;\n      state.keeper.limbPhase += "+
"0.25;\n    }\n  }\n  function bNormX(x) {\n    return Math.max(0.05, Math."+
"min(0.95, x / W));\n  }\n  function onPointerUp(e) {\n    if (state.point"+
"erId !== e.pointerId || !state.drag) return;\n    const pts = state.dra"+
"g.points;\n    state.pointerId = null;\n    if (pts.length < 2) {\n      "+
"state.drag = null;\n      hint.classList.remove('hidden');\n      return"+
";\n    }\n    const end = pts[pts.length - 1];\n    let start = pts[0];\n "+
"   for (let i = pts.length - 2; i >= 0; i--) {\n      if (end.t - pts[i"+
"].t > 90) {\n        start = pts[i];\n        break;\n      }\n      start"+
" = pts[i];\n    }\n    const dt = Math.max(16, end.t - start.t);\n    let"+
" vx = (end.x - start.x) / dt;\n    let vy = (end.y - start.y) / dt;\n   "+
" if (vy > -0.05) {\n      state.drag = null;\n      hint.classList.remov"+
"e('hidden');\n      hint.textContent = 'FLICK UP AT GOAL';\n      return"+
";\n    }\n    const speed = Math.hypot(vx, vy);\n    const forceBoost = 1"+
" + Math.min(0.28, (state.drag.maxForce || 0) * 0.36);\n    // Soft powe"+
"r curve kept, but central/weak flicks less automatic\n    const raw = s"+
"peed * 10.2 * forceBoost;\n    const power = Math.min(2.05, Math.max(0."+
"68, 0.52 + Math.pow(Math.min(raw, 2.35), 0.84)));\n    let nx = vx / (s"+
"peed || 1);\n    let ny = vy / (speed || 1);\n    // Wider lateral for c"+
"orners and deliberate wides\n    nx *= 1.00;\n    // Mild aim assist - k"+
"eep good flicks on frame, don't pull everything central\n    if (ny < -"+
"0.28) {\n      const assist = 0.05;\n      nx = nx * (1 - assist);\n    }"+
"\n    // Clamp lateral so casual flicks stay near the posts\n    nx = Ma"+
"th.max(-0.98, Math.min(0.98, nx));\n    const b = state.ball;\n    b.vx "+
"= nx * power * W * 0.0220;\n    b.vy = ny * power * H * 0.0155;\n    b.v"+
"z = power * 2.45 + 0.35;\n    b.z = 0;\n    b.flying = true;\n    b.spinn"+
"ing = nx * 12;\n    b.scale = 1;\n    commitKeeper(nx, ny, power, end.x)"+
";\n    state.phase = 'flying';\n    state.drag = null;\n    sfx('flick');"+
"\n  }\n  function commitKeeper(nx, ny, power, releaseX) {\n    const k = "+
"state.keeper;\n    // Stronger anticipation: trust ball path + release "+
"side\n    const aimNorm = (releaseX / W - 0.5) * 0.78 + nx * 1.15 + k.r"+
"eadBias * 0.55;\n    let diveDir = 0;\n    // Narrower \"stay central\" ba"+
"nd - more decisive dives\n    if (aimNorm < -0.055) diveDir = -1;\n    e"+
"lse if (aimNorm > 0.055) diveDir = 1;\n    // Central / weak shots: pre"+
"fer hold or short dive toward ball, rarely wrong-foot\n    const centra"+
"lWeak = Math.abs(nx) < 0.22 && power < 1.15;\n    let wrongChance = 0.1"+
"6;\n    if (centralWeak) wrongChance = 0.06;\n    else if (Math.abs(nx) "+
"> 0.52 && power > 1.2) wrongChance = 0.30; // unread corners still sco"+
"re often\n    const cRead = Math.abs(nx) > 0.52 && power > 1.2 && Math."+
"random() < 0.28;\n    let wrong = false;\n    if (cRead) diveDir = nx < "+
"0 ? -1 : 1;\n    else {\n      wrong = Math.random() < wrongChance;\n    "+
"  if (wrong) diveDir = -diveDir || (Math.random() < 0.5 ? -1 : 1);\n   "+
"   if (centralWeak && !wrong && diveDir === 0) {\n        diveDir = nx "+
"< -0.04 ? -1 : nx > 0.04 ? 1 : (Math.random() < 0.5 ? -1 : 1);\n      }"+
"\n    }\n    let diveHeight = 0;\n    if (Math.abs(ny) > 0.82 && power > "+
"1.35) diveHeight = 1;\n    else if (power < 0.9) diveHeight = -1;\n    /"+
"/ Faster reaction, fewer long freezes\n    const react = 70 + Math.rand"+
"om() * 110 + (wrong ? 45 : 0) - Math.min(35, power * 10) - (cRead ? 25"+
" : 0);\n    k.diveDir = diveDir;\n    k.diveHeight = diveHeight;\n    k.r"+
"eactAt = performance.now() + Math.max(40, react);\n    k.committed = fa"+
"lse;\n    k.stretch = 0;\n    k.emotion = 'ready';\n    k.emotionHold = 0"+
";\n    // Better reach across the mouth\n    k.diveX = diveDir * W * (cR"+
"ead ? 0.30 + Math.random() * 0.04 : 0.18 + Math.random() * 0.08 + (cen"+
"tralWeak ? 0.04 : 0));\n    k.diveY = diveHeight * H * 0.035 - H * 0.01"+
";\n  }\n  function spawnBurst(x, y, color, n) {\n    for (let i = 0; i < "+
"n; i++) {\n      const a = Math.random() * Math.PI * 2;\n      const s ="+
" 1 + Math.random() * 4;\n      state.particles.push({\n        x, y,\n   "+
"     vx: Math.cos(a) * s,\n        vy: Math.sin(a) * s - 1,\n        lif"+
"e: 0.4 + Math.random() * 0.5,\n        color,\n        r: 2 + Math.rando"+
"m() * 3,\n      });\n    }\n  }\n  function keeperContactPoints(k) {\n    c"+
"onst stretch = k.stretch;\n    const bodyW = k.w * 0.38;\n    const body"
);
