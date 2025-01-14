import { Stepper } from "@jigjoy-io/ui"
import React from "react"

export default function Onboarding() {
	const steps = [
		{
			name: "Welcome",
			title: "Welcome to Our Platform",
			content: <div>Welcome content goes here...</div>,
		},
		{
			name: "Details",
			title: "Fill Out Your Details",
			content: <div>Form for user details goes here...</div>,
		},
		{
			name: "Summary",
			title: "Review and Submit",
			content: <div>Summary content goes here...</div>,
		},
	]

	return (
		<div className="w-full">
			<Stepper steps={steps} />
		</div>
	)
}
