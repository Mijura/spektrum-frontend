import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	user: null,
	idToken: null,
	accessToken: null,
	isAuthenticated: true,
}

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.user = action.payload.user
			state.idToken = action.payload.idToken
			state.accessToken = action.payload.accessToken
			state.isAuthenticated = true
		},
		logout: (state) => {
			state.user = null
			state.idToken = null
			state.accessToken = null
			state.isAuthenticated = false
		},
	},
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
