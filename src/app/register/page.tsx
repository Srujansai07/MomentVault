"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authHelpers } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const registerSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setError("");
        setSuccess("");

        const { data: signUpData, error: signUpError } = await authHelpers.signUp(
            data.email,
            data.password,
            data.fullName
        );

        if (signUpError) {
            setError(signUpError.message);
            return;
        }

        // Check if we have a session (Auto-confirm enabled)
        if (signUpData.session) {
            window.location.href = "/dashboard";
            return;
        }

        // Try to sign in immediately
        const { data: signInData, error: signInError } = await authHelpers.signIn(
            data.email,
            data.password
        );

        if (signInData.session) {
            window.location.href = "/dashboard";
        } else if (signInError) {
            if (signInError.message.includes("Email not confirmed")) {
                setSuccess("Account created! Please check your email to confirm your registration.");
            } else {
                setError(signInError.message);
            }
        } else {
            router.push("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <Link href="/" className="text-2xl font-bold tracking-tight inline-block mb-2">
                        MomentVault
                    </Link>
                    <p className="text-[#A1A1AA]">Create your private vault</p>
                </div>

                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl">Get Started</CardTitle>
                        <CardDescription>Create an account to preserve your memories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4 text-green-400 text-sm text-center">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("fullName")}
                                />
                                {errors.fullName && (
                                    <p className="text-sm text-red-400">{errors.fullName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-400">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-400">{errors.password.message}</p>
                                )}
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-sm text-[#52525B]">
                    Already have an account?{" "}
                    <Link href="/login" className="text-white hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
