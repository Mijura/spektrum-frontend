import { createLazyFileRoute } from "@tanstack/react-router"
import Achievements from "../pages/achievements/achievements"

export const Route = createLazyFileRoute("/onboarding" as never)({
	component: Achievements,
})
