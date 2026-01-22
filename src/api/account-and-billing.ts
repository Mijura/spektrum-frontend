export const ACCOUNT_AND_BILLING_ENDPOINT = process.env.ACCOUNT_AND_BILLING_ENDPOINT

import { signIn, confirmSignIn } from "aws-amplify/auth"

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

export async function verifyMagicLink(email: string, challengeResponse: string) {

	const res = await fetch(`${ACCOUNT_AND_BILLING_ENDPOINT}/verify-magic-link`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			challengeResponse,
		}),
	})

	const data = await res.json()

	return data.isSignedIn
}
