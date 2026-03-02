import { Button, Loader } from "@jigjoy-ai/ui-library"
import { useNavigate } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useUserData } from "../../hooks/store"

const sentences = [
	`JigJoy was born from the rush of excitement developers feel when something they built finally appears on the screen — and they realize they actually made it.`,
	`We felt it the first time we wrote a recursive function to display a file system on the UI. After hours of struggling, folders and files finally appeared — nested, with their icons, exactly as they should.`,
	`We've been chasing that feeling ever since — and started building tools to help other developers feel it too. Spektrum is the latest one.`,
]

const staggeredText = (text: string, delay: number) => {
	return (
		<motion.div
			className="w-full text-left flex flex-wrap" // Allows wrapping
			initial="hidden"
			animate="visible"
			variants={{
				hidden: {},
				visible: { transition: { staggerChildren: 0.3 } },
			}}
		>
			{text.split(" ").map((word, index) => (
				<motion.span
					key={index}
					className="inline-block mr-1"
					initial={{ opacity: 0, y: 0 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: delay + index * 0.3, duration: 0.5 }}
				>
					{word}
				</motion.span>
			))}
		</motion.div>
	)
}

export default function WelcomePage() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const userData = useUserData()
	const handleCreateNewProject = async () => {
		try {
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return loading ? (
		<div className="bg-surface w-full h-full flex items-center justify-center">
			<Loader size="large" message="Project initialization" />
		</div>
	) : (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 3 }}
			className={`h-full w-full bg-surface flex flex-col items-center justify-center`}
		>
			<div className="w-full max-w-3xl items-start justify-between bg-surface-muted rounded-sm shadow p-4 border border-secondary-200 flex flex-wrap">
				{/* First message */}
				<div className="w-full text-secondary py-4">{staggeredText(sentences[0], 0)}</div>

				<div className="w-full text-secondary py-4">
					{staggeredText(sentences[1], 9)} {/* Starts after first sentence */}
				</div>

				<div className="w-full text-secondary py-4">
					{staggeredText(sentences[2], 21)} {/* Starts after first sentence */}
				</div>

				{/* Animated Button */}
				<motion.div
					className="mt-4"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 28, duration: 1 }} // Appears after text
				>
					<Button
						className="bg-highlight text-primary hover:bg-highlight/80 w-fit"
						onClick={handleCreateNewProject}
					>
						Start Building, Feel JigJoy
					</Button>
				</motion.div>
			</div>
		</motion.div>
	)
}
