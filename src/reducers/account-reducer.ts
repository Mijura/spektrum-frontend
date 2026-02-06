import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	userData: {
		id: '',
		email: '',
		credits: 0.00,
		apiKeys: [] as any[],
	},
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
	},
})

export const { setUserData, clearUserData, apiKeyCreated } = accountSlice.actions
export default accountSlice.reducer
