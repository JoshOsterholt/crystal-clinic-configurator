# Crystal Clinic Orthopedic — Furniture Selection Configurator

PR# 16658 · Interactive furniture selection form for client review.

## Quick Deploy to Vercel

### 1. Push to GitHub

```bash
cd crystal-clinic-configurator
git init
git add .
git commit -m "Initial configurator"
git remote add origin https://github.com/YOUR_USERNAME/crystal-clinic-configurator.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Framework Preset will auto-detect **Next.js**
4. Add Environment Variables before clicking Deploy:

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | Your Resend API key (see step 3) |
| `RECIPIENT_EMAIL` | Email address that receives client selections |
| `FROM_EMAIL` | *(optional)* Custom sender address |

5. Click **Deploy**

### 3. Set Up Resend (email delivery)

1. Sign up at [resend.com](https://resend.com) — free tier = 100 emails/day
2. Go to **API Keys** → Create a new key
3. Copy the key (starts with `re_`) and paste it as `RESEND_API_KEY` in Vercel

**Note:** On the free tier, emails are sent from `onboarding@resend.dev`. To use a custom sender address:
- Add your domain in Resend → **Domains**
- Verify the DNS records
- Then set `FROM_EMAIL=configurator@yourdomain.com` in Vercel

### 4. Share with Client

After deployment, Vercel gives you a URL like `https://crystal-clinic-configurator.vercel.app`. Send that link to your client — they can make selections and hit "Submit Selections" to email the summary directly to you.

## Local Development

```bash
npm install
cp .env.local.example .env.local   # edit with your keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── app/
│   ├── layout.js          # HTML wrapper
│   ├── globals.css         # Base styles + print styles
│   ├── page.js             # Main configurator component
│   └── api/
│       └── send-selection/
│           └── route.js    # Resend email API endpoint
├── public/
│   └── images/             # Product photos (extracted from VPB)
├── .env.local              # API keys (not committed)
├── next.config.js
└── package.json
```
