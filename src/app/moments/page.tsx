export default function MomentsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        My Moments
                    </h1>
                    <a
                        href="/moments/create"
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                    >
                        Create Moment
                    </a>
                </div>

                <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No moments yet</p>
                    <a
                        href="/moments/create"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                    >
                        Create Your First Moment
                    </a>
                </div>
            </div>
        </div>
    );
}
