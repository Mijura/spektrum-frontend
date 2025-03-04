import React, { useState } from "react"
import { motion } from "framer-motion"
// import { useProjects } from "../../util/store"
import Project from "../../types/project"
import { Button, Card, Loader, Modal, ModalContent, ModalTrigger } from "@jigjoy-io/ui"
import { createNewProject } from "../../api/project"
import { useNavigate } from "@tanstack/react-router"

export default function MyProjects() {
	//const projects = useProjects()
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
		setLoading(false)
		navigate({
			to: `/${project.id}`,
		})
	}

	return loading ? (
		<Loader message="Project intialization" />
	) : (
		<div className="container mx-auto max-w-screen-xl px-4 pt-20">
			<h1 className="text-3xl font-bold mb-6 text-heading">My Projects</h1>
			<Button onClick={handleCreateNewProject}>Create new Project</Button>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{/* {projects.map((project: Project) => (
						<Card>
							<img src={project.imageUrl} alt={project.name} className="w-[140px] h-full rounded-lg object-cover" />
							<div className="flex flex-col flex-1 justify-between">
								<div>
									<h2 className="text-xl font-semibold mb-2 text-heading">{project.name}</h2>
									<p className="text-sm text-base">{project.description}</p>
								</div>
								<div className="flex justify-end gap-4">
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => handleEdit(project)}
										className="p-2 rounded-full bg-surface-3 text-clickable hover:bg-hover hover:text-surface-1"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
											<path d="m15 5 4 4" />
										</svg>
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => handleDelete(project.projectId)}
										className="p-2 rounded-full bg-surface-3 text-red-500 hover:bg-red-500 hover:text-white"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M3 6h18" />
											<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
											<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
										</svg>
									</motion.button>
								</div>
							</div>
						</Card>
					))} */}
			</div>

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
					<div className="bg-surface-2 p-8 rounded-lg w-[600px] max-w-[90vw]">
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
									className="w-full p-2 rounded bg-surface-3 text-white border border-surface4"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-base mb-2">Description</label>
								<textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="w-full p-2 rounded bg-surface-3 text-white border border-surface4"
									rows={3}
								/>
							</div>
							<div className="mb-6">
								<label className="block text-sm font-medium text-base mb-2">Image URL</label>
								<input
									type="text"
									value={imageUrl}
									onChange={(e) => setImageUrl(e.target.value)}
									className="w-full p-2 rounded bg-surface-3 text-white border border-surface4"
								/>
							</div>
							<div className="flex justify-end gap-4">
								<button
									type="button"
									onClick={() => setEditingProject(null)}
									className="px-4 py-2 rounded bg-surface-3 text-white hover:bg-surface4"
								>
									Cancel
								</button>
								<button type="submit" className="px-4 py-2 rounded bg-clickable text-surface-1 hover:bg-hover">
									Save
								</button>
							</div>
						</form>
					</div>
				</ModalContent>
			</Modal>
		</div>
	)
}
