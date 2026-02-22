import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_WORDS = ["Setting up", "Loading projects", "Almost there", "Welcome"];

const LoadingScreen = () => {
    const [loadingText, setLoadingText] = useState("Setting up");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % LOADING_WORDS.length;
            setLoadingText(LOADING_WORDS[currentIndex]);
        }, 900);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + Math.random() * 15 + 5;
            });
        }, 400);
        return () => clearInterval(interval);
    }, []);

    const particles = useMemo(() => 
        Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 4 + 3,
            delay: Math.random() * 2,
        })), []
    );

    const orbitDots = useMemo(() =>
        Array.from({ length: 6 }, (_, i) => ({
            id: i,
            angle: (360 / 6) * i,
            radius: 80 + (i % 2) * 20,
            size: 3 + (i % 3),
            duration: 6 + i * 1.5,
            color: ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'][i],
        })), []
    );

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-[120px]"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px]"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-white/20"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, Math.random() * 20 - 10, 0],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* 3D Orbiting Structure */}
                <div className="relative w-48 h-48 mb-12" style={{ perspective: '800px' }}>
                    {/* Outer Ring - 3D tilt */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ transformStyle: 'preserve-3d' }}
                        animate={{ rotateX: [20, -20, 20], rotateY: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full" />
                        {orbitDots.slice(0, 3).map((dot) => (
                            <motion.div
                                key={dot.id}
                                className="absolute rounded-full"
                                style={{
                                    width: dot.size * 2,
                                    height: dot.size * 2,
                                    backgroundColor: dot.color,
                                    boxShadow: `0 0 12px ${dot.color}`,
                                    top: '50%',
                                    left: '50%',
                                }}
                                animate={{
                                    x: [
                                        Math.cos((dot.angle * Math.PI) / 180) * dot.radius,
                                        Math.cos(((dot.angle + 360) * Math.PI) / 180) * dot.radius,
                                    ],
                                    y: [
                                        Math.sin((dot.angle * Math.PI) / 180) * dot.radius,
                                        Math.sin(((dot.angle + 360) * Math.PI) / 180) * dot.radius,
                                    ],
                                }}
                                transition={{ duration: dot.duration, repeat: Infinity, ease: "linear" }}
                            />
                        ))}
                    </motion.div>

                    {/* Middle Ring - Counter rotate */}
                    <motion.div
                        className="absolute inset-6"
                        style={{ transformStyle: 'preserve-3d' }}
                        animate={{ rotateX: [-15, 15, -15], rotateZ: [0, -360] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute inset-0 border border-purple-500/25 rounded-full" />
                        {orbitDots.slice(3).map((dot) => (
                            <motion.div
                                key={dot.id}
                                className="absolute rounded-full"
                                style={{
                                    width: dot.size * 2,
                                    height: dot.size * 2,
                                    backgroundColor: dot.color,
                                    boxShadow: `0 0 10px ${dot.color}`,
                                    top: '50%',
                                    left: '50%',
                                }}
                                animate={{
                                    x: [
                                        Math.cos((dot.angle * Math.PI) / 180) * 55,
                                        Math.cos(((dot.angle + 360) * Math.PI) / 180) * 55,
                                    ],
                                    y: [
                                        Math.sin((dot.angle * Math.PI) / 180) * 55,
                                        Math.sin(((dot.angle + 360) * Math.PI) / 180) * 55,
                                    ],
                                }}
                                transition={{ duration: dot.duration, repeat: Infinity, ease: "linear" }}
                            />
                        ))}
                    </motion.div>

                    {/* Core - Profile initials with glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="relative"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Glow behind */}
                            <motion.div
                                className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
                                animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                            {/* Core circle */}
                            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10" />
                                <motion.span
                                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 relative z-10"
                                    animate={{ opacity: [0.8, 1, 0.8] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    MA
                                </motion.span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Name */}
                <motion.h1
                    className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Munir{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Ayub
                    </span>
                </motion.h1>

                <motion.p
                    className="text-sm text-neutral-500 mb-8 tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Full Stack Developer
                </motion.p>

                {/* Loading Status */}
                <div className="flex flex-col items-center space-y-4 w-72">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={loadingText}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-neutral-400 font-medium"
                        >
                            {loadingText}...
                        </motion.p>
                    </AnimatePresence>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]" />
                        </motion.div>
                    </div>

                    <p className="text-[10px] text-neutral-600 font-mono">
                        {Math.min(Math.round(progress), 100)}%
                    </p>
                </div>
            </div>

            {/* Shimmer animation keyframes */}
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
