import { createLazyFileRoute } from "@tanstack/react-router"
import MyProfile from "../pages/my-profile/my-profile"

export const Route = createLazyFileRoute("/my-profile" as never)({
	component: MyProfile,
})
