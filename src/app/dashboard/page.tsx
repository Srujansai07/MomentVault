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
            <div className="min-h-screen bg-[#030014] flex items-center justify-center">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20"></div>
                    <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-grid-pattern">
            <Sidebar />

            {/* Main Content */}
            <main className="ml-72 p-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 text-white">
                            Welcome back, <span className="text-gradient-gold">{user?.user_metadata?.full_name?.split(' ')[0] || 'Explorer'}</span> 👋
                        </h1>
                        <p className="text-gray-400">Here's what's happening in your vault today.</p>
                    </div>
                    <Link href="/moments/create" className="btn-premium flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        New Moment
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+12%</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats.moments}</div>
                        <div className="text-sm text-gray-400">Total Moments</div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            </div>
                            <span className="text-xs font-medium text-gray-500 bg-white/5 px-2 py-1 rounded-full">Active</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats.collections}</div>
                        <div className="text-sm text-gray-400">Collections</div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all"></div>
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <span className="text-xs font-medium text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-full">New</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats.media}</div>
                        <div className="text-sm text-gray-400">Media Files</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-12">
                    <h2 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/moments/create" className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-all group text-center border border-white/5 hover:border-indigo-500/30">
                            <div className="w-12 h-12 mx-auto bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            </div>
                            <div className="font-medium text-white">Upload Photos</div>
                        </Link>
                        <Link href="/collections" className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-all group text-center border border-white/5 hover:border-purple-500/30">
                            <div className="w-12 h-12 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path></svg>
                            </div>
                            <div className="font-medium text-white">New Collection</div>
                        </Link>
                        <Link href="/moments" className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-all group text-center border border-white/5 hover:border-pink-500/30">
                            <div className="w-12 h-12 mx-auto bg-pink-500/10 rounded-full flex items-center justify-center text-pink-400 mb-3 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <div className="font-medium text-white">Browse All</div>
                        </Link>
                        <button className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-all group text-center border border-white/5 hover:border-cyan-500/30">
                            <div className="w-12 h-12 mx-auto bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                            </div>
                            <div className="font-medium text-white">Share Link</div>
                        </button>
                    </div>
                </div>

                {/* Empty State */}
                {stats.moments === 0 && (
                    <div className="glass-panel rounded-3xl p-16 text-center border border-dashed border-white/10">
                        <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center text-4xl mb-6">
                            📷
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Your vault is empty</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Start capturing your precious memories. Upload your first photo or video to get started.
                        </p>
                        <Link href="/moments/create" className="btn-premium inline-flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            Upload Your First Moment
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
