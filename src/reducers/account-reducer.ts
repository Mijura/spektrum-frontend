import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	userData: {
		id: '',
		email: '',
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
	},
})

export const { setUserData, clearUserData } = accountSlice.actions
export default accountSlice.reducer
