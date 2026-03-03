import { createSlice } from "@reduxjs/toolkit"
import { ApiKey, UserData } from "@jigjoy-ai/spektrum-client"

const initialState = {
	userData: {
		id: "",
		organizationId: "",
		email: "",
		credits: 0.0,
		apiKeys: [] as ApiKey[],
	} as UserData,
}

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setUserData(state, action) {
			state.userData = action.payload
		},
		clearUserData(state) {
			state.userData = initialState.userData
		},
		apiKeyCreated(state, action) {
			state.userData.apiKeys.push(action.payload)
		},
		creditsSpent(state, action) {
			state.userData.credits = state.userData.credits - action.payload
		},
	},
})

export const { setUserData, clearUserData, apiKeyCreated, creditsSpent } = accountSlice.actions
export default accountSlice.reducer
