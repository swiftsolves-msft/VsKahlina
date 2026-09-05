# VsKahlina

Mobile web **5-shot penalty shootout** — flick a soccer ball past Charlotte FC goalkeeper **Christina Kahlina**.

Arcade look inspired by **Virtua Striker / Virtua Soccer**: bold HUD, saturated stadium (procedural denser crowd + optional photo overlay), chunky kicker POV.

**Repo:** https://github.com/swiftsolves-msft/VsKahlina

## How to play

1. Tap **KICK OFF**.
2. **Flick** (swipe) the ball toward the goal — direction + release speed set the shot.
3. On devices that expose touch **force**, a firmer press adds a bit of power.
4. You get **exactly 5 shots**. Each ends as **GOAL**, **SAVE**, or **MISS**.
5. Kahlina **anticipates** early flick direction, then dives after a short reaction delay — she can be wrong-footed.
6. Use the speaker button to **mute**. Goal/save may **vibrate** when the browser allows it.

Works with **touch** on phones (portrait) and **mouse** drag on desktop.

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Files

| File | Role |
|------|------|
| `index.html` | Shell + HUD |
| `style.css` | Portrait / arcade UI |
| `code0.js`…`code5.js` + `codeboot.js` | Game logic (chunked) |
| `stadium-data.js` / `stadium.jpg` | Optional photo backdrop (local) |

## Deploy

Static host any folder (GitHub Pages, Netlify, etc.). Enable Pages on `main` root → `https://swiftsolves-msft.github.io/VsKahlina/`.

## Credits

- Goalkeeper: Christina Kahlina (Charlotte FC)
- Aesthetic nod: Sega Virtua Striker–era arcade soccer
