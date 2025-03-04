import { createLazyFileRoute } from "@tanstack/react-router"
import AuthorizationPage from "../pages/authorization-page"

export const Route = createLazyFileRoute("/authorization" as never)({
	component: AuthorizationPage,
})
