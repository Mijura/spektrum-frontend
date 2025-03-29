export const ACCOUNT_AND_BILLING_ENDPOINT = process.env.ACCOUNT_AND_BILLING_ENDPOINT

import { signIn, confirmSignIn } from "aws-amplify/auth"

export async function createSingInChallenge(auth: any) {
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

export const handleConfirmSignIn = async (email: string, challengeResponse: string) => {
	const { nextStep } = await signIn({
		username: email,
		options: {
			authFlowType: "CUSTOM_WITHOUT_SRP",
		},
	})

	if (nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE") {
		// to send the answer of the custom challenge
		const output = await confirmSignIn({ challengeResponse })
		return output.isSignedIn
	} else {
		return false
	}
}
