import { createLazyFileRoute } from "@tanstack/react-router"
import Rewards from "../pages/rewards/rewards"

export const Route = createLazyFileRoute("/rewards" as never)({
	component: Rewards,
})
