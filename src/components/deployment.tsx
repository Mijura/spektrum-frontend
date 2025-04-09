import { Button } from "@honeycomb-app/design"
import React from "react"
import { deploy } from "../api/project"
import { useProject } from "../hooks/use-project"

const Deployment: React.FC = () => {
	const project = useProject()

	const handleDeploy = async () => {
		const result = await deploy(project.id)
		console.log(result)
	}

	return (
		<Button className="h-fit m-4 w-fit bg-surface hover:bg-hover-primary" onClick={handleDeploy}>
			Deploy to Production
		</Button>
	)
}

export default Deployment
