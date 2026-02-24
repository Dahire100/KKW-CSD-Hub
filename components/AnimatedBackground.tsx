'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '@/lib/types';

interface Star {
    left: string;
    top: string;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

// --- Lightweight CSS Background (replaces heavy Three.js Canvas) ---
export default function AnimatedBackground({ theme }: { theme: Theme }) {
    const [stars, setStars] = useState<Star[]>([]);

    // Generate stars only on the client to avoid SSR hydration mismatch
    useEffect(() => {
        setStars(
            Array.from({ length: 100 }).map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                size: Math.random() * 2 + 0.5,
                duration: Math.random() * 4 + 2,
                delay: Math.random() * 7,
                opacity: Math.random() * 0.7 + 0.2,
            }))
        );
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden animated-bg transition-colors duration-1000">
            {/* Star field with varying depths */}
            {stars.map((star, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white star"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        '--twinkle-duration': `${star.duration}s`,
                        '--twinkle-delay': `${star.delay}s`,
                        filter: i % 10 === 0 ? 'blur(1px)' : 'none', // Background stars are blurred
                        boxShadow: i % 20 === 0 ? `0 0 ${star.size * 2}px #fff` : 'none',
                    } as React.CSSProperties}
                />
            ))}

            {/* Galaxy Nebulae / Floating gradient orbs */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[140px] orb-1 opacity-60"
                style={{
                    top: '10%',
                    left: '-10%',
                    background: `radial-gradient(circle, ${theme.primaryHex}60, transparent 70%)`,
                }}
            />
            <div
                className="absolute w-[700px] h-[700px] rounded-full mix-blend-screen filter blur-[140px] orb-2 opacity-50"
                style={{
                    top: '30%',
                    right: '-15%',
                    background: `radial-gradient(circle, ${theme.secondaryHex}50, transparent 70%)`,
                }}
            />
            <div
                className="absolute w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] orb-3 opacity-40"
                style={{
                    bottom: '5%',
                    left: '20%',
                    background: `radial-gradient(circle, ${theme.primaryHex}40, transparent 70%)`,
                }}
            />

            {/* Additional "Gas" layer for Galaxy feel */}
            <div
                className="absolute w-[800px] h-[800px] rounded-full mix-blend-color-dodge filter blur-[150px] animate-pulse-glow opacity-30"
                style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, ${theme.secondaryHex}40, transparent 80%)`,
                }}
            />

            {/* Gradient overlay - Deeper Space */}
            <div
                className="absolute inset-0 z-10 mix-blend-overlay transition-colors duration-1000"
                style={{
                    background: `linear-gradient(to bottom right, ${theme.primaryHex}20, #020617 60%, ${theme.secondaryHex}20)`,
                }}
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.05] z-20 mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
