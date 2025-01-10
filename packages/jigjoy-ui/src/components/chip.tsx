import React from "react"
import { motion } from "framer-motion"

interface ChipProps {
	label: string
	onClick?: () => void
	delay?: number
	className?: string
}

const bubbleVariants = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
}

const Chip: React.FC<ChipProps> = ({ label, onClick, delay = 0, className = "" }) => {
	return (
		<motion.button
			variants={bubbleVariants}
			initial="initial"
			animate="animate"
			transition={{ duration: 0.3, delay: delay * 0.1 }}
			onClick={onClick}
			className={
				"rounded-full px-3 py-1 bg-clickable text-[black] text-sm " + "hover:bg-hover transition-colors " + className
			}
		>
			{label}
		</motion.button>
	)
}

export default Chip
