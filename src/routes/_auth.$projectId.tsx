import { createFileRoute } from "@tanstack/react-router"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Loader } from "@jigjoy-io/ui-library"
import { fetchProject } from "../api/project"
import { fetchAllTasks } from "../api/task"
import { PostError } from "../shared/errors/post-error"
import { useSelectedProject } from "../hooks/store"
import { useActivityListener } from "../hooks/activity-listener"
import { entryPointLoaded, projectSelected, taskSelected } from "../reducers/workspace-reducer"
import ProjectPage from "../pages/project-page"
import { getEntryPoint } from "../api/project-deployment"

export const Route: any = createFileRoute("/_auth/$projectId")({
	loader: async ({ params: { projectId } }) => {

		const [project, tasks, entryPoint] = await Promise.all([fetchProject(projectId), fetchAllTasks(projectId), getEntryPoint(projectId)])
		return { project, tasks, entryPoint }
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
			<Loader size="large" message="Loading page..." />
		</div>
	)
}

function WorkspaceComponent() {

	const data = Route.useLoaderData()
	const dispatch = useDispatch()
	const selectedProject = useSelectedProject()
	const [isLoaded, setIsLoaded] = useState(false)

	//useActivityListener({ room: data.project.id })

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
			
			dispatch(entryPointLoaded(data.entryPoint))
			setIsLoaded(true)
		}
	}, [data])

	return isLoaded ? <ProjectPage /> : <PendingComponent />
}
