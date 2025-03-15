import { Button } from "@jigjoy-io/ui"
import { motion } from "framer-motion"

export default function ProfilePage() {
	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 3 }}
				className={`h-full w-full bg-surface-1 flex flex-col items-center justify-center`}
			>
				{/* Top Section: Profile Info + Credits */}
				<div className="w-full max-w-3xl flex flex-col items-start justify-between bg-surface-2 rounded-md shadow p-4 border border-disabled">
					{/* Left: Profile Image & Basic Info */}
					<div className="flex flex-col items-center text-heading">
						<div className="py-4">
							At JigJoy, we’re creating a space where anyone can design their own software development workflow and seamlessly
							connect it to our hexagonal ecosystem for execution. Just like bees building honeycombs—the most efficient way to
							create something with lasting value.
						</div>
						<div className="py-4">
							We’re Miodrag Vilotijević and Miodrag Todorović, tech-savvy builders on a mission to make AI agents work for
							you—seamlessly, intelligently, and with full control. Welcome aboard! 🚀
						</div>
					</div>

					<div className="my-4">
						<Button>Start Building</Button>
					</div>
				</div>
			</motion.div>
		</>
	)
}
