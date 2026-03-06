export class ProjectNotFoundError extends Error {
	constructor(message: string = "Project not found") {
		super(message)
		this.name = "ProjectNotFoundError"
	}
}
