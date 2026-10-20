"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export interface AnimatedRaysProps {
    /** Additional CSS classes */
    className?: string;
    /** Optional children to render over the background */
    children?: React.ReactNode;
}

export function AnimatedRays({
    className = "",
    children,
}: AnimatedRaysProps) {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkDark = () => document.documentElement.classList.contains("dark");
        setIsDark(checkDark());

        const observer = new MutationObserver(() => setIsDark(checkDark()));
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    if (!mounted) return null;

    const stripes = `repeating-linear-gradient(
        100deg,
        var(--stripe-color) 0%,
        var(--stripe-color) 7%,
        transparent 10%,
        transparent 12%,
        var(--stripe-color) 16%
    )`;
    const rainbow = `repeating-linear-gradient(
        100deg,
        #f4c62e 10%,
        #e95d79 15%,
        #f59e0b 20%,
        #ec4899 25%,
        #fbbf24 30%
    )`;

    return (
        <div className={cn("relative w-full h-full overflow-hidden", className)}>
            {/* Aurora Background — matches original .hero from VengeanceUI */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `${stripes}, ${rainbow}`,
                    backgroundSize: "300%, 200%",
                    backgroundPosition: "50% 50%, 50% 50%",
                    filter: isDark
                        ? "blur(12px) opacity(50%) saturate(200%)"
                        : "blur(14px) opacity(40%)",
                    maskImage: "radial-gradient(ellipse at 100% 0%, black 40%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(ellipse at 100% 0%, black 40%, transparent 75%)",
                }}
            >
                {/* Animated overlay — matches original .hero::after */}
                <div
                    className="absolute inset-0 animate-aurora-bg"
                    style={{
                        backgroundImage: `${stripes}, ${rainbow}`,
                        backgroundSize: "200%, 100%",
                        backgroundAttachment: "fixed",
                        mixBlendMode: "overlay",
                    }}
                />
            </div>

            {/* Optional ambient warm rays glow */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F4C62E]/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#E95D79]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

            {children && (
                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            )}
        </div>
    );
}

export default AnimatedRays;
