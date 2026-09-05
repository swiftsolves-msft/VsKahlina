window.__GS=(window.__GS||[]);window.__GS.push(
"orm > 0.08) diveDir = 1;\n    const wrong = Math.random() < 0"+
".22;\n    if (wrong) diveDir = -diveDir || (Math.random() < 0"+
".5 ? -1 : 1);\n    let diveHeight = 0;\n    if (Math.abs(ny) >"+
" 0.85 && power > 1.4) diveHeight = 1;\n    else if (power < 0"+
".9) diveHeight = -1;\n    const react = 80 + Math.random() * "+
"140 + (wrong ? 60 : 0) - Math.min(40, power * 10);\n    k.div"+
"eDir = diveDir;\n    k.diveHeight = diveHeight;\n    k.reactAt"+
" = performance.now() + react;\n    k.committed = false;\n    k"+
".stretch = 0;\n    k.diveX = diveDir * W * (0.16 + Math.rando"+
"m() * 0.08);\n    k.diveY = diveHeight * H * 0.035 - H * 0.01"+
";\n  }\n  function spawnBurst(x, y, color, n) {\n    for (let i"+
" = 0; i < n; i++) {\n      const a = Math.random() * Math.PI "+
"* 2;\n      const s = 1 + Math.random() * 4;\n      state.part"+
"icles.push({\n        x, y,\n        vx: Math.cos(a) * s,\n    "+
"    vy: Math.sin(a) * s - 1,\n        life: 0.4 + Math.random"+
"() * 0.5,\n        color,\n        r: 2 + Math.random() * 3,\n "+
"     });\n    }\n  }\n  function resolveShot() {\n    const b = "+
"state.ball;\n    const k = state.keeper;\n    const goalLeft ="+
" W * field.goalLeft;\n    const goalRight = W * field.goalRig"+
"ht;\n    const goalTop = H * field.goalTop;\n    const goalBot"+
"tom = H * field.goalBottom;\n    const inFrameX = b.x > goalL"+
"eft + 8 && b.x < goalRight - 8;\n    const inFrameY = b.y > g"+
"oalTop + 6 && b.y < goalBottom + 10;\n    const heightOk = b."+
"z < 55;\n    let result = 'miss';\n    if (!inFrameX || !inFra"+
"meY || !heightOk || b.y < goalTop - 20) {\n      result = 'mi"+
"ss';\n    } else {\n      const reachX = k.x + (k.committed ? "+
"k.diveX * k.stretch : 0);\n      const reachY = k.y + (k.comm"+
"itted ? k.diveY * k.stretch : 0) - k.h * 0.35;\n      const r"+
"eachW = k.w * (0.55 + k.stretch * 0.55);\n      const reachH "+
"= k.h * (0.7 + k.stretch * 0.35);\n      const dx = Math.abs("+
"b.x - reachX);\n      const dy = Math.abs(b.y - reachY - b.z "+
"* 0.15);\n      const saved = dx < reachW && dy < reachH && k"+
".stretch > 0.35;\n      result = saved ? 'save' : 'goal';\n   "+
" }\n    state.phase = 'resolve';\n    state.resultTimer = 1.35"+
";\n    if (result === 'goal') {\n      state.goals += 1;\n     "+
" showBanner('GOAL!', 'goal');\n      sfx('goal');\n      vibra"+
"te([30, 40, 50]);\n      spawnBurst(b.x, b.y, '#ffe566', 28);"+
"\n      spawnBurst(b.x, b.y, '#ff3d6e', 12);\n    } else if (r"+
"esult === 'save') {\n      showBanner('SAVE!', 'save');\n     "+
" sfx('save');\n      vibrate([15, 30, 15]);\n      spawnBurst("+
"b.x, b.y, '#3df0ff', 20);\n      b.vx *= -0.35;\n      b.vy = "+
"Math.abs(b.vy) * 0.25;\n      b.vz = 2;\n    } else {\n      sh"+
"owBanner('MISS', 'miss');\n      sfx('miss');\n      spawnBurs"+
"t(b.x, b.y, '#8899aa', 14);\n    }\n    updateHud();\n  }\n  fun"+
"ction nextShotOrEnd() {\n    banner.classList.add('hidden');\n"+
"    if (state.shot >= TOTAL_SHOTS) {\n      state.phase = 'en"+
"d';\n      endOverlay.classList.remove('hidden');\n      endSc"+
"ore.textContent = `${state.goals} / ${TOTAL_SHOTS}`;\n      i"+
"f (state.goals >= 4) {\n        endTitle.textContent = 'CLINI"+
"CAL!';\n        endFlavor.textContent = 'You cooked Kristijan"+
" Kahlina. Charlotte FC fans are stunned.';\n      } else if ("+
"state.goals === 3) {\n        endTitle.textContent = 'SOLID R"+
"OUND';\n        endFlavor.textContent = 'Three past the keepe"+
"r \u2014 respectable shootout.';\n      } else if (state.goals >= "+
"1) {\n        endTitle.textContent = 'HE READ YOU';\n        e"+
"ndFlavor.textContent = 'Kristijan got a hand to enough. Rema"+
"tch?';\n      } else {\n        endTitle.textContent = 'SHUTOU"+
"T';\n        endFlavor.textContent = 'Kristijan Kahlina was u"+
"nbeatable this round.';\n      }\n      return;\n    }\n    stat"+
"e.shot += 1;\n    state.phase = 'aim';\n    resetBall();\n    r"+
"esetKeeper();\n    updateHud();\n    hint.classList.remove('hi"+
"dden');\n    hint.textContent = 'FLICK THE BALL';\n  }\n  funct"+
"ion update(dt) {\n    const b = state.ball;\n    const k = sta"+
"te.keeper;\n    k.limbPhase += dt * (k.committed ? 10 : 4);\n "+
"   if (state.phase === 'flying' || state.phase === 'resolve'"+
") {\n      if (!k.committed && performance.now() >= k.reactAt"+
") {\n        k.committed = true;\n      }\n      if (k"
);
