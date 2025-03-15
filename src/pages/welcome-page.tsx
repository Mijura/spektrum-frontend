import { Button } from "@honeycomb-app/design"
import { motion } from "framer-motion"

const sentences = [
	"At JigJoy, we’re creating a space where anyone can design their own software development workflow and seamlessly connect it to our hexagonal ecosystem for execution.",
	"Just like bees building honeycombs - the most efficient way to create something with lasting value.",
	"We’re Miodrag Vilotijević and Miodrag Todorović, tech-savvy builders on a mission to make AI agents work for you - seamlessly, intelligently, and with full control. Welcome aboard! 🚀",
]

const staggeredText = (text: string, delay: number) => {
	return (
		<motion.div
			className="w-full text-left flex flex-wrap" // Allows wrapping
			initial="hidden"
			animate="visible"
			variants={{
				hidden: {},
				visible: { transition: { staggerChildren: 0.25 } },
			}}
		>
			{text.split(" ").map((word, index) => (
				<motion.span
					key={index}
					className="inline-block mr-1"
					initial={{ opacity: 0, y: 0 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: delay + index * 0.25, duration: 0.4 }}
				>
					{word}
				</motion.span>
			))}
		</motion.div>
	)
}

export default function WelcomePage() {
	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 3 }}
				className={`h-full w-full bg-surface-1 flex flex-col items-center justify-center`}
			>
				<div className="w-full max-w-3xl items-start justify-between bg-surface-2 rounded-md shadow p-4 border border-disabled flex flex-wrap">
					{/* First message */}
					<div className="w-full text-base py-4">{staggeredText(sentences[0], 0)}</div>

					{/* Second message with delay */}
					<div className="w-full text-base py-4">{staggeredText(sentences[1], 7)}</div>

					<div className="w-full text-base py-4">
						{staggeredText(sentences[2], 12)} {/* Starts after first sentence */}
					</div>

					{/* Animated Button */}
					<motion.div
						className="mt-4"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 20, duration: 1 }} // Appears after text
					>
						<Button className="animate-bounce">Start Building</Button>
					</motion.div>
				</div>
			</motion.div>
		</>
	)
}
