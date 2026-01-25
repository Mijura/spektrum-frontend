import { createFileRoute } from "@tanstack/react-router"
import { Card, Loader } from "@jigjoy-io/ui-library"
import { getCurrentUser } from "../api/account-and-billing"
import { fetchAllProjects } from "../api/project-planning"

export const Route = createFileRoute("/_auth/deployed")({
	loader: async () => {
		try {
			const user = await getCurrentUser()
			const projects = await fetchAllProjects(user.userId)
			// Filter only deployed projects
			return projects.filter((project: any) => project.latestProdDeployment)
		} catch (error: any) {
			console.error(error)
			return []
		}
	},
	component: () => {
		const data = Route.useLoaderData()

		const handleOpenProject = async (project: any) => {
			window.open(`${project.latestProdDeployment.url}`, "_blank")
		}

		return (
			<div className="w-full h-full bg-surface p-16 flex flex-col">
				<h1 className="text-secondary-100 text-4xl font-bold mb-12">Deployed Apps</h1>
				{data.length === 0 && <div className="text-secondary-100 text-sm">No deployed apps found.</div>}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
					{data.map((project: any) => (
						<Card
							key={project.id}
							onClick={() => handleOpenProject(project)}
							className="w-full cursor-pointer hover:bg-surface-muted/75 transition-colors"
						>
							<div className="">
								<div className="text-highlight-200 text-lg font-semibold mb-2">{project.name}</div>
								<div className="text-secondary-100 text-sm line-clamp-3 mb-2">
									{project.description}
								</div>
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
				<Loader size="large" message="Loading deployed apps..." />
			</div>
		)
	},
	shouldReload: true,
	gcTime: 0,
})
