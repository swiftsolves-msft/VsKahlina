window.__GS=(window.__GS||[]);window.__GS.push(
"dingClientRect();\n    return {\n      x: ((e.clientX - r.left) / r.wid"+
"th) * W,\n      y: ((e.clientY - r.top) / r.height) * H,\n      force: "+
"typeof e.force === 'number' ? e.force : (typeof e.webkitForce === 'numb"+
"er' ? Math.min(1, e.webkitForce / 3) : 0),\n    };\n  }\n  function onP"+
"ointerDown(e) {\n    if (state.phase !== 'aim') return;\n    const p = "+
"clientToCanvas(e);\n    const b = state.ball;\n    const dx = p.x - b.x"+
";\n    const dy = p.y - b.y;\n    const hitR = b.r * 2.2;\n    if (dx *"+
" dx + dy * dy > hitR * hitR) return;\n    state.pointerId = e.pointerId"+
";\n    try { canvas.setPointerCapture(e.pointerId); } catch (_) {}\n   "+
" state.drag = {\n      points: [{ x: p.x, y: p.y, t: performance.now(),"+
" force: p.force }],\n      maxForce: p.force || 0,\n    };\n    state.k"+
"eeper.committed = false;\n    state.keeper.t = 0;\n    state.keeper.rea"+
"dBias = (Math.random() - 0.5) * 0.35;\n    hint.classList.add('hidden')"+
";\n  }\n  function onPointerMove(e) {\n    if (state.pointerId !== e.po"+
"interId || !state.drag) return;\n    const p = clientToCanvas(e);\n    "+
"state.drag.points.push({ x: p.x, y: p.y, t: performance.now(), force: p"+
".force });\n    if (p.force > state.drag.maxForce) state.drag.maxForce "+
"= p.force;\n    if (state.drag.points.length > 24) state.drag.points.sh"+
"ift();\n    const pts = state.drag.points;\n    if (pts.length >= 3) {"+
"\n      const a = pts[0];\n      const c = pts[pts.length - 1];\n      "+
"const dirX = c.x - a.x;\n      const aimX = bNormX(state.ball.x + dirX "+
"* 2.2);\n      state.keeper.x += (aimX * W * 0.15 + state.keeper.homeX "+
"* 0.85 - state.keeper.x) * 0.08;\n      state.keeper.limbPhase += 0.25;"+
"\n    }\n  }\n  function bNormX(x) {\n    return Math.max(0.05, Math.mi"+
"n(0.95, x / W));\n  }\n  function onPointerUp(e) {\n    if (state.point"+
"erId !== e.pointerId || !state.drag) return;\n    const pts = state.dra"+
"g.points;\n    state.pointerId = null;\n    if (pts.length < 2) {\n    "+
"  state.drag = null;\n      hint.classList.remove('hidden');\n      ret"+
"urn;\n    }\n    const end = pts[pts.length - 1];\n    let start = pts["+
"0];\n    for (let i = pts.length - 2; i >= 0; i--) {\n      if (end.t -"+
" pts[i].t > 90) {\n        start = pts[i];\n        break;\n      }\n  "+
"    start = pts[i];\n    }\n    const dt = Math.max(16, end.t - start.t"+
");\n    let vx = (end.x - start.x) / dt;\n    let vy = (end.y - start.y"+
") / dt;\n    if (vy > -0.05) {\n      state.drag = null;\n      hint.cl"+
"assList.remove('hidden');\n      hint.textContent = 'FLICK UP AT GOAL';"+
"\n      return;\n    }\n    const speed = Math.hypot(vx, vy);\n    cons"+
"t forceBoost = 1 + Math.min(0.28, (state.drag.maxForce || 0) * 0.36);\n"+
"    // Soft power curve kept, but central/weak flicks less automatic\n "+
"   const raw = speed * 10.2 * forceBoost;\n    const power = Math.min(2"+
".05, Math.max(0.68, 0.52 + Math.pow(Math.min(raw, 2.35), 0.84)));\n    "+
"let nx = vx / (speed || 1);\n    let ny = vy / (speed || 1);\n    // Wi"+
"der lateral for corners and deliberate wides\n    nx *= 1.00;\n    // M"+
"ild aim assist - keep good flicks on frame, don't pull everything centr"+
"al\n    if (ny < -0.28) {\n      const assist = 0.05;\n      nx = nx * "+
"(1 - assist);\n    }\n    // Clamp lateral so casual flicks stay near t"+
"he posts\n    nx = Math.max(-0.98, Math.min(0.98, nx));\n    const b = "+
"state.ball;\n    b.vx = nx * power * W * 0.0220;\n    b.vy = ny * power"+
" * H * 0.0155;\n    b.vz = power * 2.45 + 0.35;\n    b.z = 0;\n    b.fl"+
"ying = true;\n    b.spinning = nx * 12;\n    b.scale = 1;\n    commitKe"+
"eper(nx, ny, power, end.x);\n    state.phase = 'flying';\n    state.dra"+
"g = null;\n    sfx('flick');\n  }\n  function commitKeeper(nx, ny, powe"+
"r, releaseX) {\n    const k = state.keeper;\n    // Stronger anticipati"+
"on: trust ball path + release side\n    const aimNorm = (releaseX / W -"+
" 0.5) * 0.78 + nx * 1.15 + k.readBias * 0.55;\n    let diveDir = 0;\n  "+
"  // Narrower \"stay central\" band - more decisive dives\n    if (aimN"+
"orm < -0.055) diveDir = -1;\n    else if (aimNorm > 0.055) diveDir = 1;"+
"\n    // Central / weak shots: prefer hold or short dive toward ball, r"+
"arely wrong-foot\n    const centralWeak = Math.abs(nx) < 0.22 && power "+
"< 1.15;\n    let wrongChance = 0.16;\n    if (centralWeak) wrongChance "+
"= 0.06;\n    else if (Math.abs(nx) > 0.52 && power > 1.2) wrongChance ="+
" 0.30; // unread corners still score often\n    const cRead = Math.abs("+
"nx) > 0.52 && power > 1.2 && Math.random() < 0.28;\n    let wrong = fal"+
"se;\n    if (cRead) diveDir = nx < 0 ? -1 : 1;\n    else {\n      wrong"+
" = Math.random() < wrongChance;\n      if (wrong) diveDir = -diveDir ||"+
" (Math.random() < 0.5 ? -1 : 1);\n      if (centralWeak && !wrong && di"+
"veDir === 0) {\n        diveDir = nx < -0.04 ? -1 : nx > 0.04 ? 1 : (Ma"+
"th.random() < 0.5 ? -1 : 1);\n      }\n    }\n    let diveHeight = 0;\n"+
"    if (Math.abs(ny) > 0.82 && power > 1.35) diveHeight = 1;\n    else "+
"if (power < 0.9) diveHeight = -1;\n    // Faster reaction, fewer long f"+
"reezes\n    const react = 70 + Math.random() * 110 + (wrong ? 45 : 0) -"+
" Math.min(35, power * 10) - (cRead ? 25 : 0);\n    k.diveDir = diveDir;"+
"\n    k.diveHeight = diveHeight;\n    k.reactAt = performance.now() + M"+
"ath.max(40, react);\n    k.committed = false;\n    k.stretch = 0;\n    "+
"k.emotion = 'ready';\n    k.emotionHold = 0;\n    // Better reach acros"+
"s the mouth\n    k.diveX = diveDir * W * (cRead ? 0.30 + Math.random() "+
"* 0.04 : 0.18 + Math.random() * 0.08 + (centralWeak ? 0.04 : 0));\n    "+
"k.diveY = diveHeight * H * 0.035 - H * 0.01;\n  }\n  function spawnBurs"+
"t(x, y, color, n) {\n    for (let i = 0; i < n; i++) {\n      const a ="+
" Math.random() * Math.PI * 2;\n      const s = 1 + Math.random() * 4;\n"+
"      state.particles.push({\n        x, y,\n        vx: Math.cos(a) * "
);
