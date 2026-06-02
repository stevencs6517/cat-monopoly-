# 🌍 Global Leaderboard Setup (Supabase)

The game already has all the code. You just need to create a free Supabase
project, make one table, and paste two values into `index.html`. ~10 minutes.

---

## 1. Create a free Supabase project
1. Go to **https://supabase.com** → sign up (free).
2. Click **New project**. Give it a name (e.g. `cat-monopoly`) and a database
   password (save it somewhere). Pick the free plan. Wait ~2 min for it to build.

## 2. Create the `scores` table
1. In your project, open the **SQL Editor** (left sidebar) → **New query**.
2. Paste this and click **Run**:

```sql
create table if not exists scores (
  name      text primary key,
  score     numeric not null default 0,
  rebirths  integer not null default 0,
  time      integer not null default 0,
  updated_at timestamptz not null default now()
);

-- allow the game (anon key) to read + add/update scores
alter table scores enable row level security;

create policy "anyone can read scores"
  on scores for select using (true);

create policy "anyone can insert scores"
  on scores for insert with check (true);

create policy "anyone can update scores"
  on scores for update using (true) with check (true);
```

> `name` is the PRIMARY KEY, which is what lets the game "upsert" — re-submitting
> the same cat name updates that row instead of making duplicates.

## 3. Get your two keys
1. Left sidebar → **Project Settings** → **API**.
2. Copy:
   - **Project URL** → looks like `https://abcdefgh.supabase.co`
   - **anon public** key (the long one under "Project API keys")

> The `anon` key is meant to be public/in the browser — that's fine. Never paste
> the `service_role` key into the game; that one is secret.

## 4. Paste them into the game
Open `index.html`, find this block near the top of the `<script>`:

```js
const SUPABASE_URL = "";   // e.g. "https://abcdefgh.supabase.co"
const SUPABASE_KEY = "";   // your project's public "anon" key
```

Fill them in:

```js
const SUPABASE_URL = "https://abcdefgh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR...your-anon-key...";
```

Save, refresh the game → the **Ranks** tab now says **🌍 Global Leaderboard**,
and **Submit** sends your score to the cloud. If the keys are blank or the server
is unreachable, it automatically falls back to the local board.

## 5. (Optional) Put the game online so others can play
A global board needs other players, so host the file somewhere public:
- **Netlify Drop** (easiest): https://app.netlify.com/drop — drag the project folder in.
- **GitHub Pages**: push the folder to a repo → Settings → Pages.
- **Cloudflare Pages**: connect a repo or upload.

Share the link and everyone competes on the same board. 🎉

---

### Notes & limits
- **Cheating:** scores are computed in the browser, so a determined person could
  submit a fake number. Fine for a casual game. If it becomes a problem, the next
  step is a Supabase **Edge Function** that validates submissions server-side.
- **Free tier** is plenty for a leaderboard (tons of rows + requests/month).
- Want one row PER RUN instead of per name? Change `name text primary key` to a
  normal column and remove `?on_conflict=name` / the merge header in the game.
