import { motion } from "framer-motion"
import { Button, Card } from "@honeycomb-app/design"
import { useEffect, useState } from "react"
import { initializePaddle, Paddle, Environments } from "@paddle/paddle-js"
import CheckmarkIcon from "../shared/icons/checkmark-icon"
import { getCurrentUser } from "aws-amplify/auth"
import { useNavigate } from "@tanstack/react-router"

const JIGJOY_TOKEN_PRICE_ID = process.env.JIGJOY_TOKEN_PRICE_ID || ""
const PADDLE_ENVIRONMENT = (process.env.PADDLE_ENVIRONMENT as Environments) || "sandbox"
const PADDLE_TOKEN = process.env.PADDLE_TOKEN || ""

// Token pricing configuration
const TOKEN_PRICE = 0.2 // $0.20 per token
const MIN_PURCHASE = 10 // $10 minimum purchase
const MIN_TOKENS = 50 // Minimum tokens (50 executions)
const MAX_TOKENS = 1000 // Maximum tokens (1000 executions)
const TOKENS_PER_EXECUTION = 2 // Average tokens per execution

export default function PricingPage() {
	const [tokenAmount, setTokenAmount] = useState(MIN_TOKENS)
	const [paddle, setPaddle] = useState<Paddle>()
	const navigate = useNavigate()
	// Calculate derived values
	const totalPrice = (tokenAmount * TOKEN_PRICE).toFixed(2)
	const estimatedExecutions = Math.floor(tokenAmount / TOKENS_PER_EXECUTION)

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
		<div className="w-full text-secondary flex flex-col items-center px-4 py-4 2xl:py-8 font-body">
			{/* Page Heading */}
			<motion.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-2xl md:text-3xl font-bold my-8"
			>
				Pay-As-You-Go Pricing
			</motion.h1>

			{/* Description */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="text-center mt-4 2xl:mt-8 mb-8 2xl:mb-12 text-secondary-100"
			>
				Honeycomb workflows consume tokens based on complexity. We offer flexible pricing, so you only pay for what you use.
			</motion.div>

			<div className="w-full md:w-3/4 2xl:w-1/2 flex">
				<div className="flex flex-col md:flex-row gap-4 w-full justify-center">
					{/* How It Works Card */}
					<div className="flex flex-col w-full md:w-[60%]">
						<Card className="h-fit p-8 cursor-default opacity-100 hover:opacity-100 text-sm my-2">
							<div className="flex flex-col h-full">
								<div className="space-y-6">
									<div className="flex items-start gap-4">
										<CheckmarkIcon color="text-highlight" />
										<div>
											<div className="text-highlight font-semibold p-0.5">Buy Tokens</div>
											<div className="mt-2 text-secondary-100">Purchase tokens depending on your development needs.</div>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<CheckmarkIcon color="text-highlight" />
										<div>
											<div className="text-highlight font-semibold p-0.5">Choose workflow and execute</div>
											<div className="mt-2 text-secondary-100">
												Token usage per workflow depends on the number of AI agents and the complexity of your request.
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
						<Card className="h-fit p-8 cursor-default opacity-100 hover:opacity-100 text-sm my-2">
							<div className="flex flex-col h-full w-full">
								<div className="space-y-6">
									<div className="flex flex-row items-start gap-3">
										<div className="h-full flex">
											<CheckmarkIcon color="text-highlight" />
										</div>
										<div className="flex flex-col gap-2">
											<div className="text-highlight font-semibold p-0.5">Execution Cost</div>
											<div className="text-secondary-100">
												A single execution typically requires 1 to 2 tokens, costing approximately $0.20 per execution.
											</div>
										</div>
									</div>
									<div className="flex flex-row items-start gap-3">
										<div className="h-full flex">
											<CheckmarkIcon color="text-highlight" />
										</div>
										<div className="flex flex-col gap-2">
											<div className="text-highlight font-semibold p-0.5">Minimum purchase</div>
											<div className="text-secondary-100">$10 for approximately 50 workflow executions.</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>

					<div className="w-full md:w-[40%] grow flex">
						{/* Token Purchase Card */}
						<Card className="w-full p-8 cursor-default my-2 grow">
							<div className="flex flex-col items-center space-y-8">
								<div className="w-full">
									<div className="flex justify-between mb-2">
										<span className="text-lg font-semibold">Tokens: {tokenAmount}</span>
										<span className="text-lg font-semibold">${totalPrice}</span>
									</div>
									<input
										type="range"
										min={MIN_TOKENS}
										max={MAX_TOKENS}
										step="10"
										value={tokenAmount}
										onChange={(e) => setTokenAmount(Number(e.target.value))}
										className="w-full h-4 my-6 bg-secondary/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-highlight [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-highlight [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-110"
									/>
								</div>

								<div className="text-center space-y-2">
									<p className="text-lg">
										Estimated Ticket Executions: <span className="font-semibold">{estimatedExecutions}</span>
									</p>
									<p className="text-sm text-secondary-100">* Based on average of {TOKENS_PER_EXECUTION} tokens per execution</p>
								</div>

								<Button size="lg" className="bg-secondary text-primary hover:bg-gray-300/80" onClick={openCheckout}>
									Continue to Checkout
								</Button>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
