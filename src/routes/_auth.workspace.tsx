import { createFileRoute } from "@tanstack/react-router"
import WorkspacePage from "../pages/workspace"
import { Loader } from "@jigjoy-ai/ui-library"
import { fetchAllProjects } from "../api/project-planning"

export const Route = createFileRoute("/_auth/workspace")({
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
		return <WorkspacePage loadedProjects={data} />
	},
	pendingComponent: () => {
		return (
			<div className="w-screen h-screen bg-surface flex items-center justify-center">
				<Loader size="large" message="Loading..." />
			</div>
		)
	},
	shouldReload: true,
	gcTime: 0,
})
