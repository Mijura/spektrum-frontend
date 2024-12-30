import React, { useState } from "react"
import { motion } from "framer-motion"

interface Step {
	name: string
	title: string
	content: React.ReactNode
}

interface OnboardingProps {
	steps: Step[]
}

const Stepper: React.FC<OnboardingProps> = ({ steps }) => {
	const [currentStep, setCurrentStep] = useState<number>(0)

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep((prev) => prev + 1)
		}
	}

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1)
		}
	}

	// Calculate the progress percentage for the progress bar
	const progressPercentage = (currentStep / (steps.length - 1)) * 100

	return (
		<div className="min-h-screen flex items-center justify-center bg-surface1">
			<div className="w-4/5 max-w-4xl h-[70%] flex flex-col items-center justify-center bg-surface2 shadow-lg rounded-lg p-8">
				{/* Progress Bar */}
				<div className="w-full bg-disabled h-4 rounded-full mb-12">
					<div className="bg-clickable h-4 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
				</div>

				{/* Step Indicators */}
				<div className="flex items-center justify-between w-full px-8 mb-12">
					{steps.map((step, index) => {
						const isCompleted = index < currentStep
						const isActive = index === currentStep

						const circleStyle = isCompleted ? "bg-clickable text-surface1" : isActive ? "bg-[#6B5A8E] text-white" : "bg-disabled text-base"

						return (
							<div key={index} className="flex flex-col items-center">
								<motion.div
									// If this step is active => scale up; otherwise => scale down
									animate={isActive ? { scale: 1.2 } : { scale: 1 }}
									transition={{ type: "spring", duration: 0.3 }}
									className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${circleStyle}`}
								>
									{index + 1}
								</motion.div>
								<p className="mt-2 text-lg font-semibold text-center text-clickable">{step.name}</p>
							</div>
						)
					})}
				</div>

				{/* Step Title */}
				<h2 className="text-3xl font-bold text-center mb-6 text-white">
					<motion.div key={currentStep} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="w-full text-white">
						{steps[currentStep]?.title}
					</motion.div>
				</h2>

				{/* Step Content */}
				<div className="flex-grow flex items-center text-center justify-center w-full">
					<motion.div key={currentStep} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="w-full text-white">
						{steps[currentStep]?.content}
					</motion.div>
				</div>

				{/* Navigation Buttons */}
				<div className="w-full mt-12 flex justify-between">
					<button onClick={handlePrevious} disabled={currentStep === 0} className="bg-surface3 hover:bg-hover hover:text-surface1 text-clickable font-semibold py-3 px-6 rounded disabled:opacity-50 disabled:hover:bg-surface3 disabled:hover:text-clickable transition-colors">
						Previous
					</button>

					<button onClick={handleNext} disabled={currentStep === steps.length - 1} className="bg-clickable hover:bg-hover text-surface1 font-semibold py-3 px-6 rounded disabled:opacity-50 disabled:hover:bg-clickable transition-colors">
						Next
					</button>
				</div>
			</div>
		</div>
	)
}

export default Stepper
