"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authHelpers } from "@/lib/supabase";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await authHelpers.signOut();
        router.push("/");
    };

    const isActive = (path: string) => {
        return pathname === path || pathname?.startsWith(path + "/");
    };

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-[#0a0a1a] border-r border-white/10 p-6 z-50">
            <Link href="/" className="text-2xl font-bold text-gradient block mb-10">
                MomentVault
            </Link>

            <nav className="space-y-2">
                <Link
                    href="/dashboard"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/dashboard"
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                            : "text-gray-400 hover:bg-white/5"
                        }`}
                >
                    <span>📊</span> Dashboard
                </Link>
                <Link
                    href="/moments"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/moments"
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                            : "text-gray-400 hover:bg-white/5"
                        }`}
                >
                    <span>📸</span> My Moments
                </Link>
                <Link
                    href="/moments/create"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/moments/create"
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                            : "text-gray-400 hover:bg-white/5"
                        }`}
                >
                    <span>➕</span> Create Moment
                </Link>
                <Link
                    href="/collections"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/collections"
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                            : "text-gray-400 hover:bg-white/5"
                        }`}
                >
                    <span>📂</span> Collections
                </Link>
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 transition-all"
                >
                    <span>🚪</span> Sign Out
                </button>
            </div>
        </aside>
    );
}
