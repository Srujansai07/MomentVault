"use client";

import { useEffect, useState } from "react";
import { authHelpers } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const user = await authHelpers.getCurrentUser();
            if (!user) {
                router.push("/login");
            } else {
                setUser(user);
            }
            setLoading(false);
        };
        checkUser();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#A1A1AA]">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#050505]">
            <Sidebar />
            <main className="flex-1 p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
                    <p className="text-[#A1A1AA]">Welcome back, {user?.user_metadata?.full_name || user?.email}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="card-minimal">
                        <div className="text-[#A1A1AA] text-sm font-medium mb-1">Total Moments</div>
                        <div className="text-3xl font-bold">0</div>
                    </div>
                    <div className="card-minimal">
                        <div className="text-[#A1A1AA] text-sm font-medium mb-1">Collections</div>
                        <div className="text-3xl font-bold">0</div>
                    </div>
                    <div className="card-minimal">
                        <div className="text-[#A1A1AA] text-sm font-medium mb-1">Storage Used</div>
                        <div className="text-3xl font-bold">0 MB</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Recent Moments</h2>
                            <Link href="/moments/create" className="text-sm text-white hover:underline">
                                + Add New
                            </Link>
                        </div>
                        <div className="card-minimal text-center py-12">
                            <p className="text-[#A1A1AA] mb-4">No moments yet.</p>
                            <Link href="/moments/create" className="btn-primary inline-block">
                                Upload First Moment
                            </Link>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Quick Actions</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/moments/create" className="card-minimal hover:bg-[#121212] transition-colors flex flex-col items-center justify-center py-8 gap-3">
                                <span className="text-2xl">📸</span>
                                <span className="font-medium">Upload Photo</span>
                            </Link>
                            <Link href="/collections" className="card-minimal hover:bg-[#121212] transition-colors flex flex-col items-center justify-center py-8 gap-3">
                                <span className="text-2xl">🗂️</span>
                                <span className="font-medium">New Collection</span>
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
