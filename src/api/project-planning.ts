import { Task } from "@jigjoy-ai/task-contracts"
import spektrumClient from "./spektrum-client"

export async function createNewProject(): Promise<any> {
	return await spektrumClient.planning.createNewProject()
}

export async function updateProjectDetails(id: string, name: string, description: string): Promise<any> {
	return await spektrumClient.planning.updateProjectDetails(id, name, description)
}

export async function fetchProject(id: string): Promise<any> {
	return await spektrumClient.planning.fetchProject(id)
}

export async function fetchAllProjects(): Promise<any[]> {
	return await spektrumClient.planning.fetchAllProjects()
}

export async function archiveProject(projectId: string): Promise<any> {
	return await spektrumClient.planning.archiveProject(projectId)
}

export async function createTask(projectId: string, title: string, description: string): Promise<Task> {
	return await spektrumClient.planning.createTask(projectId, title, description)
}

export async function updateTaskTitle(task: Task): Promise<Task> {
	return await spektrumClient.planning.updateTaskTitle(task)
}

export async function updateTaskDescription(task: Task): Promise<Task> {
	return await spektrumClient.planning.updateTaskDescription(task)
}

export async function fetchAllTasks(projectId: string): Promise<Task[]> {
	return await spektrumClient.planning.fetchAllTasks(projectId)
}

export async function planTasksWithAI(projectId: string, projectDescription: string): Promise<Task[]> {
	return await spektrumClient.planning.planTasksWithAI(projectId, projectDescription)
}

export async function leaveComment(taskId: string, commentText: string, author: string): Promise<Task> {
	return await spektrumClient.planning.leaveComment(taskId, commentText, author)
}
