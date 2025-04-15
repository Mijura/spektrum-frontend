export default interface Project {
	id?: string
	name?: string
	description?: string
	owner?: any
	tickets?: Ticket[]
}

export interface Initiator {
	type: "WORKER" | "USER"
	name: string
}

abstract class Activity {
	abstract id: string
	abstract created: string
	abstract type: string
	abstract initiator: Initiator
}

export interface TicketEditActivity extends Activity {
	type: "TICKET_EDIT"
	field: "title" | "description" | "status"
	oldValue: string
	newValue: string
}

export interface WorkflowActivity extends Activity {
	type: "WORKFLOW"
	workflowName: string
	status: "STARTED" | "COMPLETED" | "FAILED"
	result?: any
}

export interface CommentActivity extends Activity {
	type: "COMMENT"
	comment: string
}

export interface Ticket {
	id: string
	title: string
	description: string
	projectId: string
	status: "TODO" | "IN_PROGRESS" | "DONE"
	created: string
	updated: string
	activities: Activity[]
}
