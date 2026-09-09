# Codarafroj Portfolio — v2

Next.js 16 + TypeScript + Tailwind v4 + Firebase + Admin Panel.

Design: **Monochrome Studio** — pure black and white, a full-bleed film-grain
texture, a subtle animated starfield, and bold editorial typography (Bricolage
Grotesque + Inter + JetBrains Mono). No color crutches — contrast and type do
the work, so it never reads as a template.

---

## 1. Yeh project kya karta hai

- **Public site** (`/`) — hero, projects (with optional pricing for builds
  you're selling), capabilities, journey, contact.
  Projects load live from **Firestore**. Agar Firebase abhi
  configure nahi hai, seed data (already filled) dikhta hai — site kabhi khali
  nahi lagegi.
- **Admin Panel** (`/admin`) — apna Firebase email/password se login karo,
  phir `/admin/dashboard` se:
  - Projects add/edit/delete karo — image seedha tere GitHub repo
    (`coderafroj/coderafroj.github.io`) mein `project-images/` folder ke andar
    upload hoti hai (free, unlimited-ish, no Firebase Storage billing).
  - Kisi bhi project ko **"For Sale"** mark karke price laga sakta hai — card
    pe price badge dikhega aur click karne pe email inquiry khulegi.
  - Changes Firestore mein turant save hote hain — site turant update ho jaati hai,
    koi rebuild/redeploy nahi chahiye.
- **SEO** — metadata, Open Graph, JSON-LD, sitemap.xml, robots.txt — sab
  `coderafroj.me` domain ke against configured.

---

## 2. Firebase Setup (ek baar karna hai)

1. [Firebase Console](https://console.firebase.google.com) → **Add project** → naam do
   (e.g. `codarafroj-portfolio`).
2. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable**.
   Phir **Users → Add user** — apna email + ek strong password daal do. Yehi
   admin login hoga.
3. **Build → Firestore Database → Create database** → production mode → koi
   bhi region (asia-south1 = Mumbai, best for India).
4. **Project settings (gear icon) → General → Your apps → Web (</>) icon** →
   app register karo → jo config object milega, usse `.env.local` mein daalo
   (neeche step 4 dekho).
5. **Project settings → Service accounts → Generate new private key** — ek
   JSON file download hogi. Isse `FIREBASE_ADMIN_*` vars ke liye use karo
   (neeche).
6. Firestore security rules deploy karo (public read, tere-login-required write):
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init firestore   # existing project select karo, firestore.rules already provided hai
   firebase deploy --only firestore:rules
   ```

## 3. GitHub Token Setup

Ye admin panel ko image upload karne dega tere `coderafroj.github.io` repo mein.

1. [github.com/settings/tokens](https://github.com/settings/tokens) → **Generate new token (classic)**
2. Scope: sirf **`repo`** check karo.
3. Token copy karke `.env.local` mein `GITHUB_TOKEN` mein daal do.

## 4. Environment Variables

```bash
cp .env.local.example .env.local
```

Fir `.env.local` mein sab values bharo (Firebase config, admin service account,
GitHub token). Real deployment (Vercel/Firebase Hosting) mein yehi variables
project settings ke "Environment Variables" section mein daalne honge — kabhi
`.env.local` ko GitHub pe push mat karna.

## 5. Local Development

```bash
npm install
npm run dev
```

`http://localhost:3000` pe site khulegi, `http://localhost:3000/admin` pe login.

## 6. Deployment — coderafroj.me pe live karna

**Best option: Firebase Hosting** (isi Firebase project ke saath integrate,
free tier generous hai, custom domain easy):

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # "Use an existing project", framework auto-detect Next.js keh dega
firebase deploy
```

Custom domain connect karne ke liye: Firebase Console → **Hosting → Add custom
domain** → `coderafroj.me` daalo → jo DNS records milein (A/TXT records), unhe
apne domain registrar (jahan se coderafroj.me kharida hai) ke DNS settings mein
add kar do. 24-48 ghante mein propagate ho jayega, aur Firebase free SSL bhi
apne aap laga dega.

**Alternative: Vercel** (bhi free, Next.js banane wali company ka hi hai) —
`vercel.com` pe GitHub repo import karo, environment variables daal do,
deploy — aur waha bhi custom domain add kar sakte ho.

> Note: Purane GitHub Pages wale static HTML site (`coderafroj.github.io`) ko
> chhod ke ab yeh naya Next.js app hi actual live site banega. GitHub repo ab
> sirf image storage ke liye use ho raha hai — koi conflict nahi hai.

## 7. Speed / Performance

- Next.js App Router + Turbopack — server-rendered pages jo bahut fast load
  hote hain, Google SEO ke liye bhi best.
- Firestore real-time listeners — data turant update, koi extra API call ka
  overhead nahi.
- Images GitHub raw CDN se serve hoti hain — free aur fast.
- Reduced-motion aur mobile-responsive sab sections mein already handled hai.

## 8. File Map (important files)

```
app/
  layout.tsx          → fonts, SEO metadata, JSON-LD
  page.tsx            → home page (all sections composed)
  sitemap.ts / robots.ts
  admin/page.tsx       → admin login
  admin/dashboard/page.tsx → protected dashboard (Projects manager)
  api/upload-image/route.ts → secure GitHub image upload (server-only)
components/            → all UI sections + admin managers
lib/
  firebase.ts          → client Firebase init (fails soft if unconfigured)
  firebaseAdmin.ts      → server-only Firebase Admin (token verification)
  projects.ts           → Firestore CRUD helpers
  uploadImage.ts        → client helper calling the upload API
  seedData.ts           → fallback content shown before Firestore has data
firestore.rules         → public read, authenticated-write security rules
.env.local.example      → all required environment variables, documented
```

## 9. Agla step tera

1. `.env.local` bharo (Firebase + GitHub token).
2. `npm run dev` karke local pe check karo.
3. `/admin` pe login karke ek test project add karo — dekho GitHub repo mein
   `project-images/` folder mein image aa gayi ki nahi.
4. Firebase Hosting ya Vercel pe deploy karo, domain connect karo.
5. Purane projects (Blinkit, Evigo, Profile Card) admin panel se dobara add
   kar do apne real screenshots ke saath — seed data sirf placeholder hai.

Koi bhi step mein atko, bata dena bhai. 🚀
