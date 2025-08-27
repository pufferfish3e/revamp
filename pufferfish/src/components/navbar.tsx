'use client';
import GooeyNav from "@/blocks/Components/GooeyNav/GooeyNav";

export default function Navbar() {
    const items = [
        { label: "Home", href: "/home" },

        { label: "About", href: "/about" },

        { label: "Contact", href: "/contact" },
    ];
    return (
        <div
            style={{ height: "600px", position: "relative" }}
            className="mt-5 font-space-mono"
        >
            <GooeyNav
                items={items}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={0}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
        </div>
    );  
}