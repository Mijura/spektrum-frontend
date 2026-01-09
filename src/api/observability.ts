import { Heatmap, ObservabilityClient, Pagination, TaskExecution, TimeRange } from "@jigjoy-io/observability-client"

const OBSERVABILITY_ENDPOINT = process.env.OBSERVABILITY_ENDPOINT || ""

const observabilityClient = new ObservabilityClient(OBSERVABILITY_ENDPOINT)

export async function fetchProjectTimeline(
	projectId: string,
	page: number = 1,
	size: number = 5,
): Promise<TaskExecution[]> {
	const pagination: Pagination = {
		pageNumber: page,
		pageSize: size,
	}
	return await observabilityClient.getProjectExecutions(projectId, pagination)
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
	return await observabilityClient.getAccountExecutions(accountId, pagination)
}

export async function fetchHeatmap(accountId: string): Promise<Heatmap[]> {
	const startDate = new Date("2026-01-01")
	const endDate = new Date("2026-12-31")
	const timeRange: TimeRange = {
		startDate: startDate.toISOString(),
		endDate: endDate.toISOString(),
	}
	return await observabilityClient.getHeatmap(accountId, timeRange)
}
