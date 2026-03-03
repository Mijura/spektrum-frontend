import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
	currentStep: 0,
    demoProjectId: null as string | null,
}

const onboardingSlice = createSlice({
	name: "onboarding",
	initialState,
	reducers: {
		nextStepLoaded(state) {
			state.currentStep = state.currentStep + 1
		},
		demoProjectLoaded(state, action: PayloadAction<string>) {
			state.demoProjectId = action.payload
		},
	},
})

export const { nextStepLoaded, demoProjectLoaded } = onboardingSlice.actions
export default onboardingSlice.reducer
