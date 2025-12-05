"use client";

import { useState } from "react";
import { authHelpers } from "@/lib/supabase";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        const { error: resetError } = await authHelpers.resetPassword(email);

        if (resetError) {
            setError(resetError.message);
        } else {
            setMessage("Check your email for the password reset link");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <Link href="/" className="block text-center mb-10">
                    <span className="text-3xl font-bold text-gradient">MomentVault</span>
                </Link>

                {/* Card */}
                <div className="glass rounded-3xl p-10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                        <p className="text-gray-400">Enter your email to receive instructions</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6 text-red-400 text-center">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 mb-6 text-green-400 text-center">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Sending...
                                </>
                            ) : (
                                "Send Reset Link →"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-gray-400">
                        Remember your password?{" "}
                        <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
