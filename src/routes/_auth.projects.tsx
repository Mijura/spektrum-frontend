import { createFileRoute } from "@tanstack/react-router"
import ProjectsPage from "../pages/projects-page"
import { getCurrentUser } from "aws-amplify/auth"
import { fetchAllProjects } from "../api/project"
import { Loader } from "@honeycomb-app/design"

export const Route = createFileRoute("/_auth/projects")({
	loader: async () => {
		try {
			const user = await getCurrentUser()
			return await fetchAllProjects(user.userId)
		} catch (error: any) {
			console.log(error)
		}
	},
	component: () => {
		const data = Route.useLoaderData()
		return <ProjectsPage loadedProjects={data} />
	},
	pendingComponent: () => {
		return (
			<div className="w-screen h-screen bg-surface flex items-center justify-center">
				<Loader size="small" message="Loading projects..." />
			</div>
		)
	},
	shouldReload: true,
	gcTime: 0,
})
