import { Button, Tooltip } from "@jigjoy-io/ui-library"
import { useEffect, useState } from "react"
import { initializePaddle, Paddle, Environments } from "@paddle/paddle-js"
import { useNavigate } from "@tanstack/react-router"
import { useUserData } from "../hooks/store"
import { CircleQuestionMark, CreditCard, FileStack } from "lucide-react"

const JIGJOY_TOKEN_PRICE_ID = process.env.JIGJOY_TOKEN_PRICE_ID || ""
const PADDLE_ENVIRONMENT = (process.env.PADDLE_ENVIRONMENT as Environments) || "sandbox"
const PADDLE_TOKEN = process.env.PADDLE_TOKEN || ""

type TabType = "overview" | "billing-history"

export default function PricingPage() {
	const [paddle, setPaddle] = useState<Paddle>()
	const navigate = useNavigate()
	const userData = useUserData()

	const [activeTab, setActiveTab] = useState<TabType>("overview")

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

	function formatCredits(value: number | string | null | undefined): string {
		const num = Number(value ?? 0)

		if (Number.isNaN(num)) return "$0.00"

		const abs = Math.abs(num).toFixed(2)

		return num < 0 ? `-$${abs}` : `$${abs}`
	}

	const getButtonClassName = (tab: TabType) => {
		return `rounded-md h-fit p-1 px-2 ${
			activeTab === tab
				? "bg-highlight items-center hover:bg-highlight text-primary-100 cursor-default p-1 text-sm flex flex-row gap-1"
				: "bg-surface-light items-center text-secondary-100 hover:bg-surface-light/80 p-1 gap-1 text-sm cursor-default flex flex-row"
		}`
	}

	return (
		<div className="w-full flex flex-col pl-4 bg-[#1a1a1a]">

		<div className="h-fit bg-surface w-full flex items-center justify-center border-b border-secondary-200">
			<div className="w-fit">
				<div className="px-4 w-fit min-h-[50px] h-[50px] justify-center items-center text-secondary-100 gap-3 flex flex-row">
					<div className={getButtonClassName("overview")} onClick={() => setActiveTab("overview")}>
					<CreditCard className="size-4" />
						Overview
					</div>
					<div className={getButtonClassName("billing-history")} onClick={() => setActiveTab("billing-history")}>
					<FileStack className="size-4" />
						Billing History
					</div>

				</div>
			</div>
			</div>

			<div className="flex flex-row h-full">
				<div className="w-full h-full">
					{activeTab === "overview" && (
						<div className="h-full flex flex-col md:flex-row overflow-y-auto custom-scrollbar">
							<div className="h-full w-full rounded-sm mx-40 mt-20">
								<h1 className="text-2xl font-bold text-secondary-100">Pay-As-You-Go</h1>
								<div className="flex flex-col gap-4">
									<div className="flex flex-row gap-2">
										<div className="w-1/2">
											<span className="flex items-center gap-2 mt-8">
												<h2 className="text-lg text-secondary-100">Credit Balance</h2>
												<Tooltip message="Your credit balance will be consumed as you use the API">
													<CircleQuestionMark className="w-4 h-4 text-secondary-100" />
												</Tooltip>
											</span>
											<div
												className={`text-4xl my-2 mb-4 ${userData.credits > 0 ? "text-progress" : "text-danger"}`}
											>
												{formatCredits(userData.credits)}
											</div>
											<Button
												className="bg-secondary text-primary hover:bg-gray-300/80 w-fit mt-2"
												onClick={openCheckout}
											>
												Add Credits
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{activeTab === "billing-history" && (
						<>
							<div>Billing History</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
