import React from "react";

interface SpaceshipLoaderProps {
    className?: string;
}

export default function SpaceshipLoader({
    className = "",
}: SpaceshipLoaderProps) {
    return (
        <>
            <div
                className={`relative w-full h-full bg-black overflow-hidden ${className}`}
            >
                <div className="loader">
                    <span className="loader-body">
                        <span className="trail trail-1"></span>
                        <span className="trail trail-2"></span>
                        <span className="trail trail-3"></span>
                        <span className="trail trail-4"></span>
                    </span>
                    <div className="base">
                        <span className="ship-body"></span>
                        <div className="face"></div>
                    </div>
                </div>
                <div className="longfazers">
                    <span className="fazer fazer-1"></span>
                    <span className="fazer fazer-2"></span>
                    <span className="fazer fazer-3"></span>
                    <span className="fazer fazer-4"></span>
                </div>
            </div>

            <style jsx>{`
                .loader {
                    position: absolute;
                    top: 50%;
                    margin-left: -50px;
                    left: 50%;
                    animation: speeder 0.4s linear infinite;
                }

                .loader-body {
                    height: 5px;
                    width: 35px;
                    background: #fff;
                    position: absolute;
                    top: -19px;
                    left: 60px;
                    border-radius: 2px 10px 1px 0;
                }

                .ship-body {
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-top: 6px solid transparent;
                    border-right: 100px solid #fff;
                    border-bottom: 6px solid transparent;
                }

                .ship-body:before {
                    content: "";
                    height: 22px;
                    width: 22px;
                    border-radius: 50%;
                    background: #fff;
                    position: absolute;
                    right: -110px;
                    top: -16px;
                }

                .ship-body:after {
                    content: "";
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-top: 0 solid transparent;
                    border-right: 55px solid #fff;
                    border-bottom: 16px solid transparent;
                    top: -16px;
                    right: -98px;
                }

                .face {
                    position: absolute;
                    height: 12px;
                    width: 20px;
                    background: #fff;
                    border-radius: 20px 20px 0 0;
                    transform: rotate(-40deg);
                    right: -125px;
                    top: -15px;
                }

                .face:after {
                    content: "";
                    height: 12px;
                    width: 12px;
                    background: #fff;
                    right: 4px;
                    top: 7px;
                    position: absolute;
                    transform: rotate(40deg);
                    transform-origin: 50% 50%;
                    border-radius: 0 0 0 2px;
                }

                .trail {
                    width: 30px;
                    height: 1px;
                    background: #fff;
                    position: absolute;
                }

                .trail-1 {
                    animation: fazer1 0.2s linear infinite;
                }

                .trail-2 {
                    top: 3px;
                    animation: fazer2 0.4s linear infinite;
                }

                .trail-3 {
                    top: 1px;
                    animation: fazer3 0.4s linear infinite;
                    animation-delay: -1s;
                }

                .trail-4 {
                    top: 4px;
                    animation: fazer4 1s linear infinite;
                    animation-delay: -1s;
                }

                .longfazers {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }

                .fazer {
                    position: absolute;
                    height: 2px;
                    width: 20%;
                    background: #fff;
                }

                .fazer-1 {
                    top: 20%;
                    animation: lf 0.6s linear infinite;
                    animation-delay: -5s;
                }

                .fazer-2 {
                    top: 40%;
                    animation: lf2 0.8s linear infinite;
                    animation-delay: -1s;
                }

                .fazer-3 {
                    top: 60%;
                    animation: lf3 0.6s linear infinite;
                }

                .fazer-4 {
                    top: 80%;
                    animation: lf4 0.5s linear infinite;
                    animation-delay: -3s;
                }

                @keyframes fazer1 {
                    0% {
                        left: 0;
                    }
                    100% {
                        left: -80px;
                        opacity: 0;
                    }
                }

                @keyframes fazer2 {
                    0% {
                        left: 0;
                    }
                    100% {
                        left: -100px;
                        opacity: 0;
                    }
                }

                @keyframes fazer3 {
                    0% {
                        left: 0;
                    }
                    100% {
                        left: -50px;
                        opacity: 0;
                    }
                }

                @keyframes fazer4 {
                    0% {
                        left: 0;
                    }
                    100% {
                        left: -150px;
                        opacity: 0;
                    }
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

                @keyframes lf {
                    0% {
                        left: 200%;
                    }
                    100% {
                        left: -200%;
                        opacity: 0;
                    }
                }

                @keyframes lf2 {
                    0% {
                        left: 200%;
                    }
                    100% {
                        left: -200%;
                        opacity: 0;
                    }
                }

                @keyframes lf3 {
                    0% {
                        left: 200%;
                    }
                    100% {
                        left: -100%;
                        opacity: 0;
                    }
                }

                @keyframes lf4 {
                    0% {
                        left: 200%;
                    }
                    100% {
                        left: -100%;
                        opacity: 0;
                    }
                }
            `}</style>
        </>
    );
}
