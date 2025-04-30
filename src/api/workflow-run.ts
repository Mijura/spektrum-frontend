const PROJECT_MANAGEMENT_ENDPOINT = process.env.PROJECT_MANAGEMENT_ENDPOINT

export async function runPrototypingWorkflow(issueId: string): Promise<any> {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			issueId: issueId,
		}),
	}

	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}/workflow-run/prototyping`, options)

	return await res.json()
}

export async function fetchWorkflowRunTimeline(projectId: string, page: number = 1, size: number = 5) {
	const url = new URL(`${PROJECT_MANAGEMENT_ENDPOINT}/workflow-run/timeline`)
	url.searchParams.append("projectId", projectId)
	url.searchParams.append("page", String(page)) // Convert page to string if it's a number
	url.searchParams.append("size", String(size))

	const res: any = await fetch(url)
	return await res.json()
}
