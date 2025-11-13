import { motion } from "framer-motion"
import { Button, Card } from "@jigjoy-io/design"
import { useEffect, useState } from "react"
import { initializePaddle, Paddle, Environments } from "@paddle/paddle-js"
import CheckmarkIcon from "../shared/icons/checkmark-icon"
import { getCurrentUser } from "aws-amplify/auth"
import { useNavigate } from "@tanstack/react-router"

const JIGJOY_TOKEN_PRICE_ID = process.env.JIGJOY_TOKEN_PRICE_ID || ""
const PADDLE_ENVIRONMENT = (process.env.PADDLE_ENVIRONMENT as Environments) || "sandbox"
const PADDLE_TOKEN = process.env.PADDLE_TOKEN || ""

// Token pricing configuration
const TOKEN_PRICE = 0.5
const MIN_TOKENS = 40
const MAX_TOKENS = 1000

export default function PricingPage() {
	const [tokenAmount, setTokenAmount] = useState(MIN_TOKENS)
	const [paddle, setPaddle] = useState<Paddle>()
	const navigate = useNavigate()
	// Calculate derived values
	const totalPrice = (tokenAmount * TOKEN_PRICE).toFixed(2)

	// Calculate slider fill percentage - fix calculation to account for full range
	const sliderFillPercentage = (tokenAmount / MAX_TOKENS) * 100

	// Download and initialize Paddle instance from CDN
	useEffect(() => {
		initializePaddle({ environment: PADDLE_ENVIRONMENT, token: PADDLE_TOKEN }).then(
			(paddleInstance: Paddle | undefined) => {
				if (paddleInstance) {
					setPaddle(paddleInstance)
				}
			},
		)
	}, [])

	// Callback to open a checkout
	const openCheckout = async () => {
		const user = await getCurrentUser()
		const email = user?.signInDetails?.loginId

		if (!email) {
			navigate({ to: "/" })
			return
		}

		paddle?.Checkout.open({
			items: [{ priceId: JIGJOY_TOKEN_PRICE_ID, quantity: tokenAmount }],
			customer: {
				email: email,
			},
			customData: {
				email: email,
			},
		})
	}

	return (
		<div className="w-full bg-[#1a1a1a] text-secondary flex flex-col items-center px-4 py-8 md:py-20 2xl:py-40 font-body">
			<div className="w-full md:w-3/4 2xl:w-1/2 flex h-fit">
				<div className="flex flex-col lg:flex-row gap-6 w-full justify-center items-center">
					{/* How It Works Card */}
					<div className="flex flex-col w-full lg:w-[60%] h-fit px-8 md:px-0">
						{/* Page Heading */}
						<motion.h1
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="text-2xl font-bold mt-2 xl:mt-16 md:mx-8 mb-4 text-highlight-200"
						>
							Pay-As-You-Go
						</motion.h1>

						{/* Description */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="my-4 md:m-8 text-secondary-100"
						>
							No subscriptions. No waste. Just flexible, usage-based pricing.
						</motion.div>

						<Card className="h-fit md:p-8 cursor-default opacity-100 hover:opacity-100 text-sm md:my-2 ">
							<div className="flex flex-col h-full">
								<div className="space-y-6">
									<div className="flex items-start gap-4">
										<CheckmarkIcon color="text-highlight" />
										<div>
											<div className="text-highlight font-semibold p-0.5">Free Plan</div>
											<div className="mt-2 text-secondary-100 italic">
												Get started with AI –{" "}
												<span className="font-semibold text-progress">run up to 5 tasks per day for free.</span>
											</div>
											<div className="mt-2 text-secondary-100 italic">Buy tokens anytime to unlock more task executions.</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="w-full lg:w-[40%] grow flex h-full px-8 md:px-0">
						{/* Token Purchase Card */}
						<Card className="w-full p-8 cursor-default my-2 grow">
							<div className="flex flex-col items-center space-y-8">
								<div className="w-full">
									<div className="flex justify-end mb-2">
										<span className="text-lg font-semibold">${totalPrice}</span>
									</div>
									<div className="relative w-full h-4 my-6">
										{/* Background track */}
										<div className="absolute inset-0 bg-secondary/20 rounded-full"></div>
										{/* Progress fill */}
										<div
											className="absolute inset-y-0 left-0 bg-progress rounded-full"
											style={{ width: `${sliderFillPercentage}%` }}
										></div>
										{/* Slider input */}
										<input
											type="range"
											min={MIN_TOKENS}
											max={MAX_TOKENS}
											step="10"
											value={tokenAmount}
											onChange={(e) => setTokenAmount(Number(e.target.value))}
											className="absolute inset-0 w-full h-4 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-highlight [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-highlight [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-110"
										/>
									</div>
								</div>

								<div className="text-center space-y-2">
									<p className="text-xl font-semibold text-progress">{tokenAmount} Task Runs</p>
									<p className="text-sm text-highlight italic mt-4">* 50 cents per task run. No monthly token resets.</p>
								</div>

								<Button size="lg" className="bg-secondary text-primary hover:bg-gray-300/80" onClick={openCheckout}>
									Continue to Checkout
								</Button>
							</div>
						</Card>
					</div>
				</div>
			</div>
			{/* <div className="py-1 bg-progress text-primary-100 gap-2 flex flex-row items-center fixed bottom-0 w-full justify-center">
				<div>You can earn JigJoy tokens and use them to run workflows.</div>
				<Button size="sm" variant="primary">
					Discover how
				</Button>
			</div> */}
		</div>
	)
}
