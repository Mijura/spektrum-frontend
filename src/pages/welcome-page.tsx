import { Button, Loader } from "@honeycomb-app/design"
import { useNavigate } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { createNewProject } from "../api/project"
import { useState } from "react"
import { getCurrentUser } from "aws-amplify/auth"

const sentences = [
	"At JigJoy, we’re creating a space where anyone can design their own software development workflow and seamlessly connect it to our hexagonal ecosystem for execution.",
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
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const handleCreateNewProject = async () => {
		try {
			setLoading(true)
			const user = await getCurrentUser()
			const project: any = await createNewProject(user.username)
			navigate({
				to: `/${project.id}`,
			})
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return loading ? (
		<div className="bg-surface w-full h-full flex items-center justify-center">
			<Loader size="small" message="Project initialization" />
		</div>
	) : (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 3 }}
			className={`h-full w-full bg-surface flex flex-col items-center justify-center`}
		>
			<div className="w-full max-w-3xl items-start justify-between bg-surface-muted rounded-md shadow p-4 border border-secondary-200 flex flex-wrap">
				{/* First message */}
				<div className="w-full text-secondary py-4">{staggeredText(sentences[0], 0)}</div>

				<div className="w-full text-secondary py-4">
					{staggeredText(sentences[1], 7)} {/* Starts after first sentence */}
				</div>

				{/* Animated Button */}
				<motion.div
					className="mt-4"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 12, duration: 1 }} // Appears after text
				>
					<Button className="animate-bounce" onClick={handleCreateNewProject}>
						Start Building
					</Button>
				</motion.div>
			</div>
		</motion.div>
	)
}
