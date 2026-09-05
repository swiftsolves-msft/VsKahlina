window.__GS=(window.__GS||[]);window.__GS.push(
"    o.stop(t0 + dur + 0.02);\n  }\n  function sfx(kind) {\n    if (kind ="+
"== 'flick') beep(180, 0.08, 'triangle', 0.06);\n    if (kind === 'goal'"+
") {\n      beep(440, 0.12, 'square', 0.09);\n      setTimeout(() => beep"+
"(660, 0.14, 'square', 0.08), 90);\n      setTimeout(() => beep(880, 0.1"+
"8, 'square', 0.07), 180);\n    }\n    if (kind === 'save') {\n      beep("+
"220, 0.1, 'sawtooth', 0.07);\n      setTimeout(() => beep(140, 0.16, 's"+
"awtooth', 0.06), 80);\n    }\n    if (kind === 'miss') beep(90, 0.22, 't"+
"riangle', 0.07);\n  }\n  function clientToCanvas(e) {\n    const r = canv"+
"as.getBoundingClientRect();\n    return {\n      x: ((e.clientX - r.left"+
") / r.width) * W,\n      y: ((e.clientY - r.top) / r.height) * H,\n     "+
" force: typeof e.force === 'number' ? e.force : (typeof e.webkitForce "+
"=== 'number' ? Math.min(1, e.webkitForce / 3) : 0),\n    };\n  }\n  funct"+
"ion onPointerDown(e) {\n    if (state.phase !== 'aim') return;\n    cons"+
"t p = clientToCanvas(e);\n    const b = state.ball;\n    const dx = p.x "+
"- b.x;\n    const dy = p.y - b.y;\n    const hitR = b.r * 2.2;\n    if (d"+
"x * dx + dy * dy > hitR * hitR) return;\n    state.pointerId = e.pointe"+
"rId;\n    try { canvas.setPointerCapture(e.pointerId); } catch (_) {}\n "+
"   state.drag = {\n      points: [{ x: p.x, y: p.y, t: performance.now("+
"), force: p.force }],\n      maxForce: p.force || 0,\n    };\n    state.k"+
"eeper.committed = false;\n    state.keeper.t = 0;\n    state.keeper.read"+
"Bias = (Math.random() - 0.5) * 0.35;\n    hint.classList.add('hidden');"+
"\n  }\n  function onPointerMove(e) {\n    if (state.pointerId !== e.point"+
"erId || !state.drag) return;\n    const p = clientToCanvas(e);\n    stat"+
"e.drag.points.push({ x: p.x, y: p.y, t: performance.now(), force: p.fo"+
"rce });\n    if (p.force > state.drag.maxForce) state.drag.maxForce = p"+
".force;\n    if (state.drag.points.length > 24) state.drag.points.shift"+
"();\n    const pts = state.drag.points;\n    if (pts.length >= 3) {\n    "+
"  const a = pts[0];\n      const c = pts[pts.length - 1];\n      const d"+
"irX = c.x - a.x;\n      const aimX = bNormX(state.ball.x + dirX * 2.2);"+
"\n      state.keeper.x += (aimX * W * 0.15 + state.keeper.homeX * 0.85 "+
"- state.keeper.x) * 0.08;\n      state.keeper.limbPhase += 0.25;\n    }\n"+
"  }\n  function bNormX(x) {\n    return Math.max(0.05, Math.min(0.95, x "+
"/ W));\n  }\n  function onPointerUp(e) {\n    if (state.pointerId !== e.p"+
"ointerId || !state.drag) return;\n    const pts = state.drag.points;\n  "+
"  state.pointerId = null;\n    if (pts.length < 2) {\n      state.drag ="+
" null;\n      hint.classList.remove('hidden');\n      return;\n    }\n    "+
"const end = pts[pts.length - 1];\n    let start = pts[0];\n    for (let "+
"i = pts.length - 2; i >= 0; i--) {\n      if (end.t - pts[i].t > 90) {\n"+
"        start = pts[i];\n        break;\n      }\n      start = pts[i];\n "+
"   }\n    const dt = Math.max(16, end.t - start.t);\n    let vx = (end.x"+
" - start.x) / dt;\n    let vy = (end.y - start.y) / dt;\n    if (vy > -0"+
".05) {\n      state.drag = null;\n      hint.classList.remove('hidden');"+
"\n      hint.textContent = 'FLICK UP AT GOAL';\n      return;\n    }\n    "+
"const speed = Math.hypot(vx, vy);\n    const forceBoost = 1 + Math.min("+
"0.32, (state.drag.maxForce || 0) * 0.4);\n    // Soft power curve: medi"+
"um phone swipes already reach useful power\n    const raw = speed * 10."+
"5 * forceBoost;\n    const power = Math.min(2.05, Math.max(0.72, 0.55 +"+
" Math.pow(Math.min(raw, 2.35), 0.82)));\n    let nx = vx / (speed || 1)"+
";\n    let ny = vy / (speed || 1);\n    // Less extreme left/right from "+
"diagonal flicks\n    nx *= 0.58;\n    // Slight aim assist toward goal c"+
"enter when flick is vaguely goal-ward\n    if (ny < -0.28) {\n      cons"+
"t assist = 0.34;\n      nx = nx * (1 - assist);\n    }\n    // Clamp late"+
"ral so casual flicks stay near the posts\n    nx = Math.max(-0.72, Math"+
".min(0.72, nx));\n    const b = state.ball;\n    b.vx = nx * power * W *"+
" 0.0105;\n    b.vy = ny * power * H * 0.0155;\n    b.vz = power * 2.45 +"+
" 0.35;\n    b.z = 0;\n    b.flying = true;\n    b.spinning = nx * 12;\n   "+
" b.scale = 1;\n    commitKeeper(nx, ny, power, end.x);\n    state.phase "+
"= 'flying';\n    state.drag = null;\n    sfx('flick');\n  }\n  function co"+
"mmitKeeper(nx, ny, power, releaseX) {\n    const k = state.keeper;\n    "+
"// Weaker read on release X — ball path (nx) matters more after aim as"+
"sist\n    const aimNorm = (releaseX / W - 0.5) * 0.55 + nx * 0.95 + k.r"+
"eadBias * 0.85;\n    let diveDir = 0;\n"
);
