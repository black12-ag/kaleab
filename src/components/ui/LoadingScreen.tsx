import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LOADING_WORDS = ["INITIALIZING", "LOADING ASSETS", "COMPILING DATA", "PREPARING INTERFACE", "WELCOME"];

const LoadingScreen = () => {
    const [loadingText, setLoadingText] = useState("INITIALIZING");

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % LOADING_WORDS.length;
            setLoadingText(LOADING_WORDS[currentIndex]);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 overflow-hidden">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Main Animated Orb Structure */}
                <div className="relative w-32 h-32 mb-10">
                    {/* Core Glow */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Outer Orbit Ring 1 */}
                    <motion.div
                        className="absolute inset-0 border-2 border-transparent border-t-blue-500 border-b-purple-500 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Inner Orbit Ring 2 (Counter-rotating) */}
                    <motion.div
                        className="absolute inset-2 border-2 border-transparent border-l-cyan-400 border-r-pink-500 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Central Hexagon/Core */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-blue-500/50 flex items-center justify-center relative overflow-hidden group"
                            animate={{ rotate: [0, 90, 180, 270, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 relative z-10 transform -rotate-[var(--rotation)]">
                                MK
                            </span>
                        </motion.div>
                    </div>

                    {/* Orbiting Particles */}
                    <motion.div
                        className="absolute -inset-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="w-3 h-3 bg-blue-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 blur-[1px] shadow-[0_0_10px_#60a5fa]" />
                    </motion.div>
                </div>

                {/* Text Section */}
                <div className="h-20 flex flex-col items-center justify-start space-y-4">
                    <motion.div
                        key={loadingText}
                        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                        className="text-2xl font-mono font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                    >
                        {loadingText}
                    </motion.div>

                    {/* Progress Bar Line */}
                    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden relative">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-white/30 w-10 blur-sm"
                            animate={{ x: ["0%", "500%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <p className="text-xs text-gray-500 font-mono mt-2">v25.1.0 // SYSTEM READY</p>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
