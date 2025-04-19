import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	page: "",
}

const navigationSlice = createSlice({
	name: "navigation",
	initialState,
	reducers: {
		pageNavigated(state, action) {
			state.page = action.payload
		},
	},
})

export const { pageNavigated } = navigationSlice.actions
export default navigationSlice.reducer
