export const API_HOST = process.env.REACT_APP_API

interface ChangeRequest {
	id: string
	message: string
	project: any
}

export async function refactorProject(changeRequest: ChangeRequest): Promise<any> {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(changeRequest),
	}

	const res: any = await fetch(`${API_HOST}/project/refactor`, options)
	return await res.json()
}
