import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import LeftSideMenu from "../components/left-side-menu"
import { verifyMagicLinkChallenge } from "../api/account-and-billing"
import { getCurrentUser } from "../api/account-and-billing"
import { Loader } from "@jigjoy-io/ui-library"

export const Route = createFileRoute("/_auth")({
	beforeLoad: async ({ search }) => {
		const searchParams = new URLSearchParams(search)
		const email = searchParams.get("email") as string | null
		const challengeResponse = searchParams.get("token") as string | null

		if (email !== null && challengeResponse !== null) {
			try {
				await verifyMagicLinkChallenge(email, challengeResponse)
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
			<Loader size="large" message="Loading page..." />
		</div>
	),
	component: AuthLayout,
})

function AuthLayout() {
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
