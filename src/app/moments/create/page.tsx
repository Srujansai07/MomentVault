"use client";

import { useState } from "react";
import { authHelpers } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function CreateMomentPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(e.target.files);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const user = await authHelpers.getCurrentUser();
            if (!user) throw new Error("Not authenticated");

            // 1. Create moment record
            const { data: moment, error: momentError } = await supabase
                .from("moments")
                .insert({
                    title,
                    description,
                    user_id: user.id,
                })
                .select()
                .single();

            if (momentError) throw momentError;

            // 2. Upload files if any
            if (files && files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const fileExt = file.name.split(".").pop();
                    const fileName = `${moment.id}/${Math.random()}.${fileExt}`;
                    const filePath = `${user.id}/${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from("moments")
                        .upload(filePath, file);

                    if (uploadError) throw uploadError;

                    // 3. Create media record
                    const { error: mediaError } = await supabase
                        .from("media")
                        .insert({
                            moment_id: moment.id,
                            user_id: user.id,
                            file_path: filePath,
                            type: file.type.startsWith("video/") ? "video" : "image",
                            mime_type: file.type,
                            size: file.size,
                        });

                    if (mediaError) throw mediaError;
                }
            }

            router.push("/moments");
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f23]">
            <Sidebar />

            <main className="ml-64 p-10">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Create New Moment</h1>
                        <p className="text-gray-400">Capture and preserve your memories</p>
                    </div>

                    <div className="card">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6 text-red-400 text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="input-field"
                                    placeholder="e.g., Summer Vacation 2024"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="input-field min-h-[120px]"
                                    placeholder="Tell the story behind this moment..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Photos & Videos
                                </label>
                                <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,video/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="text-4xl mb-3">☁️</div>
                                    <p className="font-medium mb-1">Click to upload or drag and drop</p>
                                    <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 10MB)</p>
                                    {files && (
                                        <div className="mt-4 text-purple-400 font-medium">
                                            {files.length} file(s) selected
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Moment"
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="btn-secondary px-8"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
