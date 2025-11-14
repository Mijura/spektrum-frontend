import { Tooltip } from "@jigjoy-io/ui-library"
import React, { useEffect } from "react"
import ReloadIcon from "../shared/icons/reload-icon"
import { v4 as uuidv4 } from "uuid"
import { useSelectedProject } from "../hooks/store"
import { AnimatePresence, motion } from "framer-motion"

const OutputPreview: React.FC = () => {
	const selectedProject = useSelectedProject()

	const [iframeKey, setIframeKey] = React.useState(uuidv4())

	const reloadPage = () => {
		setIframeKey(uuidv4())
	}

	useEffect(() => {
		reloadPage()
	}, [selectedProject.sourceCode])

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.3,
					ease: "easeOut",
				}}
				className="flex flex-col h-full"
			>
				<div className="flex flex-col h-full">
					<div className="h-[40px] flex flew-row bg-surface rounded-tr-lg ml-4">
						<div className="m-2 rounded-full bg-surface-muted w-full px-4 text-secondary">/</div>
						<Tooltip message="Reload page">
							<div onClick={reloadPage}>
								<ReloadIcon color="mr-4 h-[40px] items-center text-secondary-100 hover:text-secondary cursor-pointer" />
							</div>
						</Tooltip>
					</div>
					<div className="flex h-full">
						{selectedProject.latestDevDeployment && (
							<iframe
								key={iframeKey}
								src={`${selectedProject.latestDevDeployment.url}/?nocache=${Date.now()}`}
								className="grow"
							/>
						)}
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

export default OutputPreview
