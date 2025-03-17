import { motion } from "framer-motion"
import { Button, Card } from "@honeycomb-app/design"

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

	return (
		<div className="bg-surface-100 w-full text-base flex flex-col items-center px-4 py-8 font-body">
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
					<Card key={plan.name} className="hover:border-[#8ACB99]">
						<div className="flex flex-col items-center w-[275px]">
							<div className="h-fit min-h-[150px] flex flex-col items-center">
								<h2 className="text-2xl font-semibold mb-2 ">{plan.name}</h2>
								<p className="text-[#AA9BF5] text-2xl mb-1">{plan.price}</p>
								<p className="text-base mb-4 text-center">{plan.description}</p>
							</div>
							<Button className="bg-[#A3BE8C]">{plan.cta}</Button>
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}
