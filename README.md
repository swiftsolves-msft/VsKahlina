# VsKahlina

Mobile web **5-shot penalty shootout** vs Charlotte FC goalkeeper **Kristijan Kahlina**.

Virtua Striker / N64 low-poly arcade look with Bank of America Stadium–style bowl (upper seats, CLT crown FC fascia, dual LED ribbons, suites, section numbers, denser lower crowd).

**Repo:** https://github.com/swiftsolves-msft/VsKahlina

## Play

1. Open `index.html` (or GitHub Pages)
2. Tap **KICK OFF**
3. Flick / swipe the ball toward goal (mouse works too)
4. Faster flick = more power
5. Kahlina reads early flick direction, then dives (sometimes wrong-footed)
6. 5 shots → GOAL / SAVE / MISS → rematch

Mute toggles SFX. Vibration on goal/save when the device supports it.

## Files

- `index.html` / `style.css` — shell + arcade UI
- `g00.js`…`g15.js` + `gboot.js` — game source as line chunks (assembles at runtime)
- `game.js` — full source (local / optional)

## Deploy

Static-host the folder. GitHub Pages on `main` → `https://swiftsolves-msft.github.io/VsKahlina/`

## Credits

- Goalkeeper: Kristijan Kahlina (Charlotte FC)
- Kit: royal blue torso, light sleeves, white gloves, black pants, white/neon cleats
