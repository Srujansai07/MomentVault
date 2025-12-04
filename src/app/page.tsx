export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Hero Section */}
                    <div className="mb-12">
                        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            MomentVault
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Capture, preserve, and cherish your precious moments forever
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📸</div>
                            <h3 className="text-lg font-semibold mb-2">Capture Moments</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Store photos, videos, and memories in one secure place
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-lg font-semibold mb-2">Secure Storage</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your memories are encrypted and safely stored in the cloud
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="text-lg font-semibold mb-2">Relive Memories</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Organize and revisit your favorite moments anytime
                            </p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-4 justify-center">
                        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
                            Get Started
                        </button>
                        <button className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full font-semibold border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:scale-105">
                            Learn More
                        </button>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">
                            Live on Vercel
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
