# MomentVault - Complete Architecture Explanation

## 🎯 The Big Picture

Think of your app like a restaurant:
- **Frontend (Vercel)** = The dining room where customers sit
- **Backend (Railway)** = The kitchen where food is prepared
- **Database (Supabase)** = The refrigerator where ingredients are stored
- **GitHub** = The recipe book that everyone uses

---

## 🔄 How Everything Connects

```
┌─────────────────────────────────────────────────────────────┐
│                         GITHUB REPO                          │
│              https://github.com/Srujansai07/MomentVault     │
│                                                              │
│  ┌──────────────────┐              ┌──────────────────┐    │
│  │   client/        │              │   server/        │    │
│  │  (React Code)    │              │  (Express Code)  │    │
│  └──────────────────┘              └──────────────────┘    │
└────────┬─────────────────────────────────────┬─────────────┘
         │                                      │
         │ Auto-deploys when                   │ Auto-deploys when
         │ you push to GitHub                  │ you push to GitHub
         ↓                                      ↓
┌─────────────────┐                    ┌─────────────────┐
│     VERCEL      │                    │    RAILWAY      │
│   (Frontend)    │◄──── Talks to ────►│   (Backend)     │
│                 │      via API       │                 │
│  URL: moment-   │                    │  URL: moment-   │
│  vault-five.    │                    │  vault-prod.    │
│  vercel.app     │                    │  railway.app    │
└────────┬────────┘                    └────────┬────────┘
         │                                      │
         │                                      │
         │ Both connect to                     │
         │ (different keys)                    │
         └──────────────┬──────────────────────┘
                        ↓
              ┌──────────────────┐
              │    SUPABASE      │
              │   (Database)     │
              │                  │
              │  - PostgreSQL    │
              │  - File Storage  │
              │  - Auth          │
              └──────────────────┘
```

---

## 📦 What Each Part Does

### 1. **Your Local Code** (C:\Users\Student\Downloads\MomentVault)
- This is where you write and edit code
- Has two main folders:
  - `client/` - React app (what users see)
  - `server/` - Express API (handles requests)

### 2. **GitHub** (https://github.com/Srujansai07/MomentVault)
- **What it is**: Cloud storage for your code
- **What it does**: 
  - Stores all your code safely
  - Tracks every change you make (version control)
  - Triggers automatic deployments to Vercel and Railway
- **How it connects**: 
  - You push code: `git push origin main`
  - Vercel and Railway watch for changes and auto-deploy

### 3. **Supabase** (https://rnmsrpqwligboxggnktq.supabase.co)
- **What it is**: Your database + file storage + authentication
- **What it does**:
  - Stores user data (profiles, moments)
  - Stores uploaded files (photos, videos, audio)
  - Handles user login/signup
- **How it connects**:
  - Frontend talks to it directly (for auth, reading data)
  - Backend talks to it (for creating/updating/deleting data)
  - Uses API keys for security:
    - `anon` key = Frontend (safe for browser)
    - `service_role` key = Backend (secret, more powerful)

### 4. **Vercel** (https://moment-vault-five.vercel.app)
- **What it is**: Hosting for your React frontend
- **What it does**:
  - Runs your React app
  - Serves it to users' browsers
  - Handles the UI (buttons, forms, displays)
- **How it connects**:
  - Pulls code from GitHub `client/` folder
  - Calls Railway API when user does actions
  - Calls Supabase for auth and reading data
- **Environment Variables Needed**:
  ```
  VITE_SUPABASE_URL = Where is Supabase?
  VITE_SUPABASE_ANON_KEY = How to talk to Supabase?
  VITE_API_URL = Where is Railway backend?
  ```

### 5. **Railway** (https://railway.app/project/13e89172-72bf-461a-b968-100a4462173a)
- **What it is**: Hosting for your Express backend
- **What it does**:
  - Runs your Node.js server
  - Handles API requests from Vercel
  - Processes data before saving to Supabase
  - Handles file uploads
- **How it connects**:
  - Pulls code from GitHub `server/` folder
  - Receives requests from Vercel
  - Talks to Supabase database
- **Environment Variables Needed**:
  ```
  PORT = What port to run on?
  SUPABASE_URL = Where is Supabase?
  SUPABASE_SERVICE_KEY = How to talk to Supabase (with admin power)?
  DATABASE_URL = Direct database connection
  ```

---

## 🔐 Security: Why Two Different Keys?

**Supabase gives you 2 keys for security:**

1. **`anon` (public) key** → Used by Vercel (Frontend)
   - Safe to expose in browser
   - Limited permissions (can only do what users are allowed)
   - Protected by Row Level Security (RLS) policies

2. **`service_role` (secret) key** → Used by Railway (Backend)
   - NEVER expose in browser
   - Full admin access
   - Can bypass RLS policies
   - Only used on secure server

---

## 🚀 The Complete Flow (Example: User Creates a Moment)

```
1. User clicks "Add Moment" on website
   ↓
2. Vercel (Frontend) shows form
   ↓
3. User fills form and clicks "Save"
   ↓
4. Vercel sends request to Railway API
   POST https://momentvault-production.up.railway.app/api/moments
   ↓
5. Railway (Backend) receives request
   ↓
6. Railway validates data and user
   ↓
7. Railway saves to Supabase database
   INSERT INTO moments (user_id, content, ...)
   ↓
8. Supabase stores the data
   ↓
9. Railway sends success response to Vercel
   ↓
10. Vercel updates the UI to show new moment
```

---

## 📝 Setup Summary

**What you've done so far:**
- ✅ Created database schema in Supabase
- ✅ Pushed all code to GitHub
- ✅ Connected Vercel to GitHub (auto-deploys)
- ✅ Connected Railway to GitHub (auto-deploys)

**What you need to do:**
1. Get 2 API keys from Supabase
2. Add them to Railway (4 variables total)
3. Add them to Vercel (3 variables total)
4. Both platforms will auto-deploy
5. Your app is live!

---

## 🎯 Why This Architecture?

**Separation of Concerns:**
- Frontend (Vercel) = Fast, global CDN, great for React
- Backend (Railway) = Handles complex logic, keeps secrets safe
- Database (Supabase) = Specialized for data storage, built-in auth

**Benefits:**
- ✅ Scalable (each part can scale independently)
- ✅ Secure (secrets stay on server)
- ✅ Fast (Vercel has global CDN)
- ✅ Free tier available on all platforms
- ✅ Auto-deploys (push to GitHub = instant updates)

---

## 🔗 Quick Links

| Service | Purpose | URL |
|---------|---------|-----|
| **GitHub** | Code storage | https://github.com/Srujansai07/MomentVault |
| **Supabase** | Database | https://app.supabase.com/project/rnmsrpqwligboxggnktq |
| **Vercel** | Frontend hosting | https://vercel.com/srujansais-projects/moment-vault |
| **Railway** | Backend hosting | https://railway.app/project/13e89172-72bf-461a-b968-100a4462173a |
| **Live App** | Your website | https://moment-vault-five.vercel.app |

---

## ❓ Common Questions

**Q: Why can't I just put everything in one place?**
A: You could, but this setup is more professional, secure, and scalable.

**Q: Why do I need to add environment variables manually?**
A: Security! API keys should NEVER be in GitHub. Each platform needs its own config.

**Q: What happens when I push to GitHub?**
A: Both Vercel and Railway automatically detect the change and redeploy your app.

**Q: Can I run this locally?**
A: Yes! See SETUP.md for local development instructions.

**Q: How much does this cost?**
A: All platforms have generous free tiers. You won't pay anything unless you get lots of traffic.
