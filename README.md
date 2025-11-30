# MomentVault 🏛️

A beautiful, secure application for capturing and preserving your precious moments.

## 🚀 Tech Stack (PERN)

- **Frontend**: React + Vite + TailwindCSS (Deployed on Vercel)
- **Backend**: Node.js + Express (Deployed on Railway)
- **Database**: PostgreSQL via Supabase
- **Storage**: Supabase Storage for media files

## 📁 Project Structure

```
MomentVault/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   └── App.jsx      # Main app component
│   └── package.json
├── server/              # Express backend
│   ├── src/
│   │   ├── controllers/ # Route handlers
│   │   ├── routes/      # API routes
│   │   └── index.js     # Server entry point
│   └── package.json
└── legacy_backup/       # Original vanilla JS implementation
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Vercel account (for frontend deployment)
- Railway account (for backend deployment)

### Local Development

#### Client Setup
```bash
cd client
npm install
npm run dev
```

#### Server Setup
```bash
cd server
npm install
npm run dev
```

### Environment Variables

#### Client (.env)
```
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Server (.env)
```
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

## 📦 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set the root directory to `client`
3. Add environment variables
4. Deploy!

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Set the root directory to `server`
3. Add environment variables
4. Deploy!

## ✨ Features

- 🔐 Secure password-protected vault
- 📸 Photo, video, and audio moment capture
- 📝 Rich text notes with formatting
- 🎨 Beautiful glassmorphic UI design
- 📱 Progressive Web App (PWA) support
- ☁️ Cloud sync with Supabase
- 🔄 Automatic backups
- 🧳 Time Travel feature (view moments from same date in different years)

## 📄 License

MIT

## 👨‍💻 Author

Srujansai07
