"use client";

import { useState } from "react";
import { authHelpers } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        const { error: signUpError } = await authHelpers.signUp(email, password, name);

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-grid-pattern flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] right-[20%] w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-float"></div>
                <div className="absolute bottom-[20%] left-[20%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-float-delayed"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-3 mb-10 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                        M
                    </div>
                    <span className="text-3xl font-bold text-white tracking-tight">MomentVault</span>
                </Link>

                {/* Card */}
                <div className="glass-panel rounded-3xl p-10 border border-white/10 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2 text-white">Create Account</h1>
                        <p className="text-gray-400">Start preserving your moments today</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 text-center text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input-modern w-full"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-modern w-full"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-modern w-full"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input-modern w-full"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-start gap-3 text-sm text-gray-400">
                            <input type="checkbox" className="mt-1 rounded bg-white/5 border-white/10 text-indigo-500 focus:ring-indigo-500" required />
                            <span>
                                I agree to the{" "}
                                <Link href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Terms of Service</Link>{" "}
                                and{" "}
                                <Link href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Privacy Policy</Link>
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-premium w-full flex items-center justify-center gap-2 py-3.5"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-gray-400 text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>

                {/* Benefits */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-center text-gray-500 text-xs font-medium">
                    <div>
                        <div className="text-xl mb-2">🔒</div>
                        Secure & Private
                    </div>
                    <div>
                        <div className="text-xl mb-2">☁️</div>
                        Cloud Backup
                    </div>
                    <div>
                        <div className="text-xl mb-2">🎁</div>
                        Free Forever
                    </div>
                </div>
            </div>
        </div>
    );
}
