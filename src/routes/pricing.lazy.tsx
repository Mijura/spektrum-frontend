import { createLazyFileRoute } from "@tanstack/react-router"
import PricingPage from "../pages/pricing/pricing"

export const Route = createLazyFileRoute("/pricing" as never)({
	component: PricingPage,
})
