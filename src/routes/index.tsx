import { createFileRoute, redirect } from "@tanstack/react-router"
import LoginPage from "../pages/login-page"
import { getCurrentUser } from "../api/account-and-billing"

export const Route: any = createFileRoute("/")({
	beforeLoad: async () => {
		try {
			await getCurrentUser()
			throw redirect({
				to: "/home",
			})
		} catch (error: any) {
			// If it's a redirect, re-throw it
			if (error?.status === 301 || error?.status === 302) {
				throw error
			}
			// Otherwise, it's an auth error, allow the route to render login page
			return
		}
	},
	component: () => {
		return <LoginPage />
	},
})
