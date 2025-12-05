"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CreateMomentPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        location: "",
    });
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles((prev) => [...prev, ...selectedFiles]);

        // Generate previews
        selectedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prev) => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { authHelpers } = await import("@/lib/supabase");
            const user = await authHelpers.getCurrentUser();
            if (!user) throw new Error("Not authenticated");

            // Create moment in database
            const { data: moment, error: momentError } = await supabase
                .from("moments")
                .insert({
                    user_id: user.id,
                    title: formData.title,
                    description: formData.description,
                    moment_date: formData.date,
                    location: formData.location,
                })
                .select()
                .single();

            if (momentError) throw momentError;

            // Upload files if any
            if (files.length > 0) {
                for (const file of files) {
                    const fileName = `${user.id}/${moment.id}/${Date.now()}_${file.name}`;

                    const { error: uploadError } = await supabase.storage
                        .from("moments")
                        .upload(fileName, file);

                    if (uploadError) throw uploadError;

                    // Save media record
                    await supabase.from("media").insert({
                        moment_id: moment.id,
                        user_id: user.id,
                        file_name: file.name,
                        file_path: fileName,
                        file_size: file.size,
                        file_type: file.type.startsWith("image/") ? "image" : "video",
                        mime_type: file.type,
                    });
                }
            }

            // Redirect to moments page
            window.location.href = "/moments";
        } catch (err: any) {
            setError(err.message || "Failed to create moment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
                        Create New Moment
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                                placeholder="Give your moment a title"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                                placeholder="Describe this moment..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Date *
                            </label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                                placeholder="Where was this moment?"
                            />
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Photos & Videos
                            </label>
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Upload Files
                                </label>
                                <p className="mt-2 text-sm text-gray-500">Images and videos</p>
                            </div>

                            {/* Previews */}
                            {previews.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    {previews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold transition-all ${loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"
                                    }`}
                            >
                                {loading ? "Creating..." : "Create Moment"}
                            </button>
                            <a
                                href="/moments"
                                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-center"
                            >
                                Cancel
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
