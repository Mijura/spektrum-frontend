import { Heatmap, Pagination, TaskExecution, TimeRange } from "@jigjoy-io/platform-sdk"
import jigjoyClient from "./platform-sdk"


export async function fetchProjectTimeline(
	projectId: string,
	page: number = 1,
	size: number = 5,
): Promise<TaskExecution[]> {
	const pagination: Pagination = {
		pageNumber: page,
		pageSize: size,
	}
	return await jigjoyClient.observability.getProjectExecutions(projectId, pagination)
}

export async function fetchAccountTimeline(
	accountId: string,
	page: number = 1,
	size: number = 5,
): Promise<TaskExecution[]> {
	const pagination: Pagination = {
		pageNumber: page,
		pageSize: size,
	}
	return await jigjoyClient.observability.getAccountExecutions(accountId, pagination)
}

export async function fetchHeatmap(accountId: string): Promise<Heatmap[]> {
	const startDate = new Date("2026-01-01")
	const endDate = new Date("2026-12-31")
	const timeRange: TimeRange = {
		startDate: startDate.toISOString(),
		endDate: endDate.toISOString(),
	}
	return await jigjoyClient.observability.getHeatmap(accountId, timeRange)
}
