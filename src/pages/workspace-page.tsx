import Project from "../types/task"
import { Button, Loader } from "@honeycomb-app/design"
import { useNavigate } from "@tanstack/react-router"
import { createNewProject } from "../api/project"
import { getCurrentUser } from "aws-amplify/auth"
import { pageNavigated } from "../reducers/navigation-reducer"
import { projectInitalizationCompleted, projectInitalizationRequested } from "../reducers/workspace-reducer"
import { useDispatch } from "react-redux"
import { useState } from "react"
import ProjectsIcon from "../shared/icons/projects-icon"
import { useProjectInitialization } from "../hooks/store"

export default function WorkspacePage({ loadedProjects }: { loadedProjects: Project[] }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [projects, setProjects] = useState<Project[]>(loadedProjects)
	const [selectorOpen, setSelectorOpen] = useState(true)

	const initialization = useProjectInitialization()
	const handleCreateNewProject = async () => {
		dispatch(projectInitalizationRequested())
		const user = await getCurrentUser()
		const project: any = await createNewProject(user.username)

		setProjects([...projects, project])
		dispatch(pageNavigated("workspace"))
		await navigate({
			to: `/${project.id}`,
		})

		dispatch(projectInitalizationCompleted())
	}

	const handleProjectSelection = (projectId: string | undefined) => {
		if (projectId) {
			navigate({ to: `/${projectId}` })
		}
	}

	return (
		<>
			{initialization && (
				<div className="w-full flex mt-40 justify-center h-fit">
					<Loader message="Project initialization" size="small" />
				</div>
			)}
			{!initialization && projects.length > 0 && (
				<div className="flex w-full justify-center mt-40 text-secondary-100">
					<div className="flex flex-col gap-y-4">
						<div className="relative w-[340px] md:w-[500px]">
							<Button
								className="w-full text-left bg-highlight text-surface hover:bg-highlight hover:text-surface p-2 border rounded"
								onClick={() => setSelectorOpen(!selectorOpen)}
							>
								Select a project to work on...
							</Button>
							{selectorOpen && (
								<div className="mt-4 absolute w-full h-[400px] custom-scrollbar overflow-y-auto bg-surface-muted border border-surface-light rounded shadow">
									{projects.map((project) => (
										<div
											key={project.id}
											className="p-2 hover:bg-surface-light hover:text-highlight-100 cursor-pointer"
											onClick={() => handleProjectSelection(project.id)}
										>
											{project.name}
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{!initialization && projects.length === 0 && (
				<div className="w-full flex mt-40 justify-center h-fit">
					<div className="flex flex-col gap-y-3 w-full max-w-[400px]">
						<ProjectsIcon />
						<div className="font-semibold text-highlight-100 mt-4">Projects</div>
						<div className="text-secondary-100 text-sm">
							Projects are collections of related tasks that help you achieve a specific goal, like building a landing page,
							designing an onboarding flow, or creating a layout prototype.
						</div>
						<div>
							<Button onClick={handleCreateNewProject}>Create first project</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
