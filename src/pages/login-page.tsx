import { Button, Input, Loader } from "@jigjoy-ai/ui-library"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { isEmail } from "../shared/util"
import { sendMagicLinkChallenge } from "../api/account-and-billing"

export default function LoginPage() {
	const [message, setMessage] = useState("")
	const [inProgress, setInProgress] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [email, setEmail] = useState("")

	const [color, setColor] = useState("text-secondary")

	const handleContinue = async () => {
		setMessage("Sending magic link...")
		setInProgress(true)
		try {
			if (!isEmail(email)) {
				setColor("text-danger")
				setMessage("Please provide valid email address")
			} else {
				await sendMagicLinkChallenge(email)
				setIsLoggedIn(true)
				setColor("text-secondary")
				setMessage("We’ve sent a login link — please check your email.")
			}
		} catch (error: any) {
			setIsLoggedIn(false)
			setColor("text-danger")
			setMessage("Something went wrong, please try again later.")
		} finally {
			setInProgress(false)
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
		<div className="flex flex-col bg-surface h-screen min-h-screen max-h-screen w-full overflow-hidden items-center justify-center">
			{/* Main Content Container */}
			<motion.div
				className="bg-[#1a1a1a] flex flex-col items-center w-fit h-fit p-16 rounded-md"
				initial="hidden"
				animate="visible"
				transition={{ duration: 0.3 }}
			>
				<h1 className="text-2xl mb-2 font-semibold text-highlight-200">Welcome!</h1>

				<div className="text-secondary opacity-80 mt-2">Enter email to receive magic link.</div>
				<div className="my-8">
					<Loader size="large" />
				</div>

				<Input
					placeholder="Email Address"
					className="mb-4 w-[320px] text-secondary-100"
					onChange={(e) => setEmail(e.target.value)}
				/>

				{message && <div className={`flex flex-col ${color} mb-6`}>{message}</div>}

				{!isLoggedIn && !inProgress && (
					<Button disabled={inProgress} className="w-[320px]" size="lg" onClick={handleContinue}>
						Continue to JigJoy
					</Button>
				)}
			</motion.div>
		</div>
	)
}
