import { createLazyFileRoute } from "@tanstack/react-router"
import MyApps from "../pages/my-apps/my-apps"

export const Route = createLazyFileRoute("/my-apps" as never)({
	component: MyApps,
})
