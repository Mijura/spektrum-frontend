import { ProjectNotFoundError } from "../shared/errors/project-not-found-error"

export const JIGJOY_API__URL = process.env.JIGJOY_API__URL

export async function timeline() {
	const res: any = await fetch(`${JIGJOY_API__URL}/search/timeline?playerId=mijura&gameId=$unicorn-game`)
	if (res.status == 404) throw new ProjectNotFoundError()
	console.log(res)
	return await res.json()
}
