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
"  lastTs: 0,\n    pointerId: null,\n    drag: null,\n    message: '',\n  }"+
";\n  const field = {\n    // Grass / goal-line locked together (kicker P"+
"OV: net base on pitch)\n    grassTop: 0.52,\n    goalY: 0.52,\n    goalLe"+
"ft: 0.10,\n    goalRight: 0.90,\n    goalTop: 0.375,\n    goalBottom: 0.5"+
"2,\n    ballStartX: 0.5,\n    ballStartY: 0.78,\n  };\n  function resize()"+
" {\n    const app = document.getElementById('app');\n    const rect = ap"+
"p.getBoundingClientRect();\n    const dpr = Math.min(window.devicePixel"+
"Ratio || 1, 2.5);\n    W = Math.max(320, Math.floor(rect.width));\n    H"+
" = Math.max(480, Math.floor(rect.height));\n    canvas.width = Math.flo"+
"or(W * dpr);\n    canvas.height = Math.floor(H * dpr);\n    canvas.style"+
".width = W + 'px';\n    canvas.style.height = H + 'px';\n    ctx.setTran"+
"sform(dpr, 0, 0, dpr, 0, 0);\n  }\n  function loadBg() {\n    return new "+
"Promise((resolve) => {\n      const img = new Image();\n      img.onload"+
" = () => {\n        state.bg = img;\n        resolve();\n      };\n      i"+
"mg.onerror = () => resolve();\n      if (window.STADIUM_BG) {\n        i"+
"mg.src = window.STADIUM_BG;\n      } else {\n        img.src = 'stadium."+
"jpg';\n      }\n    });\n  }\n  function resetBall() {\n    state.ball = {\n"+
"      x: field.ballStartX * W,\n      y: field.ballStartY * H,\n      vx"+
": 0,\n      vy: 0,\n      r: Math.max(18, W * 0.055),\n      z: 0,\n      "+
"vz: 0,\n      scale: 1,\n      flying: false,\n      spinning: 0,\n    };\n"+
"    state.trail = [];\n  }\n  function resetKeeper() {\n    const gx = W "+
"* 0.5;\n    const gy = H * field.goalBottom - Math.max(6, H * 0.01);\n  "+
"  state.keeper = {\n      x: gx,\n      y: gy,\n      homeX: gx,\n      ho"+
"meY: gy,\n      w: W * 0.14,\n      h: H * 0.12,\n      diveX: 0,\n      d"+
"iveY: 0,\n      t: 0,\n      committed: false,\n      diveDir: 0,\n      d"+
"iveHeight: 0,\n      reactAt: 0,\n      readBias: 0,\n      limbPhase: 0,"+
"\n      stretch: 0,\n    };\n  }\n  function startMatch() {\n    state.shot"+
" = 1;\n    state.goals = 0;\n    state.phase = 'aim';\n    state.particle"+
"s = [];\n    resetBall();\n    resetKeeper();\n    updateHud();\n    hint."+
"classList.remove('hidden');\n    hint.textContent = 'FLICK THE BALL';\n "+
"   banner.classList.add('hidden');\n    startOverlay.classList.add('hid"+
"den');\n    endOverlay.classList.add('hidden');\n    ensureAudio();\n  }\n"+
"  function updateHud() {\n    hudShot.textContent = `SHOT ${Math.min(st"+
"ate.shot, TOTAL_SHOTS)} / ${TOTAL_SHOTS}`;\n    hudScore.textContent = "+
"String(state.goals);\n  }\n  function showBanner(text, kind) {\n    banne"+
"r.textContent = text;\n    banner.className = 'banner ' + (kind || '');"+
"\n  }\n  function vibrate(pattern) {\n    if (muted) return;\n    try {\n  "+
"    if (navigator.vibrate) navigator.vibrate(pattern);\n    } catch (_)"+
" {}\n  }\n  function ensureAudio() {\n    if (!audioCtx) {\n      try {\n  "+
"      audioCtx = new (window.AudioContext || window.webkitAudioContext"+
")();\n      } catch (_) {}\n    }\n    if (audioCtx && audioCtx.state ==="+
" 'suspended') audioCtx.resume();\n  }\n  function beep(freq, dur, type, "+
"gain) {\n    if (muted || !audioCtx) return;\n    const t0 = audioCtx.cu"+
"rrentTime;\n    const o = audioCtx.createOscillator();\n    const g = au"+
"dioCtx.createGain();\n    o.type = type || 'square';\n    o.frequency.va"+
"lue = freq;\n    g.gain.setValueAtTime(gain || 0.08, t0);\n    g.gain.ex"+
"ponentialRampToValueAtTime(0.001, t0 + dur);\n    o.connect(g);\n    g.c"+
"onnect(audioCtx.destination);\n    o.start(t0);\n"
);
