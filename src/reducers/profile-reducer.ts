import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	profile: {
		email: "miodrag@jigjoy.io",
		tokens: 4,
		image: "https://avatars.githubusercontent.com/u/110939072?v=4",
		progressToNextLevel: 40,
	},
}

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setProfile(state, action) {
			state.profile.email = action.payload.email
			state.profile.tokens = action.payload.tokens
		},
		updateTokens(state, action) {
			state.profile.tokens = action.payload.tokens
		},
	},
})

export const { setProfile, updateTokens } = profileSlice.actions
export default profileSlice.reducer
