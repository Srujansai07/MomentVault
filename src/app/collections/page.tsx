"use client";

import { useEffect, useState } from "react";
import { authHelpers } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
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
            <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f23]">
            <Sidebar />

            <main className="ml-64 p-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Collections</h1>
                        <p className="text-gray-400">Organize your moments</p>
                    </div>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="btn-primary"
                    >
                        + New Collection
                    </button>
                </div>

                {/* Create Modal/Inline Form */}
                {isCreating && (
                    <div className="mb-8 card border-purple-500/50">
                        <h3 className="text-lg font-bold mb-4">Create New Collection</h3>
                        <form onSubmit={handleCreateCollection} className="flex gap-4">
                            <input
                                type="text"
                                value={newCollectionName}
                                onChange={(e) => setNewCollectionName(e.target.value)}
                                placeholder="Collection Name (e.g., Summer 2024)"
                                className="input-field flex-1"
                                autoFocus
                            />
                            <button type="submit" className="btn-primary">
                                Create
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}

                {/* Grid */}
                {collections.length === 0 ? (
                    <div className="glass rounded-3xl p-16 text-center">
                        <div className="text-6xl mb-6">📂</div>
                        <h3 className="text-2xl font-bold mb-3">No collections yet</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Create collections to organize your moments by events, places, or people.
                        </p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="btn-primary"
                        >
                            Create Your First Collection →
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {collections.map((collection) => (
                            <div key={collection.id} className="card group hover:border-cyan-500/50 cursor-pointer">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-4xl">📂</div>
                                    <button className="text-gray-500 hover:text-red-400 transition-colors">
                                        🗑️
                                    </button>
                                </div>
                                <h3 className="font-bold text-xl mb-2 group-hover:text-cyan-400 transition-colors">
                                    {collection.name}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    {collection.description || "No description"}
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/10 pt-4">
                                    <span>Created {new Date(collection.created_at).toLocaleDateString()}</span>
                                    <span className="bg-white/5 px-2 py-1 rounded">0 moments</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
