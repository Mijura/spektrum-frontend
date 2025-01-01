import { createLazyFileRoute } from "@tanstack/react-router"
import Authorization from "../pages/authorization/authorization"

export const Route = createLazyFileRoute("/onboarding" as never)({
	component: Authorization,
})
