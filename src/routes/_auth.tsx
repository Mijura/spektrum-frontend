import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import Header from "../components/header"
import LeftSideMenu from "../components/left-side-menu"
import { handleConfirmSignIn } from "../api/account-and-billing"
import { getCurrentUser } from "aws-amplify/auth"

export const Route = createFileRoute("/_auth")({
	beforeLoad: async ({ search }) => {
		console.log("beforeLoad")
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
	pendingComponent: () => <div>Loading...</div>,
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
