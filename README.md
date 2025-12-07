# MomentVault

A modern web application for capturing, organizing, and reliving your precious moments.

## Features
- **Modern UI:** Glassmorphism design, dark theme, and smooth animations.
- **Secure Authentication:** Powered by Supabase Auth.
- **Media Storage:** Store photos and videos securely.
- **Collections:** Organize moments into collections.

## 🚀 Live Demo

**Live Site:** [https://moment-vault-five.vercel.app](https://moment-vault-five.vercel.app)

## ✨ Features

- 🔐 **Secure Authentication** - Sign up, login, and password reset with Supabase
- 📸 **Moment Creation** - Capture your memories with photos and videos
- 🗂️ **Collections** - Organize moments into custom collections
- 🏷️ **Tags** - Categorize and find moments easily
- 🔒 **Privacy Controls** - Keep moments private or share them
- 📱 **Responsive Design** - Works beautifully on all devices

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.0
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Deployment:** Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Srujansai07/MomentVault.git
cd MomentVault
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
- Go to your Supabase project
- Navigate to SQL Editor
- Run the SQL script from `supabase/schema.sql`

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
MomentVault/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Landing page
│   │   ├── register/     # Registration page
│   │   ├── login/        # Login page
│   │   ├── dashboard/    # Dashboard
│   │   ├── moments/      # Moments gallery & creation
│   │   ├── collections/  # Collections management
│   │   └── forgot-password/ # Password reset
│   └── lib/
│       └── supabase.ts   # Supabase client & auth helpers
├── supabase/
│   └── schema.sql        # Database schema
├── public/               # Static assets
└── package.json
```

## 🗄️ Database Schema

The app uses the following main tables:
- **profiles** - User profiles
- **moments** - User moments/memories
- **media** - Photos and videos
- **tags** - Moment tags
- **collections** - Moment collections
- **moment_tags** - Moment-tag relationships
- **collection_moments** - Collection-moment relationships

All tables have Row Level Security (RLS) enabled for data protection.

## 🚀 Deployment

The app is configured for automatic deployment on Vercel:

1. Push to GitHub
2. Vercel automatically deploys
3. Add environment variables in Vercel dashboard

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ using Next.js and Supabase
