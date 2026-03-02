import CreateApiKeyStep from "./create-api-key"
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
            name: "Get Started",
            title: "Create your first API key",
            content: <CreateApiKeyStep />,
        },
        {
            name: "Start Building",
            title: "Generate your first app",
            content: <>Generate app</>,
            nextButtonText: 'Generate',

        }
    ]

	return <Stepper steps={steps} />
}