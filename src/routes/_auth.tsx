import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import LeftSideMenu from "../components/left-side-menu"
import { getAccessToken, setAccessToken, verifyMagicLinkChallenge } from "../api/account-and-billing"
import { Loader } from "@jigjoy-io/ui-library"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUserData } from "../reducers/account-reducer"

export const Route = createFileRoute("/_auth")({
	beforeLoad: async ({ search }) => {
		const searchParams = new URLSearchParams(search)
		const email = searchParams.get("email") as string | null
		const challengeResponse = searchParams.get("token") as string | null

		if (email !== null && challengeResponse !== null) {
			try {
				const authSession = await verifyMagicLinkChallenge(email, challengeResponse)
				setAccessToken(authSession.accessToken)
				return authSession
			} catch (error: any) {
				console.error(error)
				return null
			}
		}
		return null
	},

	loader: async ( {context} ) => {
		const accessToken = getAccessToken()
		if (!accessToken) {
			throw redirect({
				to: "/",
			})
		}
		return { userData: context.userData }
	},
	
	pendingComponent: () => (
		<div className="w-screen h-screen bg-surface flex items-center justify-center">
			<Loader size="large" message="Loading page..." />
		</div>
	),
	component: AuthLayout,
})

function AuthLayout() {
	const dispatch = useDispatch()

	const data = Route.useLoaderData()

	useEffect(() => {
		if (data.userData) {
			dispatch(setUserData(data.userData))
		}
	}, [data])
	
	return (
		<div className="flex flex-col bg-[#1a1a1a] h-screen min-h-screen max-h-screen w-full overflow-hidden">
			<div className="grow flex flex-row">
				<LeftSideMenu />
				<div className="grow pl-[60px] flex">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
