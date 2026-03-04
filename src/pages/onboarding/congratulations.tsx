import { AnimatedText, Button } from "@jigjoy-ai/ui-library"
import { useNavigate } from "@tanstack/react-router"
import { useDemoProjectId } from "../../hooks/store"

export default function CongratulationsStep() {
    const navigate = useNavigate()
    const demoProjectId = useDemoProjectId()


    const handleWatchAgentsWork = () => {
        if (!demoProjectId) return
        
        navigate({
            to: "/$projectId",
            params: {
                projectId: demoProjectId,
            },
        })
    }
    
	return (
		<div className="mt-10 text-secondary-100">
            <div className="my-4 text-highlight-200 font-bold text-3xl flex flex-row items-center gap-2">
                Congrats — your first app is on its way.
			</div>
			<div className="text-secondary-100">You've received <strong>$5 in free credits</strong> — once your agents are done, credits are deducted based on task complexity.</div>
			<div className="text-secondary-100">While it builds, head over to the platform to monitor everything in real time — projects, tasks, executions, API keys, and costs.</div>
			<AnimatedText className="mt-4 my-4 flex items-start justify-start p-0" text="Agents are building..." />
            <Button className="bg-highlight text-primary hover:bg-highlight/80 w-fit mt-4" onClick={handleWatchAgentsWork}>Go to platform</Button>
		</div>
	)
}