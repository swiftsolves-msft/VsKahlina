# VsKahlina

Mobile web **5-shot penalty shootout** vs Charlotte FC goalkeeper **Christina Kahlina**.

Virtua Striker–inspired arcade look: bold HUD, dense crowd stadium, flick physics, anticipating goalie AI.

**Repo:** https://github.com/swiftsolves-msft/VsKahlina

## Controls

1. **KICK OFF**
2. **Flick / swipe** the ball at the goal (mouse drag works on desktop)
3. Faster flick = more power; touch **force** adds a little when available
4. Exactly **5** shots → GOAL / SAVE / MISS
5. Kahlina reads early flick direction, then dives (sometimes wrong-footed)
6. Mute toggle; light vibrate on goal/save when supported

## Run

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Files

- `index.html`, `style.css` — shell + UI
- `p0.js`…`p3.js` + `pboot.js` — game logic
- `stadium.jpg` / `stadium-data.js` — optional photo assets (local)

## Deploy

Static host the folder. GitHub Pages on `main` → `https://swiftsolves-msft.github.io/VsKahlina/`
