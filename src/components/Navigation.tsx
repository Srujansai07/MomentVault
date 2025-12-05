import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                MomentVault
                            </span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-purple-600"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/moments"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-purple-600"
                            >
                                Moments
                            </Link>
                            <Link
                                href="/collections"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-purple-600"
                            >
                                Collections
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link
                            href="/moments/create"
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                        >
                            Create
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
