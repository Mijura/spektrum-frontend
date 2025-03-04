import { createLazyFileRoute } from "@tanstack/react-router"
import AuthorizationPage from "../pages/authorization-page"

export const Route: any = createLazyFileRoute("/" as never)({
	component: AuthorizationPage,
})
