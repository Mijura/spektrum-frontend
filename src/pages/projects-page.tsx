import { useEffect, useState } from "react"
import { Button, Card, Loader, Modal, ModalContent, Tooltip } from "@honeycomb-app/design"
import { useNavigate } from "@tanstack/react-router"
import { createNewProject } from "../api/project"
import PlusIcon from "../shared/icons/plus-icon"
import { getCurrentUser } from "aws-amplify/auth"
import ArchiveIcon from "../shared/icons/archive-icon"
import { archiveProject } from "../api/project"
import { useRouter } from "@tanstack/react-router"
import { pageLoaded } from "../reducers/active-page-reducer"
import { useDispatch } from "react-redux"
export default function ProjectsPage({ projectsToDisplay }: { projectsToDisplay: any[] }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const router = useRouter()

	const [projects, setProjects] = useState<any[]>([])
	const [editingProject, setEditingProject] = useState<any>(null)
	const [projectToArchive, setProjectToArchive] = useState<any>(null)
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [imageUrl, setImageUrl] = useState("")
	const [loading, setLoading] = useState(false)
	const [archiveModalOpened, setArchiveModalOpened] = useState(false)

	useEffect(() => {
		setProjects(projectsToDisplay)
	}, [projectsToDisplay])

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
		dispatch(pageLoaded("workspace"))
		navigate({
			to: `/${project.id}`,
		})
	}

	const handleOpenProject = (project: any) => {
		dispatch(pageLoaded("workspace"))
		navigate({
			to: `/${project.id}`,
		})
	}

	function handleArchiveProject(): void {
		setArchiveModalOpened(false)
		archiveProject(projectToArchive.id)
		setProjects(projects.filter((project) => project.id !== projectToArchive.id))
		router.invalidate()
	}

	return loading ? (
		<div className="bg-surface w-full h-full flex items-center justify-center">
			<Loader message="Project initialization" size="small" />
		</div>
	) : (
		<div className="ml-20 px-4 pt-20">
			<div className="mt-8 px-4 w-[325px]">
				<div className="flex flex-row w-full h-fit mb-2">
					<h1 className="text-secondary-100 font-semibold w-fit flex items-center">Projects</h1>

					<div className="flex justify-end grow">
						<Tooltip message="Create new project" className="bg-surface-muted">
							<div onClick={handleCreateNewProject}>
								<PlusIcon />
							</div>
						</Tooltip>
					</div>
				</div>
				<div className="border-b border-secondary-200 w-full my-2"></div>
				{projects.map((project: any) => (
					<Card onClick={() => handleOpenProject(project)} className="w-full my-4 cursor-pointer" key={project.id}>
						<div className="flex flex-row text-secondary">{project.name}</div>
						<div className="mt-2 flex flex-row gap-2 w-full text-xs italic text-secondary-100">{project.description}</div>
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
	)
}
