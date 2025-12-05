"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        moments: 0,
        collections: 0,
        media: 0,
    });
    const [recentMoments, setRecentMoments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const { authHelpers } = await import("@/lib/supabase");
            const user = await authHelpers.getCurrentUser();
            if (!user) {
                window.location.href = "/login";
                return;
            }

            // Fetch stats
            const [momentsData, collectionsData, mediaData, recentData] = await Promise.all([
                supabase.from("moments").select("id", { count: "exact", head: true }).eq("user_id", user.id),
                supabase.from("collections").select("id", { count: "exact", head: true }).eq("user_id", user.id),
                supabase.from("media").select("id", { count: "exact", head: true }).eq("user_id", user.id),
                supabase.from("moments").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
            ]);

            setStats({
                moments: momentsData.count || 0,
                collections: collectionsData.count || 0,
                media: mediaData.count || 0,
            });

            setRecentMoments(recentData.data || []);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
                    Dashboard
                </h1>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Moments</h3>
                        <p className="text-4xl font-bold text-purple-600">{stats.moments}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Collections</h3>
                        <p className="text-4xl font-bold text-blue-600">{stats.collections}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Media Files</h3>
                        <p className="text-4xl font-bold text-pink-600">{stats.media}</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href="/moments/create"
                            className="p-4 border-2 border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all text-center"
                        >
                            <div className="text-3xl mb-2">📸</div>
                            <div className="font-semibold text-gray-900 dark:text-white">Create Moment</div>
                        </Link>
                        <Link
                            href="/moments"
                            className="p-4 border-2 border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-center"
                        >
                            <div className="text-3xl mb-2">🗂️</div>
                            <div className="font-semibold text-gray-900 dark:text-white">View Moments</div>
                        </Link>
                        <Link
                            href="/collections"
                            className="p-4 border-2 border-pink-200 dark:border-pink-800 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all text-center"
                        >
                            <div className="text-3xl mb-2">📚</div>
                            <div className="font-semibold text-gray-900 dark:text-white">Collections</div>
                        </Link>
                    </div>
                </div>

                {/* Recent Moments */}
                {recentMoments.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Moments</h2>
                        <div className="space-y-3">
                            {recentMoments.map((moment) => (
                                <div
                                    key={moment.id}
                                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                                >
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{moment.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {new Date(moment.moment_date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
