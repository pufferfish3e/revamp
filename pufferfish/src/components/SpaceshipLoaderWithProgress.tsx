import React from "react";

interface SpaceshipLoaderWithProgressProps {
    progress?: number; // 0-100
    message?: string;
}

const SpaceshipLoaderWithProgress: React.FC<
    SpaceshipLoaderWithProgressProps
> = ({ progress = 0, message = "Loading..." }) => {
    return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
            <div className="speeder">
                <div className="hacer1"></div>
                <div className="hacer2"></div>
                <div className="hacer3"></div>
                <div className="hacer4"></div>
            </div>

            <div className="longfazers">
                <div className="lf1"></div>
                <div className="lf2"></div>
                <div className="lf3"></div>
                <div className="lf4"></div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80">
                <div className="text-white text-center mb-4 font-mono text-sm">
                    {message}
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-white h-full rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="text-white text-center mt-2 font-mono text-xs">
                    {Math.round(progress)}%
                </div>
            </div>

            <style jsx>{`
                .speeder {
                    width: 10px;
                    height: 10px;
                    background: white;
                    border-radius: 50%;
                    position: relative;
                    top: -50px;
                    left: calc(50% - 5px);
                    animation: speeder 0.4s linear infinite;
                }

                .speeder:before {
                    content: "";
                    position: absolute;
                    top: -5px;
                    left: -5px;
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    opacity: 0.2;
                    animation: speeder 0.4s linear infinite;
                }

                .hacer1,
                .hacer2,
                .hacer3,
                .hacer4 {
                    width: 6px;
                    height: 1px;
                    background: white;
                    position: absolute;
                    top: calc(50% - 0.5px);
                    left: -150px;
                    animation: fazer1 0.2s linear infinite;
                }

                .hacer2 {
                    top: calc(50% - 0.5px + 3px);
                    left: -175px;
                    animation: fazer2 0.25s linear infinite;
                }

                .hacer3 {
                    top: calc(50% - 0.5px + 1px);
                    left: -200px;
                    animation: fazer3 0.3s linear infinite;
                }

                .hacer4 {
                    top: calc(50% - 0.5px - 1px);
                    left: -225px;
                    animation: fazer4 0.35s linear infinite;
                }

                .longfazers {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }

                .lf1,
                .lf2,
                .lf3,
                .lf4 {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: white;
                    border-radius: 50%;
                    left: 50%;
                    top: 50%;
                }

                .lf1 {
                    animation: lf1 0.6s linear infinite;
                }

                .lf2 {
                    animation: lf2 0.8s linear infinite;
                }

                .lf3 {
                    animation: lf3 1s linear infinite;
                }

                .lf4 {
                    animation: lf4 1.2s linear infinite;
                }

                @keyframes speeder {
                    0% {
                        transform: translate(2px, 1px) rotate(0deg);
                    }
                    10% {
                        transform: translate(-1px, -3px) rotate(-1deg);
                    }
                    20% {
                        transform: translate(-2px, 0px) rotate(1deg);
                    }
                    30% {
                        transform: translate(1px, 2px) rotate(0deg);
                    }
                    40% {
                        transform: translate(1px, -1px) rotate(1deg);
                    }
                    50% {
                        transform: translate(-1px, 3px) rotate(-1deg);
                    }
                    60% {
                        transform: translate(-1px, 1px) rotate(0deg);
                    }
                    70% {
                        transform: translate(3px, 1px) rotate(-1deg);
                    }
                    80% {
                        transform: translate(-2px, -1px) rotate(1deg);
                    }
                    90% {
                        transform: translate(2px, 1px) rotate(0deg);
                    }
                    100% {
                        transform: translate(1px, -2px) rotate(-1deg);
                    }
                }

                @keyframes fazer1 {
                    0% {
                        left: -200px;
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                    }
                    80% {
                        opacity: 1;
                    }
                    100% {
                        left: 200px;
                        opacity: 0;
                    }
                }

                @keyframes fazer2 {
                    0% {
                        left: -300px;
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                    }
                    80% {
                        opacity: 1;
                    }
                    100% {
                        left: 200px;
                        opacity: 0;
                    }
                }

                @keyframes fazer3 {
                    0% {
                        left: -400px;
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                    }
                    80% {
                        opacity: 1;
                    }
                    100% {
                        left: 200px;
                        opacity: 0;
                    }
                }

                @keyframes fazer4 {
                    0% {
                        left: -500px;
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                    }
                    80% {
                        opacity: 1;
                    }
                    100% {
                        left: 200px;
                        opacity: 0;
                    }
                }

                @keyframes lf1 {
                    0% {
                        transform: translateX(0px) translateY(0px) scale(1);
                    }
                    25% {
                        transform: translateX(600px) translateY(-300px)
                            scale(0.3);
                    }
                    50% {
                        transform: translateX(1200px) translateY(300px)
                            scale(0.5);
                    }
                    75% {
                        transform: translateX(600px) translateY(300px)
                            scale(0.3);
                    }
                    100% {
                        transform: translateX(0px) translateY(0px) scale(1);
                    }
                }

                @keyframes lf2 {
                    0% {
                        transform: translateX(0px) translateY(0px) scale(1);
                    }
                    25% {
                        transform: translateX(-600px) translateY(-300px)
                            scale(0.3);
                    }
                    50% {
                        transform: translateX(-1200px) translateY(300px)
                            scale(0.5);
                    }
                    75% {
                        transform: translateX(-600px) translateY(300px)
                            scale(0.3);
                    }
                    100% {
                        transform: translateX(0px) translateY(0px) scale(1);
                    }
                }

                @keyframes lf3 {
                    0% {
                        transform: translateX(0px) translateY(0px) scale(1);
                    }
                    25% {
                        transform: translateX(-600px) translateY(300px)
                            scale(0.3);
                    }
                    50% {
                        transform: translateX(-1200px) translateY(-300px)
                            scale(0.5);
                    }
                    75% {
                        transform: translateX(-600px) translateY(-300px)
                            scale(0.3);
                    }
                    100% {
                        transform: translateX(0px) translateY(0px) scale(1);
                    }
                }

                @keyframes lf4 {
                    0% {
                        transform: translateX(0px) translateY(0px) scale(1);
                    }
                    25% {
                        transform: translateX(600px) translateY(300px)
                            scale(0.3);
                    }
                    50% {
                        transform: translateX(1200px) translateY(-300px)
                            scale(0.5);
                    }
                    75% {
                        transform: translateX(600px) translateY(-300px)
                            scale(0.3);
                    }
                    100% {
                        transform: translateX(0px) translateY(0px) scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default SpaceshipLoaderWithProgress;
