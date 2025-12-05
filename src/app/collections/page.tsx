"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Collection {
    id: string;
    name: string;
    description: string;
    is_private: boolean;
    created_at: string;
    moment_count: number;
}

export default function CollectionsPage() {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newCollection, setNewCollection] = useState({ name: "", description: "", is_private: false });

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const { authHelpers } = await import("@/lib/supabase");
            const user = await authHelpers.getCurrentUser();
            if (!user) {
                window.location.href = "/login";
                return;
            }

            const { data, error } = await supabase
                .from("collections")
                .select(`
          *,
          collection_moments (count)
        `)
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) throw error;

            const transformedCollections = (data || []).map((col: any) => ({
                ...col,
                moment_count: col.collection_moments?.[0]?.count || 0,
            }));

            setCollections(transformedCollections);
        } catch (error) {
            console.error("Error fetching collections:", error);
        } finally {
            setLoading(false);
        }
    };

    const createCollection = async () => {
        try {
            const { authHelpers } = await import("@/lib/supabase");
            const user = await authHelpers.getCurrentUser();
            if (!user) return;

            const { error } = await supabase.from("collections").insert({
                user_id: user.id,
                name: newCollection.name,
                description: newCollection.description,
                is_private: newCollection.is_private,
            });

            if (error) throw error;

            setShowModal(false);
            setNewCollection({ name: "", description: "", is_private: false });
            fetchCollections();
        } catch (error) {
            console.error("Error creating collection:", error);
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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Collections
                    </h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                    >
                        Create Collection
                    </button>
                </div>

                {collections.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">No collections yet</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                        >
                            Create Your First Collection
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {collections.map((collection) => (
                            <div
                                key={collection.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105"
                            >
                                <div className="aspect-video bg-gradient-to-br from-purple-400 to-blue-400"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {collection.name}
                                    </h3>
                                    {collection.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                            {collection.description}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-500">
                                            {collection.moment_count} moments
                                        </span>
                                        {collection.is_private && (
                                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                                                Private
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Create Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Create Collection
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={newCollection.name}
                                        onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                                        placeholder="My Collection"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={newCollection.description}
                                        onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                                        placeholder="Describe your collection..."
                                    />
                                </div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={newCollection.is_private}
                                        onChange={(e) => setNewCollection({ ...newCollection, is_private: e.target.checked })}
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Make private</span>
                                </label>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={createCollection}
                                    disabled={!newCollection.name}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                                >
                                    Create
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
