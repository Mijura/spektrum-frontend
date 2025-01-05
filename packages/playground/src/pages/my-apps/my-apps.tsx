import React, { useState } from "react"
const Card = React.lazy(() => import("@jigjoy-ui/card"))
const Modal = React.lazy(() => import("@jigjoy-ui/modal"))
const ModalTrigger = React.lazy(() => import("@jigjoy-ui/modal-trigger"))
const ModalContent = React.lazy(() => import("@jigjoy-ui/modal-content"))
import { motion } from "framer-motion"

// Mock data - replace with actual data fetching
const myApps = [
	{
		id: "1",
		name: "My First App",
		description: "This is my first application built with JigJoy",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
	},
	{
		id: "2",
		name: "Cool Game",
		description: "An awesome game built using JigJoy engine",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
	},
]

export default function MyApps() {
	const [editingApp, setEditingApp] = useState<any>(null)
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [imageUrl, setImageUrl] = useState("")

	const handleEdit = (app: any) => {
		setEditingApp(app)
		setName(app.name)
		setDescription(app.description)
		setImageUrl(app.imageUrl)
	}

	const handleDelete = (appId: string) => {
		// TODO: Implement delete functionality
		console.log("Delete app:", appId)
	}

	const handleSave = () => {
		if (!editingApp) return
		
		const updatedApp = {
			...editingApp,
			name,
			description,
			imageUrl,
		}
		// TODO: Implement save functionality
		console.log("Save app:", updatedApp)
		setEditingApp(null)
	}

	return (
		<div className="container mx-auto max-w-screen-xl px-4 pt-20">
			<h1 className="text-3xl font-bold mb-6 text-heading">My Apps</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{myApps.map((app) => (
					<Card key={app.id}>
						<img src={app.imageUrl} alt={app.name} className="w-[140px] h-full rounded-lg object-cover" />
						<div className="flex flex-col flex-1 justify-between">
							<div>
								<h2 className="text-xl font-semibold mb-2 text-heading">{app.name}</h2>
								<p className="text-sm text-base">{app.description}</p>
							</div>
							<div className="flex justify-end gap-4">
								<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => handleEdit(app)} className="p-2 rounded-full bg-surface3 text-clickable hover:bg-hover hover:text-surface1">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
										<path d="m15 5 4 4" />
									</svg>
								</motion.button>
								<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => handleDelete(app.id)} className="p-2 rounded-full bg-surface3 text-red-500 hover:bg-red-500 hover:text-white">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M3 6h18" />
										<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
										<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
									</svg>
								</motion.button>
							</div>
						</div>
					</Card>
				))}
			</div>

			<React.Suspense>
				<Modal onOpenCallback={() => {}} onCloseCallback={() => setEditingApp(null)}>
					<ModalTrigger>
						<div style={{ display: 'none' }} ref={(el) => {
							if (el && editingApp) {
								el.click();
							}
						}} />
					</ModalTrigger>
					<ModalContent>
						<div className="bg-surface2 p-8 rounded-lg w-[600px] max-w-[90vw]">
							<h2 className="text-2xl font-bold mb-4 text-clickable">Edit App</h2>
							<form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
								<div className="mb-4">
									<label className="block text-sm font-medium text-base mb-2">Name</label>
									<input 
										type="text" 
										value={name} 
										onChange={(e) => setName(e.target.value)} 
										className="w-full p-2 rounded bg-surface3 text-white border border-surface4" 
									/>
								</div>
								<div className="mb-4">
									<label className="block text-sm font-medium text-base mb-2">Description</label>
									<textarea 
										value={description} 
										onChange={(e) => setDescription(e.target.value)} 
										className="w-full p-2 rounded bg-surface3 text-white border border-surface4" 
										rows={3} 
									/>
								</div>
								<div className="mb-6">
									<label className="block text-sm font-medium text-base mb-2">Image URL</label>
									<input 
										type="text" 
										value={imageUrl} 
										onChange={(e) => setImageUrl(e.target.value)} 
										className="w-full p-2 rounded bg-surface3 text-white border border-surface4" 
									/>
								</div>
								<div className="flex justify-end gap-4">
									<button 
										type="button" 
										onClick={() => setEditingApp(null)} 
										className="px-4 py-2 rounded bg-surface3 text-white hover:bg-surface4"
									>
										Cancel
									</button>
									<button 
										type="submit" 
										className="px-4 py-2 rounded bg-clickable text-surface1 hover:bg-hover"
									>
										Save
									</button>
								</div>
							</form>
						</div>
					</ModalContent>
				</Modal>
			</React.Suspense>
		</div>
	)
}
