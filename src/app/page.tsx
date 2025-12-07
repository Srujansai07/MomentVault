import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Minimal Navbar */}
            <nav className="border-b border-[#2A2A2A] bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container-custom h-16 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-tight">MomentVault</div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            Log in
                        </Link>
                        <Link href="/register" className="btn-primary py-2 px-4 text-sm">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-32 text-center">
                    <div className="container-custom">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Your Memories.<br />
                            <span className="text-[#A1A1AA]">Secure & Timeless.</span>
                        </h1>
                        <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed">
                            A private sanctuary for your most precious moments.
                            No clutter, no distractions. Just you and your memories.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <Link href="/register" className="btn-primary">
                                Start Your Vault
                            </Link>
                            <Link href="/login" className="btn-secondary">
                                View Demo
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Minimal Feature List */}
                <section className="py-24 border-t border-[#2A2A2A]">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-[#121212] rounded-lg flex items-center justify-center border border-[#2A2A2A]">
                                    🔒
                                </div>
                                <h3 className="text-xl font-semibold">Private by Design</h3>
                                <p className="text-[#A1A1AA]">
                                    Your photos and videos are encrypted and stored securely. Only you have access.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-[#121212] rounded-lg flex items-center justify-center border border-[#2A2A2A]">
                                    ✨
                                </div>
                                <h3 className="text-xl font-semibold">Zero Clutter</h3>
                                <p className="text-[#A1A1AA]">
                                    A distraction-free interface that puts your content front and center.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-[#121212] rounded-lg flex items-center justify-center border border-[#2A2A2A]">
                                    ♾️
                                </div>
                                <h3 className="text-xl font-semibold">Always There</h3>
                                <p className="text-[#A1A1AA]">
                                    Access your vault from any device, anytime. Your memories, preserved forever.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-[#2A2A2A] text-center text-[#52525B] text-sm">
                <div className="container-custom">
                    <p>&copy; {new Date().getFullYear()} MomentVault. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
