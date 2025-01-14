import { createLazyFileRoute } from "@tanstack/react-router"
import Marketplace from "../pages/marketplace/marketplace"

export const Route = createLazyFileRoute("/browse-components" as never)({
	component: Marketplace,
})
