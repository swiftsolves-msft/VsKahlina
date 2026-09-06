window.__GS=(window.__GS||[]);window.__GS.push(
"(() => {\n  'use strict';\n  const TOTAL_SHOTS = 5;\n  const canvas = d"+
"ocument.getElementById('game');\n  const ctx = canvas.getContext('2d');"+
"\n  const hudShot = document.getElementById('shotLabel');\n  const hudS"+
"core = document.getElementById('scoreValue');\n  const hint = document."+
"getElementById('hint');\n  const banner = document.getElementById('bann"+
"er');\n  const startOverlay = document.getElementById('start');\n  cons"+
"t endOverlay = document.getElementById('end');\n  const endTitle = docu"+
"ment.getElementById('endTitle');\n  const endScore = document.getElemen"+
"tById('endScore');\n  const endFlavor = document.getElementById('endFla"+
"vor');\n  const muteBtn = document.getElementById('muteBtn');\n  let W "+
"= 390;\n  let H = 844;\n  let muted = false;\n  let audioCtx = null;\n "+
" const state = {\n    phase: 'title', // title | aim | flying | resolve"+
" | between | end\n    shot: 1,\n    goals: 0,\n    bg: null,\n    ball:"+
" null,\n    keeper: null,\n    trail: [],\n    particles: [],\n    resu"+
"ltTimer: 0,\n    lastTs: 0,\n    pointerId: null,\n    drag: null,\n   "+
" message: '',\n    lastResult: '',\n    netBulge: null,\n    goalSettle"+
": false,\n    celebrate: null,\n    camY: 0,\n  };\n  const field = {\n"+
"    // Grass / goal-line locked together (kicker POV: net base on pitch"+
")\n    grassTop: 0.52,\n    goalY: 0.52,\n    goalLeft: 0.10,\n    goal"+
"Right: 0.90,\n    goalTop: 0.375,\n    goalBottom: 0.52,\n    ballStart"+
"X: 0.5,\n    ballStartY: 0.78,\n  };\n  function resize() {\n    const "+
"app = document.getElementById('app');\n    const rect = app.getBounding"+
"ClientRect();\n    const dpr = Math.min(window.devicePixelRatio || 1, 2"+
".5);\n    W = Math.max(320, Math.floor(rect.width));\n    H = Math.max("+
"480, Math.floor(rect.height));\n    canvas.width = Math.floor(W * dpr);"+
"\n    canvas.height = Math.floor(H * dpr);\n    canvas.style.width = W "+
"+ 'px';\n    canvas.style.height = H + 'px';\n    ctx.setTransform(dpr,"+
" 0, 0, dpr, 0, 0);\n  }\n  function loadBg() {\n    return new Promise("+
"(resolve) => {\n      const img = new Image();\n      img.onload = () ="+
"> {\n        state.bg = img;\n        resolve();\n      };\n      img.o"+
"nerror = () => resolve();\n      if (window.STADIUM_BG) {\n        img."+
"src = window.STADIUM_BG;\n      } else {\n        img.src = 'stadium.jp"+
"g';\n      }\n    });\n  }\n  function resetBall() {\n    state.ball = "+
"{\n      x: field.ballStartX * W,\n      y: field.ballStartY * H,\n    "+
"  vx: 0,\n      vy: 0,\n      r: Math.max(18, W * 0.055),\n      z: 0,"+
"\n      vz: 0,\n      scale: 1,\n      flying: false,\n      spinning: "+
"0,\n    };\n    state.trail = [];\n  }\n  function resetKeeper() {\n   "+
" const gx = W * 0.5;\n    const gy = H * field.goalBottom - Math.max(6,"+
" H * 0.01);\n    state.keeper = {\n      x: gx,\n      y: gy,\n      ho"+
"meX: gx,\n      homeY: gy,\n      w: W * 0.16,\n      h: H * 0.135,\n  "+
"    diveX: 0,\n      diveY: 0,\n      t: 0,\n      committed: false,\n "+
"     diveDir: 0,\n      diveHeight: 0,\n      reactAt: 0,\n      readBi"+
"as: (Math.random() - 0.5) * 0.12,\n      limbPhase: 0,\n      stretch: "+
"0,\n      emotion: 'ready',\n      emotionHold: 0,\n    };\n    state.n"+
"etBulge = null;\n    state.goalSettle = false;\n    state.lastResult = "+
"'';\n  }\n  function startMatch() {\n    state.shot = 1;\n    state.goa"+
"ls = 0;\n    state.phase = 'aim';\n    state.particles = [];\n    state"+
".netBulge = null;\n    state.goalSettle = false;\n    state.lastResult "+
"= '';\n    state.celebrate = null;\n    state.camY = 0;\n    resetBall("+
");\n    resetKeeper();\n    updateHud();\n    hint.classList.remove('hi"+
"dden');\n    hint.textContent = 'FLICK THE BALL';\n    banner.classList"+
".add('hidden');\n    startOverlay.classList.add('hidden');\n    endOver"+
"lay.classList.add('hidden');\n    const rematchBtn = document.getElemen"+
"tById('rematchBtn');\n    rematchBtn.disabled = false;\n    rematchBtn."+
"classList.remove('hidden');\n    ensureAudio();\n  }\n  function update"+
"Hud() {\n    hudShot.textContent = `SHOT ${Math.min(state.shot, TOTAL_S"+
"HOTS)} / ${TOTAL_SHOTS}`;\n    hudScore.textContent = String(state.goal"+
"s);\n  }\n  function showBanner(text, kind) {\n    banner.textContent ="+
" text;\n    banner.className = 'banner ' + (kind || '');\n    if (kind "+
"!== 'miss' || text !== 'Kahlina...') banner.style.top = '';\n  }\n  fun"+
"ction vibrate(pattern) {\n    if (muted) return;\n    try {\n      if ("+
"navigator.vibrate) navigator.vibrate(pattern);\n    } catch (_) {}\n  }"+
"\n  function ensureAudio() {\n    if (!audioCtx) {\n      try {\n      "+
"  audioCtx = new (window.AudioContext || window.webkitAudioContext)();"+
"\n      } catch (_) {}\n    }\n    if (audioCtx && audioCtx.state === '"+
"suspended') audioCtx.resume();\n  }\n  function beep(freq, dur, type, g"+
"ain) {\n    if (muted || !audioCtx) return;\n    const t0 = audioCtx.cu"+
"rrentTime;\n    const o = audioCtx.createOscillator();\n    const g = a"+
"udioCtx.createGain();\n    o.type = type || 'square';\n    o.frequency."+
"value = freq;\n    g.gain.setValueAtTime(gain || 0.08, t0);\n    g.gain"+
".exponentialRampToValueAtTime(0.001, t0 + dur);\n    o.connect(g);\n   "+
" g.connect(audioCtx.destination);\n    o.start(t0);\n    o.stop(t0 + du"+
"r + 0.02);\n  }\n  function sfx(kind) {\n    if (kind === 'flick') beep"+
"(180, 0.08, 'triangle', 0.06);\n    if (kind === 'goal') {\n      beep("+
"440, 0.12, 'square', 0.09);\n      setTimeout(() => beep(660, 0.14, 'sq"+
"uare', 0.08), 90);\n      setTimeout(() => beep(880, 0.18, 'square', 0."+
"07), 180);\n    }\n    if (kind === 'save') {\n      beep(220, 0.1, 'sa"+
"wtooth', 0.07);\n      setTimeout(() => beep(140, 0.16, 'sawtooth', 0.0"+
"6), 80);\n    }\n    if (kind === 'miss') beep(90, 0.22, 'triangle', 0."+
"07);\n  }\n  function clientToCanvas(e) {\n    const r = canvas.getBoun"
);
