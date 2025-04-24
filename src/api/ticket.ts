import { Ticket } from "../types/ticket"

const PROJECT_MANAGEMENT_ENDPOINT = process.env.PROJECT_MANAGEMENT_ENDPOINT

export async function createNewTicket(projectId: string, title: string, description: string): Promise<any> {
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

	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}/ticket`, options)
	return await res.json()
}

export async function updateTicketTitle(ticket: Ticket) {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(ticket),
	}

	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}/ticket/title`, options)
	return await res.json()
}

export async function updateTicketDescription(ticket: Ticket) {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(ticket),
	}

	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}/ticket/description`, options)
	return await res.json()
}

export async function leaveComment(ticketId: string, authorId: string, commentText: string) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			ticketId: ticketId,
			authorId: authorId,
			commentText: commentText,
		}),
	}

	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}/ticket/add-comment-and-run-workflow`, options)
	return await res.json()
}

export async function fetchAllTickets(projectId: string) {
	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}/ticket/fetch-all/${projectId}`)
	return await res.json()
}
