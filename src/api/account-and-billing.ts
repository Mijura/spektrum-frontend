import spektrumClient from "./spektrum-client"

export async function sendMagicLinkChallenge(email: string) {
	return await spektrumClient.account.sendMagicLinkChallenge(email)
}

export async function verifyMagicLinkChallenge(email: string, challengeResponse: string) {
	return await spektrumClient.account.verifyMagicLinkChallenge(email, challengeResponse)
}

export async function createApiKey(accountId: string, name: string) {
	return await spektrumClient.account.createApiKey(accountId, name)
}

export async function logout() {
	return await spektrumClient.account.logout()
}

export async function hasAccessToken(){
	return await spektrumClient.account.hasAccessToken()
}