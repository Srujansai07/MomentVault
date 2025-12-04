import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
    title: "MomentVault",
    description: "Capture and preserve your precious moments",
};

// Test deployment pipeline - auto-deploy working!

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
