import { motion } from "framer-motion"
import { Button } from "@jigjoy-io/ui-library"
import { useEffect, useState } from "react"
import { initializePaddle, Paddle, Environments } from "@paddle/paddle-js"
import { useNavigate } from "@tanstack/react-router"
import { useUserData } from "../hooks/store"

const JIGJOY_TOKEN_PRICE_ID = process.env.JIGJOY_TOKEN_PRICE_ID || ""
const PADDLE_ENVIRONMENT = (process.env.PADDLE_ENVIRONMENT as Environments) || "sandbox"
const PADDLE_TOKEN = process.env.PADDLE_TOKEN || ""

export default function PricingPage() {
	const [paddle, setPaddle] = useState<Paddle>()
	const navigate = useNavigate()
	const userData = useUserData()

	const initializePaddleInstance = async () => {
		const paddleInstance = await initializePaddle({ environment: PADDLE_ENVIRONMENT, token: PADDLE_TOKEN })
		setPaddle(paddleInstance)
	}
	// Download and initialize Paddle instance from CDN
	useEffect(() => {
		initializePaddleInstance()
	}, [])

	// Callback to open a checkout
	const openCheckout = async () => {
		if (!userData.email) {
			navigate({ to: "/" })
			return
		}

		if (!paddle) {
			return
		}

		paddle.Checkout.open({
			items: [{ priceId: JIGJOY_TOKEN_PRICE_ID, quantity: 5 }],
			settings: {
				displayMode: "overlay",
				variant: "one-page",
				theme: "dark",
			},
			customer: {
				email: userData.email,
			},
			customData: {
				email: userData.email,
			},
		})
	}

	return (
		<div className="mx-8 w-full bg-[#1a1a1a] text-secondary flex flex-col items-center px-4 py-8 md:py-20 2xl:py-40 font-body">
			<div className="w-full md:w-3/4 2xl:w-1/2 flex h-fit">
				<div className="flex flex-col lg:flex-row gap-6 w-full">
					{/* How It Works Card */}
					<div className="flex flex-col h-fit md:px-0">
						{/* Page Heading */}
						<motion.h1
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="text-2xl font-bold my-8"
						>
							Pay-As-You-Go
						</motion.h1>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							Remaining Credits:
							<div className={`text-4xl my-2 ${userData.credits > 0 ? "text-progress" : "text-danger"}`}>
								{userData.credits > 0 ? `$${Math.abs(userData.credits)}` : `-$${userData.credits}`}
							</div>
						</motion.div>
						{/* Description */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="mt-8 mb-4 text-secondary-100"
						>
							Your credit balance will be consumed as you use the API.
						</motion.div>
						<Button className="bg-secondary text-primary hover:bg-gray-300/80 w-fit" onClick={openCheckout}>
							Add Credits
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
