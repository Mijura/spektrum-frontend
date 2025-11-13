import { createFileRoute } from "@tanstack/react-router"
import WorkspacePage from "../pages/workspace-page"
import { Loader } from "@jigjoy-io/design"
import { getCurrentUser } from "aws-amplify/auth"
import { fetchAllProjects } from "../api/project"

export const Route = createFileRoute("/_auth/workspace")({
	loader: async () => {
		try {
			const user = await getCurrentUser()
			return await fetchAllProjects(user.userId)
		} catch (error: any) {
			console.error(error)
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
