import GenerateFirstAppStep from "./generate-first-app"
import { Stepper } from "./stepper"
import WelcomeStep from "./welcome"

export default function OnboardingPage() {
	const steps = [
		{
			name: "Start Building",
			title: "Generate your first app",
			content: <GenerateFirstAppStep />,
		},
		{
			name: "Welcome to Spektrum",
			title: "Why we exist",
			content: <WelcomeStep />,
		},
		{
			name: "Start Building",
			title: "Generate your first app",
			content: <>Generate app</>,
		},
	]

	return <Stepper steps={steps} />
}
