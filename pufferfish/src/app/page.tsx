"use client";
import { useState, useCallback } from "react";
import Galaxy from "@/blocks/Backgrounds/Galaxy/Galaxy";
import Navbar from "@/components/navbar";
import Lanyard from "@/blocks/Components/Lanyard/Lanyard";
import SpaceshipLoader from "@/components/SpaceshipLoaderClean";
// import DecryptedText from "@/blocks/TextAnimations/DecryptedText/DecryptedText";
import RotatingText from "@/blocks/TextAnimations/RotatingText/RotatingText";
import ShinyText from "@/blocks/TextAnimations/ShinyText/ShinyText";
import Image from "next/image";
// import SplashCursor from "@/blocks/Animations/SplashCursor/SplashCursor";
// import GlareHover from "@/blocks/Animations/GlareHover/GlareHover";
import LogoLoop from "@/blocks/Animations/LogoLoop/LogoLoop";
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiBootstrap, SiHtml5, SiCss3, SiCplusplus, SiPython, SiJavascript, SiGithub, SiSwift } from "react-icons/si";

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false); // Keep for manual testing
    const handleLanyardLoad = useCallback(() => {
        setTimeout(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        }, 200);
    }, []);
    if (isLoading) {
        return (
            <main className="w-screen h-screen">
                <SpaceshipLoader />
                {/* Load Lanyard in background */}
                <div
                    style={{
                        position: "absolute",
                        left: "-9999px",
                        top: "-9999px",
                    }}
                >
                    <Lanyard
                        position={[0, 0, 20]}
                        gravity={[0, -40, 0]}
                        cardScale={1.1}
                        onLoad={handleLanyardLoad}
                    />
                </div>
            </main>
        );
    }
    if (showLoader) {
        return (
            <main className="w-screen h-screen">
                <SpaceshipLoader />
            </main>
        );
    }

    const techLogos = [
        { node: <SiReact />, title: "React", href: "https://react.dev" },

        { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },

        {
            node: <SiTypescript />,
            title: "TypeScript",
            href: "https://www.typescriptlang.org",
        },

        {
            node: <SiTailwindcss />,
            title: "Tailwind CSS",
            href: "https://tailwindcss.com",
        },
        {
            node: <SiBootstrap />,
            title: "Bootstrap",
            href: "https://getbootstrap.com",
        },
        {
            node: <SiHtml5 />,
            title: "HTML5",
            href: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
        },
        {
            node: <SiCss3 />,
            title: "CSS3",
            href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        },
        {
            node: <SiCplusplus />,
            title: "C++",
            href: "https://en.cppreference.com/w/",
        },
        {
            node: <SiPython />,
            title: "Python",
            href: "https://www.python.org/",
        },
        {
            node: <SiJavascript />,
            title: "JavaScript",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
            node: <SiGithub />,
            title: "GitHub",
            href: "https://github.com/",
        },
        {
            node: <SiSwift />,
            title: "Swift",
            href: "https://developer.apple.com/swift/",
        },
    ];

    return (
        <main>
            <div className="w-screen h-screen flex flex-col items-center justify-center gap-8 bg-black text-white">
                <Navbar />

                {/* Toggle button for loader testing */}
                <button
                    onClick={() => setShowLoader(!showLoader)}
                    className="absolute top-4 left-4 z-20 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 text-sm"
                >
                    Test Loader
                </button>

                <div className="w-screen h-screen relative">
                    <Galaxy
                        mouseRepulsion={false}
                        mouseInteraction={false}
                        density={1.5}
                        glowIntensity={0.5}
                        saturation={0.8}
                        hueShift={240}
                    />
                    <span className="w-screen h-screen absolute bottom-0 bg-gradient-to-t from-black to-transparent to-20%" />
                    <div className="absolute inset-0 pointer-events-none">
                        <div
                            className="absolute inset-0 pointer-events-auto"
                            style={{ zIndex: 10 }}
                        >
                            <Lanyard
                                position={[0, 0, 20]}
                                gravity={[0, -50, 0]}
                                cardScale={1.1}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-screen min-h-screen relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="flex justify-center mt-20 text-5xl font-space-mono md:px-30 flex-row">
                        <div className="flex-col">
                            <div className="flex flex-row max-w-200">
                                <RotatingText
                                    texts={[
                                        "Creative",
                                        "Passionate",
                                        "Hardworking",
                                        "Enthusiastic",
                                        "Professional",
                                    ]}
                                    mainClassName="bg-black text-gray-200 overflow-hidden justify-center"
                                    staggerFrom={"last"}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                    transition={{
                                        type: "spring",
                                        damping: 30,
                                        stiffness: 400,
                                    }}
                                    rotationInterval={2000}
                                />
                                <RotatingText
                                    texts={[
                                        " designer.",
                                        " developer.",
                                        " student.",
                                        " creator.",
                                        " coder.",
                                    ]}
                                    mainClassName="bg-black text-gray-200 overflow-hidden justify-center"
                                    staggerFrom={"last"}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                    transition={{
                                        type: "spring",
                                        damping: 30,
                                        stiffness: 400,
                                    }}
                                    rotationInterval={2000}
                                />
                            </div>
                            <div className="text-4xl mt-8">
                                <ShinyText
                                    text="Hello. I'm Kendrick. Nice to meet you!"
                                    disabled={false}
                                    speed={3}
                                />
                                <div className="max-w-200 mt-5 text-lg leading-loose">
                                    <p className="">
                                        I love making stuff that people actually
                                        want to use.
                                    </p>

                                    <p className="">
                                        I like building interfaces that are
                                        clean, responsive, and don&apos;t annoy
                                        or make it difficult for the user.
                                    </p>
                                    <p className="">
                                        I care a lot about the small UX details:
                                        how things look, feel, and flow
                                        together. not just the visuals, but the
                                        whole experience. I tend to spot
                                        problems pretty quickly, and once i
                                        notice them, i have to fix them. even
                                        better if it helps someone else in the
                                        process.
                                    </p>
                                    <p className="">
                                        Having worked on all kinds of random
                                        projects—some solo, some with
                                        friends—each time I do so, I always end
                                        up learning something new.
                                    </p>
                                    <p className="">
                                        I&apos;m constantly experimenting.
                                        design, code, weird ideas, AI stuff,
                                        whatever. sometimes it works. sometimes
                                        it completely breaks. either way, I
                                        learn from it.
                                    </p>
                                    <p className="">
                                        If you&apos;re someone who builds for
                                        fun, thinks too much about UI details,
                                        or just likes trying out wild ideas,
                                        we&apos;ll probably get along. feel free
                                        to connect or reach out—I&apos;m always
                                        down to talk or build cool stuff
                                        together.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="min-h-full flex my-auto justify-center items-center float-end">
                            <Image
                                src="/icon.png"
                                alt="Profile placeholder"
                                className="rounded-full shadow-lg border-2 border-gray-700"
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                    <div className="px-30 flex items-center justify-center mt-20 flex-col w-full h-fit text-4xl font-space-mono">
                        <ShinyText
                            text="Technologies I work with:"
                            disabled={false}
                            speed={3}
                        />
                        <div className="mt-10 h-300 w-225 flex gap-5 flex-col">
                            <LogoLoop
                                logos={techLogos}
                                speed={60}
                                direction="left"
                                logoHeight={48}
                                gap={40}
                                pauseOnHover
                                scaleOnHover
                                fadeOut
                                fadeOutColor="#000000"
                                ariaLabel="Technology partners"
                            />
                            <LogoLoop
                                logos={techLogos}
                                speed={60}
                                direction="right"
                                logoHeight={48}
                                gap={40}
                                pauseOnHover
                                scaleOnHover
                                fadeOut
                                fadeOutColor="#000000"
                                ariaLabel="Technology partners"
                            />
                            <LogoLoop
                                logos={techLogos}
                                speed={60}
                                direction="left"
                                logoHeight={48}
                                gap={40}
                                pauseOnHover
                                scaleOnHover
                                fadeOut
                                fadeOutColor="#000000"
                                ariaLabel="Technology partners"
                            />
                            <LogoLoop
                                logos={techLogos}
                                speed={60}
                                direction="right"
                                logoHeight={48}
                                gap={40}
                                pauseOnHover
                                scaleOnHover
                                fadeOut
                                fadeOutColor="#000000"
                                ariaLabel="Technology partners"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <SplashCursor /> */}
        </main>
    );
}
