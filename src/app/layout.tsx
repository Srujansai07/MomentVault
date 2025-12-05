import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
    title: "MomentVault - Capture Your Precious Moments",
    description: "A modern web application for capturing, organizing, and reliving your precious moments.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Navigation />
                {children}
            </body>
        </html>
    );
}
