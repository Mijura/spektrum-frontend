import { AnimatedText, Button, Copyable, Tooltip } from "@jigjoy-ai/ui-library"
import { ApiKey } from "@jigjoy-ai/spektrum-client"
import { apiKeyCreated } from "../../reducers/account-reducer"
import { useDispatch } from "react-redux"
import { useState, useRef } from "react"
import { createApiKey } from "../../api/account-and-billing"
import HighlightComponent from "./highlight"
import TimelineIcon from "../../shared/icons/timeline"
import { CircleCheckIcon } from "lucide-react"
import { motion } from "framer-motion"
import { createNewProject, createTask } from "../../api/project-planning"
import { developModule } from "../../api/ai-coding"
import { demoProjectLoaded, nextStepLoaded } from "../../reducers/onboarding-reducer"

type Step = "api-key" | "create-project" | "create-task" | "generate-app"

const STEPS: Step[] = ["api-key", "create-project", "create-task", "generate-app"]

export default function GenerateFirstAppStep() {
	const [rawApiKey, setRawApiKey] = useState("")
	const [displayApiKey, setDisplayApiKey] = useState("")
	const [apiKeyCreationInProgress, setApiKeyCreationInProgress] = useState(false)
	const [projectCreationInProgress, setProjectCreationInProgress] = useState(false)
	const [taskCreationInProgress, setTaskCreationInProgress] = useState(false)
	const [buildAndDeployAppInProgress, setBuildAndDeployAppInProgress] = useState(false)
	const [createdProject, setCreatedProject] = useState<any | null>(null)
	const [publicAppUrl, setPublicAppUrl] = useState<string | null>(null)
	const [createdTask, setCreatedTask] = useState<any | null>(null)
	const [activeStep, setActiveStep] = useState<Step>("api-key")
	const [completedSteps, setCompletedSteps] = useState<Set<Step>>(new Set())
	const dispatch = useDispatch()

	const stepRefs = useRef<Record<Step, HTMLDivElement | null>>({
		"api-key": null,
		"create-project": null,
		"create-task": null,
		"generate-app": null,
	})

	const completeStep = (step: Step) => {
		setCompletedSteps((prev) => new Set([...prev, step]))
		const currentIndex = STEPS.indexOf(step)
		if (currentIndex < STEPS.length - 1) {
			setActiveStep(STEPS[currentIndex + 1])
		}
	}

	const handleCreateApiKey = async () => {
		setApiKeyCreationInProgress(true)
		try {
			const apiKey: ApiKey = await createApiKey("Onboarding API Key")
			dispatch(apiKeyCreated(apiKey))
			setDisplayApiKey(apiKey.displayKey as string)
			setRawApiKey(apiKey.rawKey as string)
			completeStep("api-key")
		} finally {
			setApiKeyCreationInProgress(false)
		}
	}

	const handleCreateProject = async () => {
		setProjectCreationInProgress(true)
		try {
			const response = await createNewProject()
			setCreatedProject(response.project)
			setPublicAppUrl(response.entryPoint.publicAppUrl)
			dispatch(demoProjectLoaded(response.project.id as string))
			completeStep("create-project")
		} finally {
			setProjectCreationInProgress(false)
		}
	}

	const handleCreateTask = async () => {
		if (!createdProject) return
		setTaskCreationInProgress(true)
		try {
			const task = await createTask(createdProject.id, "Create a gamified app for learning Japanese vocabulary", '')
			setCreatedTask(task)
			completeStep("create-task")
		} finally {
			setTaskCreationInProgress(false)
		}
		completeStep("create-task")
	}

	const handleBuildAndDeployApp = async () => {
		if (!createdProject || !createdTask) return
		setBuildAndDeployAppInProgress(true)
		try {
			developModule(createdTask)
			dispatch(nextStepLoaded())
		} finally {
			setBuildAndDeployAppInProgress(false)
		}
	}

	return (
		<div className="flex flex-col w-full">
			<div className="flex flex-col items-center">
				<div
					ref={(el) => {
						stepRefs.current["api-key"] = el
					}}
					className="flex flex-row w-full"
				>
					<div className={`relative border-l-2 border-secondary-200`}>
						<TimelineIcon
							className={`absolute left-[-1px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ${completedSteps.has("api-key") ? "text-progress" : activeStep === "api-key" ? "" : "text-secondary-200"}`}
						/>
					</div>
					<div className="relative flex-1 m-10">
						<motion.div
							className="absolute inset-4 bg-gradient-to-r from-progress/15 via-progress/5 to-transparent rounded-l-xl border-l-2 border-t-2 border-b-2 border-progress/30"
							initial={{ opacity: 0 }}
							animate={{ opacity: completedSteps.has("api-key") ? 1 : 0 }}
							transition={{ duration: 0.5 }}
						/>
						<motion.div
							className="flex flex-col gap-y-4 p-10 relative"
							animate={{
								opacity: completedSteps.has("api-key") ? 1 : activeStep === "api-key" ? 1 : 0.1,
							}}
							transition={{ duration: 0.3 }}
						>
							<div className="text-highlight-200 font-bold text-3xl flex flex-row items-center gap-2">
								Generate an API Key
								{completedSteps.has("api-key") && (
									<Tooltip message="Completed">
										<CircleCheckIcon className="size-6 text-progress" />
									</Tooltip>
								)}
							</div>
							<div className="text-secondary-100">
								This key is used to authenticate your requests to the Spektrum API.
							</div>
							{!rawApiKey && (
								<div className="grow flex h-fit">
									<Button
										className="bg-highlight text-primary hover:bg-highlight/80 w-fit mt-4"
										onClick={handleCreateApiKey}
										loading={apiKeyCreationInProgress}
										disabled={activeStep !== "api-key"}
									>
										Create API Key
									</Button>
								</div>
							)}
							{rawApiKey && (
								<Copyable
									className="w-fit border-none rounded-sm"
									text={rawApiKey}
									tooltipMessage="Copy — this won't be shown again."
								/>
							)}
						</motion.div>
					</div>
				</div>
				<div
					ref={(el) => {
						stepRefs.current["create-project"] = el
					}}
					className="flex flex-row w-full"
				>
					<div className={`relative border-l-2 border-secondary-200`}>
						<TimelineIcon
							className={`absolute left-[-1px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ${completedSteps.has("create-project") ? "text-progress" : activeStep === "create-project" ? "" : "text-secondary-200"}`}
						/>
					</div>
					<div className="relative flex-1 m-10">
						<motion.div
							className="absolute inset-4 bg-gradient-to-r from-progress/15 via-progress/5 to-transparent rounded-l-xl border-l-2 border-t-2 border-b-2 border-progress/30"
							initial={{ opacity: 0 }}
							animate={{ opacity: completedSteps.has("create-project") ? 1 : 0 }}
							transition={{ duration: 0.5 }}
						/>
						<motion.div
							className="flex flex-col gap-y-4 p-10 relative"
							animate={{
								opacity: completedSteps.has("create-project")
									? 1
									: activeStep === "create-project"
										? 1
										: 0.1,
							}}
							transition={{ duration: 0.3 }}
						>
							<div className="text-highlight-200 font-bold text-3xl flex flex-row items-center gap-2">
								Create first project
								{completedSteps.has("create-project") && (
									<Tooltip message="Completed">
										<CircleCheckIcon className="size-6 text-progress" />
									</Tooltip>
								)}
							</div>
							<div className="text-secondary-100">
								Projects are collections of tasks you hand off to AI agents to build your app.
							</div>

							<div className="mt-4 p-2 bg-surface-muted rounded-sm border border-secondary-200 bg-card overflow-hidden">
								<HighlightComponent
									code={`import { SpektrumSDK } from "@spektrum-ai/sdk"

const spektrum = new SpektrumSDK(\"${displayApiKey}\")

const project = await spektrum.createProject("learning-app")
console.log(project.entryPoint.publicAppUrl)`}
									language="ts"
								/>
							</div>
							{!createdProject && (
								<div className="grow flex h-fit">
									<Button
										className="bg-highlight text-primary hover:bg-highlight/80 w-fit mt-4"
										onClick={handleCreateProject}
										loading={projectCreationInProgress}
										disabled={activeStep !== "create-project"}
									>
										Run code to create project
									</Button>
								</div>
							)}
							{projectCreationInProgress && <AnimatedText text="Project creation in progress..." />}

							{publicAppUrl && (
								<>
									<div className="text-secondary-100">
										This is the public URL of your project. You recieve it programmatically after
										project creation. All future changes to your project will be reflected here.
									</div>
									<Copyable
										className="w-fit border-none rounded-sm mt-4"
										text={publicAppUrl}
										tooltipMessage="Copy and paste this URL into your browser to view your project."
									/>
								</>
							)}
						</motion.div>
					</div>
				</div>

				<div
					ref={(el) => {
						stepRefs.current["create-task"] = el
					}}
					className="flex flex-row w-full"
				>
					<div className={`relative border-l-2 border-secondary-200`}>
						<TimelineIcon
							className={`absolute left-[-1px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ${completedSteps.has("create-task") ? "text-progress" : activeStep === "create-task" ? "" : "text-secondary-200"}`}
						/>
					</div>
					<div className="relative flex-1 m-10">
						<motion.div
							className="absolute inset-4 bg-gradient-to-r from-progress/15 via-progress/5 to-transparent rounded-l-xl border-l-2 border-t-2 border-b-2 border-progress/30"
							initial={{ opacity: 0 }}
							animate={{ opacity: completedSteps.has("create-task") ? 1 : 0 }}
							transition={{ duration: 0.5 }}
						/>
						<motion.div
							className="flex flex-col gap-y-4 p-10 relative"
							animate={{
								opacity: completedSteps.has("create-task") ? 1 : activeStep === "create-task" ? 1 : 0.1,
							}}
							transition={{ duration: 0.3 }}
						>
							<div className="text-highlight-200 font-bold text-3xl flex flex-row items-center gap-2">
								Create first task
								{completedSteps.has("create-task") && (
									<Tooltip message="Completed">
										<CircleCheckIcon className="size-6 text-progress" />
									</Tooltip>
								)}
							</div>
							<div className="text-secondary-100">
								A task is a command you give to AI agents — like "build a learning app", "fix the
								toolbar", or "refine the UI". You can run multiple tasks within the same project.
							</div>

							<div className="mt-4 p-2 bg-surface-muted rounded-sm border border-secondary-200 bg-card overflow-hidden">
								<HighlightComponent
									code={`const task = await spektrum.createTask(
	project.id,
	"Create a gamified app for learning Japanese vocabulary"
)`}
									language="ts"
								/>
							</div>
							{!completedSteps.has("create-task") && <div className="grow flex h-fit">
								<Button
									className="bg-highlight text-primary hover:bg-highlight/80 w-fit mt-4"
									onClick={handleCreateTask}
									loading={taskCreationInProgress}
									disabled={activeStep !== "create-task"}
								>
									Run code to create task
								</Button>
							</div>
							}
							{completedSteps.has("create-task") && <div className="text-secondary-100">Task created successfully</div>}
						</motion.div>
					</div>
				</div>

				<div
					ref={(el) => {
						stepRefs.current["generate-app"] = el
					}}
					className="flex flex-row w-full"
				>
					<div className={`relative border-l-2 border-secondary-200`}>
						<TimelineIcon
							className={`absolute left-[-1px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ${completedSteps.has("generate-app") ? "text-progress" : activeStep === "generate-app" ? "" : "text-secondary-200"}`}
						/>
					</div>
					<div className="relative flex-1 m-10">
						<motion.div
							className="absolute inset-4 bg-gradient-to-r from-progress/15 via-progress/5 to-transparent rounded-l-xl border-l-2 border-t-2 border-b-2 border-progress/30"
							initial={{ opacity: 0 }}
							animate={{ opacity: completedSteps.has("generate-app") ? 1 : 0 }}
							transition={{ duration: 0.5 }}
						/>
						<motion.div
							className="flex flex-col gap-y-4 p-10 relative"
							animate={{
								opacity: completedSteps.has("generate-app")
									? 1
									: activeStep === "generate-app"
										? 1
										: 0.1,
							}}
							transition={{ duration: 0.3 }}
						>
							<div className="text-highlight-200 font-bold text-3xl flex flex-row items-center gap-2">
								Generate first app
								{completedSteps.has("generate-app") && (
									<Tooltip message="Completed">
										<CircleCheckIcon className="size-6 text-progress" />
									</Tooltip>
								)}
							</div>
							<div className="text-secondary-100">
								When you hand off a task to AI agents, they'll automatically build and deploy your app to the public URL you got when creating the project.
							</div>

							<div className="mt-4 p-2 bg-surface-muted rounded-sm border border-secondary-200 bg-card overflow-hidden">
								<HighlightComponent code={`await spektrum.codeAndDeploy(task)`} language="ts" />
							</div>
							<div className="grow flex h-fit">
								<Button
									className="bg-highlight text-primary hover:bg-highlight/80 w-fit mt-4"
									onClick={handleBuildAndDeployApp}
									loading={buildAndDeployAppInProgress}
									disabled={activeStep !== "generate-app"}
								>
									Run code to build app
								</Button>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	)
}
