import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950">
            <div className="flex flex-col items-center">
                {/* Animated Logo/Icon Container */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-24 h-24 mb-8"
                >
                    {/* Outer glowing ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-t-4 border-blue-500 border-r-transparent border-b-purple-500 border-l-transparent opacity-70"
                    />

                    {/* Inner pulsating circle */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 backdrop-blur-sm"
                    />

                    {/* Center Initial/Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            MK
                        </span>
                    </div>
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Building Experience
                    </h3>
                    <div className="flex space-x-1 justify-center">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut"
                                }}
                                className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoadingScreen;
