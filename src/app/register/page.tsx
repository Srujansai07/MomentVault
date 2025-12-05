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
        <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-10 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <Link href="/" className="block text-center mb-8">
                    <span className="text-3xl font-bold text-gradient">MomentVault</span>
                </Link>

                {/* Card */}
                <div className="glass rounded-3xl p-10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                        <p className="text-gray-400">Start preserving your moments today</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6 text-red-400 text-center">
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
                                className="input-field"
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
                                className="input-field"
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
                                className="input-field"
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
                                className="input-field"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-start gap-3 text-sm text-gray-400">
                            <input type="checkbox" className="mt-1 rounded" required />
                            <span>
                                I agree to the{" "}
                                <Link href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</Link>{" "}
                                and{" "}
                                <Link href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating account...
                                </>
                            ) : (
                                "Create Account →"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                            Sign in
                        </Link>
                    </div>
                </div>

                {/* Benefits */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-center text-gray-500 text-xs">
                    <div>
                        <div className="text-lg mb-1">🔒</div>
                        Secure & Private
                    </div>
                    <div>
                        <div className="text-lg mb-1">☁️</div>
                        Cloud Backup
                    </div>
                    <div>
                        <div className="text-lg mb-1">🎁</div>
                        Free Forever
                    </div>
                </div>
            </div>
        </div>
    );
}
