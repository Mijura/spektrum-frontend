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
	issuesActivities: ActivityData[]
}

let initialState: WorkspaceState = {
	selectedProject: {
		issues: [],
	},
	selectedIssue: null,
	workflowRunTimeline: [],
	issuesActivities: [],
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
		workflowRunTimelineUpdated: (state, action: PayloadAction<WorkflowRunData[]>) => {
			state.workflowRunTimeline = action.payload
		},
		issueActivitiesUpdated: (state, action: PayloadAction<ActivityData[]>) => {
			state.issuesActivities = action.payload
		},
		activityAppeared: (state, action: PayloadAction<ActivityData>) => {
			const existingActivity = state.issuesActivities.find((activity) => activity.id === action.payload.id)
			if (!existingActivity) {
				state.issuesActivities.push(action.payload)
			} else {
				state.issuesActivities = state.issuesActivities.map((activity) =>
					activity.id === action.payload.id ? action.payload : activity,
				)
			}
		},
	},
})

export const {
	projectSelected,
	issueCreated,
	issueSelected,
	issueUpdated,
	workflowRunTimelineUpdated,
	issueActivitiesUpdated,
	activityAppeared,
} = workspaceSlice.actions

export default workspaceSlice.reducer
