import { AccountAndBillingClient } from "@jigjoy-io/account-and-billing-client"
export const API_GATEWAY = process.env.API_GATEWAY as string

const accountAndBillingClient = new AccountAndBillingClient(`${API_GATEWAY}`)

export async function sendMagicLinkChallenge(email: string) {
	return await accountAndBillingClient.sendMagicLinkChallenge(email)
}

export async function verifyMagicLinkChallenge(email: string, challengeResponse: string) {
	return await accountAndBillingClient.verifyMagicLinkChallenge(email, challengeResponse)
}

export async function logout() {
	return await accountAndBillingClient.logout()
}

export async function hasAccessToken(){
	return await accountAndBillingClient.hasAccessToken()
}