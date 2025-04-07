import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	profile: {
		email: "miodrag@jigjoy.io",
		tokensRemaining: 4,
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
			state.profile.tokensRemaining = action.payload.tokensRemaining
		},
		updateTokens(state, action) {
			state.profile.tokensRemaining = action.payload.tokensRemaining
		},
	},
})

export const { setProfile, updateTokens } = profileSlice.actions
export default profileSlice.reducer
