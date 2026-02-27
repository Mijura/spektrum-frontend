import { Pagination } from "@jigjoy-ai/spektrum-client"
import spektrumClient from "./spektrum-client"

export async function sendMagicLinkChallenge(email: string) {
	return await spektrumClient.account.sendMagicLinkChallenge(email)
}

export async function verifyMagicLinkChallenge(email: string, challengeResponse: string) {
	return await spektrumClient.account.verifyMagicLinkChallenge(email, challengeResponse)
}

export async function getTransactionHistory(pagination: Pagination) {
	return await spektrumClient.account.getTransactionHistory(pagination)
}

export async function createApiKey(name: string) {
	return await spektrumClient.account.createApiKey(name)
}

export async function logout() {
	return await spektrumClient.account.logout()
}

export async function hasAccessToken() {
	return await spektrumClient.account.hasAccessToken()
}

export async function downloadInvoicePdf(transactionId: string): Promise<Blob> {
	return await spektrumClient.account.downloadInvoicePdf(transactionId)
}
