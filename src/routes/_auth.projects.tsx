import { createFileRoute } from "@tanstack/react-router"
import ProjectsPage from "../pages/projects-page"
import { getCurrentUser } from "aws-amplify/auth"
import { fetchAllProjects } from "../api/project"
export const Route = createFileRoute("/_auth/projects")({
	beforeLoad: async () => {
		try {
			const user = await getCurrentUser()
			const projects = await fetchAllProjects(user.userId)
			console.log(projects)
		} catch (error: any) {
			console.log(error)
		}
	},
	component: ProjectsPage,
})
