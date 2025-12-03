import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Types
interface ConfigResponse {
    supabaseUrl: string;
    supabaseAnonKey: string;
}

// Config endpoint - provides public config to frontend
app.get('/api/config', (_req: Request, res: Response<ConfigResponse>) => {
    res.json({
        supabaseUrl: process.env.SUPABASE_URL || '',
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '', // This is safe to expose (it's the PUBLIC key)
    });
});

// Health check
app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'MomentVault API is running! 🚀' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
