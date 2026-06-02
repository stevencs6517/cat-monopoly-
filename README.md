# 🐱 Cat Monopoly 🎀

A cute kawaii idle / money-farming game. Buy cats, earn passive income, purchase
upgrades, and **rebirth** for permanent multipliers. Works offline, saves to your
browser, and lets you export/import a save **key** to move between devices.

Play by opening `index.html` (or the hosted link).

## Features
- 18 collectible cat breeds, each with its own kawaii look 🐈
- Idle income + offline earnings (up to 12h)
- Upgrades & modifiers, plus a rebirth/prestige system (Golden Mice 🐭)
- Save key export/import for cross-device transfer
- Leaderboard (local by default; **global** when a Supabase backend is configured)

## 🌍 Enable the global leaderboard
See **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** — create a free Supabase project,
run the provided SQL, and paste your Project URL + anon key into the config block
near the top of the `<script>` in `index.html`. Without it, the leaderboard is
local-only (per device).

## Hosting on GitHub Pages
1. Create a new repository on GitHub and push this folder (commands printed after
   `git init`).
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a
   branch*, Branch = `main` / root → **Save**.
3. Your game goes live at `https://<your-username>.github.io/<repo-name>/`.

> Tip: paste your Supabase keys **before** the final push so the hosted game has a
> shared leaderboard. You can always push again to update.

---
Made with 💗 and a lot of cats.
