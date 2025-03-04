import { createLazyFileRoute } from "@tanstack/react-router"
import OnboardingPage from "../pages/onboarding-page"

export const Route = createLazyFileRoute("/onboarding" as never)({
	component: OnboardingPage,
})
