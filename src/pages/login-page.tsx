import { Button, Logo } from "@honeycomb-app/design"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { isEmail } from "../shared/util"
import { createSingInChallenge } from "../api/account-and-billing"

export default function LoginPage() {
	const [message, setMessage] = useState("")
	const [email, setEmail] = useState("")

	const [color, setColor] = useState("text-secondary")

	const handleContinue = async () => {
		try {
			if (!isEmail(email)) {
				setColor("text-[#EF476F]")
				setMessage("Please provide valid email address")
			} else {
				setColor("text-secondary")
				setMessage("Log in link has been sent to provided email")
				await createSingInChallenge({ email: email })
			}
		} catch (error: any) {
			setMessage(error.message)
		}
	}

	function resetFields() {
		setEmail("")
		setMessage("")
	}

	useEffect(() => {
		resetFields()
	}, [])

	return (
		<div className="flex flex-col bg-surface-300 h-screen min-h-screen max-h-screen w-full overflow-hidden">
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
					<Logo size="small" />
				</div>
				<motion.input
					type="email"
					placeholder="Email Address"
					className="mb-6 w-[320px] px-4 py-2 bg-surface-100 text-base placeholder:text-base placeholder:opacity-70 rounded-lg outline-none focus:ring-1 focus:ring-disabled"
					onChange={(e) => setEmail(e.target.value)}
				/>

				{message && <div className={`flex flex-col ${color} mb-6`}>{message}</div>}

				{!message && (
					<Button className="w-[320px] px-4 py-2 font-bold bg-secondary hover:bg-hover-secondary" onClick={handleContinue}>
						Continue to Honeycomb
					</Button>
				)}
			</motion.div>
		</div>
	)
}
