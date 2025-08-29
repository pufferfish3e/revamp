/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React, { useEffect, useRef } from "react";

interface FuzzyTextProps {
    children: React.ReactNode;
    fontSize?: number | string;
    fontWeight?: string | number;
    fontFamily?: string;
    color?: string;
    enableHover?: boolean;
    baseIntensity?: number;
    hoverIntensity?: number;
    className?: string;
    // New props for responsive sizing
    minFontSize?: number;
    maxFontSize?: number;
    viewportScaling?: number;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
    children,
    fontSize = "clamp(2rem, 8vw, 8rem)",
    fontWeight = 900,
    fontFamily = "inherit",
    color = "#fff",
    enableHover = true,
    baseIntensity = 0.18,
    hoverIntensity = 0.5,
    minFontSize = 32, // Default 2rem equivalent
    maxFontSize = 128, // Default 8rem equivalent
    viewportScaling = 8, // Default 8vw equivalent
}) => {
    const canvasRef = useRef<
        HTMLCanvasElement & { cleanupFuzzyText?: () => void }
    >(null);

    useEffect(() => {
        let animationFrameId: number;
        let isCancelled = false;
        let resizeTimeoutId: number;
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Function to calculate responsive font size (moved inside useEffect)
        const calculateResponsiveFontSize = (
            fontSize: number | string
        ): number => {
            if (typeof fontSize === "number") {
                return fontSize;
            }

            // Check if it's a clamp() function
            if (typeof fontSize === "string" && fontSize.includes("clamp(")) {
                const viewportWidth = window.innerWidth;
                const viewportFontSize =
                    (viewportWidth * viewportScaling) / 100;

                // Clamp the calculated size between min and max
                return Math.max(
                    minFontSize,
                    Math.min(maxFontSize, viewportFontSize)
                );
            }

            // Handle other string formats like "4rem", "64px", etc.
            if (typeof fontSize === "string") {
                const temp = document.createElement("span");
                temp.style.fontSize = fontSize;
                temp.style.position = "absolute";
                temp.style.visibility = "hidden";
                document.body.appendChild(temp);
                const computedSize = parseFloat(
                    window.getComputedStyle(temp).fontSize
                );
                document.body.removeChild(temp);
                return computedSize;
            }

            return 64; // Default fallback
        };

        const init = async () => {
            if (document.fonts?.ready) {
                await document.fonts.ready;
            }
            if (isCancelled) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const computedFontFamily =
                fontFamily === "inherit"
                    ? window.getComputedStyle(canvas).fontFamily || "sans-serif"
                    : fontFamily;

            // Use responsive font size calculation
            const numericFontSize = calculateResponsiveFontSize(fontSize);
            const fontSizeStr = `${numericFontSize}px`;

            const text = React.Children.toArray(children).join("");

            const offscreen = document.createElement("canvas");
            const offCtx = offscreen.getContext("2d");
            if (!offCtx) return;

            offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            offCtx.textBaseline = "alphabetic";
            const metrics = offCtx.measureText(text);

            const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
            const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
            const actualAscent =
                metrics.actualBoundingBoxAscent ?? numericFontSize;
            const actualDescent =
                metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

            const textBoundingWidth = Math.ceil(actualLeft + actualRight);
            const tightHeight = Math.ceil(actualAscent + actualDescent);

            const extraWidthBuffer = 10;
            const offscreenWidth = textBoundingWidth + extraWidthBuffer;

            offscreen.width = offscreenWidth;
            offscreen.height = tightHeight;

            const xOffset = extraWidthBuffer / 2;
            offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            offCtx.textBaseline = "alphabetic";
            offCtx.fillStyle = color;
            offCtx.fillText(text, xOffset - actualLeft, actualAscent);

            const horizontalMargin = 50;
            const verticalMargin = 0;
            canvas.width = offscreenWidth + horizontalMargin * 2;
            canvas.height = tightHeight + verticalMargin * 2;
            ctx.translate(horizontalMargin, verticalMargin);

            const interactiveLeft = horizontalMargin + xOffset;
            const interactiveTop = verticalMargin;
            const interactiveRight = interactiveLeft + textBoundingWidth;
            const interactiveBottom = interactiveTop + tightHeight;

            let isHovering = false;
            const fuzzRange = 30;

            const run = () => {
                if (isCancelled) return;
                ctx.clearRect(
                    -fuzzRange,
                    -fuzzRange,
                    offscreenWidth + 2 * fuzzRange,
                    tightHeight + 2 * fuzzRange
                );
                const intensity = isHovering ? hoverIntensity : baseIntensity;
                for (let j = 0; j < tightHeight; j++) {
                    const dx = Math.floor(
                        intensity * (Math.random() - 0.5) * fuzzRange
                    );
                    ctx.drawImage(
                        offscreen,
                        0,
                        j,
                        offscreenWidth,
                        1,
                        dx,
                        j,
                        offscreenWidth,
                        1
                    );
                }
                animationFrameId = window.requestAnimationFrame(run);
            };

            run();

            const isInsideTextArea = (x: number, y: number) =>
                x >= interactiveLeft &&
                x <= interactiveRight &&
                y >= interactiveTop &&
                y <= interactiveBottom;

            const handleMouseMove = (e: MouseEvent) => {
                if (!enableHover) return;
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                isHovering = isInsideTextArea(x, y);
            };

            const handleMouseLeave = () => {
                isHovering = false;
            };

            const handleTouchMove = (e: TouchEvent) => {
                if (!enableHover) return;
                e.preventDefault();
                const rect = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                isHovering = isInsideTextArea(x, y);
            };

            const handleTouchEnd = () => {
                isHovering = false;
            };

            if (enableHover) {
                canvas.addEventListener("mousemove", handleMouseMove);
                canvas.addEventListener("mouseleave", handleMouseLeave);
                canvas.addEventListener("touchmove", handleTouchMove, {
                    passive: false,
                });
                canvas.addEventListener("touchend", handleTouchEnd);
            }

            const cleanup = () => {
                window.cancelAnimationFrame(animationFrameId);
                if (enableHover) {
                    canvas.removeEventListener("mousemove", handleMouseMove);
                    canvas.removeEventListener("mouseleave", handleMouseLeave);
                    canvas.removeEventListener("touchmove", handleTouchMove);
                    canvas.removeEventListener("touchend", handleTouchEnd);
                }
            };

            canvas.cleanupFuzzyText = cleanup;
        };

        // Handle window resize for responsive font sizing
        const handleResize = () => {
            if (resizeTimeoutId) {
                window.clearTimeout(resizeTimeoutId);
            }
            resizeTimeoutId = window.setTimeout(() => {
                // Re-initialize with new size
                if (canvas && canvas.cleanupFuzzyText) {
                    canvas.cleanupFuzzyText();
                }
                init();
            }, 250); // Debounce resize
        };

        init();

        // Add resize listener only if fontSize contains clamp
        if (typeof fontSize === "string" && fontSize.includes("clamp(")) {
            window.addEventListener("resize", handleResize);
        }

        return () => {
            isCancelled = true;
            window.cancelAnimationFrame(animationFrameId);
            if (resizeTimeoutId) {
                window.clearTimeout(resizeTimeoutId);
            }
            if (typeof fontSize === "string" && fontSize.includes("clamp(")) {
                window.removeEventListener("resize", handleResize);
            }
            if (canvas && canvas.cleanupFuzzyText) {
                canvas.cleanupFuzzyText();
            }
        };
    }, [
        children,
        fontSize,
        fontWeight,
        fontFamily,
        color,
        enableHover,
        baseIntensity,
        hoverIntensity,
        minFontSize,
        maxFontSize,
        viewportScaling,
    ]);

    return <canvas ref={canvasRef} />;
};

export default FuzzyText;
