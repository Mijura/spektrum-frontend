import { createFileRoute } from "@tanstack/react-router"
import WelcomePage from "../pages/welcome-page"

export const Route = createFileRoute("/_auth/welcome")({
	component: WelcomePage,
})
