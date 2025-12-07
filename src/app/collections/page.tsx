"use client";

import { useEffect, useState } from "react";
import { authHelpers } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function CollectionsPage() {
    const [loading, setLoading] = useState(true);
    const [collections, setCollections] = useState<any[]>([]);
    const [newCollectionName, setNewCollectionName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        const user = await authHelpers.getCurrentUser();
        if (!user) {
            router.push("/login");
            return;
        }

        const { data, error } = await supabase
            .from("collections")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (data) {
            setCollections(data);
        }
        setLoading(false);
    };

    const handleCreateCollection = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCollectionName.trim()) return;

        const user = await authHelpers.getCurrentUser();
        if (!user) return;

        const { data, error } = await supabase
            .from("collections")
            .insert({
                name: newCollectionName,
                user_id: user.id,
            })
            .select()
            .single();

        if (data) {
            setCollections([data, ...collections]);
            setNewCollectionName("");
            setIsCreating(false);
        }
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

            <main className="ml-72 p-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 text-white">Collections</h1>
                        <p className="text-gray-400">Organize your moments</p>
                    </div>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="btn-premium flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        New Collection
                    </button>
                </div>

                {/* Create Modal/Inline Form */}
                {isCreating && (
                    <div className="mb-8 glass-panel p-6 rounded-2xl border border-indigo-500/30 animate-fade-in">
                        <h3 className="text-lg font-bold mb-4 text-white">Create New Collection</h3>
                        <form onSubmit={handleCreateCollection} className="flex gap-4">
                            <input
                                type="text"
                                value={newCollectionName}
                                onChange={(e) => setNewCollectionName(e.target.value)}
                                placeholder="Collection Name (e.g., Summer 2024)"
                                className="input-modern flex-1"
                                autoFocus
                            />
                            <button type="submit" className="btn-premium px-6">
                                Create
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="btn-ghost px-6"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}

                {/* Grid */}
                {collections.length === 0 ? (
                    <div className="glass-panel rounded-3xl p-16 text-center border border-dashed border-white/10">
                        <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center text-4xl mb-6">
                            📂
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">No collections yet</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Create collections to organize your moments by events, places, or people.
                        </p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="btn-premium inline-flex items-center gap-2"
                        >
                            Create Your First Collection
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {collections.map((collection) => (
                            <div key={collection.id} className="glass-panel p-6 rounded-2xl group hover:border-indigo-500/50 cursor-pointer transition-all hover:bg-white/5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-2xl text-indigo-400 group-hover:scale-110 transition-transform">
                                        📂
                                    </div>
                                    <button className="text-gray-500 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                                <h3 className="font-bold text-xl mb-2 text-white group-hover:text-indigo-400 transition-colors">
                                    {collection.name}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                    {collection.description || "No description"}
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-4">
                                    <span>Created {new Date(collection.created_at).toLocaleDateString()}</span>
                                    <span className="bg-white/5 px-2 py-1 rounded text-gray-400">0 moments</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
