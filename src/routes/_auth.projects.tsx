import { createFileRoute, useRouter } from "@tanstack/react-router"
import ProjectsPage from "../pages/projects-page"
import { getCurrentUser } from "aws-amplify/auth"
import { fetchAllProjects } from "../api/project"
import { projectsLoaded } from "../reducers/projects-reducer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

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

	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(projectsLoaded(projects))
		router.invalidate()
	}, [projects])

	return projects && <ProjectsPage />
}
