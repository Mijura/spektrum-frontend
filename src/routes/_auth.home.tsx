import { createFileRoute } from "@tanstack/react-router"
import { fetchAllProjects } from "../api/project-planning"
import { Loader } from "@jigjoy-ai/ui-library"
import HomePage from "../pages/home-page"

export const Route = createFileRoute("/_auth/home")({
	loader: async () => {
		try {
			return await fetchAllProjects()
		} catch (error: any) {
			console.error(error)
			return []
		}
	},
	component: () => {
		const data = Route.useLoaderData()
		return <HomePage loadedProjects={data} />
	},
	pendingComponent: () => {
		return (
			<div className="w-screen h-screen bg-surface flex items-center justify-center">
				<Loader size="large" message="Loading projects..." />
			</div>
		)
	},
	shouldReload: true,
	gcTime: 0,
})
