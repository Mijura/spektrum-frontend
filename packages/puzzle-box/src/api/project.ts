export const API_HOST = process.env.REACT_APP_API

interface RefactorRequest {
	projectId: string
	message: string
}

export async function refactorProject(request: RefactorRequest): Promise<void> {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(request),
	}

	const res: any = await fetch(`${API_HOST}/project/refactor`, options)
	return await res.json()
}
