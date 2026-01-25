import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	userData: {
		userId: "",
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
