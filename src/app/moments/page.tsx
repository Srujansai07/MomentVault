"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Moment {
    id: string;
    title: string;
    description: string;
    moment_date: string;
    location: string;
    is_favorite: boolean;
    created_at: string;
    media: Array<{
        id: string;
        file_path: string;
        file_type: string;
    }>;
}

export default function MomentsPage() {
    const [moments, setMoments] = useState<Moment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchMoments();
    }, []);

    const fetchMoments = async () => {
        try {
            const { authHelpers } = await import("@/lib/supabase");
            const user = await authHelpers.getCurrentUser();
            if (!user) {
                window.location.href = "/login";
                return;
            }

            const { data, error } = await supabase
                .from("moments")
                .select(`
          *,
          media (*)
        `)
                .eq("user_id", user.id)
                .order("moment_date", { ascending: false });

            if (error) throw error;

            setMoments(data || []);
        } catch (error) {
            console.error("Error fetching moments:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredMoments = moments.filter((moment) =>
        moment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        moment.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading moments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        My Moments
                    </h1>
                    <Link
                        href="/moments/create"
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                    >
                        Create Moment
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search moments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {filteredMoments.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {searchQuery ? "No moments found" : "No moments yet"}
                        </p>
                        <Link
                            href="/moments/create"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                        >
                            Create Your First Moment
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMoments.map((moment) => (
                            <div
                                key={moment.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105"
                            >
                                {moment.media[0] && (
                                    <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/moments/${moment.media[0].file_path}`}
                                            alt={moment.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {moment.title}
                                        </h3>
                                        {moment.is_favorite && (
                                            <span className="text-yellow-500">⭐</span>
                                        )}
                                    </div>
                                    {moment.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                                            {moment.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                                        <span>{new Date(moment.moment_date).toLocaleDateString()}</span>
                                        {moment.location && (
                                            <>
                                                <span>•</span>
                                                <span>{moment.location}</span>
                                            </>
                                        )}
                                    </div>
                                    {moment.media.length > 1 && (
                                        <div className="mt-2 text-xs text-gray-500">
                                            +{moment.media.length - 1} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
