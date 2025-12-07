"use client";

import { useEffect, useState } from "react";
import { authHelpers } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function MomentsPage() {
    const [loading, setLoading] = useState(true);
    const [moments, setMoments] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchMoments();
    }, []);

    const fetchMoments = async () => {
        const user = await authHelpers.getCurrentUser();
        if (!user) {
            router.push("/login");
            return;
        }

        const { data, error } = await supabase
            .from("moments")
            .select(`
        *,
        media (*)
      `)
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (data) {
            setMoments(data);
        }
        setLoading(false);
    };

    const filteredMoments = moments.filter((moment) =>
        moment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        moment.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

            <main className="ml-72 p-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 text-white">My Moments</h1>
                        <p className="text-gray-400">Your captured memories</p>
                    </div>
                    <Link href="/moments/create" className="btn-premium flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        New Moment
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <div className="relative max-w-md">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Search moments..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-modern pl-12"
                        />
                    </div>
                </div>

                {/* Grid */}
                {filteredMoments.length === 0 ? (
                    <div className="glass-panel rounded-3xl p-16 text-center border border-dashed border-white/10">
                        <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center text-4xl mb-6">
                            📷
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">
                            {searchQuery ? "No matches found" : "No moments yet"}
                        </h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            {searchQuery
                                ? "Try adjusting your search terms"
                                : "Start capturing your precious memories. Upload your first photo or video."}
                        </p>
                        {!searchQuery && (
                            <Link href="/moments/create" className="btn-premium inline-flex items-center gap-2">
                                Upload Your First Moment
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMoments.map((moment) => (
                            <div key={moment.id} className="glass-panel group p-0 overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all">
                                <div className="aspect-video relative bg-gray-900">
                                    {moment.media && moment.media[0] ? (
                                        moment.media[0].type === "video" ? (
                                            <video
                                                src={supabase.storage.from("moments").getPublicUrl(moment.media[0].file_path).data.publicUrl}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <img
                                                src={supabase.storage.from("moments").getPublicUrl(moment.media[0].file_path).data.publicUrl}
                                                alt={moment.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        )
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600 bg-white/5">
                                            No Media
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <button className="btn-premium w-full text-sm py-2">View Details</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg mb-1 truncate text-white">{moment.title}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                                        {moment.description || "No description"}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-3">
                                        <span>{new Date(moment.created_at).toLocaleDateString()}</span>
                                        <span className="bg-white/5 px-2 py-1 rounded text-gray-400">{moment.media?.length || 0} items</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
