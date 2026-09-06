window.__GS=(window.__GS||[]);window.__GS.push(
"(() => {\n  'use strict';\n  const TOTAL_SHOTS = 5;\n  const canvas = document.g"+
"etElementById('game');\n  const ctx = canvas.getContext('2d');\n  const hudShot "+
"= document.getElementById('shotLabel');\n  const hudScore = document.getElementB"+
"yId('scoreValue');\n  const hint = document.getElementById('hint');\n  const ban"+
"ner = document.getElementById('banner');\n  const startOverlay = document.getEle"+
"mentById('start');\n  const endOverlay = document.getElementById('end');\n  cons"+
"t endTitle = document.getElementById('endTitle');\n  const endScore = document.g"+
"etElementById('endScore');\n  const endFlavor = document.getElementById('endFlav"+
"or');\n  const muteBtn = document.getElementById('muteBtn');\n  let W = 390;\n  "+
"let H = 844;\n  let muted = false;\n  let audioCtx = null;\n  const state = {\n "+
"   phase: 'title', // title | aim | flying | resolve | between | end\n    shot: "+
"1,\n    goals: 0,\n    bg: null,\n    ball: null,\n    keeper: null,\n    trail:"+
" [],\n    particles: [],\n    resultTimer: 0,\n    lastTs: 0,\n    pointerId: nu"+
"ll,\n    drag: null,\n    message: '',\n    lastResult: '',\n    netBulge: null,"+
"\n    goalSettle: false,\n    celebrate: null,\n    camY: 0,\n  };\n  const fiel"+
"d = {\n    // Grass / goal-line locked together (kicker POV: net base on pitch)\n"+
"    grassTop: 0.52,\n    goalY: 0.52,\n    goalLeft: 0.10,\n    goalRight: 0.90,"+
"\n    goalTop: 0.375,\n    goalBottom: 0.52,\n    ballStartX: 0.5,\n    ballStar"+
"tY: 0.78,\n  };\n  function resize() {\n    const app = document.getElementById("+
"'app');\n    const rect = app.getBoundingClientRect();\n    const dpr = Math.min"+
"(window.devicePixelRatio || 1, 2.5);\n    W = Math.max(320, Math.floor(rect.widt"+
"h));\n    H = Math.max(480, Math.floor(rect.height));\n    canvas.width = Math.f"+
"loor(W * dpr);\n    canvas.height = Math.floor(H * dpr);\n    canvas.style.width"+
" = W + 'px';\n    canvas.style.height = H + 'px';\n    ctx.setTransform(dpr, 0, "+
"0, dpr, 0, 0);\n  }\n  function loadBg() {\n    return new Promise((resolve) => "+
"{\n      const img = new Image();\n      img.onload = () => {\n        state.bg "+
"= img;\n        resolve();\n      };\n      img.onerror = () => resolve();\n    "+
"  if (window.STADIUM_BG) {\n        img.src = window.STADIUM_BG;\n      } else {"+
"\n        img.src = 'stadium.jpg';\n      }\n    });\n  }\n  function resetBall("+
") {\n    state.ball = {\n      x: field.ballStartX * W,\n      y: field.ballStar"+
"tY * H,\n      vx: 0,\n      vy: 0,\n      r: Math.max(18, W * 0.055),\n      z:"+
" 0,\n      vz: 0,\n      scale: 1,\n      flying: false,\n      spinning: 0,\n  "+
"  };\n    state.trail = [];\n  }\n  function resetKeeper() {\n    const gx = W *"+
" 0.5;\n    const gy = H * field.goalBottom - Math.max(6, H * 0.01);\n    state.k"+
"eeper = {\n      x: gx,\n      y: gy,\n      homeX: gx,\n      homeY: gy,\n     "+
" w: W * 0.16,\n      h: H * 0.135,\n      diveX: 0,\n      diveY: 0,\n      t: 0"+
",\n      committed: false,\n      diveDir: 0,\n      diveHeight: 0,\n      react"+
"At: 0,\n      readBias: (Math.random() - 0.5) * 0.12,\n      limbPhase: 0,\n    "+
"  stretch: 0,\n      emotion: 'ready',\n      emotionHold: 0,\n    };\n    state"+
".netBulge = null;\n    state.goalSettle = false;\n    state.lastResult = '';\n  "+
"}\n  function startMatch() {\n    state.shot = 1;\n    state.goals = 0;\n    sta"+
"te.phase = 'aim';\n    state.particles = [];\n    state.netBulge = null;\n    st"+
"ate.goalSettle = false;\n    state.lastResult = '';\n    state.celebrate = null;"+
"\n    state.camY = 0;\n    resetBall();\n    resetKeeper();\n    updateHud();\n "+
"   hint.classList.remove('hidden');\n    hint.textContent = 'FLICK THE BALL';\n "+
"   banner.classList.add('hidden');\n    startOverlay.classList.add('hidden');\n "+
"   endOverlay.classList.add('hidden');\n    ensureAudio();\n  }\n  function upda"+
"teHud() {\n    hudShot.textContent = `SHOT ${Math.min(state.shot, TOTAL_SHOTS)} "+
"/ ${TOTAL_SHOTS}`;\n    hudScore.textContent = String(state.goals);\n  }\n  func"+
"tion showBanner(text, kind) {\n    banner.textContent = text;\n    banner.classN"+
"ame = 'banner ' + (kind || '');\n  }\n  function vibrate(pattern) {\n    if (mut"+
"ed) return;\n    try {\n      if (navigator.vibrate) navigator.vibrate(pattern);"+
"\n    } catch (_) {}\n  }\n  function ensureAudio() {\n    if (!audioCtx) {\n   "+
"   try {\n        audioCtx = new (window.AudioContext || window.webkitAudioConte"+
"xt)();\n      } catch (_) {}\n    }\n    if (audioCtx && audioCtx.state === 'sus"+
"pended') audioCtx.resume();\n  }\n  function beep(freq, dur, type, gain) {\n    "+
"if (muted || !audioCtx) return;\n    const t0 = audioCtx.currentTime;\n    const"+
" o = audioCtx.createOscillator();\n    const g = audioCtx.createGain();\n    o.t"+
"ype = type || 'square';\n    o.frequency.value = freq;\n    g.gain.setValueAtTim"+
"e(gain || 0.08, t0);\n    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);\n"+
"    o.connect(g);\n    g.connect(audioCtx.destination);\n    o.start(t0);\n    o"+
".stop(t0 + dur + 0.02);\n  }\n  function sfx(kind) {\n    if (kind === 'flick') "+
"beep(180, 0.08, 'triangle', 0.06);\n    if (kind === 'goal') {\n      beep(440, "+
"0.12, 'square', 0.09);\n      setTimeout(() => beep(660, 0.14, 'square', 0.08), "+
"90);\n      setTimeout(() => beep(880, 0.18, 'square', 0.07), 180);\n    }\n    "+
"if (kind === 'save') {\n      beep(220, 0.1, 'sawtooth', 0.07);\n      setTimeou"+
"t(() => beep(140, 0.16, 'sawtooth', 0.06), 80);\n    }\n    if (kind === 'miss')"+
" beep(90, 0.22, 'triangle', 0.07);\n  }\n  function clientToCanvas(e) {\n    con"+
"st r = canvas.getBoundingClientRect();\n    return {\n      x: ((e.clientX - r.l"+
"eft) / r.width) * W,\n      y: ((e.clientY - r.top) / r.height) * H,\n      forc"+
"e: typeof e.force === 'number' ? e.force : (typeof e.webkitForce === 'number' ? "+
"Math.min(1, e.webkitForce / 3) : 0),\n    };\n  }\n  function onPointerDown(e) {"+
"\n    if "
);
