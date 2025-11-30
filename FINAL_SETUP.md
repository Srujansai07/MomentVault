# 🚀 FINAL SETUP CHECKLIST - MomentVault

## ✅ What's Already Done
- [x] GitHub repository created and code pushed
- [x] Supabase database schema created
- [x] Vercel project connected to GitHub
- [x] Railway project connected to GitHub
- [x] All configuration files created (`vercel.json`, `railway.json`)
- [x] Frontend configured to fetch config from backend
- [x] Documentation complete

---

## 📋 What YOU Need to Do (5 Minutes)

### STEP 1: Get Supabase Keys (2 minutes)

**You have this page open:** https://app.supabase.com/project/rnmsrpqwligboxggnktq/settings/api

1. Scroll to **"Project API keys"** section
2. You'll see 2 keys:

**Key #1: `anon` `public`**
- Click **"Copy"** button
- Paste it somewhere temporarily (notepad)

**Key #2: `service_role` `secret`**
- Click **"Reveal"** button first
- Then click **"Copy"**
- Paste it somewhere temporarily (notepad)

---

### STEP 2: Add Variables to Railway (2 minutes)

**Go to:** https://railway.app/project/13e89172-72bf-461a-b968-100a4462173a

1. Click on your service/deployment
2. Click **"Variables"** tab
3. Click **"Raw Editor"** (top right)
4. **Paste this entire block:**

```
PORT=3000
SUPABASE_URL=https://rnmsrpqwligboxggnktq.supabase.co
DATABASE_URL=postgresql://postgres:231100814aiiTgn@db.rnmsrpqwligboxggnktq.supabase.co:5432/postgres
SUPABASE_ANON_KEY=PASTE_THE_ANON_KEY_HERE
SUPABASE_SERVICE_KEY=PASTE_THE_SERVICE_ROLE_KEY_HERE
```

5. Replace `PASTE_THE_ANON_KEY_HERE` with the first key you copied
6. Replace `PASTE_THE_SERVICE_ROLE_KEY_HERE` with the second key you copied
7. Click **"Deploy"** or **"Save"**

✅ **Railway will now deploy your backend!**

---

### STEP 3: Configure Vercel (1 minute)

**Go to:** https://vercel.com/srujansais-projects/moment-vault/settings/general

1. Scroll to **"Root Directory"**
2. Click **"Edit"**
3. Type: `client`
4. Click **"Save"**

✅ **Vercel will now redeploy your frontend!**

---

## 🎉 That's It!

### What Happens Next:
1. Railway deploys your backend (1-2 minutes)
2. Vercel deploys your frontend (1-2 minutes)
3. Your app is LIVE!

### Your Live URLs:
- **Frontend**: https://moment-vault-five.vercel.app
- **Backend**: Check Railway dashboard for the generated URL

### Test It:
1. Visit the frontend URL
2. You should see "MomentVault - Client is running! ✅"
3. Check browser console - should show "Configuration loaded from backend"

---

## 🆘 Need Help?

If something doesn't work:
1. Check Railway logs for backend errors
2. Check Vercel deployment logs
3. Verify all 5 Railway variables are set correctly
4. Verify Vercel root directory is set to `client`

---

## 📊 Summary

**Total Time:** ~5 minutes
**Total Steps:** 3
**Environment Variables:** 5 (all in Railway)
**Vercel Settings:** 1 (root directory)

**You're almost there!** Just copy those 2 keys and paste them into Railway! 🚀
