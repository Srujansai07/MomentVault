# Vercel Configuration Guide

## ✅ What's Already Configured in Code

The `vercel.json` file in the root directory tells Vercel:
- ✅ Root directory: `client/`
- ✅ Build command: `npm install && npm run build`
- ✅ Output directory: `dist`
- ✅ Framework: Vite
- ✅ API proxy: Routes `/api/*` to Railway automatically

## 🚀 What You Need to Do in Vercel Dashboard

### Step 1: Set Root Directory
1. Go to: https://vercel.com/srujansais-projects/moment-vault/settings/general
2. Scroll to **"Root Directory"**
3. Click **"Edit"**
4. Enter: `client`
5. Click **"Save"**

### Step 2: That's It!
- ❌ **NO environment variables needed!**
- ❌ **NO build settings needed!**
- ✅ Everything is configured in `vercel.json`
- ✅ The frontend will get config from Railway automatically

## How It Works

```
vercel.json (in repo)
    ↓
Tells Vercel: "Build the client/ folder"
    ↓
Vercel builds and deploys
    ↓
Frontend calls Railway for config
    ↓
Everything works!
```

## Railway Setup (Still Needed)

Railway needs the environment variables because it's the "source of truth":

```
PORT=3000
SUPABASE_URL=https://rnmsrpqwligboxggnktq.supabase.co
DATABASE_URL=postgresql://postgres:231100814aiiTgn@db.rnmsrpqwligboxggnktq.supabase.co:5432/postgres
SUPABASE_ANON_KEY=<from_supabase>
SUPABASE_SERVICE_KEY=<from_supabase>
```

## Summary

**Vercel Dashboard:**
- Set root directory to `client`
- That's all!

**Railway Dashboard:**
- Add 5 environment variables
- Done!

**GitHub:**
- Just push code
- Auto-deploys to both!
