window.__GS=(window.__GS||[]);window.__GS.push(
".committed) {\n        k.stretch = Math.min(1, k.stretch + dt"+
" * 3.2);\n        const tx = k.homeX + k.diveX * k.stretch;\n "+
"       const ty = k.homeY + k.diveY * k.stretch;\n        k.x"+
" += (tx - k.x) * Math.min(1, dt * 10);\n        k.y += (ty - "+
"k.y) * Math.min(1, dt * 10);\n      }\n    } else if (state.ph"+
"ase === 'aim') {\n      k.x += (k.homeX - k.x) * 0.08;\n      "+
"k.y += (k.homeY - k.y) * 0.08;\n      k.stretch *= 0.9;\n    }"+
"\n    if (state.phase === 'flying' && b.flying) {\n      b.x +"+
"= b.vx;\n      b.y += b.vy;\n      b.z += b.vz;\n      b.vz -= "+
"18 * dt;\n      if (b.z < 0) {\n        b.z = 0;\n        b.vz "+
"*= -0.25;\n      }\n      const progress = Math.min(1, Math.ma"+
"x(0, (field.ballStartY * H - b.y) / (field.ballStartY * H - "+
"field.goalBottom * H)));\n      b.scale = 1 - progress * 0.62"+
";\n      b.spinning += b.vx * 0.02;\n      state.trail.push({ "+
"x: b.x, y: b.y - b.z * 0.35, s: b.scale, life: 1 });\n      i"+
"f (state.trail.length > 14) state.trail.shift();\n      b.vx "+
"*= 0.995;\n      b.vy *= 0.998;\n      if (b.y <= H * field.go"+
"alBottom + 4) {\n        resolveShot();\n      }\n      if (b.x"+
" < -40 || b.x > W + 40 || b.y < -40) {\n        resolveShot()"+
";\n      }\n    }\n    if (state.phase === 'resolve') {\n      i"+
"f (b.flying) {\n        b.x += b.vx * 0.5;\n        b.y += b.v"+
"y * 0.5;\n        b.z = Math.max(0, b.z + b.vz * dt);\n       "+
" b.vz -= 18 * dt;\n      }\n      state.resultTimer -= dt;\n   "+
"   if (state.resultTimer <= 0) {\n        nextShotOrEnd();\n  "+
"    }\n    }\n    for (let i = state.particles.length - 1; i >"+
"= 0; i--) {\n      const p = state.particles[i];\n      p.life"+
" -= dt;\n      p.x += p.vx;\n      p.y += p.vy;\n      p.vy += "+
"8 * dt;\n      if (p.life <= 0) state.particles.splice(i, 1);"+
"\n    }\n    for (const t of state.trail) t.life -= dt * 1.8;\n"+
"    state.trail = state.trail.filter((t) => t.life > 0);\n  }"+
"\n  function drawProceduralStadium() {\n    // Virtua Striker "+
"/ N64 Bank of America Stadium bowl (portrait, behind goal)\n "+
"   const sky = ctx.createLinearGradient(0, 0, 0, H * 0.22);\n"+
"    sky.addColorStop(0, '#152a48');\n    sky.addColorStop(1, "+
"'#3a7ab8');\n    ctx.fillStyle = sky;\n    ctx.fillRect(0, 0, "+
"W, H);\n\n    // --- Upper blue seats ---\n    const upperTop ="+
" H * 0.02;\n    const upperH = H * 0.16;\n    ctx.fillStyle = "+
"'#6eb4e8';\n    ctx.fillRect(0, upperTop, W, upperH);\n    for"+
" (let row = 0; row < 10; row++) {\n      for (let col = 0; co"+
"l < 36; col++) {\n        const x = (col / 36) * W + (row % 2"+
") * 3;\n        const y = upperTop + 4 + row * (upperH / 11);"+
"\n        if ((col + row * 3) % 17 === 0) continue; // aisle "+
"gaps\n        ctx.fillStyle = '#5aa3dc';\n        ctx.fillRect"+
"(x, y, 5, 4);\n        // sparse upper crowd\n        if (Math"+
".sin(row * 9.1 + col * 4.7) > 0.55) {\n          const colors"+
" = ['#1a1a28','#c03040','#f0e8e0','#203060','#e8e8f0','#1020"+
"40','#ffffff'];\n          ctx.fillStyle = colors[(row * 17 +"+
" col * 13) % colors.length];\n          ctx.fillRect(x + 1, y"+
" - 3, 3, 4);\n        }\n      }\n    }\n    // aisle concrete s"+
"tripes\n    ctx.fillStyle = 'rgba(180,190,200,0.35)';\n    for"+
" (const ax of [0.18, 0.5, 0.82]) {\n      ctx.fillRect(W * ax"+
" - 4, upperTop, 8, upperH);\n    }\n\n    // --- Upper dark fas"+
"cia + CLT [crown] FC ---\n    const fascia1Y = upperTop + upp"+
"erH;\n    const fasciaH = H * 0.028;\n    ctx.fillStyle = '#0a"+
"0c12';\n    ctx.fillRect(0, fascia1Y, W, fasciaH);\n    ctx.fi"+
"llStyle = '#f5f7fa';\n    ctx.font = 'bold ' + Math.floor(W *"+
" 0.038) + 'px Arial Black, Arial';\n    ctx.textAlign = 'cent"+
"er';\n    ctx.textBaseline = 'middle';\n    const midY = fasci"+
"a1Y + fasciaH / 2;\n    ctx.fillText('CLT', W * 0.38, midY);\n"+
"    // crown icon\n    ctx.beginPath();\n    const cx = W * 0."+
"5, cy = midY;\n    ctx.moveTo(cx - 10, cy + 5);\n    ctx.lineT"+
"o(cx - 10, cy - 2);\n    ctx.lineTo(cx - 4, cy + 2);\n    ctx."+
"lineTo(cx, cy - 6);\n    ctx.lineTo(cx + 4, cy + 2);\n    ctx."+
"lineTo(cx + 10, cy - 2);\n    ctx.lineTo(cx + 10, cy + 5);\n  "+
"  ctx.closePath();\n    ctx.fill();\n    ctx.fillText('FC', W "+
"* 0.62, midY);\n\n    // --- Upper LED ribbon (sky-blue) ---\n "+
"   const rib1Y = fascia1Y + fasciaH;\n    const ribH"
);
