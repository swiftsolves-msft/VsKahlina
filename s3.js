window.__GS=(window.__GS||[]);window.__GS.push(
"        k.x += (tx - k.x) * Math.min(1, dt * 10);\n        k.y += (ty -"+
" k.y) * Math.min(1, dt * 10);\n      }\n    } else if (state.phase === '"+
"aim') {\n      k.x += (k.homeX - k.x) * 0.08;\n      k.y += (k.homeY - k"+
".y) * 0.08;\n      k.stretch *= 0.9;\n    }\n    if (state.phase === 'fly"+
"ing' && b.flying) {\n      b.x += b.vx;\n      b.y += b.vy;\n      b.z +="+
" b.vz * (dt * 60);\n      b.vz -= 12.5 * dt;\n      if (b.z < 0) {\n     "+
"   b.z = 0;\n        b.vz *= -0.18;\n      }\n      const progress = Math"+
".min(1, Math.max(0, (field.ballStartY * H - b.y) / (field.ballStartY *"+
" H - field.goalBottom * H)));\n      b.scale = 1 - progress * 0.55;\n   "+
"   // Mild late aim-assist drift toward mouth center while still goal-"+
"ward\n      if (progress > 0.25 && progress < 0.92) {\n        const mid"+
" = W * 0.5;\n        b.vx += (mid - b.x) * 0.0022 * (1 - progress);\n   "+
"   }\n      b.spinning += b.vx * 0.015;\n      state.trail.push({ x: b.x"+
", y: b.y - b.z * 0.35, s: b.scale, life: 1 });\n      if (state.trail.l"+
"ength > 16) state.trail.shift();\n      b.vx *= 0.993;\n      b.vy *= 0."+
"997;\n      if (b.y <= H * field.goalBottom + 6) {\n        resolveShot("+
");\n      }\n      if (b.x < -50 || b.x > W + 50 || b.y < -50) {\n       "+
" resolveShot();\n      }\n    }\n    if (state.phase === 'resolve') {\n   "+
"   if (b.flying) {\n        b.x += b.vx * 0.5;\n        b.y += b.vy * 0."+
"5;\n        b.z = Math.max(0, b.z + b.vz * dt);\n        b.vz -= 18 * dt"+
";\n      }\n      state.resultTimer -= dt;\n      if (state.resultTimer <"+
"= 0) {\n        nextShotOrEnd();\n      }\n    }\n    for (let i = state.p"+
"articles.length - 1; i >= 0; i--) {\n      const p = state.particles[i]"+
";\n      p.life -= dt;\n      p.x += p.vx;\n      p.y += p.vy;\n      p.vy"+
" += 8 * dt;\n      if (p.life <= 0) state.particles.splice(i, 1);\n    }"+
"\n    for (const t of state.trail) t.life -= dt * 1.8;\n    state.trail "+
"= state.trail.filter((t) => t.life > 0);\n  }\n  function drawProcedural"+
"Stadium() {\n    // Virtua Striker / N64 Bank of America Stadium bowl ("+
"portrait, behind goal)\n    const sky = ctx.createLinearGradient(0, 0, "+
"0, H * 0.22);\n    sky.addColorStop(0, '#152a48');\n    sky.addColorStop"+
"(1, '#3a7ab8');\n    ctx.fillStyle = sky;\n    ctx.fillRect(0, 0, W, H);"+
"\n\n    // --- Upper blue seats ---\n    const upperTop = H * 0.02;\n    c"+
"onst upperH = H * 0.16;\n    ctx.fillStyle = '#6eb4e8';\n    ctx.fillRec"+
"t(0, upperTop, W, upperH);\n    for (let row = 0; row < 10; row++) {\n  "+
"    for (let col = 0; col < 36; col++) {\n        const x = (col / 36) "+
"* W + (row % 2) * 3;\n        const y = upperTop + 4 + row * (upperH / "+
"11);\n        if ((col + row * 3) % 17 === 0) continue; // aisle gaps\n "+
"       ctx.fillStyle = '#5aa3dc';\n        ctx.fillRect(x, y, 5, 4);\n  "+
"      // sparse upper crowd\n        if (Math.sin(row * 9.1 + col * 4.7"+
") > 0.55) {\n          const colors = ['#1a1a28','#c03040','#f0e8e0','#"+
"203060','#e8e8f0','#102040','#ffffff'];\n          ctx.fillStyle = colo"+
"rs[(row * 17 + col * 13) % colors.length];\n          ctx.fillRect(x + "+
"1, y - 3, 3, 4);\n        }\n      }\n    }\n    // aisle concrete stripes"+
"\n    ctx.fillStyle = 'rgba(180,190,200,0.35)';\n    for (const ax of [0"+
".18, 0.5, 0.82]) {\n      ctx.fillRect(W * ax - 4, upperTop, 8, upperH)"+
";\n    }\n\n    // --- Upper dark fascia + CLT [crown] FC ---\n    const f"+
"ascia1Y = upperTop + upperH;\n    const fasciaH = H * 0.028;\n    ctx.fi"+
"llStyle = '#0a0c12';\n    ctx.fillRect(0, fascia1Y, W, fasciaH);\n    ct"+
"x.fillStyle = '#f5f7fa';\n    ctx.font = 'bold ' + Math.floor(W * 0.038"+
") + 'px Arial Black, Arial';\n    ctx.textAlign = 'center';\n    ctx.tex"+
"tBaseline = 'middle';\n    const midY = fascia1Y + fasciaH / 2;\n    ctx"+
".fillText('CLT', W * 0.38, midY);\n    // crown icon\n    ctx.beginPath("+
");\n    const cx = W * 0.5, cy = midY;\n    ctx.moveTo(cx - 10, cy + 5);"+
"\n    ctx.lineTo(cx - 10, cy - 2);\n    ctx.lineTo(cx - 4, cy + 2);\n    "+
"ctx.lineTo(cx, cy - 6);\n    ctx.lineTo(cx + 4, cy + 2);\n    ctx.lineTo"+
"(cx + 10, cy - 2);\n    ctx.lineTo(cx + 10, cy + 5);\n    ctx.closePath("+
");\n    ctx.fill();\n    ctx.fillText('FC', W * 0.62, midY);\n\n    // ---"+
" Upper LED ribbon (sky-blue) ---\n    const rib1Y = fascia1Y + fasciaH;"+
"\n    const ribH = H * 0.032;\n    drawRibbonBoard(0, rib1Y, W, ribH, 0)"+
";\n\n    // --- Suite / window band ---\n    const suiteY = rib1Y + ribH;"+
"\n    const suiteH = H * 0.055;\n    ctx.fillStyle = '#1a1e28';\n    ctx."+
"fillRect(0, suiteY, W, suiteH);\n    const winN = 8;\n"
);
