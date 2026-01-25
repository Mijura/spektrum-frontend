export const ACCOUNT_AND_BILLING_ENDPOINT = process.env.ACCOUNT_AND_BILLING_ENDPOINT


export async function sendMagicLinkChallenge(email: string) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email: email }),
	}

	const res: any = await fetch(`${ACCOUNT_AND_BILLING_ENDPOINT}/auth/challenge/magic-link`, options)
	return await res.json()
}

export async function verifyMagicLinkChallenge(email: string, challengeResponse: string) {

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include" as RequestCredentials,
		body: JSON.stringify({
			email,
			challengeResponse,
		}),
	}

	await fetch(`${ACCOUNT_AND_BILLING_ENDPOINT}/auth/challenge/magic-link/verify`, options)

}


export async function getCurrentUser() {
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include" as RequestCredentials,
	}

	const res: any = await fetch(`${ACCOUNT_AND_BILLING_ENDPOINT}/auth/current-user`, options)

	if (!res.ok || res.status === 400 || res.status === 401) {
		throw new Error('Authentication failed')
	}
	return await res.json()
}