export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
                    Dashboard
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Moments</h3>
                        <p className="text-4xl font-bold text-purple-600">0</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Collections</h3>
                        <p className="text-4xl font-bold text-blue-600">0</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Shared</h3>
                        <p className="text-4xl font-bold text-pink-600">0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
