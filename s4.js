window.__GS=(window.__GS||[]);window.__GS.push(
"ctx.fillStyle = 'rgba(180,190,200,0.35)';\n    for (const ax of [0.18, 0.5, 0.8"+
"2]) {\n      ctx.fillRect(W * ax - 4, upperTop, 8, upperH);\n    }\n\n    // --- U"+
"pper dark fascia + CLT [crown] FC ---\n    const fascia1Y = upperTop + upperH;\n"+
"    const fasciaH = H * 0.028;\n    ctx.fillStyle = '#0a0c12';\n    ctx.fillRect"+
"(0, fascia1Y, W, fasciaH);\n    ctx.fillStyle = '#f5f7fa';\n    ctx.font = 'bold"+
" ' + Math.floor(W * 0.038) + 'px Arial Black, Arial';\n    ctx.textAlign = 'cen"+
"ter';\n    ctx.textBaseline = 'middle';\n    const midY = fascia1Y + fasciaH / 2"+
";\n    ctx.fillText('CLT', W * 0.38, midY);\n    // crown icon\n    ctx.beginPath"+
"();\n    const cx = W * 0.5, cy = midY;\n    ctx.moveTo(cx - 10, cy + 5);\n    ct"+
"x.lineTo(cx - 10, cy - 2);\n    ctx.lineTo(cx - 4, cy + 2);\n    ctx.lineTo(cx, "+
"cy - 6);\n    ctx.lineTo(cx + 4, cy + 2);\n    ctx.lineTo(cx + 10, cy - 2);\n    "+
"ctx.lineTo(cx + 10, cy + 5);\n    ctx.closePath();\n    ctx.fill();\n    ctx.fill"+
"Text('FC', W * 0.62, midY);\n\n    // --- Upper LED ribbon (sky-blue) ---\n    co"+
"nst rib1Y = fascia1Y + fasciaH;\n    const ribH = H * 0.032;\n    drawRibbonBoar"+
"d(0, rib1Y, W, ribH, 0);\n\n    // --- Suite / window band ---\n    const suiteY "+
"= rib1Y + ribH;\n    const suiteH = H * 0.055;\n    ctx.fillStyle = '#1a1e28';\n "+
"   ctx.fillRect(0, suiteY, W, suiteH);\n    const winN = 8;\n    const winW = (W"+
" - 20) / winN;\n    for (let i = 0; i < winN; i++) {\n      const wx = 10 + i * "+
"winW + 3;\n      const wy = suiteY + 6;\n      const ww = winW - 8;\n      const "+
"wh = suiteH - 12;\n      const g = ctx.createLinearGradient(wx, wy, wx, wy + wh"+
");\n      g.addColorStop(0, '#2a3344');\n      g.addColorStop(1, '#0e1218');\n   "+
"   ctx.fillStyle = g;\n      ctx.fillRect(wx, wy, ww, wh);\n      ctx.strokeStyl"+
"e = '#e8eef5';\n      ctx.lineWidth = 1.5;\n      ctx.strokeRect(wx, wy, ww, wh)"+
";\n      // soft interior lights\n      if ((i + Math.floor(performance.now() / "+
"800)) % 3 === 0) {\n        ctx.fillStyle = 'rgba(255,220,160,0.12)';\n        c"+
"tx.fillRect(wx + 2, wy + 2, ww - 4, wh - 4);\n      }\n    }\n\n    // --- Lower L"+
"ED ribbon ---\n    const rib2Y = suiteY + suiteH;\n    drawRibbonBoard(0, rib2Y,"+
" W, ribH, 1);\n\n    // --- Dark lower fascia ---\n    const fascia2Y = rib2Y + r"+
"ibH;\n    ctx.fillStyle = '#0c0e14';\n    ctx.fillRect(0, fascia2Y, W, fasciaH *"+
" 0.7);\n\n    // --- Concrete band + section numbers ---\n    const concY = fasci"+
"a2Y + fasciaH * 0.7;\n    const concH = H * 0.038;\n    ctx.fillStyle = '#c5cbd4"+
"';\n    ctx.fillRect(0, concY, W, concH);\n    ctx.fillStyle = '#1a1a1a';\n    ct"+
"x.font = 'bold ' + Math.floor(W * 0.042) + 'px Arial';\n    ctx.textAlign = 'ce"+
"nter';\n    ctx.textBaseline = 'middle';\n    ctx.fillText('201', W * 0.28, conc"+
"Y + concH / 2);\n    ctx.fillText('202', W * 0.72, concY + concH / 2);\n    // f"+
"aint 345 on far side for depth\n    ctx.globalAlpha = 0.35;\n    ctx.fillText('3"+
"45', W * 0.5, concY + concH / 2);\n    ctx.globalAlpha = 1;\n\n    // --- Lower b"+
"lue seats (denser crowd) ---\n    const lowerTop = concY + concH;\n    const low"+
"erH = H * 0.095;\n    ctx.fillStyle = '#5aa3dc';\n    ctx.fillRect(0, lowerTop, "+
"W, lowerH);\n    for (let row = 0; row < 9; row++) {\n      for (let col = 0; co"+
"l < 42; col++) {\n        const x = (col / 42) * W + (row % 2) * 2;\n        con"+
"st y = lowerTop + 2 + row * (lowerH / 10);\n        if ((col + row) % 19 === 0)"+
" {\n          ctx.fillStyle = 'rgba(190,200,210,0.4)';\n          ctx.fillRect(x"+
", lowerTop, 6, lowerH);\n          continue;\n        }\n        ctx.fillStyle = "+
"'#4a96d0';\n        ctx.fillRect(x, y, 4, 3);\n        // denser crowd in lower "+
"bowl\n        if (Math.sin(row * 11.2 + col * 5.3) > -0.25) {\n          const c"+
"olors = ['#1a1a28','#c03040','#f0e8e0','#203060','#e8e8f0','#305020','#802030'"+
",'#ffffff','#102040'];\n          ctx.fillStyle = colors[(row * 19 + col * 11) "+
"% colors.length];\n          ctx.fillRect(x, y - 4, 3, 5);\n        }\n      }\n  "+
"  }\n\n    // pitch-side ad boards sit just above the shared grass/goal line\n   "+
" const adH = H * 0.028;\n    const grassTop = H * field.grassTop;\n    const adY"+
" = grassTop - adH;\n    // Fill any gap between lower seats and boards (keeps b"+
"owl continuous)\n    if (adY > lowerTop + lowerH) {\n      ctx.fillStyle = '#4a9"+
"6d0';\n      ctx.fillRect(0, lowerTop + lowerH, W, adY - (lowerTop + lowerH));\n"+
"    } else if (adY < lowerTop + lowerH) {\n      // Clip seats into boards when"+
" grass line is higher\n      ctx.fillStyle = '#0c0e14';\n      ctx.fillRect(0, a"+
"dY, W, (lowerTop + lowerH) - adY);\n    }\n    const ads = [\n      { c: '#1a4a9a"+
"', t: 'Michelob ULTRA' },\n      { c: '#ff6a00', t: 'Continental' },\n      { c:"+
" '#0055aa', t: 'POWERADE' },\n      { c: '#111', t: 'Rugs.com' },\n    ];\n    co"+
"nst aw = W / ads.length;\n    ads.forEach((a, i) => {\n      ctx.fillStyle = a.c"+
";\n      ctx.fillRect(i * aw, adY, aw - 1, adH);\n      ctx.fillStyle = '#fff';\n"+
"      ctx.font = 'bold ' + Math.floor(W * 0.022) + 'px Arial';\n      ctx.textA"+
"lign = 'center';\n      ctx.textBaseline = 'middle';\n      ctx.fillText(a.t, i "+
"* aw + aw / 2, adY + adH / 2);\n    });\n\n    // grass — goal line / net base si"+
"ts on this plane\n    const grass = ctx.createLinearGradient(0, grassTop, 0, H)"+
";\n    grass.addColorStop(0, '#2d8a3e');\n    grass.addColorStop(1, '#1a5a28');\n"+
"    ctx.fillStyle = grass;\n    ctx.fillRect(0, grassTop, W, H - grassTop);\n   "+
" for (let i = 0; i < 8; i++) {\n      ctx.fillStyle = i % 2 ? 'rgba(255,255,255"+
",0.04)' : 'rgba(0,0,0,0.05)';\n      ctx.fillRect(0, grassTop + i * H * 0.05, W"+
", H * 0.05);\n    }\n    // goal-line chalk on the grass plane\n    ctx.strokeSty"+
"le = 'rgba(255,255,255,0.7)';\n  "
);
