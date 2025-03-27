import { createLazyFileRoute } from "@tanstack/react-router"
import AuthorizationPage from "../pages/auth-page"

export const Route: any = createLazyFileRoute("/" as never)({
	component: AuthorizationPage,
})
