import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	user: null,
	tokensRemaining: 1,
	plan: "guest",
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload.user
			state.plan = action.payload.plan
			state.tokensRemaining = action.payload.tokensRemaining
		},
		updateTokens(state, action) {
			state.tokensRemaining = action.payload.tokensRemaining
		},
		logout(state) {
			return initialState // Reset state to initial on logout
		},
	},
})

export const { setUser, updateTokens, logout } = userSlice.actions
export default userSlice.reducer
