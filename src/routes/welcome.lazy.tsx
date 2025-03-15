import { createLazyFileRoute } from "@tanstack/react-router"
import WelcomePage from "../pages/welcome-page"

export const Route = createLazyFileRoute("/welcome" as never)({
	component: WelcomePage,
})
