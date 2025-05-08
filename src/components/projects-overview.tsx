import { useEffect, useState } from "react"
import { Button, Card, Input, Modal, ModalContent, ModalTrigger, Textarea, Tooltip } from "@honeycomb-app/design"
import { useNavigate } from "@tanstack/react-router"
import { createNewProject, updateProjectDetails } from "../api/project"
import CreateIcon from "../shared/icons/create-icon"
import { getCurrentUser } from "aws-amplify/auth"
import ArchiveIcon from "../shared/icons/archive-icon"
import { archiveProject } from "../api/project"
import { useDispatch } from "react-redux"
import { pageNavigated } from "../reducers/navigation-reducer"
import EditIcon from "../shared/icons/edit-icon"
import Project from "../types/task"
import { projectInitalizationCompleted, projectInitalizationRequested } from "../reducers/workspace-reducer"

export default function ProjectsOverview({ loadedProjects }: { loadedProjects: Project[] }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [selectedProject, selectProject] = useState<any>(null)
	const [archiveModalOpened, setArchiveModalOpened] = useState(false)
	const [projects, setProjects] = useState<any>([])

	const [name, setName] = useState(selectedProject?.name)
	const [description, setDescription] = useState(selectedProject?.description)
	const [editModalOpened, setEditModalOpened] = useState(false)

	useEffect(() => {
		if (loadedProjects) {
			setProjects(loadedProjects)
		}
	}, [loadedProjects])

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

	const handleOpenProject = async (project: any) => {
		dispatch(pageNavigated("workspace"))
		await navigate({
			to: `/${project.id}`,
		})
	}

	const handleArchiveProject = async (): Promise<void> => {
		await archiveProject(selectedProject.id)
		setProjects(projects.filter((project: any) => project.id !== selectedProject.id))
		selectProject(null)
		setArchiveModalOpened(false)
	}

	const handleProjectDetailsUpdate = async (): Promise<void> => {
		await updateProjectDetails(selectedProject.id, name, description)
		const updatedProjects = projects.map((project: any) => {
			if (project.id === selectedProject.id) {
				project.name = name
				project.description = description
			}
			return project
		})
		setProjects(updatedProjects)
		setEditModalOpened(false)
	}

	const handleEditModalClose = () => {
		setEditModalOpened(false)
		setName(null)
		setDescription(null)
	}

	return (
		projects && (
			<div className="w-full flex flex-row bg-surface pl-4">
				<div className="h-[100dvh] overflow-y-auto custom-scrollbar w-fit bg-surface border border-primary-200 rounded-sm">
					<div className="py-8 px-4 w-full min-w-[300px] max-w-[300px] 2xl:min-w-[325px] 2xl:max-w-[325px]">
						<div className="flex flex-row w-full mb-2">
							<h1 className="text-secondary-100 font-semibold w-fit flex items-center">Projects</h1>

							<div className="flex justify-end grow">
								<Tooltip message="Create new project">
									<div onClick={handleCreateNewProject}>
										<CreateIcon />
									</div>
								</Tooltip>
							</div>
						</div>
						<div className="flex flex-col gap-4 h-full py-4">
							{projects.map((project: any) => (
								<Card onClick={() => handleOpenProject(project)} className="w-full cursor-pointer" key={project.id}>
									<div className="text-highlight-200 text-sm">{project.name}</div>
									<div className="mt-2 w-full text-xs italic text-secondary-100 line-clamp-2">{project.description}</div>
									<div className="flex flex-row justify-end grow gap-2 mt-2">
										<div
											onClick={(e) => {
												e.stopPropagation()
												selectProject(project)
												setName(project.name)
												setDescription(project.description)
												setEditModalOpened(true)
											}}
										>
											<Tooltip message={"Edit details"}>
												<EditIcon />
											</Tooltip>
										</div>
										<div
											onClick={(e) => {
												e.stopPropagation()
												selectProject(project)
												setArchiveModalOpened(true)
											}}
										>
											<Tooltip message={"Archive project"}>
												<ArchiveIcon />
											</Tooltip>
										</div>
									</div>
								</Card>
							))}
						</div>

						<div className="flex flex-row h-fit">
							<Modal isOpen={archiveModalOpened} onCloseCallback={() => setArchiveModalOpened(false)}>
								<ModalContent title="Archive project">
									<div className="flex flex-row gap-2">Are you sure you want to archive this project?</div>
									<p className="text-sm text-secondary-100 py-2 italic">Your project activity will remain visible.</p>
									<div className="flex justify-end gap-2 pt-4">
										<Button variant="secondary" onClick={() => setArchiveModalOpened(false)}>
											Cancel
										</Button>
										<Button variant="danger" onClick={() => handleArchiveProject()}>
											Archive
										</Button>
									</div>
								</ModalContent>
							</Modal>
						</div>
					</div>
				</div>
				<div className="grow bg-[#1a1a1a]"></div>

				{selectedProject && (
					<div className="absolute flex flex-row w-[300px] h-fit">
						<Modal isOpen={editModalOpened} onOpenCallback={() => {}} onCloseCallback={handleEditModalClose}>
							<ModalTrigger>
								<div
									style={{ display: "none" }}
									ref={(el) => {
										if (el && editModalOpened) {
											el.click()
										}
									}}
								/>
							</ModalTrigger>
							<ModalContent title="Project details update" className="w-[600px] max-w-[90vw]">
								<Input
									placeholder="Project name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="mb-4 w-full"
								/>
								<Textarea
									placeholder="Add description..."
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="mb-4 w-full"
									rows={4}
								/>
								<div className="flex justify-end gap-4">
									<Button variant="secondary" onClick={handleProjectDetailsUpdate}>
										Update details
									</Button>
								</div>
							</ModalContent>
						</Modal>
					</div>
				)}
			</div>
		)
	)
}
