"use client";

import { useEffect, useState } from "react";
import { authHelpers } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({ moments: 0, collections: 0, media: 0 });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const currentUser = await authHelpers.getCurrentUser();
        if (!currentUser) {
            router.push("/login");
            return;
        }
        setUser(currentUser);
        await fetchStats(currentUser.id);
        setLoading(false);
    };

    const fetchStats = async (userId: string) => {
        const [momentsRes, collectionsRes, mediaRes] = await Promise.all([
            supabase.from("moments").select("id", { count: "exact" }).eq("user_id", userId),
            supabase.from("collections").select("id", { count: "exact" }).eq("user_id", userId),
            supabase.from("media").select("id", { count: "exact" }).eq("user_id", userId),
        ]);

        setStats({
            moments: momentsRes.count || 0,
            collections: collectionsRes.count || 0,
            media: mediaRes.count || 0,
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f23]">
            <Sidebar />

            {/* Main Content */}
            <main className="ml-64 p-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Welcome back! 👋</h1>
                        <p className="text-gray-400">{user?.email}</p>
                    </div>
                    <Link href="/moments/create" className="btn-primary">
                        + New Moment
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="card relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all"></div>
                        <div className="text-4xl mb-4">📸</div>
                        <div className="text-3xl font-bold text-gradient">{stats.moments}</div>
                        <div className="text-gray-400">Total Moments</div>
                    </div>

                    <div className="card relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all"></div>
                        <div className="text-4xl mb-4">📂</div>
                        <div className="text-3xl font-bold text-gradient">{stats.collections}</div>
                        <div className="text-gray-400">Collections</div>
                    </div>

                    <div className="card relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/20 rounded-full blur-2xl group-hover:bg-pink-500/30 transition-all"></div>
                        <div className="text-4xl mb-4">🖼️</div>
                        <div className="text-3xl font-bold text-gradient">{stats.media}</div>
                        <div className="text-gray-400">Media Files</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/moments/create" className="card text-center hover:border-purple-500/50 flex flex-col items-center justify-center py-8">
                            <div className="text-3xl mb-2">📤</div>
                            <div className="font-medium">Upload Photos</div>
                        </Link>
                        <Link href="/collections" className="card text-center hover:border-purple-500/50 flex flex-col items-center justify-center py-8">
                            <div className="text-3xl mb-2">📁</div>
                            <div className="font-medium">New Collection</div>
                        </Link>
                        <Link href="/moments" className="card text-center hover:border-purple-500/50 flex flex-col items-center justify-center py-8">
                            <div className="text-3xl mb-2">🔍</div>
                            <div className="font-medium">Browse All</div>
                        </Link>
                        <Link href="#" className="card text-center hover:border-purple-500/50 flex flex-col items-center justify-center py-8">
                            <div className="text-3xl mb-2">🔗</div>
                            <div className="font-medium">Share Link</div>
                        </Link>
                    </div>
                </div>

                {/* Empty State */}
                {stats.moments === 0 && (
                    <div className="glass rounded-3xl p-16 text-center">
                        <div className="text-6xl mb-6">📷</div>
                        <h3 className="text-2xl font-bold mb-3">No moments yet</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Start capturing your precious memories. Upload your first photo or video to get started.
                        </p>
                        <Link href="/moments/create" className="btn-primary">
                            Upload Your First Moment →
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
