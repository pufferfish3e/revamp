/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

"use client";

import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

// Hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth < 768; // md breakpoint
      const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(width || userAgent);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

export type DockItemData = {
    icon: React.ReactNode;
    label: React.ReactNode;
    onClick: () => void;
    className?: string;
};

export type DockProps = {
    items: DockItemData[];
    className?: string;
    baseItemSize?: number;
};

type DockItemProps = {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    baseItemSize: number;
};

function DockItem({
    children,
    className = "",
    onClick,
    baseItemSize,
}: DockItemProps) {
    return (
        <motion.div
            style={{
                width: baseItemSize,
                height: baseItemSize,
            }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className={`relative inline-flex items-center justify-center rounded-full bg-[#060010] border-neutral-700 border-2 shadow-md ${className}`}
            role="button"
            aria-label="Navigation item"
        >
            {children}
        </motion.div>
    );
}

type DockIconProps = {
    className?: string;
    children: React.ReactNode;
};

function DockIcon({ children, className = "" }: DockIconProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            {children}
        </div>
    );
}

export default function Dock({
    items,
    className = "",
    baseItemSize = 50,
}: DockProps) {
    const isMobile = useIsMobile();

    // Don't render on desktop
    if (!isMobile) {
        return null;
    }

    return (
        <div 
            className="mobile-dock-container"
        >
            <div
                className={`mobile-dock-inner ${className} flex items-center justify-center w-fit gap-3 rounded-2xl border-neutral-700 border-2 p-3 bg-black/80 backdrop-blur-md shadow-lg`}
                role="toolbar"
                aria-label="Mobile navigation dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        className={item.className}
                        baseItemSize={baseItemSize}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                    </DockItem>
                ))}
            </div>
        </div>
    );
}
