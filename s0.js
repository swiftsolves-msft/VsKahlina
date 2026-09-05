window.__GS=(window.__GS||[]);window.__GS.push(
"(() => {\n  'use strict';\n  const TOTAL_SHOTS = 5;\n  const ca"+
"nvas = document.getElementById('game');\n  const ctx = canvas"+
".getContext('2d');\n  const hudShot = document.getElementById"+
"('shotLabel');\n  const hudScore = document.getElementById('s"+
"coreValue');\n  const hint = document.getElementById('hint');"+
"\n  const banner = document.getElementById('banner');\n  const"+
" startOverlay = document.getElementById('start');\n  const en"+
"dOverlay = document.getElementById('end');\n  const endTitle "+
"= document.getElementById('endTitle');\n  const endScore = do"+
"cument.getElementById('endScore');\n  const endFlavor = docum"+
"ent.getElementById('endFlavor');\n  const muteBtn = document."+
"getElementById('muteBtn');\n  let W = 390;\n  let H = 844;\n  l"+
"et muted = false;\n  let audioCtx = null;\n  const state = {\n "+
"   phase: 'title', // title | aim | flying | resolve | betwe"+
"en | end\n    shot: 1,\n    goals: 0,\n    bg: null,\n    ball: "+
"null,\n    keeper: null,\n    trail: [],\n    particles: [],\n  "+
"  resultTimer: 0,\n    lastTs: 0,\n    pointerId: null,\n    dr"+
"ag: null,\n    message: '',\n  };\n  const field = {\n    goalY:"+
" 0.38,\n    goalLeft: 0.18,\n    goalRight: 0.82,\n    goalTop:"+
" 0.22,\n    goalBottom: 0.42,\n    ballStartX: 0.5,\n    ballSt"+
"artY: 0.78,\n  };\n  function resize() {\n    const app = docum"+
"ent.getElementById('app');\n    const rect = app.getBoundingC"+
"lientRect();\n    const dpr = Math.min(window.devicePixelRati"+
"o || 1, 2.5);\n    W = Math.max(320, Math.floor(rect.width));"+
"\n    H = Math.max(480, Math.floor(rect.height));\n    canvas."+
"width = Math.floor(W * dpr);\n    canvas.height = Math.floor("+
"H * dpr);\n    canvas.style.width = W + 'px';\n    canvas.styl"+
"e.height = H + 'px';\n    ctx.setTransform(dpr, 0, 0, dpr, 0,"+
" 0);\n  }\n  function loadBg() {\n    return new Promise((resol"+
"ve) => {\n      const img = new Image();\n      img.onload = ("+
") => {\n        state.bg = img;\n        resolve();\n      };\n "+
"     img.onerror = () => resolve();\n      if (window.STADIUM"+
"_BG) {\n        img.src = window.STADIUM_BG;\n      } else {\n "+
"       img.src = 'stadium.jpg';\n      }\n    });\n  }\n  functi"+
"on resetBall() {\n    state.ball = {\n      x: field.ballStart"+
"X * W,\n      y: field.ballStartY * H,\n      vx: 0,\n      vy:"+
" 0,\n      r: Math.max(18, W * 0.055),\n      z: 0,\n      vz: "+
"0,\n      scale: 1,\n      flying: false,\n      spinning: 0,\n "+
"   };\n    state.trail = [];\n  }\n  function resetKeeper() {\n "+
"   const gx = W * 0.5;\n    const gy = H * field.goalBottom -"+
" 8;\n    state.keeper = {\n      x: gx,\n      y: gy,\n      hom"+
"eX: gx,\n      homeY: gy,\n      w: W * 0.14,\n      h: H * 0.1"+
"2,\n      diveX: 0,\n      diveY: 0,\n      t: 0,\n      committ"+
"ed: false,\n      diveDir: 0,\n      diveHeight: 0,\n      reac"+
"tAt: 0,\n      readBias: 0,\n      limbPhase: 0,\n      stretch"+
": 0,\n    };\n  }\n  function startMatch() {\n    state.shot = 1"+
";\n    state.goals = 0;\n    state.phase = 'aim';\n    state.pa"+
"rticles = [];\n    resetBall();\n    resetKeeper();\n    update"+
"Hud();\n    hint.classList.remove('hidden');\n    hint.textCon"+
"tent = 'FLICK THE BALL';\n    banner.classList.add('hidden');"+
"\n    startOverlay.classList.add('hidden');\n    endOverlay.cl"+
"assList.add('hidden');\n    ensureAudio();\n  }\n  function upd"+
"ateHud() {\n    hudShot.textContent = `SHOT ${Math.min(state."+
"shot, TOTAL_SHOTS)} / ${TOTAL_SHOTS}`;\n    hudScore.textCont"+
"ent = String(state.goals);\n  }\n  function showBanner(text, k"+
"ind) {\n    banner.textContent = text;\n    banner.className ="+
" 'banner ' + (kind || '');\n  }\n  function vibrate(pattern) {"+
"\n    if (muted) return;\n    try {\n      if (navigator.vibrat"+
"e) navigator.vibrate(pattern);\n    } catch (_) {}\n  }\n  func"+
"tion ensureAudio() {\n    if (!audioCtx) {\n      try {\n      "+
"  audioCtx = new (window.AudioContext || window.webkitAudioC"+
"ontext)();\n      } catch (_) {}\n    }\n    if (audioCtx && au"+
"dioCtx.state === 'suspended') audioCtx.resume();\n  }\n  funct"+
"ion beep(freq, dur, type, gain) {\n    if (muted || !audioCtx"+
") return;\n    const t0 = audioCtx.currentTime;\n    const o ="+
" audioCtx.createOscillator();\n    const g = audioCtx.createG"+
"ain();\n    o.type = type || 'square';\n    o.frequen"
);
