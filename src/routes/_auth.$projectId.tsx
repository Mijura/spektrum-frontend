import { createFileRoute } from "@tanstack/react-router"
import WorkspacePage from "../pages/workspace-page"
import { fetchAllTickets } from "../api/ticket"
import { fetchProject } from "../api/project"
import { Loader } from "@honeycomb-app/design"
import { PostError } from "../shared/errors/post-error"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { projectSelected } from "../reducers/workspace-reducer"

export const Route: any = createFileRoute("/_auth/$projectId")({
	loader: async ({ params: { projectId } }) => {
		const [project, tickets] = await Promise.all([fetchProject(projectId), fetchAllTickets(projectId)])

		return { project, tickets }
	},
	errorComponent: PostError,
	pendingComponent: PendingComponent,
	component: WorkspaceComponent,
})

function PendingComponent() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<Loader message="Project loading" />
		</div>
	)
}

function WorkspaceComponent() {
	const data = Route.useLoaderData()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(
			projectSelected({
				...data.project,
				tickets: data.tickets,
			}),
		)
	}, [data])

	return <WorkspacePage />
}
