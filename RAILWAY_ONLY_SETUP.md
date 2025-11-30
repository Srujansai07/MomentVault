# Railway-Only Environment Variables

## What You Need to Set in Railway

Go to: https://railway.app/project/13e89172-72bf-461a-b968-100a4462173a

Add these variables (click "Raw Editor" and paste):

```
PORT=3000
SUPABASE_URL=https://rnmsrpqwligboxggnktq.supabase.co
DATABASE_URL=postgresql://postgres:231100814aiiTgn@db.rnmsrpqwligboxggnktq.supabase.co:5432/postgres
```

Then add these TWO keys from Supabase:
1. Go to: https://app.supabase.com/project/rnmsrpqwligboxggnktq/settings/api
2. Copy the `anon public` key and add:
```
SUPABASE_ANON_KEY=paste_anon_key_here
```
3. Copy the `service_role` key and add:
```
SUPABASE_SERVICE_KEY=paste_service_role_key_here
```

## That's It!

**Vercel needs ZERO environment variables!**
- The frontend will automatically get its config from Railway
- Just push to GitHub and Vercel will deploy
- No Vercel dashboard settings needed

## How It Works

1. User visits Vercel site
2. Frontend calls Railway: `/api/config`
3. Railway sends back the public Supabase URL and anon key
4. Frontend uses those to connect to Supabase
5. All secrets stay on Railway only!
