import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Issue } from "../types/issue"
import { WorkflowRunData } from "../types/workflow-run"
import { ActivityData } from "../types/activity"
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
	workflowRunTimeline: WorkflowRunData[]
}

let initialState: WorkspaceState = {
	selectedProject: {
		issues: [],
	},
	selectedIssue: null,
	workflowRunTimeline: [],
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
			console.log("issueUpdated", action.payload)
			if (state.selectedIssue?.id === action.payload.id) {
				state.selectedIssue = action.payload
			}
			state.selectedProject.issues = state.selectedProject.issues.map((issue) =>
				issue.id === action.payload.id ? action.payload : issue,
			)
		},
		workflowRunTimelineUpdated: (state, action: PayloadAction<WorkflowRunData[]>) => {
			state.workflowRunTimeline = action.payload
		},
	},
})

export const { projectSelected, issueCreated, issueSelected, issueUpdated, workflowRunTimelineUpdated } =
	workspaceSlice.actions

export default workspaceSlice.reducer
