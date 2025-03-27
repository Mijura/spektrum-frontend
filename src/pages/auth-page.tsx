import { Button } from "@honeycomb-app/design"
import { motion } from "framer-motion"

export default function AuthPage() {
	return (
		<div className="relative h-full w-full overflow-hidden">
			{/* Main Content Container */}
			<motion.div
				className="relative flex flex-col mt-40 items-center min-h-screen bg-transparent"
				initial="hidden"
				animate="visible"
				transition={{ duration: 0.3 }}
			>
				<h1 className="text-2xl text-bold mb-6 text-base">Welcome to Honeycomb!</h1>

				<motion.input
					type="email"
					placeholder="Email Address"
					className="
            mb-6 w-71 px-4 py-2
            bg-surface-100 text-base
            rounded outline-none
          "
				/>

				<Button className="w-71 px-4 py-2 font-bold bg-secondary hover:bg-hover-secondary">Login or Register</Button>
			</motion.div>
		</div>
	)
}
