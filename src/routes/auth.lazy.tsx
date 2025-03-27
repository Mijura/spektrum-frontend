import { createLazyFileRoute } from "@tanstack/react-router"
import AuthPage from "../pages/auth-page"

export const Route = createLazyFileRoute("/auth" as never)({
	component: AuthPage,
})
