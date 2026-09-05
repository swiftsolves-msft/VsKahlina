window.__GS=(window.__GS||[]);window.__GS.push(
"    if (aimNorm < -0.10) diveDir = -1;\n    else if (aimNorm > 0.10) di"+
"veDir = 1;\n    const wrong = Math.random() < 0.34;\n    if (wrong) dive"+
"Dir = -diveDir || (Math.random() < 0.5 ? -1 : 1);\n    let diveHeight ="+
" 0;\n    if (Math.abs(ny) > 0.88 && power > 1.55) diveHeight = 1;\n    e"+
"lse if (power < 0.85) diveHeight = -1;\n    const react = 120 + Math.ra"+
"ndom() * 170 + (wrong ? 70 : 0) - Math.min(30, power * 8);\n    k.diveD"+
"ir = diveDir;\n    k.diveHeight = diveHeight;\n    k.reactAt = performan"+
"ce.now() + react;\n    k.committed = false;\n    k.stretch = 0;\n    k.di"+
"veX = diveDir * W * (0.14 + Math.random() * 0.07);\n    k.diveY = diveH"+
"eight * H * 0.03 - H * 0.008;\n  }\n  function spawnBurst(x, y, color, n"+
") {\n    for (let i = 0; i < n; i++) {\n      const a = Math.random() * "+
"Math.PI * 2;\n      const s = 1 + Math.random() * 4;\n      state.partic"+
"les.push({\n        x, y,\n        vx: Math.cos(a) * s,\n        vy: Math"+
".sin(a) * s - 1,\n        life: 0.4 + Math.random() * 0.5,\n        colo"+
"r,\n        r: 2 + Math.random() * 3,\n      });\n    }\n  }\n  function re"+
"solveShot() {\n    const b = state.ball;\n    const k = state.keeper;\n  "+
"  const goalLeft = W * field.goalLeft;\n    const goalRight = W * field"+
".goalRight;\n    const goalTop = H * field.goalTop;\n    const goalBotto"+
"m = H * field.goalBottom;\n    // Generous mouth — near-post grazes sti"+
"ll count\n    const inFrameX = b.x > goalLeft - 10 && b.x < goalRight +"+
" 10;\n    const inFrameY = b.y > goalTop - 8 && b.y < goalBottom + 18;\n"+
"    const heightOk = b.z < 78;\n    let result = 'miss';\n    if (!inFra"+
"meX || !inFrameY || !heightOk || b.y < goalTop - 28) {\n      result = "+
"'miss';\n    } else {\n      const reachX = k.x + (k.committed ? k.diveX"+
" * k.stretch : 0);\n      const reachY = k.y + (k.committed ? k.diveY *"+
" k.stretch : 0) - k.h * 0.35;\n      const reachW = k.w * (0.42 + k.str"+
"etch * 0.42);\n      const reachH = k.h * (0.58 + k.stretch * 0.28);\n  "+
"    const dx = Math.abs(b.x - reachX);\n      const dy = Math.abs(b.y -"+
" reachY - b.z * 0.12);\n      const saved = dx < reachW && dy < reachH "+
"&& k.stretch > 0.5;\n      result = saved ? 'save' : 'goal';\n    }\n    "+
"state.phase = 'resolve';\n    state.resultTimer = 1.35;\n    if (result "+
"=== 'goal') {\n      state.goals += 1;\n      showBanner('GOAL!', 'goal'"+
");\n      sfx('goal');\n      vibrate([30, 40, 50]);\n      spawnBurst(b."+
"x, b.y, '#ffe566', 28);\n      spawnBurst(b.x, b.y, '#ff3d6e', 12);\n   "+
" } else if (result === 'save') {\n      showBanner('SAVE!', 'save');\n  "+
"    sfx('save');\n      vibrate([15, 30, 15]);\n      spawnBurst(b.x, b."+
"y, '#3df0ff', 20);\n      b.vx *= -0.35;\n      b.vy = Math.abs(b.vy) * "+
"0.25;\n      b.vz = 2;\n    } else {\n      showBanner('MISS', 'miss');\n "+
"     sfx('miss');\n      spawnBurst(b.x, b.y, '#8899aa', 14);\n    }\n   "+
" updateHud();\n  }\n  function nextShotOrEnd() {\n    banner.classList.ad"+
"d('hidden');\n    if (state.shot >= TOTAL_SHOTS) {\n      state.phase = "+
"'end';\n      endOverlay.classList.remove('hidden');\n      endScore.tex"+
"tContent = `${state.goals} / ${TOTAL_SHOTS}`;\n      if (state.goals >="+
" 4) {\n        endTitle.textContent = 'CLINICAL!';\n        endFlavor.te"+
"xtContent = 'You cooked Kristijan Kahlina. Charlotte FC fans are stunn"+
"ed.';\n      } else if (state.goals === 3) {\n        endTitle.textConte"+
"nt = 'SOLID ROUND';\n        endFlavor.textContent = 'Three past the ke"+
"eper — respectable shootout.';\n      } else if (state.goals >= 1) {\n  "+
"      endTitle.textContent = 'HE READ YOU';\n        endFlavor.textCont"+
"ent = 'Kristijan got a hand to enough. Rematch?';\n      } else {\n     "+
"   endTitle.textContent = 'SHUTOUT';\n        endFlavor.textContent = '"+
"Kristijan Kahlina was unbeatable this round.';\n      }\n      return;\n "+
"   }\n    state.shot += 1;\n    state.phase = 'aim';\n    resetBall();\n  "+
"  resetKeeper();\n    updateHud();\n    hint.classList.remove('hidden');"+
"\n    hint.textContent = 'FLICK THE BALL';\n  }\n  function update(dt) {\n"+
"    const b = state.ball;\n    const k = state.keeper;\n    k.limbPhase "+
"+= dt * (k.committed ? 10 : 4);\n    if (state.phase === 'flying' || st"+
"ate.phase === 'resolve') {\n      if (!k.committed && performance.now()"+
" >= k.reactAt) {\n        k.committed = true;\n      }\n      if (k.commi"+
"tted) {\n        k.stretch = Math.min(1, k.stretch + dt * 2.55);\n      "+
"  const tx = k.homeX + k.diveX * k.stretch;\n        const ty = k.homeY"+
" + k.diveY * k.stretch;\n"
);
