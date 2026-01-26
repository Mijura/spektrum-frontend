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

export const API_GATEWAY = process.env.API_GATEWAY as string
export const protectedApi = axios.create({ baseURL: API_GATEWAY })

protectedApi.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const api = axios.create({ baseURL: API_GATEWAY })

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