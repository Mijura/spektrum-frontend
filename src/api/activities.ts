const PROJECT_MANAGEMENT_ENDPOINT = process.env.PROJECT_MANAGEMENT_ENDPOINT

export async function fetchWorkflowRunTimeline(projectId: string, page: number = 1, size: number = 5) {
	const url = new URL(`${PROJECT_MANAGEMENT_ENDPOINT}/activities/workflow-run-timeline`)
	url.searchParams.append("projectId", projectId)
	url.searchParams.append("page", String(page)) // Convert page to string if it's a number
	url.searchParams.append("size", String(size))

	const res: any = await fetch(url)
	return await res.json()
}
