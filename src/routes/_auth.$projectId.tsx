import { createFileRoute } from "@tanstack/react-router"
import WorkspacePage from "../pages/workspace-page"
import { fetchAllTasks } from "../api/task"
import { fetchProject } from "../api/project"
import { Loader } from "@honeycomb-app/design"
import { PostError } from "../shared/errors/post-error"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { taskSelected, projectSelected } from "../reducers/workspace-reducer"
import { useSelectedProject } from "../hooks/store"
import { useActivityListener } from "../hooks/activity-listener"
export const Route: any = createFileRoute("/_auth/$projectId")({
	loader: async ({ params: { projectId } }) => {
		const [project, tasks] = await Promise.all([fetchProject(projectId), fetchAllTasks(projectId)])
		return { project, tasks }
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
	const selectedProject = useSelectedProject()
	const [isLoaded, setIsLoaded] = useState(false)

	useActivityListener({ room: data.project.id })

	useEffect(() => {
		if (selectedProject) {
			// reset task if project has changed
			if (selectedProject.id !== data.project.id) {
				dispatch(taskSelected(null))
			}

			// update project
			dispatch(
				projectSelected({
					...data.project,
					tasks: data.tasks,
				}),
			)
			setIsLoaded(true)
		}
	}, [data])

	return isLoaded ? <WorkspacePage /> : <PendingComponent />
}
