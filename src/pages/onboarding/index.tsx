import GenerateFirstAppStep from "./generate-first-app"
import CongratulationsStep from "./congratulations"
import { Stepper } from "./stepper"
import WelcomeStep from "./welcome"

export default function OnboardingPage() {
	const steps = [
		{
			name: "Welcome to Spektrum",
			title: "Why we exist",
			content: <WelcomeStep />,
		},
        {
			name: "Start Building",
			title: "Generate your first app",
			content: <GenerateFirstAppStep />,
		},
		{
			name: "Congratulations",
			title: "Your app is building. ",
			content: <CongratulationsStep />,
		},
	]

	return <Stepper steps={steps} />
}
