import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	currentStep: 0,
}

const onboardingSlice = createSlice({
	name: "onboarding",
	initialState,
	reducers: {
		nextStepLoaded(state) {
			state.currentStep = state.currentStep + 1
		},
	},
})

export const { nextStepLoaded } = onboardingSlice.actions
export default onboardingSlice.reducer
