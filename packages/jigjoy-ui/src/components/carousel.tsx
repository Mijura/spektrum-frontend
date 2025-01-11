import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CarouselProps {
	children: React.ReactNode[]
	selectedItem?: React.ReactNode | null
	onItemSelect?: (item: React.ReactNode | null) => void
	className?: string
	itemsPerSlide?: number
	showCounter?: boolean
}

export default function Carousel({
	children,
	selectedItem,
	onItemSelect,
	className = "",
	itemsPerSlide = 1,
	showCounter = true,
}: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [direction, setDirection] = useState(0)
	const [isHovered, setIsHovered] = useState(false)

	const totalSlides = Math.ceil(React.Children.count(children) / itemsPerSlide)

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		}),
		center: {
			zIndex: 0,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction > 0 ? -1000 : 1000,
			opacity: 0,
		}),
	}

	const swipeConfidenceThreshold = 10000
	const swipePower = (offset: number, velocity: number) => {
		return Math.abs(offset) * velocity
	}

	const paginate = (newDirection: number) => {
		const newIndex = currentIndex + newDirection
		if (newIndex >= 0 && newIndex < totalSlides) {
			setCurrentIndex(newIndex)
			setDirection(newDirection)
		}
	}

	const getCurrentSlideItems = () => {
		const start = currentIndex * itemsPerSlide
		const end = Math.min(start + itemsPerSlide, React.Children.count(children))
		return React.Children.toArray(children).slice(start, end)
	}

	return (
		<div
			className={`relative w-full group ${className}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{showCounter && (
				<div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-surface2 px-3 py-1 rounded-full text-white text-sm">
					{currentIndex + 1} / {totalSlides}
				</div>
			)}

			<div className="relative flex items-center justify-center">
				<AnimatePresence initial={false} custom={direction} mode="wait">
					<motion.div
						key={currentIndex}
						custom={direction}
						variants={slideVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
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
						dragMomentum={false}
						whileDrag={{ cursor: "grabbing" }}
						onPointerDownCapture={(e) => {
							// Prevent drag if clicking on a button or interactive element
							if ((e.target as HTMLElement).closest("button")) {
								e.stopPropagation()
							}
						}}
						className={`w-full h-auto ${itemsPerSlide === 1 ? "max-w-[50%] mx-auto" : ""}`}
					>
						<div
							className={`grid grid-cols-1 ${
								itemsPerSlide === 1 ? "md:grid-cols-1" : itemsPerSlide === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
							} gap-6`}
						>
							{getCurrentSlideItems()}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>

			<div
				className={`absolute inset-0 z-[1] transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
			>
				<div className="absolute inset-0">
					<div className="absolute inset-0 pointer-events-none">
						<motion.div
							className="absolute left-0 top-0 w-[8%] h-full"
							style={{
								background: "linear-gradient(to right, rgba(37, 37, 37, 0.5) 0%, rgba(37, 37, 37, 0.0) 100%)",
							}}
							animate={{
								backdropFilter: isHovered ? "blur(1px)" : "blur(0px)",
							}}
							transition={{ duration: 0.7 }}
						/>
						<motion.div
							className="absolute right-0 top-0 w-[8%] h-full"
							style={{
								background: "linear-gradient(to left, rgba(37, 37, 37, 0.5) 0%, rgba(37, 37, 37, 0.0) 100%)",
							}}
							animate={{
								backdropFilter: isHovered ? "blur(1px)" : "blur(0px)",
							}}
							transition={{ duration: 0.7 }}
						/>
					</div>
				</div>

				<div className="relative w-full h-full flex items-center justify-between px-4">
					<motion.button
						className={`text-clickable hover:text-surface2 transition-colors pointer-events-auto bg-surface2 hover:bg-hover rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-center leading-none ${
							currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
						}`}
						onClick={() => paginate(-1)}
						disabled={currentIndex === 0}
						whileHover={{ scale: 1.05 }}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="current-fill"
						>
							<path
								d="M7 2L3 6L7 10"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</motion.button>

					<motion.button
						className={`text-clickable hover:text-surface2 transition-colors pointer-events-auto bg-surface2 hover:bg-hover rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-center leading-none ${
							currentIndex === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
						}`}
						onClick={() => paginate(1)}
						disabled={currentIndex === totalSlides - 1}
						whileHover={{ scale: 1.05 }}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="current-fill"
						>
							<path
								d="M4.5 2L8.5 6L4.5 10"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</motion.button>
				</div>
			</div>
		</div>
	)
}
