export const ACCOUNT_AND_BILLING_ENDPOINT = process.env.ACCOUNT_AND_BILLING_ENDPOINT


export async function sendMagicLinkChallenge(email: string) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email: email }),
	}

	const res: any = await fetch(`${ACCOUNT_AND_BILLING_ENDPOINT}/send-magic-link-challenge`, options)
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

	await fetch(`${ACCOUNT_AND_BILLING_ENDPOINT}/verify-magic-link-challenge`, options)

}
