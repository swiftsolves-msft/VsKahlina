window.__GS=(window.__GS||[]);window.__GS.push(
" = H * 0.032;\n    drawRibbonBoard(0, rib1Y, W, ribH, 0);\n\n  "+
"  // --- Suite / window band ---\n    const suiteY = rib1Y + "+
"ribH;\n    const suiteH = H * 0.055;\n    ctx.fillStyle = '#1a"+
"1e28';\n    ctx.fillRect(0, suiteY, W, suiteH);\n    const win"+
"N = 8;\n    const winW = (W - 20) / winN;\n    for (let i = 0;"+
" i < winN; i++) {\n      const wx = 10 + i * winW + 3;\n      "+
"const wy = suiteY + 6;\n      const ww = winW - 8;\n      cons"+
"t wh = suiteH - 12;\n      const g = ctx.createLinearGradient"+
"(wx, wy, wx, wy + wh);\n      g.addColorStop(0, '#2a3344');\n "+
"     g.addColorStop(1, '#0e1218');\n      ctx.fillStyle = g;\n"+
"      ctx.fillRect(wx, wy, ww, wh);\n      ctx.strokeStyle = "+
"'#e8eef5';\n      ctx.lineWidth = 1.5;\n      ctx.strokeRect(w"+
"x, wy, ww, wh);\n      // soft interior lights\n      if ((i +"+
" Math.floor(performance.now() / 800)) % 3 === 0) {\n        c"+
"tx.fillStyle = 'rgba(255,220,160,0.12)';\n        ctx.fillRec"+
"t(wx + 2, wy + 2, ww - 4, wh - 4);\n      }\n    }\n\n    // ---"+
" Lower LED ribbon ---\n    const rib2Y = suiteY + suiteH;\n   "+
" drawRibbonBoard(0, rib2Y, W, ribH, 1);\n\n    // --- Dark low"+
"er fascia ---\n    const fascia2Y = rib2Y + ribH;\n    ctx.fil"+
"lStyle = '#0c0e14';\n    ctx.fillRect(0, fascia2Y, W, fasciaH"+
" * 0.7);\n\n    // --- Concrete band + section numbers ---\n   "+
" const concY = fascia2Y + fasciaH * 0.7;\n    const concH = H"+
" * 0.038;\n    ctx.fillStyle = '#c5cbd4';\n    ctx.fillRect(0,"+
" concY, W, concH);\n    ctx.fillStyle = '#1a1a1a';\n    ctx.fo"+
"nt = 'bold ' + Math.floor(W * 0.042) + 'px Arial';\n    ctx.t"+
"extAlign = 'center';\n    ctx.textBaseline = 'middle';\n    ct"+
"x.fillText('201', W * 0.28, concY + concH / 2);\n    ctx.fill"+
"Text('202', W * 0.72, concY + concH / 2);\n    // faint 345 o"+
"n far side for depth\n    ctx.globalAlpha = 0.35;\n    ctx.fil"+
"lText('345', W * 0.5, concY + concH / 2);\n    ctx.globalAlph"+
"a = 1;\n\n    // --- Lower blue seats (denser crowd) ---\n    c"+
"onst lowerTop = concY + concH;\n    const lowerH = H * 0.12;\n"+
"    ctx.fillStyle = '#5aa3dc';\n    ctx.fillRect(0, lowerTop,"+
" W, lowerH);\n    for (let row = 0; row < 9; row++) {\n      f"+
"or (let col = 0; col < 42; col++) {\n        const x = (col /"+
" 42) * W + (row % 2) * 2;\n        const y = lowerTop + 2 + r"+
"ow * (lowerH / 10);\n        if ((col + row) % 19 === 0) {\n  "+
"        ctx.fillStyle = 'rgba(190,200,210,0.4)';\n          c"+
"tx.fillRect(x, lowerTop, 6, lowerH);\n          continue;\n   "+
"     }\n        ctx.fillStyle = '#4a96d0';\n        ctx.fillRe"+
"ct(x, y, 4, 3);\n        // denser crowd in lower bowl\n      "+
"  if (Math.sin(row * 11.2 + col * 5.3) > -0.25) {\n          "+
"const colors = ['#1a1a28','#c03040','#f0e8e0','#203060','#e8"+
"e8f0','#305020','#802030','#ffffff','#102040'];\n          ct"+
"x.fillStyle = colors[(row * 19 + col * 11) % colors.length];"+
"\n          ctx.fillRect(x, y - 4, 3, 5);\n        }\n      }\n "+
"   }\n\n    // pitch-side ad boards (thin)\n    const adY = low"+
"erTop + lowerH;\n    const ads = [\n      { c: '#1a4a9a', t: '"+
"Michelob ULTRA' },\n      { c: '#ff6a00', t: 'Continental' },"+
"\n      { c: '#0055aa', t: 'POWERADE' },\n      { c: '#111', t"+
": 'Rugs.com' },\n    ];\n    const aw = W / ads.length;\n    ad"+
"s.forEach((a, i) => {\n      ctx.fillStyle = a.c;\n      ctx.f"+
"illRect(i * aw, adY, aw - 1, H * 0.028);\n      ctx.fillStyle"+
" = '#fff';\n      ctx.font = 'bold ' + Math.floor(W * 0.022) "+
"+ 'px Arial';\n      ctx.textAlign = 'center';\n      ctx.text"+
"Baseline = 'middle';\n      ctx.fillText(a.t, i * aw + aw / 2"+
", adY + H * 0.014);\n    });\n\n    // grass\n    const grassTop"+
" = adY + H * 0.028;\n    const grass = ctx.createLinearGradie"+
"nt(0, grassTop, 0, H);\n    grass.addColorStop(0, '#2d8a3e');"+
"\n    grass.addColorStop(1, '#1a5a28');\n    ctx.fillStyle = g"+
"rass;\n    ctx.fillRect(0, grassTop, W, H - grassTop);\n    fo"+
"r (let i = 0; i < 8; i++) {\n      ctx.fillStyle = i % 2 ? 'r"+
"gba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';\n      ctx.fillR"+
"ect(0, grassTop + i * H * 0.05, W, H * 0.05);\n    }\n    ctx."+
"strokeStyle = 'rgba(255,255,255,0.45)';\n    ctx.lineWidth = "+
"2;\n    ctx.beginPath();\n    ctx.arc(W / 2, H * 0.78, W * 0.2"+
"2, Math.PI * 1.15, Math.PI * 1.85);\n    ctx.stroke("
);
