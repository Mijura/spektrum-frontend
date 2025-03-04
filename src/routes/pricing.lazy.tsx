import { createLazyFileRoute } from "@tanstack/react-router"
import PricingPage from "../pages/pricing-page"

export const Route = createLazyFileRoute("/pricing" as never)({
	component: PricingPage,
})
