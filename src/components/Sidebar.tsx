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

    const navItems = [
        { path: "/dashboard", icon: "📊", label: "Dashboard" },
        { path: "/moments", icon: "📸", label: "My Moments" },
        { path: "/moments/create", icon: "✨", label: "Create Moment" },
        { path: "/collections", icon: "📂", label: "Collections" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-72 glass-panel border-r border-white/5 z-50 flex flex-col">
            <div className="p-8">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                        M
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">MomentVault</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-4 mt-2">Menu</div>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive(item.path)
                                ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm"
                                : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                            }`}
                    >
                        <span className={`text-lg transition-transform group-hover:scale-110 ${isActive(item.path) ? "scale-110" : ""}`}>
                            {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                        {isActive(item.path) && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4 mt-auto">
                <div className="glass-panel rounded-2xl p-4 mb-4 border border-white/5 bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
                    <div className="text-xs text-gray-400 mb-2">Storage Used</div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                        <div className="h-full w-[45%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-white font-medium">2.1 GB</span>
                        <span className="text-gray-500">5 GB Limit</span>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-transparent transition-all"
                >
                    <span>🚪</span>
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
