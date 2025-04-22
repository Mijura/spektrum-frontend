import { createFileRoute, useNavigate } from "@tanstack/react-router"
import LoginPage from "../pages/login-page"
import { getCurrentUser } from "aws-amplify/auth"

export const Route: any = createFileRoute("/")({
	component: async () => {
		const navigate = useNavigate()

		try {
			await getCurrentUser()
			navigate({ to: "/profile" })
		} catch {
			return <LoginPage />
		}
	},
})
