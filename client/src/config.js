// Configuration that gets loaded from backend
// No environment variables needed in Vercel!

export const config = {
    // Backend will provide these
    API_URL: import.meta.env.VITE_API_URL || 'https://momentvault-production.up.railway.app',

    // These are PUBLIC and safe to hardcode
    SUPABASE_URL: 'https://rnmsrpqwligboxggnktq.supabase.co',

    // We'll fetch the anon key from the backend on app load
    // This way it's not in the code or in Vercel settings
    SUPABASE_ANON_KEY: null, // Will be fetched from /api/config
};

// Fetch config from backend on app start
export async function initializeConfig() {
    try {
        const response = await fetch(`${config.API_URL}/api/config`);
        const data = await response.json();
        config.SUPABASE_ANON_KEY = data.supabaseAnonKey;
        return config;
    } catch (error) {
        console.error('Failed to load config:', error);
        // Fallback: you can hardcode the anon key here if needed
        // config.SUPABASE_ANON_KEY = 'your_anon_key';
    }
}
