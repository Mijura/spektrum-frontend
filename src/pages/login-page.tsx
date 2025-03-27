import { Button, Logo } from "@honeycomb-app/design"
import { motion } from "framer-motion"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../reducers/auth-reducer"

export default function LoginPage() {
	const [email, setEmail] = useState("")
	const dispatch = useDispatch()

	const handleContinue = () => {
		dispatch(loginSuccess({}))
	}

	return (
		<div className="relative h-full w-full overflow-hidden">
			{/* Main Content Container */}
			<motion.div
				className="relative flex flex-col mt-40 items-center min-h-screen bg-transparent"
				initial="hidden"
				animate="visible"
				transition={{ duration: 0.3 }}
			>
				<h1 className="text-2xl mb-2 text-base">Welcome!</h1>

				<div className="text-base opacity-80 my-2 mb-6">Enter email to recieve magic link.</div>
				<div className="my-6">
					<Logo size="large" />
				</div>
				<motion.input
					type="email"
					placeholder="Email Address"
					className="mb-6 w-[320px] px-4 py-2 bg-surface-100 text-base placeholder:text-base placeholder:opacity-70 rounded-lg outline-none focus:ring-1 focus:ring-disabled"
					onChange={(e) => setEmail(e.target.value)}
				/>

				<Button className="w-[320px] px-4 py-2 font-bold bg-secondary hover:bg-hover-secondary" onClick={handleContinue}>
					Continue to Honeycomb
				</Button>
			</motion.div>
		</div>
	)
}
