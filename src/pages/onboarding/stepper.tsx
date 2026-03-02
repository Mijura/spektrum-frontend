import { motion } from "framer-motion"
import { useCurrentStep } from "../../hooks/store"

interface Step {
	name: string
	title: string
	content: React.ReactNode
    nextButtonText?: string
    nextButtonOnClick?: () => void
}

interface OnboardingProps {
	steps: Step[]
}

export const Stepper: React.FC<OnboardingProps> = ({ steps }) => {
	const currentStep = useCurrentStep()

	// Calculate the progress percentage for the progress bar
	const progressPercentage = (currentStep / (steps.length)) * 100

	return (
		<motion.div 
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 4 }} 
		className="h-screen flex items-center justify-center bg-surface">
			<div className="w-full max-w-5xl h-[70%] flex flex-col items-center justify-center bg-surface-200 p-8">

                {/* Progress Bar */}
                <div className="w-full h-4 rounded-full mb-10">
                    <p className={`text-surface-100 text-sm mb-2 text-progress ${currentStep === 0 ? "opacity-0" : "opacity-100"}`}>Completed {progressPercentage.toFixed(0)}%</p>
					<div
						className="bg-progress h-0.5 rounded-full transition-all duration-300"
						style={{ width: `${progressPercentage}%` }}
					/>
				</div>

				{/* Step Indicators */}
				<div className="flex items-center justify-between w-full mb-12 gap-8">
					{steps.map((step, index) => {
						const isCompleted = index < currentStep
						const isActive = index === currentStep

						const style = isCompleted
							? "text-progress border border-progress text-progress opacity-40"
							: isActive
							? "text-secondary border border-highlight"
							: `text-secondary border border-highlight ${currentStep === 0 ? "opacity-0" : "opacity-30"}`

						return (
							<motion.div key={index} className={`rounded-[2px] flex flex-col w-full px-4 py-2 ${style}`}>
								<p className="text-lg font-semibold">{step.name}</p>
								<h2 className="">{step.title}</h2>
							</motion.div>
						)
					})}
				</div>




				{/* Step Content */}
				<motion.div 
				className="flex-grow flex w-full h-2/3">
					<motion.div
						key={currentStep}
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -15 }}
						transition={{ duration: 0.3 }}
						className="w-full text-white"
					>
						{steps[currentStep]?.content}
					</motion.div>
				</motion.div>

			</div>
		</motion.div>
	)
}