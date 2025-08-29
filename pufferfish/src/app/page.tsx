"use client";
import { useState, useCallback, useEffect } from "react";
import Galaxy from "@/blocks/Backgrounds/Galaxy/Galaxy";
import Navbar from "@/components/navbar";
import Lanyard from "@/blocks/Components/Lanyard/Lanyard";
import SpaceshipLoader from "@/components/SpaceshipLoaderClean";
import DecryptedText from "@/blocks/TextAnimations/DecryptedText/DecryptedText";
import RotatingText from "@/blocks/TextAnimations/RotatingText/RotatingText";
import ShinyText from "@/blocks/TextAnimations/ShinyText/ShinyText";
import Image from "next/image";
import CountUp from "@/blocks/TextAnimations/CountUp/CountUp";
import Logo from "@/components/logoloops";
import SpotlightCard from "@/blocks/Components/SpotlightCard/SpotlightCard";
import ShapeBlur from "@/blocks/Animations/ShapeBlur/ShapeBlur";
import TargetCursor from "@/blocks/Animations/TargetCursor/TargetCursor";
import FadeContent from "@/blocks/Animations/FadeContent/FadeContent";
import FuzzyText from "@/blocks/TextAnimations/FuzzyText/FuzzyText";
import Orb from "@/blocks/Backgrounds/Orb/Orb";
import Hackathons from "@/components/hackathons";
import Hyperspeed from "@/blocks/Backgrounds/Hyperspeed/Hyperspeed";
import TextType from "@/blocks/TextAnimations/TextType/TextType";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Particles from "@/blocks/Backgrounds/Particles/Particles";
import MobileDock from "@/components/dock";

/* eslint-disable @typescript-eslint/no-unused-vars */

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false); // Keep for manual testing
    const [loadingProgress, setLoadingProgress] = useState({
        lanyard: false,
        webglComponents: false,
        fonts: false,
        minimumTime: false,
    });

    const checkAllLoaded = useCallback(() => {
        setLoadingProgress((prev) => {
            const allLoaded = Object.values(prev).every((loaded) => loaded);
            if (allLoaded && isLoading) {
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            }
            return prev;
        });
    }, [isLoading]);
    const handleLanyardLoad = useCallback(() => {
        setLoadingProgress((prev) => {
            const newProgress = { ...prev, lanyard: true };
            const allLoaded = Object.values(newProgress).every(
                (loaded) => loaded
            );
            if (allLoaded && isLoading) {
                setTimeout(() => setIsLoading(false), 300);
            }
            return newProgress;
        });
    }, [isLoading]);
    useEffect(() => {
        // Check fonts loading
        const loadFonts = async () => {
            try {
                if (document.fonts) {
                    await document.fonts.ready;
                } else {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }
                setLoadingProgress((prev) => ({ ...prev, fonts: true }));
            } catch (error) {
                console.warn("Font loading failed:", error);
                setLoadingProgress((prev) => ({ ...prev, fonts: true }));
            }
        };

        const minTimeTimer = setTimeout(() => {
            setLoadingProgress((prev) => ({ ...prev, minimumTime: true }));
        }, 1500);

        const webglTimer = setTimeout(() => {
            setLoadingProgress((prev) => ({ ...prev, webglComponents: true }));
        }, 2000);

        loadFonts();

        return () => {
            clearTimeout(minTimeTimer);
            clearTimeout(webglTimer);
        };
    }, []);
    // Check loading progress whenever it changes
    useEffect(() => {
        checkAllLoaded();
    }, [loadingProgress, checkAllLoaded]);
    if (isLoading) {
        const progress = Object.values(loadingProgress).filter(Boolean).length;
        const total = Object.keys(loadingProgress).length;
        const progressPercentage = Math.round((progress / total) * 100);

        return (
            <main className="w-screen h-screen">
                <SpaceshipLoader />
                <div className="hidden lg:block absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center">
                    <div className="mb-2 text-sm font-space-mono">
                        Loading... {progressPercentage}%
                    </div>
                    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-400 transition-all duration-300 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <div className="mt-2 text-xs text-gray-400 font-space-mono">
                        {loadingProgress.fonts ? "✓" : "○"} Fonts •
                        {loadingProgress.lanyard ? "✓" : "○"} 3D Scene •
                        {loadingProgress.webglComponents ? "✓" : "○"} Graphics •
                        {loadingProgress.minimumTime ? "✓" : "○"} Ready
                    </div>
                </div>
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
    return (
        <main className="overflow-x-hidden">
            <div className="w-screen h-screen flex flex-col items-center justify-center gap-8 bg-black text-white">
                <Navbar />
                <div className="hidden lg:block">
                    <TargetCursor spinDuration={3} hideDefaultCursor={true} />
                </div>
                {/* <button
                    onClick={() => setShowLoader(!showLoader)}
                    className="absolute top-4 left-4 z-20 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 text-sm"
                >
                    Test Loader
                </button> */}

                <div className="w-screen h-screen relative">
                    <Galaxy
                        mouseRepulsion={false}
                        mouseInteraction={false}
                        density={1.5}
                        glowIntensity={0.5}
                        saturation={0.8}
                        hueShift={240}
                    />
                    <span className="w-screen h-[20%] absolute bottom-0 bg-gradient-to-t from-black to-transparent" />
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
                <span className="lg:hidden absolute inset-0 w-screen h-screen z-20 pointer-events-auto" />
            </div>
            <section
                className="w-screen min-h-screen relative bg-black"
                id="about"
            >
                <div className="relative z-10 pointer-events-auto">
                    <div className="flex justify-center pt-20 text-5xl font-space-mono lg:px-30 flex-col lg:flex-row">
                        <div className="lg:hidden flex justify-center mb-8">
                            <Image
                                src="/icon.png"
                                alt="Profile placeholder"
                                className="rounded-full shadow-lg border-2 border-gray-700"
                                width={150}
                                height={150}
                            />
                        </div>

                        <div className="flex-col px-10 md:px-20 lg:px-30">
                            <div className="flex flex-row max-w-200 text-xl md:text-3xl lg:text-4xl mt-5">
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
                            <div className="text-2xl md:text-4xl mt-8 font-figtree">
                                <ShinyText
                                    text="Hello. I'm Kendrick. Nice to meet you!"
                                    disabled={false}
                                    speed={3}
                                />
                                <div className="max-w-180 mt-5 text-sm md:text-lg leading-loose text-white">
                                    <FadeContent
                                        blur={true}
                                        duration={1000}
                                        easing="ease-out"
                                        initialOpacity={0}
                                        threshold={1}
                                        className="flex flex-col gap-2"
                                    >
                                        <p className="cursor-target">
                                            I like making stuff people actually
                                            want to use.
                                        </p>
                                        <p className="cursor-target">
                                            Clean, responsive interfaces are my
                                            thing. If something feels clunky or
                                            annoying, I&apos;ll probably notice
                                            it—and then I can&apos;t rest until
                                            I fix it.
                                        </p>
                                        <p className="cursor-target">
                                            I mess around a lot with design,
                                            code, AI, and whatever weird idea
                                            pops up. Sometimes it works,
                                            sometimes it totally breaks, but
                                            either way I learn something.
                                        </p>
                                        <p className="cursor-target">
                                            If you&apos;re into building for
                                            fun, overthinking UI details, or
                                            just trying out random ideas,
                                            we&apos;ll probably get along. Feel
                                            free to reach out.
                                        </p>
                                    </FadeContent>
                                </div>
                            </div>
                        </div>
                        {/* Desktop: Profile picture on the right */}
                        <div className="hidden lg:flex h-fit my-auto justify-center items-center p-10">
                            <Image
                                src="/icon.png"
                                alt="Profile placeholder"
                                className="rounded-full shadow-lg border-2 border-gray-700"
                                width={300}
                                height={300}
                            />
                        </div>
                    </div>
                    <div className="px-30 flex items-center justify-center mt-20 flex-col w-full h-auto text-3xl text-center md:text-left md:text-4xl font-space-mono">
                        <ShinyText
                            text="Technologies I work with:"
                            disabled={false}
                            speed={3}
                            className="font-figtree"
                        />
                        <Logo />
                    </div>
                </div>
            </section>
            <div
                className="h-fit lg:h-screen flex flex-col w-full justify-center md:justify-start px-4 md:px-8 lg:px-60"
                data-section="education"
            >
                <ShinyText
                    text="Education"
                    disabled={false}
                    speed={3}
                    className="text-3xl md:text-4xl font-figtree mt-20 mb-20 w-full text-center"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-4 w-full">
                    <div className="flex flex-col gap-4 md:row-span-3">
                        <FadeContent
                            blur={true}
                            duration={1000}
                            easing="ease-out"
                            initialOpacity={0}
                            threshold={0.5}
                            className="w-full md:flex-1"
                        >
                            <SpotlightCard
                                className="bg-gray-400 cursor-target w-full md:h-full"
                                spotlightColor="rgba( 102, 232, 158, 0.5)"
                            >
                                <div className="flex flex-row">
                                    <div className="p-5 flex flex-col w-inherit">
                                        <h3 className="text-sm md:text-lg lg:text-xl text-red-600 font-space-mono">
                                            2025-2028
                                        </h3>
                                        <h1 className="text-xl md:text-2xl lg:text-4xl font-figtree">
                                            Singapore Polytechnic
                                        </h1>
                                        <h2 className="text-lg md:text-xl lg:text-2xl text-gray-300 font-figtree mt-2">
                                            Diploma in Applied AI and Analytics
                                        </h2>
                                        <p className="mt-2 font-figtree text-sm lg:text-lg">
                                            Studying programming fundamentals,
                                            machine learning, AI, and web
                                            development
                                        </p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </FadeContent>
                        <FadeContent
                            blur={true}
                            duration={1000}
                            easing="ease-out"
                            initialOpacity={0}
                            threshold={0.5}
                            className="w-full md:flex-1"
                        >
                            <SpotlightCard
                                className="bg-gray-400 cursor-target w-full md:h-full"
                                spotlightColor="rgba(247, 213, 143, 0.5)"
                            >
                                <div className="flex flex-row">
                                    <div className="p-5 flex flex-col w-inherit">
                                        <h3 className="text-sm md:text-lg lg:text-xl text-red-600 font-space-mono">
                                            2021-2024
                                        </h3>
                                        <h1 className="text-xl md:text-2xl lg:text-4xl font-figtree">
                                            Gan Eng Seng School
                                        </h1>
                                        <h2 className="text-lg md:text-xl lg:text-2xl text-gray-300 font-figtree mt-2">
                                            GCE-O levels
                                        </h2>
                                        <p className="mt-2 font-figtree text-sm md:text-md lg:text-lg">
                                            Graduated with distinctions in
                                            Mathematics, Physics, Chemistry, and
                                            Design and Technology.
                                        </p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </FadeContent>
                        <FadeContent
                            blur={true}
                            duration={1000}
                            easing="ease-out"
                            initialOpacity={0}
                            threshold={0.5}
                            className="w-full md:flex-1"
                        >
                            <SpotlightCard
                                className="bg-gray-400 cursor-target w-full md:h-full"
                                spotlightColor="rgba(30, 238, 231, 0.5)"
                            >
                                <div className="flex flex-row">
                                    <div className="p-5 flex flex-col w-inherit">
                                        <h3 className="text-sm md:text-lg lg:text-xl text-red-600 font-space-mono">
                                            2015-2020
                                        </h3>
                                        <h1 className="text-xl md:text-2xl lg:text-4xl font-figtree">
                                            Cantonment Primary School
                                        </h1>
                                        <h2 className="text-lg md:text-xl lg:text-2xl text-gray-300 font-figtree mt-2">
                                            PSLE
                                        </h2>
                                        <p className="mt-2 font-figtree text-sm md:text-md lg:text-lg">
                                            Graduated with a PSLE T-Score of
                                            231.
                                        </p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </FadeContent>
                    </div>
                    <div className="md:row-span-3 h-full">
                        <FadeContent
                            blur={true}
                            duration={1000}
                            easing="ease-out"
                            initialOpacity={0}
                            threshold={0.5}
                            className="w-full h-full"
                        >
                            <SpotlightCard
                                className="bg-gray-400 cursor-target w-full h-full"
                                spotlightColor="rgba( 250, 0, 0, 0.5)"
                            >
                                <div className="flex h-[60vh] md:h-full justify-center items-center relative">
                                    <ShapeBlur
                                        variation={0}
                                        pixelRatioProp={
                                            window.devicePixelRatio || 1
                                        }
                                        shapeSize={1.8}
                                        roundness={1.8}
                                        borderSize={0.02}
                                        circleSize={0.3}
                                        circleEdge={1}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center flex-col text-center lg:text-left">
                                        <h1 className="font-figtree text-lg lg:text-xl mt-10 lg:max-w-none max-w-[70%]">
                                            Education is not preparation for
                                            life;
                                        </h1>
                                        <h1 className="font-figtree text-lg lg:text-xl mt-2">
                                            education is life itself.
                                        </h1>
                                        <em className="mt-10 text-sm text-gray-300">
                                            John Dewey
                                        </em>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </FadeContent>
                    </div>
                </div>
            </div>
            <div
                className="w-screen h-fit relative mt-0 md:mt-20"
                data-section="competitions"
            >
                <div className="w-screen h-screen flex justify-center items-center">
                    <Orb
                        hoverIntensity={0.7}
                        rotateOnHover={true}
                        hue={5}
                        forceHoverState={false}
                    />
                </div>
                <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center -z-10">
                    <FuzzyText
                        baseIntensity={0.2}
                        hoverIntensity={0.8}
                        enableHover={true}
                        minFontSize={48}
                        maxFontSize={96}
                        viewportScaling={6}
                        fontFamily="font-space-mono"
                    >
                        Competitions
                    </FuzzyText>
                </div>
                <div className="w-screen h-fit relative">
                    <div className="absolute inset-0 flex justify-center items-center -z-10">
                        <Orb
                            hoverIntensity={0.7}
                            rotateOnHover={true}
                            hue={220}
                            forceHoverState={false}
                        />
                    </div>
                    <div className="relative z-10">
                        <Hackathons />
                    </div>
                </div>
            </div>
            <div className="w-screen h-inherit relative mt-20">
                <div className="w-screen h-fit relative flex flex-col gap-20">
                    <div className="flex flex-col md:flex-row w-full justify-center items-center gap-25">
                        <div className="flex flex-col">
                            <div className="flex flex-row md:justify-left justify-center">
                                <CountUp
                                    from={0}
                                    to={4}
                                    separator=","
                                    startWhen={true}
                                    direction="up"
                                    duration={1.5}
                                    className="text-center md:text-left count-up-text text-6xl md:text-8xl font-figtree text-white"
                                />
                                <p className="text-6xl md:text-8xl font-figtree text-white">
                                    +
                                </p>
                            </div>
                            <ShinyText
                                text="Competitions"
                                disabled={false}
                                speed={3}
                                className="font-figtree text-xl"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row md:justify-left justify-center">
                                <CountUp
                                    from={0}
                                    to={10}
                                    separator=","
                                    startWhen={true}
                                    direction="up"
                                    duration={1.5}
                                    className="count-up-text text-6xl md:text-8xl font-figtree text-white"
                                />
                                <p className="text-6xl md:text-8xl font-figtree text-white">
                                    +
                                </p>
                            </div>
                            <ShinyText
                                text="Side Projects Built"
                                disabled={false}
                                speed={3}
                                className="font-figtree text-xl"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row md:justify-left justify-center">
                                <CountUp
                                    from={0}
                                    to={500}
                                    separator=","
                                    startWhen={true}
                                    direction="up"
                                    duration={1.5}
                                    className="count-up-text text-6xl md:text-8xl font-figtree text-white"
                                />
                                <p className="text-6xl md:text-8xl font-figtree text-white">
                                    +
                                </p>
                            </div>
                            <ShinyText
                                text="GitHub Commits Yearly"
                                disabled={false}
                                speed={3}
                                className="font-figtree text-xl"
                            />
                        </div>
                    </div>
                </div>
                <section
                    className="w-screen h-screen relative overflow-hidden"
                    id="projects"
                >
                    <div className="absolute inset-0 flex items-center top-50 flex-col z-10">
                        <TextType
                            text={["Projects", "Projects", "Projects"]}
                            pauseDuration={3000}
                            typingSpeed={75}
                            showCursor={true}
                            cursorCharacter="|"
                            className="font-figtree text-6xl md:text-8xl text-white cursor-target"
                            loop={true}
                        />
                        <ShinyText
                            text="View My Work."
                            disabled={false}
                            speed={3}
                            className="font-figtree text-xl md:text-2xl mt-5"
                        />
                    </div>
                    <div className="absolute inset-0 flex justify-center items-center -z-10 max-h-screen md:max-h-none">
                        <Hyperspeed
                            effectOptions={{
                                distortion: "xyDistortion",

                                length: 400,

                                roadWidth: 9,

                                islandWidth: 2,

                                lanesPerRoad: 3,

                                fov: 90,

                                fovSpeedUp: 120,

                                speedUp: 2,

                                carLightsFade: 0.4,

                                totalSideLightSticks: 20,

                                lightPairsPerRoadWay: 30,

                                shoulderLinesWidthPercentage: 0.05,

                                brokenLinesWidthPercentage: 0.1,

                                brokenLinesLengthPercentage: 0.5,

                                lightStickWidth: [0.12, 0.5],

                                lightStickHeight: [1.3, 1.7],

                                movingAwaySpeed: [60, 80],

                                movingCloserSpeed: [-120, -160],

                                carLightsLength: [400 * 0.03, 400 * 0.2],

                                carLightsRadius: [0.05, 0.14],

                                carWidthPercentage: [0.3, 0.5],

                                carShiftX: [-0.8, 0.8],

                                carFloorSeparation: [0, 5],

                                colors: {
                                    roadColor: 0x080808,

                                    islandColor: 0x0a0a0a,

                                    background: 0x000000,

                                    shoulderLines: 0x131318,

                                    brokenLines: 0x131318,

                                    leftCars: [0xff102a, 0xeb383e, 0xff102a],

                                    rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],

                                    sticks: 0xdadafa,
                                },
                            }}
                        />
                    </div>
                    <span className="w-screen h-[20%] absolute bottom-0 bg-gradient-to-t from-black to-transparent" />
                </section>
                <FadeContent
                    blur={true}
                    duration={1000}
                    easing="ease-out"
                    initialOpacity={0}
                    threshold={0.5}
                >
                    <Projects />
                </FadeContent>
            </div>
            <section
                className="w-screen min-h-screen relative flex justify-center items-center flex-col font-space-mono text-6xl gap-20 py-20"
                id="contact"
            >
                <div className="absolute inset-0 w-screen h-screen">
                    <Particles
                        particleColors={["#ffffff", "#ff0000"]}
                        particleCount={200}
                        particleSpread={10}
                        speed={0.1}
                        particleBaseSize={100}
                        moveParticlesOnHover={true}
                        alphaParticles={false}
                        disableRotation={false}
                    />
                </div>
                <div className="z-10 text-4xl md:text-6xl">
                    <DecryptedText
                        text="Contact"
                        speed={100}
                        maxIterations={30}
                        characters="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!?@#$%^&*()"
                        className="revealed"
                        parentClassName="all-letters"
                        encryptedClassName="encrypted"
                        animateOn="hover"
                    />
                </div>
                <div className="z-10 w-full max-w-6xl mx-auto px-16 md:px-30">
                    <Contact />
                </div>
                <div className="font-figtree text-2xl md:text-4xl">
                    <ShinyText
                        text="Made with ❤️ by Kendrick"
                        disabled={false}
                        speed={3}
                    />
                </div>
            </section>
            <div className="md:hidden">
                <MobileDock />
            </div>
        </main>
    );
}
