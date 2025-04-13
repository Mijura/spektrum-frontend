import { Button } from "@honeycomb-app/design"
import React from "react"
import { deploy } from "../api/project"
import { useSelectedProject } from "../hooks/store"

const Deployment: React.FC = () => {
	const selectedProject = useSelectedProject()

	const handleDeploy = async () => {
		await deploy(selectedProject.id)
	}

	return (
		<Button className="h-fit m-4 w-fit bg-surface hover:bg-hover-primary" onClick={handleDeploy}>
			Deploy to Production
		</Button>
	)
}

export default Deployment
