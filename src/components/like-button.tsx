import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LikeButtonProps {
	initialLikes: number
	onLike?: () => void
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes, onLike }) => {
	const [isLiked, setIsLiked] = useState(false)
	const [likes, setLikes] = useState(initialLikes)
	const [showStars, setShowStars] = useState(false)

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (!isLiked) {
			setLikes((prev) => prev + 1)
			setShowStars(true)
			setTimeout(() => setShowStars(false), 700)
		} else {
			setLikes((prev) => prev - 1)
		}
		setIsLiked(!isLiked)
		onLike?.()
	}

	return (
		<div className="relative inline-flex items-center gap-2">
			<motion.button
				onClick={handleClick}
				className={`flex items-center justify-center w-8 h-8 rounded-full ${isLiked ? "bg-clickable text-surface1" : "bg-surface3 text-clickable"}`}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
			>
				<motion.svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
					transition={{ duration: 0.3 }}
				>
					<path
						d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
						fill="currentColor"
					/>
				</motion.svg>
			</motion.button>

			<motion.span
				key={likes}
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-base text-gray-400 min-w-[24px]"
			>
				{likes}
			</motion.span>

			<AnimatePresence>
				{showStars && (
					<motion.div className="absolute pointer-events-none" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
						{[...Array(5)].map((_, i) => (
							<motion.span
								key={i}
								className="absolute text-hover text-lg"
								initial={{
									x: 0,
									y: 0,
									scale: 0,
									rotate: 0,
								}}
								animate={{
									x: Math.random() * 60 - 30,
									y: -20 - Math.random() * 30,
									scale: [0, 1, 0],
									rotate: Math.random() * 360,
								}}
								transition={{
									duration: 0.6,
									ease: "easeOut",
								}}
							>
								★
							</motion.span>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default LikeButton
