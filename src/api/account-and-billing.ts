export const ACCOUNT_AND_BILLING_ENDPOINT = process.env.ACCOUNT_AND_BILLING_ENDPOINT

export async function sendMagicLink(auth: any) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(auth),
	}

	const res: any = await fetch(`${ACCOUNT_AND_BILLING_ENDPOINT}/send-magic-link/`, options)
	return await res.json()
}

export async function verifyMagickLinkToken(email: string, token: string) {

	const res = await fetch(`${ACCOUNT_AND_BILLING_ENDPOINT}/verify-magic-link-token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			token,
		}),
	})

	const data = await res.json()

	return data.isSignedIn
}
