import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	userData: {
		id: "",
		email: "",
	},
}

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setUserData(state, action) {
			state.userData = action.payload
		},
	},
})

export const { setUserData } = accountSlice.actions
export default accountSlice.reducer
