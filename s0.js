window.__GS=(window.__GS||[]);window.__GS.push(
"(() => {\n  'use strict';\n  const TOTAL_SHOTS = 5;\n  const canvas = document.ge"+
"tElementById('game');\n  const ctx = canvas.getContext('2d');\n  const hudShot ="+
" document.getElementById('shotLabel');\n  const hudScore = document.getElementB"+
"yId('scoreValue');\n  const hint = document.getElementById('hint');\n  const ban"+
"ner = document.getElementById('banner');\n  const startOverlay = document.getEl"+
"ementById('start');\n  const endOverlay = document.getElementById('end');\n  con"+
"st endTitle = document.getElementById('endTitle');\n  const endScore = document"+
".getElementById('endScore');\n  const endFlavor = document.getElementById('endF"+
"lavor');\n  const muteBtn = document.getElementById('muteBtn');\n  let W = 390;\n"+
"  let H = 844;\n  let muted = false;\n  let audioCtx = null;\n  const state = {\n "+
"   phase: 'title', // title | aim | flying | resolve | between | end\n    shot:"+
" 1,\n    goals: 0,\n    bg: null,\n    ball: null,\n    keeper: null,\n    trail: ["+
"],\n    particles: [],\n    resultTimer: 0,\n    lastTs: 0,\n    pointerId: null,\n"+
"    drag: null,\n    message: '',\n    lastResult: '',\n    netBulge: null,\n    g"+
"oalSettle: false,\n  };\n  const field = {\n    // Grass / goal-line locked toget"+
"her (kicker POV: net base on pitch)\n    grassTop: 0.52,\n    goalY: 0.52,\n    g"+
"oalLeft: 0.10,\n    goalRight: 0.90,\n    goalTop: 0.375,\n    goalBottom: 0.52,\n"+
"    ballStartX: 0.5,\n    ballStartY: 0.78,\n  };\n  function resize() {\n    cons"+
"t app = document.getElementById('app');\n    const rect = app.getBoundingClient"+
"Rect();\n    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);\n    W = M"+
"ath.max(320, Math.floor(rect.width));\n    H = Math.max(480, Math.floor(rect.he"+
"ight));\n    canvas.width = Math.floor(W * dpr);\n    canvas.height = Math.floor"+
"(H * dpr);\n    canvas.style.width = W + 'px';\n    canvas.style.height = H + 'p"+
"x';\n    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n  }\n  function loadBg() {\n    "+
"return new Promise((resolve) => {\n      const img = new Image();\n      img.onl"+
"oad = () => {\n        state.bg = img;\n        resolve();\n      };\n      img.on"+
"error = () => resolve();\n      if (window.STADIUM_BG) {\n        img.src = wind"+
"ow.STADIUM_BG;\n      } else {\n        img.src = 'stadium.jpg';\n      }\n    });"+
"\n  }\n  function resetBall() {\n    state.ball = {\n      x: field.ballStartX * W"+
",\n      y: field.ballStartY * H,\n      vx: 0,\n      vy: 0,\n      r: Math.max(1"+
"8, W * 0.055),\n      z: 0,\n      vz: 0,\n      scale: 1,\n      flying: false,\n "+
"     spinning: 0,\n    };\n    state.trail = [];\n  }\n  function resetKeeper() {\n"+
"    const gx = W * 0.5;\n    const gy = H * field.goalBottom - Math.max(6, H * "+
"0.01);\n    state.keeper = {\n      x: gx,\n      y: gy,\n      homeX: gx,\n      h"+
"omeY: gy,\n      w: W * 0.16,\n      h: H * 0.135,\n      diveX: 0,\n      diveY: "+
"0,\n      t: 0,\n      committed: false,\n      diveDir: 0,\n      diveHeight: 0,\n"+
"      reactAt: 0,\n      readBias: (Math.random() - 0.5) * 0.12,\n      limbPhas"+
"e: 0,\n      stretch: 0,\n      emotion: 'ready',\n      emotionHold: 0,\n    };\n "+
"   state.netBulge = null;\n    state.goalSettle = false;\n    state.lastResult ="+
" '';\n  }\n  function startMatch() {\n    state.shot = 1;\n    state.goals = 0;\n  "+
"  state.phase = 'aim';\n    state.particles = [];\n    state.netBulge = null;\n  "+
"  state.goalSettle = false;\n    state.lastResult = '';\n    resetBall();\n    re"+
"setKeeper();\n    updateHud();\n    hint.classList.remove('hidden');\n    hint.te"+
"xtContent = 'FLICK THE BALL';\n    banner.classList.add('hidden');\n    startOve"+
"rlay.classList.add('hidden');\n    endOverlay.classList.add('hidden');\n    ensu"+
"reAudio();\n  }\n  function updateHud() {\n    hudShot.textContent = `SHOT ${Math"+
".min(state.shot, TOTAL_SHOTS)} / ${TOTAL_SHOTS}`;\n    hudScore.textContent = S"+
"tring(state.goals);\n  }\n  function showBanner(text, kind) {\n    banner.textCon"+
"tent = text;\n    banner.className = 'banner ' + (kind || '');\n  }\n  function v"+
"ibrate(pattern) {\n    if (muted) return;\n    try {\n      if (navigator.vibrate"+
") navigator.vibrate(pattern);\n    } catch (_) {}\n  }\n  function ensureAudio() "+
"{\n    if (!audioCtx) {\n      try {\n        audioCtx = new (window.AudioContext"+
" || window.webkitAudioContext)();\n      } catch (_) {}\n    }\n    if (audioCtx "+
"&& audioCtx.state === 'suspended') audioCtx.resume();\n  }\n  function beep(freq"+
", dur, type, gain) {\n    if (muted || !audioCtx) return;\n    const t0 = audioC"+
"tx.currentTime;\n    const o = audioCtx.createOscillator();\n    const g = audio"+
"Ctx.createGain();\n    o.type = type || 'square';\n    o.frequency.value = freq;"+
"\n    g.gain.setValueAtTime(gain || 0.08, t0);\n    g.gain.exponentialRampToValu"+
"eAtTime(0.001, t0 + dur);\n    o.connect(g);\n    g.connect(audioCtx.destination"+
");\n    o.start(t0);\n    o.stop(t0 + dur + 0.02);\n  }\n  function sfx(kind) {\n  "+
"  if (kind === 'flick') beep(180, 0.08, 'triangle', 0.06);\n    if (kind === 'g"+
"oal') {\n      beep(440, 0.12, 'square', 0.09);\n      setTimeout(() => beep(660"+
", 0.14, 'square', 0.08), 90);\n      setTimeout(() => beep(880, 0.18, 'square',"+
" 0.07), 180);\n    }\n    if (kind === 'save') {\n      beep(220, 0.1, 'sawtooth'"+
", 0.07);\n      setTimeout(() => beep(140, 0.16, 'sawtooth', 0.06), 80);\n    }\n"+
"    if (kind === 'miss') beep(90, 0.22, 'triangle', 0.07);\n  }\n  function clie"+
"ntToCanvas(e) {\n    const r = canvas.getBoundingClientRect();\n    return {\n   "+
"   x: ((e.clientX - r.left) / r.width) * W,\n      y: ((e.clientY - r.top) / r."+
"height) * H,\n      force: typeof e.force === 'number' ? e.force : (typeof e.we"+
"bkitForce === 'number' ? Math.min(1, e.webkitForce / 3) : 0),\n    };\n  }\n  fun"+
"ction onPointerDown(e) {\n    if"
);
