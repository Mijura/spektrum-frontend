export const ACCOUNT_AND_BILLING_ENDPOINT = process.env.ACCOUNT_AND_BILLING_ENDPOINT


import axios from "axios"
let accessToken: string | null = null

export function setAccessToken(token: string) {
  accessToken = token
  localStorage.setItem("accessToken", token)
}

export function getAccessToken() {
  return accessToken ?? localStorage.getItem("accessToken")
}

export function clearAccessToken() {
  accessToken = null;
  localStorage.removeItem("accessToken")
}

export const protectedApi = axios.create({ baseURL: ACCOUNT_AND_BILLING_ENDPOINT })

protectedApi.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const api = axios.create({ baseURL: ACCOUNT_AND_BILLING_ENDPOINT })

export async function sendMagicLinkChallenge(email: string) {
	const res: any = await api.post(`/auth/challenge/magic-link`, { email: email })
	return res.data
}

export async function verifyMagicLinkChallenge(email: string, challengeResponse: string) {
	const res: any = await api.post(`/auth/challenge/magic-link/verify`, { email: email, challenge: challengeResponse })
	return res.data.accessToken

}


export async function getCurrentUser() {
	const res: any = await protectedApi.get(`/auth/current-user`)
	return res.data.userData
}