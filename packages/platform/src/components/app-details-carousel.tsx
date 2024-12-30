import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AppDetailsCarouselProps {
    images: string[]
}

export default function AppDetailsCarousel({ images }: AppDetailsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            scale: 0.8
        })
    }

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    }

    const swipeConfidenceThreshold = 10000
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity
    }

    const paginate = (newDirection: number) => {
        const newIndex = currentIndex + newDirection
        if (newIndex >= 0 && newIndex < images.length) {
            setCurrentIndex(newIndex)
            setDirection(newDirection)
        }
    }

    const [direction, setDirection] = useState(0)

    return (
        <div className="relative w-full h-[400px] overflow-hidden">
            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-surface2 px-3 py-1 rounded-full text-white text-sm">
                {currentIndex + 1} / {images.length}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence initial={false} custom={currentIndex}>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onClick={() => setSelectedImage(images[currentIndex])}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x)

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1)
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1)
                            }
                        }}
                        className="absolute max-w-[80%] max-h-[350px] rounded-lg shadow-xl cursor-pointer hover:scale-105 transition-transform"
                        alt={`Slide ${currentIndex + 1}`}
                    />
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-surface2 text-white p-3 rounded-full shadow-lg hover:bg-surface3 transition-colors ${
                    currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => paginate(-1)}
                disabled={currentIndex === 0}
            >
                ←
            </button>
            <button
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-surface2 text-white p-3 rounded-full shadow-lg hover:bg-surface3 transition-colors ${
                    currentIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => paginate(1)}
                disabled={currentIndex === images.length - 1}
            >
                →
            </button>

            {/* Enlarged Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative max-w-[90vw] max-h-[90vh]"
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Enlarged view"
                                className="max-w-full max-h-[90vh] rounded-lg"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 text-white bg-surface2 rounded-full p-2 hover:bg-surface3 transition-colors"
                            >
                                ×
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
