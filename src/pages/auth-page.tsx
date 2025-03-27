import { motion } from "framer-motion"

const containerVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
}

const buttonVariants = {
	hover: { scale: 1.05 },
	tap: { scale: 0.95 },
}

export default function AuthPage() {
	return (
		<div className="relative h-full w-full overflow-hidden">
			{/* Main Content Container */}
			<motion.div
				className="relative flex flex-col mt-40 items-center min-h-screen bg-transparent"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				transition={{ duration: 0.3 }}
			>
				{/* Replace this placeholder with your actual logo */}
				<div className="w-20 h-20 mb-4 flex items-center justify-center bg-accent text-base font-bold rounded-full">
					Logo
				</div>

				<h1 className="text-3xl text-base font-bold mb-6">Welcome to JigJoy Playground</h1>

				<motion.input
					type="email"
					placeholder="Email Address"
					className="
            mb-6 w-72 px-4 py-2
            bg-surface-200 text-base
            rounded outline-none
            border border-hover
            placeholder:text-hover placeholder:opacity-60
            focus:ring-2 focus:ring-hover
          "
					whileFocus={{ scale: 1.02 }}
				/>

				<motion.button
					className="
            px-6 py-2
            bg-hover text-surface-100 font-semibold 
            rounded border border-hover
            hover:bg-hover
            transition-colors duration-200
          "
					variants={buttonVariants}
					whileHover="hover"
					whileTap="tap"
				>
					Log in or Register
				</motion.button>
			</motion.div>
		</div>
	)
}
