import { createFileRoute } from "@tanstack/react-router"
import ProjectsPage from "../pages/projects-page"
import { getCurrentUser } from "aws-amplify/auth"
import { fetchAllProjects } from "../api/project"

export const Route = createFileRoute("/_auth/projects")({
	loader: async () => {
		try {
			const user = await getCurrentUser()
			return await fetchAllProjects(user.userId)
		} catch (error: any) {
			console.log(error)
		}
	},
	component: Projects,
})

function Projects() {
	const projects = Route.useLoaderData()

	return projects ? <ProjectsPage projectsToDisplay={projects} /> : <></>
}
