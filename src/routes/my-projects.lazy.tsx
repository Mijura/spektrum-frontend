import { createLazyFileRoute } from "@tanstack/react-router"
import MyProjects from "../pages/my-projects/my-projects"

export const Route = createLazyFileRoute("/my-projects" as never)({
	component: MyProjects,
})
