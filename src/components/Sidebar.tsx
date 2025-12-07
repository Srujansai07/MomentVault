"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authHelpers } from "@/lib/supabase";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await authHelpers.signOut();
        router.push("/login");
    };

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: "📊" },
        { name: "Moments", href: "/moments", icon: "📸" },
        { name: "Collections", href: "/collections", icon: "🗂️" },
    ];

    return (
        <aside className="w-64 border-r border-[#2A2A2A] bg-[#050505] flex flex-col h-screen sticky top-0">
            <div className="p-6 border-b border-[#2A2A2A]">
                <Link href="/dashboard" className="text-xl font-bold tracking-tight">
                    MomentVault
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-[#121212] text-white"
                                    : "text-[#A1A1AA] hover:text-white hover:bg-[#121212]"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[#2A2A2A]">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-[#121212] transition-colors text-left"
                >
                    <span className="text-lg">🚪</span>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
