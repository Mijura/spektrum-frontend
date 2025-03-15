import { createRootRoute } from "@tanstack/react-router"
import MainLayout from "../pages/layouts/main-layout"

export const Route = createRootRoute({
	component: RootRoute,
})

function RootRoute() {
	return <MainLayout />
}
