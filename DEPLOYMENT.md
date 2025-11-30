# Deployment Guide

## Supabase Setup

1. Go to your Supabase Dashboard: https://app.supabase.com/project/rnmsrpqwligboxggnktq
2. Navigate to SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Run the SQL script to create tables and policies
5. Go to Project Settings > API to get your keys:
   - `SUPABASE_URL`: https://rnmsrpqwligboxggnktq.supabase.co
   - `SUPABASE_ANON_KEY`: Found in "Project API keys" section
   - `SUPABASE_SERVICE_KEY`: Found in "Project API keys" section (keep this secret!)

## Railway Deployment (Backend)

1. Go to Railway Dashboard
2. Create new project or select existing: MomentVault (ID: 13e89172-72bf-461a-b968-100a4462173a)
3. Connect your GitHub repository
4. Set root directory to `server`
5. Add environment variables:
   ```
   PORT=3000
   SUPABASE_URL=https://rnmsrpqwligboxggnktq.supabase.co
   SUPABASE_SERVICE_KEY=<your_service_key>
   DATABASE_URL=postgresql://postgres:231100814aiiTgn@db.rnmsrpqwligboxggnktq.supabase.co:5432/postgres
   ```
6. Deploy!
7. Copy the generated Railway URL (e.g., `https://momentvault-production.up.railway.app`)

## Vercel Deployment (Frontend)

1. Your Vercel project is already set up: moment-vault (ID: prj_BGW08XFb4YSiz28gsOaF4Ch4VlQG)
2. Go to Project Settings > Environment Variables
3. Add the following variables:
   ```
   VITE_API_URL=<your_railway_url>
   VITE_SUPABASE_URL=https://rnmsrpqwligboxggnktq.supabase.co
   VITE_SUPABASE_ANON_KEY=<your_anon_key>
   ```
4. Set root directory to `client`
5. Redeploy to apply changes

## Testing

1. Visit your Vercel URL: https://moment-vault-five.vercel.app
2. Create an account
3. Test creating moments (text, photo, video, audio)
4. Verify data appears in Supabase dashboard

## Troubleshooting

- If Railway deployment fails, check the logs in Railway dashboard
- If Vercel build fails, check the build logs
- Ensure all environment variables are set correctly
- Check Supabase RLS policies are enabled
