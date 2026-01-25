import { createFileRoute } from "@tanstack/react-router"
import { fetchAllProjects } from "../api/project-planning"
import { Loader } from "@jigjoy-io/ui-library"
import HomePage from "../pages/home-page"
import { store } from "../shared/store"

export const Route = createFileRoute("/_auth/home")({
	loader: async () => {
		try {			
			const state = store.getState()
			console.log(state)
			const userData = state.account.userData 
			return await fetchAllProjects(userData.id)
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
