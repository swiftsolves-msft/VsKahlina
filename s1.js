window.__GS=(window.__GS||[]);window.__GS.push(
"cy.value = freq;\n    g.gain.setValueAtTime(gain || 0.08, t0)"+
";\n    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);\n"+
"    o.connect(g);\n    g.connect(audioCtx.destination);\n    o"+
".start(t0);\n    o.stop(t0 + dur + 0.02);\n  }\n  function sfx("+
"kind) {\n    if (kind === 'flick') beep(180, 0.08, 'triangle'"+
", 0.06);\n    if (kind === 'goal') {\n      beep(440, 0.12, 's"+
"quare', 0.09);\n      setTimeout(() => beep(660, 0.14, 'squar"+
"e', 0.08), 90);\n      setTimeout(() => beep(880, 0.18, 'squa"+
"re', 0.07), 180);\n    }\n    if (kind === 'save') {\n      bee"+
"p(220, 0.1, 'sawtooth', 0.07);\n      setTimeout(() => beep(1"+
"40, 0.16, 'sawtooth', 0.06), 80);\n    }\n    if (kind === 'mi"+
"ss') beep(90, 0.22, 'triangle', 0.07);\n  }\n  function client"+
"ToCanvas(e) {\n    const r = canvas.getBoundingClientRect();\n"+
"    return {\n      x: ((e.clientX - r.left) / r.width) * W,\n"+
"      y: ((e.clientY - r.top) / r.height) * H,\n      force: "+
"typeof e.force === 'number' ? e.force : (typeof e.webkitForc"+
"e === 'number' ? Math.min(1, e.webkitForce / 3) : 0),\n    };"+
"\n  }\n  function onPointerDown(e) {\n    if (state.phase !== '"+
"aim') return;\n    const p = clientToCanvas(e);\n    const b ="+
" state.ball;\n    const dx = p.x - b.x;\n    const dy = p.y - "+
"b.y;\n    const hitR = b.r * 2.2;\n    if (dx * dx + dy * dy >"+
" hitR * hitR) return;\n    state.pointerId = e.pointerId;\n   "+
" try { canvas.setPointerCapture(e.pointerId); } catch (_) {}"+
"\n    state.drag = {\n      points: [{ x: p.x, y: p.y, t: perf"+
"ormance.now(), force: p.force }],\n      maxForce: p.force ||"+
" 0,\n    };\n    state.keeper.committed = false;\n    state.kee"+
"per.t = 0;\n    state.keeper.readBias = (Math.random() - 0.5)"+
" * 0.35;\n    hint.classList.add('hidden');\n  }\n  function on"+
"PointerMove(e) {\n    if (state.pointerId !== e.pointerId || "+
"!state.drag) return;\n    const p = clientToCanvas(e);\n    st"+
"ate.drag.points.push({ x: p.x, y: p.y, t: performance.now(),"+
" force: p.force });\n    if (p.force > state.drag.maxForce) s"+
"tate.drag.maxForce = p.force;\n    if (state.drag.points.leng"+
"th > 24) state.drag.points.shift();\n    const pts = state.dr"+
"ag.points;\n    if (pts.length >= 3) {\n      const a = pts[0]"+
";\n      const c = pts[pts.length - 1];\n      const dirX = c."+
"x - a.x;\n      const aimX = bNormX(state.ball.x + dirX * 2.2"+
");\n      state.keeper.x += (aimX * W * 0.15 + state.keeper.h"+
"omeX * 0.85 - state.keeper.x) * 0.08;\n      state.keeper.lim"+
"bPhase += 0.25;\n    }\n  }\n  function bNormX(x) {\n    return "+
"Math.max(0.05, Math.min(0.95, x / W));\n  }\n  function onPoin"+
"terUp(e) {\n    if (state.pointerId !== e.pointerId || !state"+
".drag) return;\n    const pts = state.drag.points;\n    state."+
"pointerId = null;\n    if (pts.length < 2) {\n      state.drag"+
" = null;\n      hint.classList.remove('hidden');\n      return"+
";\n    }\n    const end = pts[pts.length - 1];\n    let start ="+
" pts[0];\n    for (let i = pts.length - 2; i >= 0; i--) {\n   "+
"   if (end.t - pts[i].t > 90) {\n        start = pts[i];\n    "+
"    break;\n      }\n      start = pts[i];\n    }\n    const dt "+
"= Math.max(16, end.t - start.t);\n    let vx = (end.x - start"+
".x) / dt;\n    let vy = (end.y - start.y) / dt;\n    if (vy > "+
"-0.05) {\n      state.drag = null;\n      hint.classList.remov"+
"e('hidden');\n      hint.textContent = 'FLICK UP AT GOAL';\n  "+
"    return;\n    }\n    const speed = Math.hypot(vx, vy);\n    "+
"const forceBoost = 1 + Math.min(0.45, (state.drag.maxForce |"+
"| 0) * 0.55);\n    const power = Math.min(2.4, Math.max(0.55,"+
" speed * 14 * forceBoost));\n    const nx = vx / (speed || 1)"+
";\n    const ny = vy / (speed || 1);\n    const b = state.ball"+
";\n    b.vx = nx * power * W * 0.018;\n    b.vy = ny * power *"+
" H * 0.018;\n    b.vz = power * 3.2 + Math.random() * 0.6;\n  "+
"  b.z = 0;\n    b.flying = true;\n    b.spinning = nx * 18;\n  "+
"  b.scale = 1;\n    commitKeeper(nx, ny, power, end.x);\n    s"+
"tate.phase = 'flying';\n    state.drag = null;\n    sfx('flick"+
"');\n  }\n  function commitKeeper(nx, ny, power, releaseX) {\n "+
"   const k = state.keeper;\n    const aimNorm = (releaseX / W"+
" - 0.5) + nx * 0.85 + k.readBias;\n    let diveDir = 0;\n    i"+
"f (aimNorm < -0.08) diveDir = -1;\n    else if (aimN"
);
