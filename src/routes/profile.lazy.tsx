import { createLazyFileRoute } from "@tanstack/react-router"
import ProfilePage from "../pages/profile-page"

export const Route = createLazyFileRoute("/profile" as never)({
	component: ProfilePage,
})
