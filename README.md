# VsKahlina

Mobile web **5-shot penalty shootout** vs Charlotte FC goalkeeper **Kristijan Kahlina**.

Virtua Striker / N64 low-poly arcade look: bold HUD, dense-crowd stadium, flick physics, anticipating goalie AI.

**Repo:** https://github.com/swiftsolves-msft/VsKahlina

## Controls

1. Tap **KICK OFF**
2. **Flick / swipe** the ball at the goal (mouse works on desktop)
3. Faster flick = more power; touch **force** adds a little when available
4. Exactly **5** shots → **GOAL** / **SAVE** / **MISS**
5. Kahlina reads early flick direction, then dives (sometimes wrong-footed)
6. Mute toggle; light vibrate on goal/save when supported

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Files

| File | Role |
|------|------|
| `index.html` | Shell + HUD |
| `style.css` | Portrait arcade UI |
| `g0.js`…`g7.js` + `gboot.js` | Game logic (chunked for GitHub MCP) |
| `game.js` | Full source (local) |
| `stadium.jpg` / `stadium-data.js` | Optional photo backdrop |

## Deploy

Static-host the folder. GitHub Pages on `main` → `https://swiftsolves-msft.github.io/VsKahlina/`

## Credits

- Goalkeeper: Kristijan Kahlina (Charlotte FC)
- Aesthetic nod: Sega Virtua Striker–era arcade soccer
