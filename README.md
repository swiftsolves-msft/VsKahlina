# VsKahlina

Mobile web **5-shot penalty shootout** — flick a soccer ball past Charlotte FC goalkeeper **Christina Kahlina**.

Arcade look inspired by **Virtua Striker / Virtua Soccer**: bold HUD, saturated stadium backdrop, chunky kicker POV — not a photo sim.

**Play:** https://github.com/swiftsolves-msft/VsKahlina (open `index.html` or any static host)

## How to play

1. Tap **KICK OFF**.
2. **Flick** (swipe) the ball toward the goal — direction + release speed set the shot.
3. On devices that expose touch **force**, a firmer press adds a bit of power.
4. You get **exactly 5 shots**. Each ends as **GOAL**, **SAVE**, or **MISS**.
5. Kahlina **anticipates** early flick direction, then dives after a short reaction delay — she can be wrong-footed.
6. Use the speaker button to **mute**. Goal/save may **vibrate** when the browser allows it.

Works with **touch** on phones (portrait) and **mouse** drag on desktop.

## Run locally

No build step — static files only:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` (phone on the same network, or Chrome device mode).

You can also open `index.html` directly; the stadium image is embedded in `stadium-data.js` so the game stays self-contained.

## Files

| File | Role |
|------|------|
| `index.html` | Shell, HUD, start/end overlays |
| `style.css` | Portrait layout, safe areas, arcade UI |
| `game.js` | Flick physics, goalie AI, rendering |
| `stadium-data.js` | Base64 JPEG backdrop (`window.STADIUM_BG`) |
| `stadium.jpg` | Same backdrop as a plain JPEG (optional) |

## Deploy

Host the folder on any static provider (GitHub Pages, Netlify, S3, nginx, etc.). No backend or env vars required.

For GitHub Pages: enable Pages on the `main` branch root, then visit `https://swiftsolves-msft.github.io/VsKahlina/`.

## Credits

- Goalkeeper: Christina Kahlina (Charlotte FC)
- Aesthetic nod: Sega Virtua Striker–era arcade soccer
