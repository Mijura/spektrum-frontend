import { Button, Loader } from "@honeycomb-app/design"
import React, { useEffect, useState } from "react"
import { deploy } from "../api/project"
import { useSelectedProject } from "../hooks/store"
import DeployBigIcon from "../shared/icons/deploy-big-icon"
import { useDispatch } from "react-redux"
import { projectUpdated } from "../reducers/workspace-reducer"

const Deployment: React.FC = () => {
	const selectedProject = useSelectedProject()
	const dispatch = useDispatch()

	const [deploymentId, setDeploymentId] = useState<string | null>(null)
	const [deploying, setDeploying] = useState<boolean>(false)
	const handleDeploy = async () => {
		setDeploying(true)
		const deployedProject = await deploy(selectedProject.id)
		dispatch(projectUpdated({ ...selectedProject, deploymentId: deployedProject._deploymentId })) // TODO: fix this
		console.log(deployedProject)
		setDeploymentId(deployedProject._deploymentId) // TODO: fix this
		setDeploying(false)
	}

	return (
		<>
			<div className="w-full flex mt-20 justify-center h-fit">
				<div className="flex flex-col gap-y-3 w-full max-w-[400px]">
					<DeployBigIcon />
					<div className="font-semibold text-highlight-100 mt-4">Deployment</div>
					<div className="text-secondary-100 text-sm">
						Once deployed, you’ll get a unique link with latest changes to share your app with others.
					</div>
					{deploymentId && (
						<div className="text-secondary-100 text-sm">
							Latest deployment is available at{" "}
							<a
								target="_blank"
								rel="noopener noreferrer"
								className="text-highlight"
								href={`http://localhost:3000/${deploymentId}`}
							>
								link
							</a>
						</div>
					)}
					{deploying && <Loader size="small" message="Deploying application..." />}
					{!deploying && (
						<Button className="h-fit w-fit bg-surface hover:bg-hover-primary" onClick={handleDeploy}>
							Deploy
						</Button>
					)}
				</div>
			</div>
		</>
	)
}

export default Deployment
