import { Issue } from "../types/issue"

const HONEYCOMB_ENDPOINT = process.env.HONEYCOMB_ENDPOINT

export async function createIssue(projectId: string, title: string, description: string): Promise<any> {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			projectId: projectId,
			title: title,
			description: description,
		}),
	}

	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}/issue`, options)
	return await res.json()
}

export async function updateIssueTitle(issue: Issue) {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(issue),
	}

	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}/issue/title`, options)
	return await res.json()
}

export async function updateIssueDescription(issue: Issue) {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(issue),
	}

	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}/issue/description`, options)
	return await res.json()
}

export async function leaveComment(issueId: string, authorId: string, commentText: string) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			issueId: issueId,
			authorId: authorId,
			commentText: commentText,
		}),
	}

	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}/issue/add-comment-and-run-workflow`, options)
	return await res.json()
}

export async function fetchAllIssues(projectId: string) {
	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}/issue/fetch-all/${projectId}`)
	return await res.json()
}
