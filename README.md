# FutureShot — Future Screenshot Generator

Generate funny, motivational fake screenshots from your future self. Set a goal, choose your vibe, and get a shareable screenshot as if you already achieved it.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (database + optional auth)
- **OpenAI API** (GPT-4o-mini)
- **html-to-image** (PNG download)

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/yourname/future-screenshot.git
cd future-screenshot
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
# OpenAI — get from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-...

# Supabase — get from your project's Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and paste the contents of `supabase/migrations/001_initial.sql`
3. Click **Run**

This creates:
- `generations` table (stores all generated screenshots)
- `users` table (for future auth)
- RLS policies (anonymous users can generate)
- Auto-create user trigger

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
future-screenshot/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts        # OpenAI generation API
│   ├── generate/
│   │   └── page.tsx            # Goal input form
│   ├── result/
│   │   └── page.tsx            # Results + download page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                # Landing page
├── components/
│   └── screenshots/
│       ├── ScreenshotRenderer.tsx   # Template router
│       ├── BankTemplate.tsx         # Bank app screenshot
│       ├── RaceTemplate.tsx         # Race results screenshot
│       ├── SocialTemplate.tsx       # YouTube/social analytics
│       ├── CalendarTemplate.tsx     # Calendar reminder
│       ├── ChatTemplate.tsx         # Chat message from future you
│       ├── EmailTemplate.tsx        # Email notification
│       └── CertificateTemplate.tsx  # Achievement certificate
├── lib/
│   ├── supabase.ts             # Supabase client + helpers
│   └── types.ts                # TypeScript types
├── supabase/
│   └── migrations/
│       └── 001_initial.sql     # Database schema
├── .env.example
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Template → Category Mapping

| Category | Template |
|---|---|
| Money | Bank app |
| Fitness | Race results |
| Creator | Social analytics |
| Career | Email notification |
| Business | Achievement certificate |
| Relationship | Chat message |
| Custom | Calendar reminder |

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under **Settings > Environment Variables**.

Or click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## Extending the App

**Add a new screenshot template:**
1. Create `components/screenshots/YourTemplate.tsx`
2. Add the case to `components/screenshots/ScreenshotRenderer.tsx`
3. Update `CATEGORY_TEMPLATE_MAP` in `lib/types.ts`

**Add Supabase Auth:**
1. Enable email auth in Supabase Dashboard > Authentication
2. Use `supabase.auth.signInWithOtp()` for magic links
3. Pass `user_id` from `supabase.auth.getUser()` in the API route

**Add payment (Stripe):**
1. Set up a Stripe product for $9/month
2. Create `app/api/checkout/route.ts`
3. Add webhook at `app/api/webhooks/stripe/route.ts`
4. Update `users.is_pro` on successful payment

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes | OpenAI API key |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `NEXT_PUBLIC_APP_URL` | No | App URL for OG tags (default: localhost:3000) |

---

## Safety Note

Generated screenshots are **fictional** and for **motivation/entertainment only**. They are not financial advice, guarantees, or predictions. This disclaimer appears throughout the app.

---

## License

MIT
