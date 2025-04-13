import { useState } from "react"
import { Button, Card, Loader, Modal, ModalContent, Tooltip } from "@honeycomb-app/design"
import { useNavigate } from "@tanstack/react-router"
import { createNewProject } from "../api/project"
import PlusIcon from "../shared/icons/plus-icon"
import { getCurrentUser } from "aws-amplify/auth"
import ArchiveIcon from "../shared/icons/archive-icon"
import { archiveProject } from "../api/project"
import { useDispatch } from "react-redux"
import { projectAdded, projectDeleted } from "../reducers/projects-reducer"
import { useProjects } from "../hooks/store"
import { pageNavigated } from "../reducers/navigation-reducer"
export default function ProjectsPage() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [editingProject, setEditingProject] = useState<any>(null)
	const [projectToArchive, setProjectToArchive] = useState<any>(null)
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [imageUrl, setImageUrl] = useState("")
	const [loading, setLoading] = useState(false)
	const [archiveModalOpened, setArchiveModalOpened] = useState(false)

	const projects = useProjects()

	const handleEdit = (project: any) => {
		console.log(project)
		setEditingProject(project)
		setName(project.name)
		setDescription(project.description)
		setImageUrl(project.imageUrl)
	}

	const handleSave = () => {
		if (!editingProject) return

		const updatedproject = {
			...editingProject,
			name,
			description,
			imageUrl,
		}
		// TODO: Implement save functionality
		console.log("Save project:", updatedproject)
		setEditingProject(null)
	}

	const handleCreateNewProject = async () => {
		setLoading(true)
		const user = await getCurrentUser()
		const project: any = await createNewProject(user.username)
		dispatch(projectAdded(project))
		dispatch(pageNavigated("workspace"))

		navigate({
			to: `/${project.id}`,
		})
	}

	const handleOpenProject = (project: any) => {
		dispatch(pageNavigated("workspace"))
		navigate({
			to: `/${project.id}`,
		})
	}

	async function handleArchiveProject(): Promise<void> {
		await archiveProject(projectToArchive.id)
		dispatch(projectDeleted(projectToArchive))
		setProjectToArchive(null)
		setArchiveModalOpened(false)
	}

	return loading ? (
		<div className="bg-surface w-full h-full flex items-center justify-center">
			<Loader message="Project initialization" size="small" />
		</div>
	) : (
		projects && (
			<div className="w-full flex flex-row bg-surface pl-4">
				<div className="h-[100dvh] overflow-y-auto custom-scrollbar w-fit bg-surface border border-primary-200 rounded-sm">
					<div className="py-8 px-4 w-full max-w-[325px] ">
						<div className="flex flex-row w-full mb-2">
							<h1 className="text-secondary-100 font-semibold w-fit flex items-center">Projects</h1>

							<div className="flex justify-end grow">
								<Tooltip message="Create new project">
									<div onClick={handleCreateNewProject}>
										<PlusIcon />
									</div>
								</Tooltip>
							</div>
						</div>
						<div className="flex flex-col gap-4 h-full py-4">
							{projects.map((project: any) => (
								<Card onClick={() => handleOpenProject(project)} className="w-full cursor-pointer" key={project.id}>
									<div className="text-highlight-200 text-sm">{project.name}</div>
									<div className="mt-2 w-full text-xs italic text-secondary-100 line-clamp-2">{project.description}</div>
									<div className="flex justify-end grow">
										<div
											onClick={(e) => {
												e.stopPropagation()
												setProjectToArchive(project)
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
			</div>
		)
	)
}
