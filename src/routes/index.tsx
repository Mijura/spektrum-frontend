import { createFileRoute } from "@tanstack/react-router"
import LoginPage from "../pages/login"

export const Route: any = createFileRoute("/")({
	beforeLoad: async ({ search }) => {
		const searchParams = new URLSearchParams(search)
		const onboarding = searchParams.get("onboarding") as string | null
		return { sdkUser: onboarding=="sdk" ? true : false }
	},
	loader: async ({ context }) => {
		return context
	},
	component: () => {
		const data = Route.useLoaderData()
		return <LoginPage sdkUser={data.sdkUser}/>
	},
})
