window.__GS=(window.__GS||[]);window.__GS.push(
"H = k.h * 0.48;\n    const dive = stretch;\n    const armReach = k.w * ("+
"0.32 + dive * 0.55);\n    const armY = -bodyH * 0.55 - k.diveHeight * d"+
"ive * 16;\n    const lean = k.diveDir * stretch;\n    const cos = Math.c"+
"os(lean * 0.55);\n    const sin = Math.sin(lean * 0.55);\n    function x"+
"f(lx, ly) {\n      const sx = lx * (1 + Math.abs(lean) * 0.12);\n      c"+
"onst sy = ly * (1 - Math.abs(stretch) * 0.08);\n      return { x: k.x +"+
" sx * cos - sy * sin, y: k.y + sx * sin + sy * cos };\n    }\n    const "+
"torso = xf(0, -bodyH * 0.35);\n    const gloveL = xf(-armReach * 0.85, "+
"armY);\n    const gloveR = xf(armReach * 0.85, armY + (k.diveDir === 0 "+
"? -5 : 4));\n    const hip = xf(0, bodyH * 0.15);\n    return {\n      to"+
"rso: { ...torso, rx: bodyW * 0.55 + stretch * 6, ry: bodyH * 0.55 },\n "+
"     hip: { ...hip, rx: bodyW * 0.42, ry: bodyH * 0.35 },\n      gloveL"+
": { ...gloveL, r: 16 + stretch * 6 },\n      gloveR: { ...gloveR, r: 16"+
" + stretch * 6 },\n      armL: { ...xf(-armReach * 0.45, armY * 0.55), "+
"r: 10 + stretch * 4 },\n      armR: { ...xf(armReach * 0.45, armY * 0.5"+
"5), r: 10 + stretch * 4 },\n    };\n  }\n  function ballHitsKeeper(b, k) "+
"{\n    const pts = keeperContactPoints(k);\n    const bx = b.x;\n    cons"+
"t by = b.y - b.z * 0.12;\n    const br = Math.max(10, b.r * b.scale * 0"+
".85);\n    function hitCircle(c) {\n      const dx = bx - c.x;\n      con"+
"st dy = by - c.y;\n      return dx * dx + dy * dy < (c.r + br) * (c.r +"+
" br);\n    }\n    function hitEllipse(e) {\n      const dx = (bx - e.x) /"+
" (e.rx + br * 0.65);\n      const dy = (by - e.y) / (e.ry + br * 0.65);"+
"\n      return dx * dx + dy * dy < 1;\n    }\n    // Always check body; g"+
"loves/arms once dive is underway (or standing ready)\n    if (hitEllips"+
"e(pts.torso) || hitEllipse(pts.hip)) return true;\n    if (k.stretch > "+
"0.18 || !k.committed) {\n      if (hitCircle(pts.gloveL) || hitCircle(p"+
"ts.gloveR)) return true;\n      if (k.stretch > 0.35 && (hitCircle(pts."+
"armL) || hitCircle(pts.armR))) return true;\n    }\n    // Standing bloc"+
"k for central balls near keeper\n    if (!k.committed || k.stretch < 0."+
"25) {\n      const dx = Math.abs(bx - k.x);\n      const dy = Math.abs(b"+
"y - (k.y - k.h * 0.4));\n      if (dx < k.w * 0.38 && dy < k.h * 0.55) "+
"return true;\n    }\n    return false;\n  }\n  function resolveShot() {\n  "+
"  const b = state.ball;\n    const k = state.keeper;\n    const goalLeft"+
" = W * field.goalLeft;\n    const goalRight = W * field.goalRight;\n    "+
"const goalTop = H * field.goalTop;\n    const goalBottom = H * field.go"+
"alBottom;\n    const inFrameX = b.x > goalLeft - 8 && b.x < goalRight +"+
" 8;\n    const inFrameY = b.y > goalTop - 6 && b.y < goalBottom + 16;\n "+
"   const heightOk = b.z < 78;\n    let result = 'miss';\n    if (!inFram"+
"eX || !inFrameY || !heightOk || b.y < goalTop - 28) {\n      result = '"+
"miss';\n    } else if (ballHitsKeeper(b, k)) {\n      result = 'save';\n "+
"   } else {\n      // Extra save chance on weak/central shots even if b"+
"arely past gloves\n      const lateral = Math.abs(b.x - W * 0.5) / (W *"+
" 0.4);\n      const weak = Math.hypot(b.vx, b.vy) < 4.2;\n      const di"+
"vingToward = k.committed && k.diveDir !== 0 && Math.sign(b.x - k.homeX"+
") === k.diveDir;\n      let clutch = 0;\n      if (lateral < 0.28) clutc"+
"h += 0.28;\n      if (weak) clutch += 0.22;\n      if (divingToward && k"+
".stretch > 0.55) clutch += 0.18;\n      if (divingToward && lateral > 0"+
".65 && k.stretch > 0.6) clutch += 0.20;\n      if (Math.abs(b.x - k.x) "+
"< k.w * 0.85 && k.stretch > 0.4) clutch += 0.15;\n      result = Math.r"+
"andom() < clutch ? 'save' : 'goal';\n    }\n    state.phase = 'resolve';"+
"\n    state.resultTimer = 1.45;\n    state.lastResult = result;\n    stat"+
"e.goalSettle = false;\n    if (result === 'goal') {\n      state.goals +"+
"= 1;\n      showBanner('GOAL!', 'goal');\n      sfx('goal');\n      vibra"+
"te([30, 40, 50]);\n      spawnBurst(b.x, b.y, '#ffe566', 28);\n      spa"+
"wnBurst(b.x, b.y, '#ff3d6e', 12);\n      // Drive into the back of the "+
"net and bulge netting\n      const backY = goalTop + (goalBottom - goal"+
"Top) * 0.22;\n      b.vx *= 0.35;\n      b.vy = Math.min(b.vy, -1.2) - 2"+
".4;\n      b.vz = Math.max(0.5, b.vz * 0.35);\n      b.flying = true;\n  "+
"    state.goalSettle = true;\n      state.netBulge = { x: b.x, y: backY"+
", amount: 0, life: 1.35, peak: 1 };\n      k.emotion = 'frustrated';\n  "+
"    k.emotionHold = 1.2;\n    } else if (result === 'save') {\n      sho"+
"wBanner('SAVE!', 'save');\n      sfx('save');\n      vibrate([15, 30, 15"+
"]);\n      spawnBurst(b.x, b.y, '#3df0ff', 20);\n      b.vx *= -0.45;\n  "+
"    b.vy = Math.abs(b.vy) * 0.3 + 1.2;\n      b.vz = 2.2;\n      b.flyin"+
"g = true;\n      k.emotion = 'smug';\n      k.emotionHold = 1.2;\n    } e"+
"lse {\n      showBanner('MISS', 'miss');\n      sfx('miss');\n      spawn"+
"Burst(b.x, b.y, '#8899aa', 14);\n      k.emotion = 'relief';\n      k.em"+
"otionHold = 1.1;\n    }\n    updateHud();\n  }\n  function nextShotOrEnd()"+
" {\n    banner.classList.add('hidden');\n    if (state.shot >= TOTAL_SHO"+
"TS) {\n      endScore.textContent = `${state.goals} / ${TOTAL_SHOTS}`;\n"+
"      if (state.goals >= 5) {\n        endTitle.textContent = 'PERFECT!"+
"';\n        endFlavor.textContent = 'Five past Kahlina. Night sky firew"+
"orks - Charlotte is roaring.';\n        beginPerfectCelebrate();\n      "+
"  return;\n      }\n      state.phase = 'end';\n      endOverlay.classLis"+
"t.remove('hidden');\n      if (state.goals >= 4) {\n        endTitle.tex"+
"tContent = 'CLINICAL!';\n        endFlavor.textContent = 'You cooked Kr"+
"istijan Kahlina. Charlotte FC fans are stunned.';\n      } else if (sta"+
"te.goals === 3) {\n        endTitle.textContent = 'SOLID ROUND';\n      "+
"  endFlavor.textContent = 'Three past the keeper - respectable shootou"+
"t.';\n      } else if (state.goals >= 1) {\n        endTitle.textContent"
);
