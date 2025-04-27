import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Issue } from "../types/issue"

export interface Project {
	id?: string
	name?: string
	description?: string
	owner?: any
	issues: Issue[]
}

export interface WorkspaceState {
	selectedProject: Project
	selectedIssue: Issue | null
}

let initialState: WorkspaceState = {
	selectedProject: {
		issues: [],
	},
	selectedIssue: null,
}

export const workspaceSlice = createSlice({
	name: "workspace",
	initialState,

	reducers: {
		projectSelected: (state, action: PayloadAction<Project>) => {
			state.selectedProject = action.payload
		},
		issueCreated: (state, action: PayloadAction<Issue>) => {
			state.selectedProject.issues.push(action.payload)
			state.selectedIssue = action.payload
		},
		issueSelected: (state, action: PayloadAction<Issue | null>) => {
			state.selectedIssue = action.payload
		},
		issueUpdated: (state, action: PayloadAction<Issue>) => {
			state.selectedIssue = action.payload
			state.selectedProject.issues = state.selectedProject.issues.map((issue) =>
				issue.id === action.payload.id ? action.payload : issue,
			)
		},
	},
})

export const { projectSelected, issueCreated, issueSelected, issueUpdated } = workspaceSlice.actions

export default workspaceSlice.reducer
