import { useState } from "react"
import { Loader, Modal, ModalContent, ModalTrigger } from "@honeycomb-app/design"
import { useNavigate } from "@tanstack/react-router"
import { createNewProject } from "../api/project"
import Tooltip from "../shared/tooltip"

export default function ProjectsPage() {
	const [editingProject, setEditingProject] = useState<any>(null)
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [imageUrl, setImageUrl] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleEdit = (project: any) => {
		console.log(project)
		setEditingProject(project)
		setName(project.name)
		setDescription(project.description)
		setImageUrl(project.imageUrl)
	}

	const handleDelete = (projectId: string) => {
		// TODO: Implement delete functionality
		console.log("Delete project:", projectId)
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
		const project = await createNewProject()
		navigate({
			to: `/${project.id}`,
		})
	}

	return loading ? (
		<div className="w-full h-full flex items-center justify-center">
			<Loader message="Project intialization" />
		</div>
	) : (
		<div className="ml-20 px-4 pt-20">
			<div className="mt-8 px-4 w-[300px]">
				<div className="flex flex-row w-full h-fit mb-2">
					<h1 className="text-white text-sm w-fit flex items-center">Projects</h1>

					<div className="flex justify-end grow">
						<Tooltip message="Create new project" className="bg-surface-200">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								width="8"
								height="8"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-6 cursor-pointer text-clickable hover:text-base"
								onClick={handleCreateNewProject}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
						</Tooltip>
					</div>
				</div>
				<div className="border-b border-disabled w-full"></div>
			</div>

			<div className="flex flex-row w-[300px] h-fit">
				<Modal onOpenCallback={() => {}} onCloseCallback={() => setEditingProject(null)}>
					<ModalTrigger>
						<div
							style={{ display: "none" }}
							ref={(el) => {
								if (el && editingProject) {
									el.click()
								}
							}}
						/>
					</ModalTrigger>
					<ModalContent>
						<div className="bg-surface-200 p-8 rounded-lg w-[600px] max-w-[90vw]">
							<h2 className="text-2xl font-bold mb-4 text-clickable">Edit project</h2>
							<form
								onSubmit={(e) => {
									e.preventDefault()
									handleSave()
								}}
							>
								<div className="mb-4">
									<label className="block text-sm font-medium text-base mb-2">Name</label>
									<input
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="w-full p-2 rounded bg-surface-300 text-white border border-surface4"
									/>
								</div>
								<div className="mb-4">
									<label className="block text-sm font-medium text-base mb-2">Description</label>
									<textarea
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="w-full p-2 rounded bg-surface-300 text-white border border-surface4"
										rows={3}
									/>
								</div>
								<div className="mb-6">
									<label className="block text-sm font-medium text-base mb-2">Image URL</label>
									<input
										type="text"
										value={imageUrl}
										onChange={(e) => setImageUrl(e.target.value)}
										className="w-full p-2 rounded bg-surface-300 text-white border border-surface4"
									/>
								</div>
								<div className="flex justify-end gap-4">
									<button
										type="button"
										onClick={() => setEditingProject(null)}
										className="px-4 py-2 rounded bg-surface-300 text-white hover:bg-surface4"
									>
										Cancel
									</button>
									<button type="submit" className="px-4 py-2 rounded bg-clickable text-surface-100 hover:bg-hover">
										Save
									</button>
								</div>
							</form>
						</div>
					</ModalContent>
				</Modal>
			</div>
		</div>
	)
}
