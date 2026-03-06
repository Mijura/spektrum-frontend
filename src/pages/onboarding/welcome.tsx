import { Button } from "@jigjoy-ai/ui-library"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { nextStepLoaded } from "../../reducers/onboarding-reducer"

const sentences = [
	`JigJoy was born from that rush developers feel when something they built finally appears on screen — and they realize: I actually made this.`,
	`We felt it the first time we wrote a recursive function to display a file system on the UI. After hours of struggling, folders and files finally appeared — nested, with their icons, exactly as they should. `,
	`We've been chasing that feeling ever since. Spektrum is our latest attempt to help other developers feel it too.`,
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

export default function WelcomeStep() {
	const dispatch = useDispatch()

	return (
		<motion.div className={`h-full w-full bg-surface flex flex-col`}>
			<div className="w-full flex flex-wrap">
				{/* First message */}
				<div className="w-full text-secondary py-4">{staggeredText(sentences[0], 4)}</div>

				<div className="w-full text-secondary py-4">
					{staggeredText(sentences[1], 12)} {/* Starts after first sentence */}
				</div>

				<div className="w-full text-secondary py-4">
					{staggeredText(sentences[2], 23)} {/* Starts after first sentence */}
				</div>

				{/* Animated Button */}
				<motion.div
					className="mt-4"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 29, duration: 1 }} // Appears after text
				>
					<Button
						className="bg-highlight text-primary hover:bg-highlight/80 w-fit"
						onClick={() => dispatch(nextStepLoaded())}
					>
						Start Building, Feel JigJoy
					</Button>
				</motion.div>
			</div>
		</motion.div>
	)
}
