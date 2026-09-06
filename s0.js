window.__GS=(window.__GS||[]);window.__GS.push(
"(() => {\n  'use strict';\n  const TOTAL_SHOTS = 5;\n  const canvas = doc"+
"ument.getElementById('game');\n  const ctx = canvas.getContext('2d');\n "+
" const hudShot = document.getElementById('shotLabel');\n  const hudScor"+
"e = document.getElementById('scoreValue');\n  const hint = document.get"+
"ElementById('hint');\n  const banner = document.getElementById('banner'"+
");\n  const startOverlay = document.getElementById('start');\n  const en"+
"dOverlay = document.getElementById('end');\n  const endTitle = document"+
".getElementById('endTitle');\n  const endScore = document.getElementByI"+
"d('endScore');\n  const endFlavor = document.getElementById('endFlavor'"+
");\n  const muteBtn = document.getElementById('muteBtn');\n  let W = 390"+
";\n  let H = 844;\n  let muted = false;\n  let audioCtx = null;\n  const s"+
"tate = {\n    phase: 'title', // title | aim | flying | resolve | betwe"+
"en | end\n    shot: 1,\n    goals: 0,\n    bg: null,\n    ball: null,\n    "+
"keeper: null,\n    trail: [],\n    particles: [],\n    resultTimer: 0,\n  "+
"  lastTs: 0,\n    pointerId: null,\n    drag: null,\n    message: '',\n   "+
" lastResult: '',\n    netBulge: null,\n    goalSettle: false,\n    celebr"+
"ate: null,\n    camY: 0,\n  };\n  const field = {\n    // Grass / goal-lin"+
"e locked together (kicker POV: net base on pitch)\n    grassTop: 0.52,\n"+
"    goalY: 0.52,\n    goalLeft: 0.10,\n    goalRight: 0.90,\n    goalTop:"+
" 0.375,\n    goalBottom: 0.52,\n    ballStartX: 0.5,\n    ballStartY: 0.7"+
"8,\n  };\n  function resize() {\n    const app = document.getElementById("+
"'app');\n    const rect = app.getBoundingClientRect();\n    const dpr = "+
"Math.min(window.devicePixelRatio || 1, 2.5);\n    W = Math.max(320, Mat"+
"h.floor(rect.width));\n    H = Math.max(480, Math.floor(rect.height));\n"+
"    canvas.width = Math.floor(W * dpr);\n    canvas.height = Math.floor"+
"(H * dpr);\n    canvas.style.width = W + 'px';\n    canvas.style.height "+
"= H + 'px';\n    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n  }\n  function"+
" loadBg() {\n    return new Promise((resolve) => {\n      const img = ne"+
"w Image();\n      img.onload = () => {\n        state.bg = img;\n        "+
"resolve();\n      };\n      img.onerror = () => resolve();\n      if (win"+
"dow.STADIUM_BG) {\n        img.src = window.STADIUM_BG;\n      } else {\n"+
"        img.src = 'stadium.jpg';\n      }\n    });\n  }\n  function resetB"+
"all() {\n    state.ball = {\n      x: field.ballStartX * W,\n      y: fie"+
"ld.ballStartY * H,\n      vx: 0,\n      vy: 0,\n      r: Math.max(18, W *"+
" 0.055),\n      z: 0,\n      vz: 0,\n      scale: 1,\n      flying: false,"+
"\n      spinning: 0,\n    };\n    state.trail = [];\n  }\n  function resetK"+
"eeper() {\n    const gx = W * 0.5;\n    const gy = H * field.goalBottom "+
"- Math.max(6, H * 0.01);\n    state.keeper = {\n      x: gx,\n      y: gy"+
",\n      homeX: gx,\n      homeY: gy,\n      w: W * 0.16,\n      h: H * 0."+
"135,\n      diveX: 0,\n      diveY: 0,\n      t: 0,\n      committed: fals"+
"e,\n      diveDir: 0,\n      diveHeight: 0,\n      reactAt: 0,\n      read"+
"Bias: (Math.random() - 0.5) * 0.12,\n      limbPhase: 0,\n      stretch:"+
" 0,\n      emotion: 'ready',\n      emotionHold: 0,\n    };\n    state.net"+
"Bulge = null;\n    state.goalSettle = false;\n    state.lastResult = '';"+
"\n  }\n  function startMatch() {\n    state.shot = 1;\n    state.goals = 0"+
";\n    state.phase = 'aim';\n    state.particles = [];\n    state.netBulg"+
"e = null;\n    state.goalSettle = false;\n    state.lastResult = '';\n   "+
" state.celebrate = null;\n    state.camY = 0;\n    resetBall();\n    rese"+
"tKeeper();\n    updateHud();\n    hint.classList.remove('hidden');\n    h"+
"int.textContent = 'FLICK THE BALL';\n    banner.classList.add('hidden')"+
";\n    startOverlay.classList.add('hidden');\n    endOverlay.classList.a"+
"dd('hidden');\n    const rematchBtn = document.getElementById('rematchB"+
"tn');\n    rematchBtn.disabled = false;\n    rematchBtn.classList.remove"+
"('hidden');\n    ensureAudio();\n  }\n  function updateHud() {\n    hudSho"+
"t.textContent = `SHOT ${Math.min(state.shot, TOTAL_SHOTS)} / ${TOTAL_S"+
"HOTS}`;\n    hudScore.textContent = String(state.goals);\n  }\n  function"+
" showBanner(text, kind) {\n    banner.textContent = text;\n    banner.cl"+
"assName = 'banner ' + (kind || '');\n  }\n  function vibrate(pattern) {\n"+
"    if (muted) return;\n    try {\n      if (navigator.vibrate) navigato"+
"r.vibrate(pattern);\n    } catch (_) {}\n  }\n  function ensureAudio() {\n"+
"    if (!audioCtx) {\n      try {\n        audioCtx = new (window.AudioC"+
"ontext || window.webkitAudioContext)();\n      } catch (_) {}\n    }\n   "+
" if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();\n  "+
"}\n  function beep(freq, dur, type, gain) {\n    if (muted || !audioCtx)"+
" return;\n    const t0 = audioCtx.currentTime;\n    const o = audioCtx.c"+
"reateOscillator();\n    const g = audioCtx.createGain();\n    o.type = t"+
"ype || 'square';\n    o.frequency.value = freq;\n    g.gain.setValueAtTi"+
"me(gain || 0.08, t0);\n    g.gain.exponentialRampToValueAtTime(0.001, t"+
"0 + dur);\n    o.connect(g);\n    g.connect(audioCtx.destination);\n    o"+
".start(t0);\n    o.stop(t0 + dur + 0.02);\n  }\n  function sfx(kind) {\n  "+
"  if (kind === 'flick') beep(180, 0.08, 'triangle', 0.06);\n    if (kin"+
"d === 'goal') {\n      beep(440, 0.12, 'square', 0.09);\n      setTimeou"+
"t(() => beep(660, 0.14, 'square', 0.08), 90);\n      setTimeout(() => b"+
"eep(880, 0.18, 'square', 0.07), 180);\n    }\n    if (kind === 'save') {"+
"\n      beep(220, 0.1, 'sawtooth', 0.07);\n      setTimeout(() => beep(1"+
"40, 0.16, 'sawtooth', 0.06), 80);\n    }\n    if (kind === 'miss') beep("+
"90, 0.22, 'triangle', 0.07);\n  }\n  function clientToCanvas(e) {\n    co"+
"nst r = canvas.getBoundingClientRect();\n    return {\n      x: ((e.clie"+
"ntX - r.left) / r.width) * W,\n      y: ((e.clientY - r.top) / r.height"+
") * H,\n      force: typeof e.force === 'number' ? e.force : (typeof e."
);
