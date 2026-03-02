// src/routes/_auth-fullscreen.tsx
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { hasAccessToken, verifyMagicLinkChallenge } from "../api/account-and-billing"
import { Loader } from "@jigjoy-ai/ui-library"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUserData } from "../reducers/account-reducer"

export const Route = createFileRoute("/_auth-fullscreen")({
	beforeLoad: async ({ search }) => {
		const searchParams = new URLSearchParams(search)
		const email = searchParams.get("email") as string | null
		const challengeResponse = searchParams.get("token") as string | null

		if (email !== null && challengeResponse !== null) {
			try {
				const authSession = await verifyMagicLinkChallenge(email, challengeResponse)
				return authSession
			} catch (error: any) {
				console.error(error)
				throw redirect({
					to: "/",
				})
			}
		}
		return null
	},

	loader: async ({ context }) => {
		const hasAccess = await hasAccessToken()
		if (!hasAccess) {
			throw redirect({
				to: "/",
			})
		}
		return context
	},

	pendingComponent: () => (
		<div className="w-screen h-screen bg-surface flex items-center justify-center">
			<Loader size="large" message="Loading page..." />
		</div>
	),
	component: AuthFullscreenLayout,
})

function AuthFullscreenLayout() {
	const dispatch = useDispatch()
	const authSession = Route.useLoaderData()

	useEffect(() => {
		if (authSession && authSession.userData) {
			dispatch(setUserData(authSession.userData))
		}
	}, [authSession])

	return (
		<div className="flex flex-col bg-[#1a1a1a] h-screen min-h-screen max-h-screen w-full overflow-hidden">
			<Outlet />
		</div>
	)
}