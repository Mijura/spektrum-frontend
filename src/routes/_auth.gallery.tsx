import { createFileRoute } from "@tanstack/react-router"
import { Card, Loader } from "@honeycomb-app/design"
import { getCurrentUser } from "aws-amplify/auth"
import { fetchAllProjects } from "../api/project"
import { useNavigate } from "@tanstack/react-router"
import { useDispatch } from "react-redux"
import { pageNavigated } from "../reducers/navigation-reducer"

const FRONTEND_HOST_URL = process.env.FRONTEND_HOST_URL

export const Route = createFileRoute("/_auth/gallery")({
	loader: async () => {
		try {
			const user = await getCurrentUser()
			const projects = await fetchAllProjects(user.userId)
			// Filter only deployed projects
			return projects.filter((project: any) => project.deploymentId)
		} catch (error: any) {
			console.error(error)
			return []
		}
	},
	component: () => {
		const data = Route.useLoaderData()
		const navigate = useNavigate()
		const dispatch = useDispatch()

		const handleOpenProject = async (project: any) => {
			window.open(`${FRONTEND_HOST_URL}/${project.deploymentId}`, "_blank")
		}

		return (
			<div className="w-full h-full bg-surface p-16 flex flex-col items-center">
				<h1 className="text-4xl font-semibold text-highlight-100 mb-12">Honeycomb Gallery</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
					{data.map((project: any) => (
						<Card
							key={project.id}
							onClick={() => handleOpenProject(project)}
							className="w-full cursor-pointer hover:bg-surface-muted/75 transition-colors"
						>
							<div className="">
								<div className="text-highlight-200 text-lg font-semibold mb-2">{project.name}</div>
								<div className="text-secondary-100 text-sm line-clamp-3 mb-2">{project.description}</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		)
	},
	pendingComponent: () => {
		return (
			<div className="w-screen h-screen bg-surface flex items-center justify-center">
				<Loader size="small" message="Loading gallery..." />
			</div>
		)
	},
	shouldReload: true,
	gcTime: 0,
})
