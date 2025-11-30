import { useEffect, useState } from 'react'
import { initializeConfig } from './config'

function App() {
    const [configLoaded, setConfigLoaded] = useState(false);

    useEffect(() => {
        // Load config from backend on startup
        initializeConfig().then(() => {
            setConfigLoaded(true);
        });
    }, []);

    if (!configLoaded) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading configuration...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-4">
                    MomentVault
                </h1>
                <p className="text-xl text-slate-400">
                    Your precious moments, securely stored.
                </p>
                <div className="mt-8 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                    <p>✅ Client is running!</p>
                    <p className="text-sm text-slate-500 mt-2">Configuration loaded from backend</p>
                </div>
            </div>
        </div>
    )
}

export default App
