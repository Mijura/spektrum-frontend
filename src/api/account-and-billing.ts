import jigjoyClient from "./platform-sdk"

export async function sendMagicLinkChallenge(email: string) {
	return await jigjoyClient.account.sendMagicLinkChallenge(email)
}

export async function verifyMagicLinkChallenge(email: string, challengeResponse: string) {
	return await jigjoyClient.account.verifyMagicLinkChallenge(email, challengeResponse)
}

export async function logout() {
	return await jigjoyClient.account.logout()
}

export async function hasAccessToken(){
	return await jigjoyClient.account.hasAccessToken()
}