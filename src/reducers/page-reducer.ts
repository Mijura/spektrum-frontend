import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	selected: "",
}

const pageSlice = createSlice({
	name: "page",
	initialState,
	reducers: {
		pageLoaded(state, action) {
			state.selected = action.payload
		},
	},
})

export const { pageLoaded } = pageSlice.actions
export default pageSlice.reducer
