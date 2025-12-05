"use client";

import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0f0f23]">
            {/* Navbar */}
            <nav className="navbar flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-gradient">
                    MomentVault
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="btn-secondary">
                        Sign In
                    </Link>
                    <Link href="/register" className="btn-primary">
                        Get Started Free
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="section pt-40 relative overflow-hidden">
                {/* Floating shapes */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-[100px] floating"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-[100px] floating-delay"></div>
                <div className="absolute top-40 right-20 w-48 h-48 bg-pink-500/30 rounded-full blur-[80px] floating"></div>

                <div className="container text-center relative z-10">
                    <div className="inline-block px-6 py-2 rounded-full glass mb-8">
                        <span className="text-cyan-400">✨ Your memories, beautifully preserved</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                        Capture Life's
                        <span className="block text-gradient">Precious Moments</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                        Transform your photos and videos into stunning collections.
                        Organize, share, and relive your memories with our beautiful,
                        AI-powered platform.
                    </p>

                    <div className="flex items-center justify-center gap-6">
                        <Link href="/register" className="btn-primary text-lg px-10 py-4">
                            Start Free Trial →
                        </Link>
                        <Link href="#features" className="btn-secondary text-lg px-10 py-4">
                            See Features
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-16 mt-20">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gradient">10M+</div>
                            <div className="text-gray-500">Moments Saved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gradient">500K+</div>
                            <div className="text-gray-500">Happy Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gradient">99.9%</div>
                            <div className="text-gray-500">Uptime</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="section bg-[#0a0a1a]">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Everything You Need
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto">
                            Powerful features to capture, organize, and share your most precious moments
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card">
                            <div className="feature-icon bg-gradient-to-r from-purple-500 to-pink-500">
                                📸
                            </div>
                            <h3 className="text-xl font-bold mb-3">Smart Upload</h3>
                            <p className="text-gray-400">
                                Drag and drop your photos and videos. AI automatically organizes
                                and tags them for easy searching.
                            </p>
                        </div>

                        <div className="card">
                            <div className="feature-icon bg-gradient-to-r from-cyan-500 to-blue-500">
                                📂
                            </div>
                            <h3 className="text-xl font-bold mb-3">Collections</h3>
                            <p className="text-gray-400">
                                Create beautiful themed collections. Group memories by events,
                                places, or people you love.
                            </p>
                        </div>

                        <div className="card">
                            <div className="feature-icon bg-gradient-to-r from-orange-500 to-red-500">
                                🔒
                            </div>
                            <h3 className="text-xl font-bold mb-3">Private & Secure</h3>
                            <p className="text-gray-400">
                                Your memories are encrypted and private by default. Share only
                                what you want, when you want.
                            </p>
                        </div>

                        <div className="card">
                            <div className="feature-icon bg-gradient-to-r from-green-500 to-emerald-500">
                                🔍
                            </div>
                            <h3 className="text-xl font-bold mb-3">Smart Search</h3>
                            <p className="text-gray-400">
                                Find any moment instantly. Search by date, location, people,
                                or even objects in your photos.
                            </p>
                        </div>

                        <div className="card">
                            <div className="feature-icon bg-gradient-to-r from-violet-500 to-purple-500">
                                🎬
                            </div>
                            <h3 className="text-xl font-bold mb-3">Auto Memories</h3>
                            <p className="text-gray-400">
                                AI creates beautiful slideshows and highlights from your
                                best moments automatically.
                            </p>
                        </div>

                        <div className="card">
                            <div className="feature-icon bg-gradient-to-r from-pink-500 to-rose-500">
                                💝
                            </div>
                            <h3 className="text-xl font-bold mb-3">Share & Collaborate</h3>
                            <p className="text-gray-400">
                                Share collections with family and friends. Collaborate on
                                shared memories together.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section relative overflow-hidden">
                <div className="absolute inset-0 gradient-bg opacity-20"></div>
                <div className="container text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Preserve Your Moments?
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                        Join thousands of people who trust MomentVault to keep their
                        precious memories safe and beautiful.
                    </p>
                    <Link href="/register" className="btn-primary text-lg px-12 py-5 glow">
                        Get Started Free →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/10">
                <div className="container text-center text-gray-500">
                    <p>© 2024 MomentVault. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
