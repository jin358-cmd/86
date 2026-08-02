# AGENTS.md

## Cursor Cloud specific instructions

This repository is a **static, dependency-free website** (a Cyberpunk 2077 "Neural Link" concept entry page). It consists only of `index.html`, `styles.css`, and `app.js` (vanilla JS, no framework). There is no package manager, build step, bundler, lint config, or automated test suite.

### Running the app (development)

Serve the folder with any static file server. Per `README.md`:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`. Both `python3` and `node` are available on the VM if you prefer `npx serve`.

### Notes / gotchas

- There is nothing to install — the startup update script is intentionally near-empty. Do not add dependency-install steps for this repo.
- Core interaction to smoke-test: click the central **NEURAL LINK** button (or press the `N` key). This runs the "jack-in" boot overlay (~2.2s) defined in `app.js`, then reveals/scrolls to the `#world` "NIGHT CITY PROTOCOL" section. The smooth-scroll happens while the full-screen boot overlay is up, so the transition looks instant.
- Fonts load from Google Fonts over the network; if egress is blocked, text falls back to system fonts but the page still functions.
- No lint or tests exist; validation is manual (load the page and exercise the jack-in flow).
