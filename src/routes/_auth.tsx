import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router"
import Header from "../components/header"
import LeftSideMenu from "../components/left-side-menu"
import { AuthContext } from "../auth"
import { handleConfirmSignIn } from "../api/account-and-billing"

export const Route = createFileRoute("/_auth")({
	beforeLoad: async ({ search, context }) => {
		const searchParams = new URLSearchParams(search)
		const email = searchParams.get("email")
		const token = searchParams.get("token")
		let isAuthenticated = false
		if (email && token) {
			try {
				const challengeResponse = await handleConfirmSignIn(email, token)
				if (challengeResponse) {
					isAuthenticated = true
				}
			} catch (error: any) {
				switch (error.name) {
					case "UserAlreadyAuthenticatedException":
						isAuthenticated = true
					default:
						console.error(error)
				}
			}
		}

		let authContext = context as AuthContext
		console.log(authContext)
		if (!authContext.isAuthenticated) {
			throw redirect({
				to: "/",
			})
		}
	},
	component: AuthLayout,
})

function AuthLayout() {
	return (
		<div className="flex flex-col bg-surface-300 h-screen min-h-screen max-h-screen w-full overflow-hidden">
			<div className="h-fit w-full">
				<Header />
			</div>
			<div className="grow flex flex-row overflow-y-auto">
				<LeftSideMenu />
				<div className="grow pl-[72px] flex">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
