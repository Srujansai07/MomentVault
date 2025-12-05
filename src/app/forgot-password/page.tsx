"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Placeholder - will integrate Supabase later
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Reset Password
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                    Enter your email to receive reset instructions
                </p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="john@example.com"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold transition-all ${loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"
                                }`}
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <div className="mb-4 text-green-600 dark:text-green-400">
                            ✓ Reset link sent!
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Check your email for password reset instructions.
                        </p>
                    </div>
                )}

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Remember your password?{" "}
                    <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
