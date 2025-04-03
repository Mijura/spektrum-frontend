import { motion } from "framer-motion"
import { Button, Card } from "@honeycomb-app/design"
import { useEffect, useState } from "react"
import { initializePaddle, Paddle, Environments } from "@paddle/paddle-js"

const PADDLE_TOKEN_PRICE_ID = process.env.PADDLE_TOKEN_PRICE_ID || ""
const PADDLE_ENVIRONMENT = (process.env.PADDLE_ENVIRONMENT as Environments) || "sandbox"
const PADDLE_TOKEN = process.env.PADDLE_TOKEN || ""

export default function PricingPage() {
	const pricingPlans = [
		{
			name: "Beginner",
			price: "Free",
			description: "Earn credits from quests",
			cta: "Get Started",
		},
		{
			name: "Pro",
			price: "$20",
			description: "Earn 20% more credits from quests",
			cta: "Go Pro",
		},
		{
			name: "Hardcore",
			price: "$50",
			description: "Earn 30% more credits from quests + Access to exclusive monthly rewards",
			cta: "Level Up",
		},
	]

	// Create a local state to store Paddle instance
	const [paddle, setPaddle] = useState<Paddle>()

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
	const openCheckout = () => {
		paddle?.Checkout.open({
			items: [{ priceId: PADDLE_TOKEN_PRICE_ID, quantity: 20 }],
		})
	}

	return (
		<div className="w-full text-base flex flex-col items-center px-4 py-8 font-body">
			{/* Page Heading */}
			<motion.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-2xl md:text-3xl font-bold text-base mb-8"
			>
				Choose Your Plan
			</motion.h1>

			{/* Pricing Cards Container */}
			<div className="flex flex-col md:flex-row gap-8">
				{pricingPlans.map((plan) => (
					<Card key={plan.name}>
						<div className="flex flex-col items-center w-[275px]">
							<div className="h-fit min-h-[150px] flex flex-col items-center">
								<h2 className="text-2xl font-semibold mb-2 ">{plan.name}</h2>
								<p className="text-secondary text-2xl mb-1">{plan.price}</p>
								<p className="text-base mb-4 text-center">{plan.description}</p>
							</div>
							<Button className="bg-primary hover:bg-hover-primary" onClick={openCheckout}>
								{plan.cta}
							</Button>
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}
