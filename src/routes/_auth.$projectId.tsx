import { createFileRoute } from "@tanstack/react-router"
import WorkspacePage from "../pages/workspace-page"
import { fetchAllIssues } from "../api/issue"
import { fetchProject } from "../api/project"
import { Loader } from "@honeycomb-app/design"
import { PostError } from "../shared/errors/post-error"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { projectSelected } from "../reducers/workspace-reducer"
import { fetchWorkflowRunTimeline } from "../api/activities"

export const Route: any = createFileRoute("/_auth/$projectId")({
	loader: async ({ params: { projectId } }) => {
		const [project, issues, workflowRuns] = await Promise.all([
			fetchProject(projectId),
			fetchAllIssues(projectId),
			fetchWorkflowRunTimeline(projectId),
		])
		return { project, issues, workflowRuns }
	},
	errorComponent: PostError,
	pendingComponent: PendingComponent,
	component: WorkspaceComponent,
	shouldReload: true,
	gcTime: 0,
})

function PendingComponent() {
	return (
		<div className="w-screen h-screen bg-surface flex items-center justify-center">
			<Loader size="small" message="Loading page..." />
		</div>
	)
}

function WorkspaceComponent() {
	const data = Route.useLoaderData()
	const dispatch = useDispatch()
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (data) {
			dispatch(
				projectSelected({
					...data.project,
					issues: data.issues,
					workflowRuns: data.workflowRuns,
				}),
			)
			setIsLoaded(true)
		}
	}, [data])

	return isLoaded ? <WorkspacePage /> : <PendingComponent />
}
