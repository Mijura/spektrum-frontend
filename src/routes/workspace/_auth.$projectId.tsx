import { createFileRoute } from "@tanstack/react-router"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useSelectedProject } from "../../hooks/store"
import { useActivityListener } from "../../hooks/activity-listener"
import { projectSelected, taskSelected } from "../../reducers/workspace-reducer"
import ProjectPage from "../../pages/project-page"
import { fetchAllTasks } from "../../api/task"
import { fetchProject } from "../../api/project"
import { Loader } from "@honeycomb-app/design"
import { PostError } from "../../shared/errors/post-error"
export const Route: any = createFileRoute("/workspace/_auth/$projectId")({
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
		console.log("data", data)
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

	return isLoaded ? <ProjectPage /> : <PendingComponent />
}
