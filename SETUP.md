# MomentVault - Environment Setup Instructions

## Step 1: Get Your Supabase API Keys

1. Go to: https://app.supabase.com/project/rnmsrpqwligboxggnktq/settings/api
2. Copy these two keys:
   - **anon public** (safe for browser)
   - **service_role** (secret, server only)

## Step 2: Railway Environment Variables

Go to Railway Dashboard → Your Project → Variables tab

Add these 4 variables:

| Variable Name | Value |
|--------------|-------|
| `PORT` | `3000` |
| `SUPABASE_URL` | `https://rnmsrpqwligboxggnktq.supabase.co` |
| `DATABASE_URL` | `postgresql://postgres:231100814aiiTgn@db.rnmsrpqwligboxggnktq.supabase.co:5432/postgres` |
| `SUPABASE_SERVICE_KEY` | `<paste service_role key here>` |

## Step 3: Get Railway URL

After Railway deploys, copy the generated URL (looks like: `https://momentvault-production.up.railway.app`)

## Step 4: Vercel Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add these 3 variables:

| Variable Name | Value |
|--------------|-------|
| `VITE_SUPABASE_URL` | `https://rnmsrpqwligboxggnktq.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `<paste anon public key here>` |
| `VITE_API_URL` | `<paste Railway URL here>` |

## Step 5: Redeploy

- Railway will auto-deploy when you save variables
- Vercel: Go to Deployments → Click "Redeploy"

## Done! 🎉

Your app will be live at:
- Frontend: https://moment-vault-five.vercel.app
- Backend: (Your Railway URL)

---

## For Local Development (Optional)

If you want to run locally, create these files:

**client/.env**
```
VITE_SUPABASE_URL=https://rnmsrpqwligboxggnktq.supabase.co
VITE_SUPABASE_ANON_KEY=<your_anon_key>
VITE_API_URL=http://localhost:3000
```

**server/.env**
```
PORT=3000
SUPABASE_URL=https://rnmsrpqwligboxggnktq.supabase.co
SUPABASE_SERVICE_KEY=<your_service_key>
DATABASE_URL=postgresql://postgres:231100814aiiTgn@db.rnmsrpqwligboxggnktq.supabase.co:5432/postgres
```

Then run:
```bash
# Terminal 1 - Server
cd server
npm install
npm start

# Terminal 2 - Client
cd client
npm install
npm run dev
```
