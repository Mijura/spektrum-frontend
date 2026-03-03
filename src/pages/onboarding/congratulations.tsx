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
		<div>
            <div className="text-highlight-200 font-bold text-3xl flex flex-row items-center gap-2">
                Congrats — your first app is on its way.
			</div>
			<AnimatedText text="Agents are building..." />
			<p>You've received <strong>$5 in free credits</strong> — once your agents are done, credits are deducted based on task complexity.</p>
			<p>While it builds, head over to the platform to monitor everything in real time — projects, tasks, executions, API keys, and costs.</p>
            <Button className="bg-highlight text-primary hover:bg-highlight/80 w-fit mt-4" onClick={handleWatchAgentsWork}>Go to platform</Button>
		</div>
	)
}