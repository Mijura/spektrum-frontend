import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	loaded: "",
}

const activePageSlice = createSlice({
	name: "activePage",
	initialState,
	reducers: {
		pageLoaded(state, action) {
			state.loaded = action.payload
		},
	},
})

export const { pageLoaded } = activePageSlice.actions
export default activePageSlice.reducer
