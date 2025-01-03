import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CarouselProps {
    children: React.ReactNode[]
    selectedItem?: React.ReactNode | null
    onItemSelect?: (item: React.ReactNode | null) => void
    className?: string
}

export default function Carousel({ children, selectedItem, onItemSelect, className = '' }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction > 0 ? -1000 : 1000,
            opacity: 0
        })
    }

    const swipeConfidenceThreshold = 10000
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity
    }

    const paginate = (newDirection: number) => {
        const newIndex = currentIndex + newDirection
        if (newIndex >= 0 && newIndex < React.Children.count(children)) {
            setCurrentIndex(newIndex)
            setDirection(newDirection)
        }
    }

    return (
        <div className={`relative w-full min-h-[400px] ${className}`}>
            {/* Item Counter */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-surface2 px-3 py-1 rounded-full text-white text-sm">
                {currentIndex + 1} / {React.Children.count(children)}
            </div>{' '}
            <div className="relative flex items-center justify-center py-12">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x)

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1)
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1)
                            }
                        }}
                        className="w-auto h-auto cursor-pointer"
                        style={{
                            position: 'relative',
                            maxWidth: '50%'
                        }}
                    >
                        {React.Children.toArray(children)[currentIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>
            {/* Navigation Buttons */}
            <button
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-clickable text-[6rem] hover:text-hover transition-colors ${
                    currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={() => paginate(-1)}
                disabled={currentIndex === 0}
            >
                &lt;
            </button>
            <button
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-clickable text-[6rem] hover:text-hover transition-colors ${
                    currentIndex === React.Children.count(children) - 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                }`}
                onClick={() => paginate(1)}
                disabled={currentIndex === React.Children.count(children) - 1}
            >
                &gt;
            </button>
        </div>
    )
}
