import { Task } from "@jigjoy-io/task-contracts"
import jigjoyClient from "./platform-sdk"

export async function createNewProject(owner: string): Promise<any> {
	return await jigjoyClient.planning.createNewProject(owner)
}

export async function updateProjectDetails(id: string, name: string, description: string): Promise<any> {
	return await jigjoyClient.planning.updateProjectDetails(id, name, description)
}

export async function fetchProject(id: string): Promise<any> {
	return await jigjoyClient.planning.fetchProject(id)
}

export async function fetchAllProjects(owner: string): Promise<any[]> {
	return await jigjoyClient.planning.fetchAllProjects(owner)
}

export async function archiveProject(projectId: string): Promise<any> {
	return await jigjoyClient.planning.archiveProject(projectId)
}

export async function createTask(projectId: string, title: string, description: string): Promise<Task> {
	return await jigjoyClient.planning.createTask(projectId, title, description)
}

export async function updateTaskTitle(task: Task): Promise<Task> {
	return await jigjoyClient.planning.updateTaskTitle(task)
}

export async function updateTaskDescription(task: Task): Promise<Task> {
	return await jigjoyClient.planning.updateTaskDescription(task)
}

export async function fetchAllTasks(projectId: string): Promise<Task[]> {
	return await jigjoyClient.planning.fetchAllTasks(projectId)
}

export async function planTasksWithAI(projectId: string, projectDescription: string): Promise<Task[]> {
	return await jigjoyClient.planning.planTasksWithAI(projectId, projectDescription)
}

export async function leaveComment(taskId: string, commentText: string, authorId: string): Promise<Task> {
	return await jigjoyClient.planning.leaveComment(taskId, commentText, authorId)
}
