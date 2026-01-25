export const ACCOUNT_AND_BILLING_ENDPOINT = process.env.ACCOUNT_AND_BILLING_ENDPOINT


import axios from "axios"

export const setAccessToken = (token: string) => {
	sessionStorage.setItem("accessToken", token)
  }
  
export const getAccessToken = () => {
	return sessionStorage.getItem("accessToken")
}
  
export const clearAccessToken = () => {
	sessionStorage.removeItem("accessToken")
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

	const options = {
		email: email,
		challenge: challengeResponse
	}

	const res: any = await api.post(`/auth/challenge/magic-link/verify`, options)
	return res.data

}