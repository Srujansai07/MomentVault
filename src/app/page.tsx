"use client";

import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-grid-pattern relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-float-delayed"></div>
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            M
                        </div>
                        <span className="text-white">MomentVault</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link href="/register" className="btn-premium text-sm py-2 px-6">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="text-left z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-indigo-500/30 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span className="text-xs font-medium text-indigo-300 tracking-wide uppercase">New: AI Auto-Tagging</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                            Preserve Your <br />
                            <span className="text-gradient-primary">Digital Legacy</span>
                        </h1>

                        <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
                            The most secure and elegant way to store, organize, and relive your life's most precious moments. Powered by AI, designed for privacy.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link href="/register" className="btn-premium w-full sm:w-auto text-center">
                                Start Your Vault
                            </Link>
                            <Link href="#features" className="btn-ghost w-full sm:w-auto text-center">
                                View Demo
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8 text-gray-500 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span>End-to-End Encrypted</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span>Unlimited Collections</span>
                            </div>
                        </div>
                    </div>

                    {/* 3D Mockup Visualization */}
                    <div className="relative perspective-1000 hidden lg:block">
                        <div className="relative transform rotate-y-[-12deg] rotate-x-[5deg] hover:rotate-y-[-5deg] hover:rotate-x-[2deg] transition-transform duration-700 ease-out">
                            <div className="glass-panel rounded-2xl p-4 w-full h-[500px] relative overflow-hidden border-t border-l border-white/20 shadow-2xl">
                                {/* Mock UI Header */}
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                    </div>
                                    <div className="h-2 w-32 bg-white/10 rounded-full"></div>
                                </div>
                                {/* Mock UI Content */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2 h-40 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/5 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div className="h-40 rounded-xl bg-white/5 border border-white/5"></div>
                                    <div className="h-40 rounded-xl bg-white/5 border border-white/5"></div>
                                    <div className="col-span-2 h-40 rounded-xl bg-white/5 border border-white/5"></div>
                                </div>
                                {/* Floating Element */}
                                <div className="absolute bottom-10 right-10 glass-panel p-4 rounded-xl animate-float-delayed border border-white/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                                        <div>
                                            <div className="text-xs text-gray-400">Upload Status</div>
                                            <div className="text-sm font-bold text-white">Complete</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Crafted for <span className="text-gradient-primary">Perfection</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Every pixel is designed to provide the best possible experience for managing your digital life.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="glass-panel p-8 rounded-2xl md:col-span-2 hover:bg-white/5 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Smart AI Organization</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Automatically categorize your photos by people, places, and events using advanced computer vision. No more manual tagging required.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Military-Grade Encryption</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Your data is encrypted at rest and in transit. Only you hold the keys to your memories.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Collections</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Curate beautiful albums and share them with loved ones via secure, time-limited links.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="glass-panel p-8 rounded-2xl md:col-span-2 hover:bg-white/5 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Instant Search</h3>
                            <p className="text-gray-400 leading-relaxed">
                                "Show me photos of the beach from last summer." Our natural language search understands exactly what you're looking for.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto glass-panel rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-6 text-white">Ready to start your journey?</h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of users who trust MomentVault to keep their memories safe, organized, and beautiful.
                        </p>
                        <Link href="/register" className="btn-premium text-lg px-10 py-4 inline-block">
                            Create Free Account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
                <p>© 2024 MomentVault. Crafted with precision.</p>
            </footer>
        </div>
    );
}
