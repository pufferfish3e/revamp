/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export interface ChromaItem {
    image: string;
    title: string;
    subtitle: string;
    handle?: string;
    location?: string;
    borderColor?: string;
    gradient?: string;
    url?: string;
    imageWidth?: number;
    imageHeight?: number;
}

export interface ChromaGridProps {
    items?: ChromaItem[];
    className?: string;
    radius?: number;
    damping?: number;
    fadeOut?: number;
    ease?: string;
    defaultImageWidth?: number;
    defaultImageHeight?: number;
    minCardWidth?: number;
    maxCardWidth?: number;
    baseCardHeight?: number;
    responsive?: boolean;
    lockAspectRatio?: number; // e.g., 16/9 for 16:9 ratio
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
    items,
    className = "",
    radius = 300,
    damping = 0.45,
    fadeOut = 0.6,
    ease = "power3.out",
    defaultImageWidth = 600,
    defaultImageHeight = 300,
    minCardWidth = 300,
    maxCardWidth = 800,
    baseCardHeight = 250,
    responsive = true,
    lockAspectRatio = 16 / 9, // Default to 16:9 landscape
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const fadeRef = useRef<HTMLDivElement>(null);
    const setX = useRef<SetterFn | null>(null);
    const setY = useRef<SetterFn | null>(null);
    const pos = useRef({ x: 0, y: 0 });

    const demo: ChromaItem[] = [
        {
            image: "https://i.pravatar.cc/300?img=8",
            title: "Alex Rivera",
            subtitle: "Full Stack Developer",
            handle: "@alexrivera",
            borderColor: "#4F46E5",
            gradient: "linear-gradient(145deg,#4F46E5,#000)",
            url: "https://github.com/",
        },
        {
            image: "https://i.pravatar.cc/300?img=11",
            title: "Jordan Chen",
            subtitle: "DevOps Engineer",
            handle: "@jordanchen",
            borderColor: "#10B981",
            gradient: "linear-gradient(210deg,#10B981,#000)",
            url: "https://linkedin.com/in/",
        },
        {
            image: "https://i.pravatar.cc/300?img=3",
            title: "Morgan Blake",
            subtitle: "UI/UX Designer",
            handle: "@morganblake",
            borderColor: "#F59E0B",
            gradient: "linear-gradient(165deg,#F59E0B,#000)",
            url: "https://dribbble.com/",
        },
        {
            image: "https://i.pravatar.cc/300?img=16",
            title: "Casey Park",
            subtitle: "Data Scientist",
            handle: "@caseypark",
            borderColor: "#EF4444",
            gradient: "linear-gradient(195deg,#EF4444,#000)",
            url: "https://kaggle.com/",
        },
        {
            image: "https://i.pravatar.cc/300?img=25",
            title: "Sam Kim",
            subtitle: "Mobile Developer",
            handle: "@thesamkim",
            borderColor: "#8B5CF6",
            gradient: "linear-gradient(225deg,#8B5CF6,#000)",
            url: "https://github.com/",
        },
        {
            image: "https://i.pravatar.cc/300?img=60",
            title: "Tyler Rodriguez",
            subtitle: "Cloud Architect",
            handle: "@tylerrod",
            borderColor: "#06B6D4",
            gradient: "linear-gradient(135deg,#06B6D4,#000)",
            url: "https://aws.amazon.com/",
        },
    ];

    const data = items?.length ? items : demo;

    // Responsive breakpoint detection
    const [screenSize, setScreenSize] = useState<
        "mobile" | "tablet" | "desktop"
    >("desktop");

    useEffect(() => {
        if (!responsive) return;

        const updateScreenSize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setScreenSize("mobile");
            } else if (width < 1024) {
                setScreenSize("tablet");
            } else {
                setScreenSize("desktop");
            }
        };

        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);
        return () => window.removeEventListener("resize", updateScreenSize);
    }, [responsive]);

    // Calculate responsive card dimensions based on locked aspect ratio and screen size
    const getCardDimensions = (item: ChromaItem) => {
        // Use locked aspect ratio instead of individual image dimensions
        const aspectRatio = lockAspectRatio || 16 / 9;

        // Still use image dimensions for Next.js optimization, but not for layout
        const imgWidth = item.imageWidth || defaultImageWidth;
        const imgHeight = item.imageHeight || defaultImageHeight;

        // Responsive constraints based on screen size
        let responsiveMinWidth = minCardWidth;
        let responsiveMaxWidth = maxCardWidth;
        let responsiveBaseHeight = baseCardHeight;

        if (responsive) {
            switch (screenSize) {
                case "mobile":
                    responsiveMinWidth = Math.max(280, minCardWidth * 0.7);
                    responsiveMaxWidth = Math.min(400, maxCardWidth * 0.6);
                    responsiveBaseHeight = baseCardHeight * 0.8;
                    break;
                case "tablet":
                    responsiveMinWidth = Math.max(300, minCardWidth * 0.85);
                    responsiveMaxWidth = Math.min(500, maxCardWidth * 0.75);
                    responsiveBaseHeight = baseCardHeight * 0.9;
                    break;
                default: // desktop
                    responsiveMinWidth = minCardWidth;
                    responsiveMaxWidth = maxCardWidth;
                    responsiveBaseHeight = baseCardHeight;
            }
        }

        // Calculate width based on locked aspect ratio
        const cardWidth = Math.max(
            responsiveMinWidth,
            Math.min(responsiveMaxWidth, responsiveBaseHeight * aspectRatio)
        );

        return {
            width: Math.round(cardWidth),
            height: Math.round(cardWidth / aspectRatio),
            aspectRatio,
            imageWidth: imgWidth, // For Next.js optimization
            imageHeight: imgHeight, // For Next.js optimization
        };
    };

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        setX.current = gsap.quickSetter(el, "--x", "px") as SetterFn;
        setY.current = gsap.quickSetter(el, "--y", "px") as SetterFn;
        const { width, height } = el.getBoundingClientRect();
        pos.current = { x: width / 2, y: height / 2 };
        setX.current(pos.current.x);
        setY.current(pos.current.y);
    }, []);

    const moveTo = (x: number, y: number) => {
        gsap.to(pos.current, {
            x,
            y,
            duration: damping,
            ease,
            onUpdate: () => {
                setX.current?.(pos.current.x);
                setY.current?.(pos.current.y);
            },
            overwrite: true,
        });
    };

    const handleMove = (e: React.PointerEvent) => {
        const r = rootRef.current!.getBoundingClientRect();
        moveTo(e.clientX - r.left, e.clientY - r.top);
        gsap.to(fadeRef.current, {
            opacity: 0,
            duration: 0.25,
            overwrite: true,
        });
    };

    const handleLeave = () => {
        gsap.to(fadeRef.current, {
            opacity: 1,
            duration: fadeOut,
            overwrite: true,
        });
    };

    const handleCardClick = (url?: string) => {
        if (url) window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
        const c = e.currentTarget as HTMLElement;
        const rect = c.getBoundingClientRect();
        c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    return (
        <div
            ref={rootRef}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            className={`relative w-full h-full flex flex-wrap justify-center items-start gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-4 lg:px-6 ${className}`}
            style={
                {
                    "--r": `${
                        responsive
                            ? screenSize === "mobile"
                                ? radius * 0.6
                                : screenSize === "tablet"
                                ? radius * 0.8
                                : radius
                            : radius
                    }px`,
                    "--x": "50%",
                    "--y": "50%",
                } as React.CSSProperties
            }
        >
            {data.map((c, i) => {
                const cardDimensions = getCardDimensions(c);
                return (
                    <article
                        key={i}
                        onMouseMove={handleCardMove}
                        onClick={() => handleCardClick(c.url)}
                        className="group relative flex flex-col rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer cursor-target"
                        style={
                            {
                                "--card-border": c.borderColor || "transparent",
                                background: c.gradient,
                                "--spotlight-color": "rgba(255,255,255,0.3)",
                                width: `${cardDimensions.width}px`,
                                height: `${cardDimensions.height + 100}px`, // Fixed height for uniformity
                            } as React.CSSProperties
                        }
                    >
                        <div
                            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100 h-fit"
                            style={{
                                background:
                                    "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
                            }}
                        />
                        <div
                            className="relative z-10 p-2 sm:p-[10px] box-border"
                            style={{
                                height: `${cardDimensions.height}px`, // Fixed image area height
                            }}
                        >
                            <Image
                                src={c.image}
                                alt={c.title}
                                width={cardDimensions.imageWidth}
                                height={cardDimensions.imageHeight}
                                loading="lazy"
                                className="w-full h-full object-cover rounded-[8px] sm:rounded-[10px]"
                            />
                        </div>
                        <footer className="relative z-10 p-2 sm:p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-2 sm:gap-x-3 gap-y-1">
                            <h3 className="m-0 text-sm sm:text-[1.05rem] font-semibold font-figtree">
                                {c.title}
                            </h3>
                            {c.handle && (
                                <span className="text-xs sm:text-[0.95rem] opacity-80 text-right font-space-mono">
                                    {c.handle}
                                </span>
                            )}
                            <p className="m-0 text-xs sm:text-[0.85rem] opacity-85 font-figtree">
                                {c.subtitle}
                            </p>
                            {c.location && (
                                <span className="text-xs sm:text-[0.85rem] opacity-85 text-right">
                                    {c.location}
                                </span>
                            )}
                        </footer>
                    </article>
                );
            })}
            <div
                className="absolute inset-0 pointer-events-none z-30"
                style={{
                    backdropFilter: "grayscale(1) brightness(0.78)",
                    WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
                    background: "rgba(0,0,0,0.001)",
                    maskImage:
                        "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
                    WebkitMaskImage:
                        "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
                }}
            />
            <div
                ref={fadeRef}
                className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
                style={{
                    backdropFilter: "grayscale(1) brightness(0.78)",
                    WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
                    background: "rgba(0,0,0,0.001)",
                    maskImage:
                        "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
                    opacity: 1,
                }}
            />
        </div>
    );
};

export default ChromaGrid;
