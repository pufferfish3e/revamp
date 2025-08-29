import type { Metadata, Viewport } from "next";
import { Figtree, Space_Mono } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
    variable: "--font-figtree",
    subsets: ["latin"],
});

const spaceMono = Space_Mono({
    variable: "--font-space-mono",
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://pufferfish.vercel.app"),
    title: "Kendrick Slamat — Software Developer & Designer",
    description:
        "Hi — I'm Kendrick. I build thoughtful web experiences that blend UI/UX design with modern web technologies. Browse my projects, writing, and ways to get in touch.",
    keywords: [
        "Kendrick Slamat",
        "portfolio",
        "software developer",
        "web developer",
        "React",
        "Next.js",
        "TypeScript",
        "UI",
        "UX",
        "AI",
    ],
    authors: [{ name: "Kendrick Slamat", url: "https://yourdomain.com" }],
    openGraph: {
        title: "Kendrick Slamat — Developer & Designer",
        description:
            "A portfolio showcasing projects in web development, design, and AI — built with clarity and craft.",
        url: "https://pufferfish.vercel.app",
        siteName: "Kendrick Slamat | Portfolio",
        images: [
            {
                url: "/banner.png",
                width: 1200,
                height: 630,
                alt: "Kendrick Slamat — portfolio preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kendrick Slamat — Developer & Designer",
        description:
            "Explore projects and experiments in web development, AI, and design.",
        images: ["/banner.png"],
    },
    icons: {
        icon: [
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
            {
                url: "/android-icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
        ],
        apple: [
            { url: "/apple-icon-57x57.png", sizes: "57x57" },
            { url: "/apple-icon-60x60.png", sizes: "60x60" },
            { url: "/apple-icon-72x72.png", sizes: "72x72" },
            { url: "/apple-icon-76x76.png", sizes: "76x76" },
            { url: "/apple-icon-114x114.png", sizes: "114x114" },
            { url: "/apple-icon-120x120.png", sizes: "120x120" },
            { url: "/apple-icon-144x144.png", sizes: "144x144" },
            { url: "/apple-icon-152x152.png", sizes: "152x152" },
            { url: "/apple-icon-180x180.png", sizes: "180x180" },
        ],
        other: [{ rel: "manifest", url: "/manifest.json" }],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
    },
};

export const viewport: Viewport = {
    themeColor: "#ff0000",
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={` ${figtree.variable} ${spaceMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
