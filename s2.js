window.__GS=(window.__GS||[]);window.__GS.push(
"ean * 0.55);\n    const sin = Math.sin(lean * 0.55);\n    function xf(lx, ly) {\n"+
"      const sx = lx * (1 + Math.abs(lean) * 0.12);\n      const sy = ly * (1 - "+
"Math.abs(stretch) * 0.08);\n      return { x: k.x + sx * cos - sy * sin, y: k.y"+
" + sx * sin + sy * cos };\n    }\n    const torso = xf(0, -bodyH * 0.35);\n    co"+
"nst gloveL = xf(-armReach * 0.85, armY);\n    const gloveR = xf(armReach * 0.85"+
", armY + (k.diveDir === 0 ? -5 : 4));\n    const hip = xf(0, bodyH * 0.15);\n   "+
" return {\n      torso: { ...torso, rx: bodyW * 0.55 + stretch * 6, ry: bodyH *"+
" 0.55 },\n      hip: { ...hip, rx: bodyW * 0.42, ry: bodyH * 0.35 },\n      glov"+
"eL: { ...gloveL, r: 16 + stretch * 6 },\n      gloveR: { ...gloveR, r: 16 + str"+
"etch * 6 },\n      armL: { ...xf(-armReach * 0.45, armY * 0.55), r: 10 + stretc"+
"h * 4 },\n      armR: { ...xf(armReach * 0.45, armY * 0.55), r: 10 + stretch * "+
"4 },\n    };\n  }\n  function ballHitsKeeper(b, k) {\n    const pts = keeperContac"+
"tPoints(k);\n    const bx = b.x;\n    const by = b.y - b.z * 0.12;\n    const br "+
"= Math.max(10, b.r * b.scale * 0.85);\n    function hitCircle(c) {\n      const "+
"dx = bx - c.x;\n      const dy = by - c.y;\n      return dx * dx + dy * dy < (c."+
"r + br) * (c.r + br);\n    }\n    function hitEllipse(e) {\n      const dx = (bx "+
"- e.x) / (e.rx + br * 0.65);\n      const dy = (by - e.y) / (e.ry + br * 0.65);"+
"\n      return dx * dx + dy * dy < 1;\n    }\n    // Always check body; gloves/ar"+
"ms once dive is underway (or standing ready)\n    if (hitEllipse(pts.torso) || "+
"hitEllipse(pts.hip)) return true;\n    if (k.stretch > 0.18 || !k.committed) {\n"+
"      if (hitCircle(pts.gloveL) || hitCircle(pts.gloveR)) return true;\n      i"+
"f (k.stretch > 0.35 && (hitCircle(pts.armL) || hitCircle(pts.armR))) return tr"+
"ue;\n    }\n    // Standing block for central balls near keeper\n    if (!k.commi"+
"tted || k.stretch < 0.25) {\n      const dx = Math.abs(bx - k.x);\n      const d"+
"y = Math.abs(by - (k.y - k.h * 0.4));\n      if (dx < k.w * 0.38 && dy < k.h * "+
"0.55) return true;\n    }\n    return false;\n  }\n  function resolveShot() {\n    "+
"const b = state.ball;\n    const k = state.keeper;\n    const goalLeft = W * fie"+
"ld.goalLeft;\n    const goalRight = W * field.goalRight;\n    const goalTop = H "+
"* field.goalTop;\n    const goalBottom = H * field.goalBottom;\n    const inFram"+
"eX = b.x > goalLeft - 8 && b.x < goalRight + 8;\n    const inFrameY = b.y > goa"+
"lTop - 6 && b.y < goalBottom + 16;\n    const heightOk = b.z < 78;\n    let resu"+
"lt = 'miss';\n    if (!inFrameX || !inFrameY || !heightOk || b.y < goalTop - 28"+
") {\n      result = 'miss';\n    } else if (ballHitsKeeper(b, k)) {\n      result"+
" = 'save';\n    } else {\n      // Extra save chance on weak/central shots even "+
"if barely past gloves\n      const lateral = Math.abs(b.x - W * 0.5) / (W * 0.4"+
");\n      const weak = Math.hypot(b.vx, b.vy) < 4.2;\n      const divingToward ="+
" k.committed && k.diveDir !== 0 && Math.sign(b.x - k.homeX) === k.diveDir;\n   "+
"   let clutch = 0;\n      if (lateral < 0.28) clutch += 0.28;\n      if (weak) c"+
"lutch += 0.22;\n      if (divingToward && k.stretch > 0.55) clutch += 0.18;\n   "+
"   if (Math.abs(b.x - k.x) < k.w * 0.85 && k.stretch > 0.4) clutch += 0.15;\n  "+
"    result = Math.random() < clutch ? 'save' : 'goal';\n    }\n    state.phase ="+
" 'resolve';\n    state.resultTimer = 1.45;\n    state.lastResult = result;\n    s"+
"tate.goalSettle = false;\n    if (result === 'goal') {\n      state.goals += 1;\n"+
"      showBanner('GOAL!', 'goal');\n      sfx('goal');\n      vibrate([30, 40, 5"+
"0]);\n      spawnBurst(b.x, b.y, '#ffe566', 28);\n      spawnBurst(b.x, b.y, '#f"+
"f3d6e', 12);\n      // Drive into the back of the net and bulge netting\n      c"+
"onst backY = goalTop + (goalBottom - goalTop) * 0.22;\n      b.vx *= 0.35;\n    "+
"  b.vy = Math.min(b.vy, -1.2) - 2.4;\n      b.vz = Math.max(0.5, b.vz * 0.35);\n"+
"      b.flying = true;\n      state.goalSettle = true;\n      state.netBulge = {"+
" x: b.x, y: backY, amount: 0, life: 1.35, peak: 1 };\n      k.emotion = 'frustr"+
"ated';\n      k.emotionHold = 1.2;\n    } else if (result === 'save') {\n      sh"+
"owBanner('SAVE!', 'save');\n      sfx('save');\n      vibrate([15, 30, 15]);\n   "+
"   spawnBurst(b.x, b.y, '#3df0ff', 20);\n      b.vx *= -0.45;\n      b.vy = Math"+
".abs(b.vy) * 0.3 + 1.2;\n      b.vz = 2.2;\n      b.flying = true;\n      k.emoti"+
"on = 'smug';\n      k.emotionHold = 1.2;\n    } else {\n      showBanner('MISS', "+
"'miss');\n      sfx('miss');\n      spawnBurst(b.x, b.y, '#8899aa', 14);\n      k"+
".emotion = 'relief';\n      k.emotionHold = 1.1;\n    }\n    updateHud();\n  }\n  f"+
"unction nextShotOrEnd() {\n    banner.classList.add('hidden');\n    if (state.sh"+
"ot >= TOTAL_SHOTS) {\n      state.phase = 'end';\n      endOverlay.classList.rem"+
"ove('hidden');\n      endScore.textContent = `${state.goals} / ${TOTAL_SHOTS}`;"+
"\n      if (state.goals >= 4) {\n        endTitle.textContent = 'CLINICAL!';\n   "+
"     endFlavor.textContent = 'You cooked Kristijan Kahlina. Charlotte FC fans "+
"are stunned.';\n      } else if (state.goals === 3) {\n        endTitle.textCont"+
"ent = 'SOLID ROUND';\n        endFlavor.textContent = 'Three past the keeper — "+
"respectable shootout.';\n      } else if (state.goals >= 1) {\n        endTitle."+
"textContent = 'HE READ YOU';\n        endFlavor.textContent = 'Kristijan got a "+
"hand to enough. Rematch?';\n      } else {\n        endTitle.textContent = 'SHUT"+
"OUT';\n        endFlavor.textContent = 'Kristijan Kahlina was unbeatable this r"+
"ound.';\n      }\n      return;\n    }\n    state.shot += 1;\n    state.phase = 'ai"+
"m';\n    const prevEmotion = state.keeper && state.keeper.emotion;\n    const pr"+
"evHold = state.keeper && state."
);
