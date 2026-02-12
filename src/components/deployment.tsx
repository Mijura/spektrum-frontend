import { Button, Loader } from "@jigjoy-ai/ui-library"
import React, { useState } from "react"
import { useEntryPointProd, useSelectedProject } from "../hooks/store"
import DeployBigIcon from "../shared/icons/deploy-big-icon"
import { useDispatch } from "react-redux"
import { deployModule } from "../api/ai-coding"
import { entryPointProdLoaded } from "../reducers/workspace-reducer"

const Deployment: React.FC = () => {
	const selectedProject = useSelectedProject()
	const dispatch = useDispatch()

	const [deploying, setDeploying] = useState<boolean>(false)
	const entryPointProd = useEntryPointProd()

	const handleDeploy = async () => {
		setDeploying(true)
		const entryPointProd = await deployModule(selectedProject.id)
		dispatch(entryPointProdLoaded(entryPointProd))
		setDeploying(false)
	}

	return (
		<>
			<div className="w-full flex mt-20 justify-center h-fit">
				<div className="flex flex-col gap-y-3 w-full max-w-[400px] px-8 md:px-0">
					<DeployBigIcon />
					<div className="font-semibold text-highlight-100 mt-4">Deployment</div>
					<div className="text-secondary-100 text-sm">
						Once deployed, you’ll get a unique link with latest changes to share your app with others.
					</div>
					{entryPointProd && entryPointProd.publicAppUrl && (
						<div className="text-secondary-100 text-sm">
							Latest deployment is available at{" "}
							<a
								target="_blank"
								rel="noopener noreferrer"
								className="text-highlight"
								href={entryPointProd.publicAppUrl}
							>
								link
							</a>
						</div>
					)}
					{deploying && <Loader size="large" message="Deploying application..." />}
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
