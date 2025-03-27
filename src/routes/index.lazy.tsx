import { createLazyFileRoute } from "@tanstack/react-router"
import ProjectsPage from "../pages/projects-page"

export const Route: any = createLazyFileRoute("/" as never)({
	component: ProjectsPage,
})
