import React from 'react'
import { motion } from 'framer-motion'

// Animates the background gradient position for a subtle shifting effect
const backgroundVariants = {
    animate: {
        backgroundPosition: ['0% 0%', '100% 100%'],
        transition: {
            duration: 60, // Adjust for faster or slower animation
            repeat: Infinity,
            ease: 'linear'
        }
    }
}

// Container fade-in animation for the main content
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

// Button hover/tap variants
const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
}

export default function Authorization() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Galaxy Background Layer */}
            <motion.div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, #b08df8, #252525, #151515)',
                    backgroundSize: '400% 400%'
                }}
                variants={backgroundVariants}
                animate="animate"
            />

            {/* Main Content Container */}
            <motion.div
                className="relative flex flex-col justify-center items-center min-h-screen bg-transparent"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
            >
                {/* Replace this placeholder with your actual logo */}
                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-accent text-white font-bold rounded-full">
                    Logo
                </div>

                <h1 className="text-3xl text-white font-bold mb-6">Welcome to JigJoy Playground</h1>

                <motion.input
                    type="email"
                    placeholder="Email Address"
                    className="
            mb-6 w-72 px-4 py-2
            bg-surface2 text-base text-white
            rounded outline-none
            border border-[#E5FD78]
            placeholder:text-[#E5FD78] placeholder:opacity-60
            focus:ring-2 focus:ring-[#E5FD78]
          "
                    whileFocus={{ scale: 1.02 }}
                />

                <motion.button
                    className="
            px-6 py-2
            bg-[#E5FD78] text-surface1 font-semibold 
            rounded border border-[#E5FD78]
            hover:bg-[#E5FD78]
            transition-colors duration-200
          "
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    Log in or Register
                </motion.button>
            </motion.div>
        </div>
    )
}
