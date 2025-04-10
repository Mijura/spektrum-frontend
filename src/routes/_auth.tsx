import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import Header from "../components/header"
import LeftSideMenu from "../components/left-side-menu"
import { handleConfirmSignIn } from "../api/account-and-billing"
import { getCurrentUser } from "aws-amplify/auth"
import { Loader } from "@honeycomb-app/design"
import { useEffect } from "react"
import { useJigJoy } from "@honeycomb-app/jigjoy-react-sdk"

export const Route = createFileRoute("/_auth")({
	beforeLoad: async ({ search }) => {
		const searchParams = new URLSearchParams(search)
		const email = searchParams.get("email") as string | null
		const token = searchParams.get("token") as string | null

		if (email !== null && token !== null) {
			try {
				await handleConfirmSignIn(email, token)
			} catch (error: any) {
				console.error(error)
			}
		}

		try {
			await getCurrentUser()
		} catch (error: any) {
			throw redirect({
				to: "/",
			})
		}
	},
	pendingComponent: () => (
		<div className="w-screen h-screen bg-surface flex items-center justify-center">
			<Loader size="medium" message="Loading page..." />
		</div>
	),
	component: AuthLayout,
})

function AuthLayout() {
	const { setPlayer } = useJigJoy()

	const setupPlayer = async () => {
		const user = await getCurrentUser()
		setPlayer(user.userId)
	}

	useEffect(() => {
		setupPlayer()
	}, [])

	return (
		<div className="flex flex-col bg-surface-light h-screen min-h-screen max-h-screen w-full overflow-hidden">
			<div className="h-fit w-full">
				<Header />
			</div>
			<div className="grow flex flex-row">
				<LeftSideMenu />
				<div className="grow pl-[72px] flex">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
