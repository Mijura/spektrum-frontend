import { Tabs, Tab, Button } from "@honeycomb-app/design"
import { v4 as uuidv4 } from "uuid"
import TokenRewards from "../components/token-rewards"
import ReloadIcon from "../shared/icons/reload-icon"
import React, { useEffect } from "react"
import { useProject } from "../hooks/use-project"
import { deploy } from "../api/project"

export const PROJECT_MANAGEMENT_API = process.env.REACT_APP_PROJECT_MANAGEMENT_API

export default function EditorPage(props: any) {
	const project = useProject()
	const [iframeKey, setIframeKey] = React.useState(uuidv4())

	useEffect(() => {
		setIframeKey(uuidv4())
	}, [project.sourceCode])

	const handleDeploy = async () => {
		const project = await deploy(props.id)
		console.log(project)
	}

	return (
		<>
			{project && (
				<div key={props.id} className="grow flex flex-row p-4 gap-4">
					<div className="w-[450px] h-full overflow-y-hidden rounded-[2px] ">
						<TokenRewards />
					</div>
					<div className="flex flex-row w-full">
						<Tabs>
							<Tab key="Preview" className="flex flex-col h-full">
								<div className="h-[40px] flex flew-row bg-surface-100 rounded-tr-lg">
									<ReloadIcon color="ml-4 text-base" />
									<div className="m-2 rounded-full bg-surface-200 w-full px-4 text-base">/</div>
								</div>
								<div className="flex h-full">
									<iframe key={iframeKey} src={`${PROJECT_MANAGEMENT_API}/${project.id}`} className="grow" />
								</div>
							</Tab>
							<Tab key="Deployment">
								<Button className="h-fit w-fit bg-[#E6B85C] hover:bg-[#D4A373]" onClick={handleDeploy}>
									Deploy to Production
								</Button>
							</Tab>
						</Tabs>
					</div>
				</div>
			)}
		</>
	)
}
