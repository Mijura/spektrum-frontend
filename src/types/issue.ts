export interface Issue {
	id: string
	title: string
	description: string
	projectId: string
	status: "TODO" | "IN_PROGRESS" | "DONE"
	created: string
	updated: string
}
export default interface Project {
	id?: string
	name?: string
	description?: string
	owner?: any
	issues?: Issue[]
}

export interface Initiator {
	type: "AI_WORKER" | "USER"
	name: string
}

abstract class Activity {
	abstract id: string
	abstract created: string
	abstract type: string
	abstract initiator: Initiator
}

export interface IssueEditing extends Activity {
	type: "ISSUE_EDITED"
	field: "title" | "description" | "status"
	oldValue: string
	newValue: string
}

export interface WorkflowExecution extends Activity {
	type: "WORKFLOW"
	workflowName: string
	status: "STARTED" | "COMPLETED" | "FAILED"
	result?: any
}

export interface Comment extends Activity {
	id: string
	created: string
	initiator: Initiator
	issueId: string
	type: "COMMENT"
	data: {
		content: string
	}
}
