import { ProjectPlanningClient } from "@jigjoy-io/project-planning-client"
import { Task } from "@jigjoy-io/task-contracts"

const API_GATEWAY = process.env.API_GATEWAY || ""

const projectPlanningClient = new ProjectPlanningClient(`${API_GATEWAY}`)

export async function createNewProject(owner: string): Promise<any> {
	return await projectPlanningClient.createNewProject(owner)
}

export async function updateProjectDetails(id: string, name: string, description: string): Promise<any> {
	return await projectPlanningClient.updateProjectDetails(id, name, description)
}

export async function fetchProject(id: string): Promise<any> {
	return await projectPlanningClient.fetchProject(id)
}

export async function fetchAllProjects(owner: string): Promise<any[]> {
	return await projectPlanningClient.fetchAllProjects(owner)
}

export async function archiveProject(projectId: string): Promise<any> {
	return await projectPlanningClient.archiveProject(projectId)
}

export async function createTask(projectId: string, title: string, description: string): Promise<Task> {
	return await projectPlanningClient.createTask(projectId, title, description)
}

export async function updateTaskTitle(task: Task): Promise<Task> {
	return await projectPlanningClient.updateTaskTitle(task)
}

export async function updateTaskDescription(task: Task): Promise<Task> {
	return await projectPlanningClient.updateTaskDescription(task)
}

export async function fetchAllTasks(projectId: string): Promise<Task[]> {
	return await projectPlanningClient.fetchAllTasks(projectId)
}

export async function planTasksWithAI(projectId: string, projectDescription: string): Promise<Task[]> {
	return await projectPlanningClient.planTasksWithAI(projectId, projectDescription)
}

export async function leaveComment(taskId: string, commentText: string, authorId: string): Promise<Task> {
	return await projectPlanningClient.leaveComment(taskId, commentText, authorId)
}
