'use client';
import GooeyNav from "@/blocks/Components/GooeyNav/GooeyNav";

export default function Navbar() {
    const items = [
        { label: "Home", href: "#" },

        { label: "About", href: "#about" },

        { label: "Projects", href: "#" },

        { label: "Contact", href: "#" },
    ];
    return (
        <div
            className="mt-5 font-space-mono fixed top-0 z-50"
        >
            <GooeyNav
                items={items}
                particleCount={20}
                particleDistances={[80, 10]}
                particleR={80}
                initialActiveIndex={0}
                animationTime={500}
                timeVariance={200}
                colors={[1, 4, 3, 1, 6, 3, 1, 4]}
            />
        </div>
    );  
}