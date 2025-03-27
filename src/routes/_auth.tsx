import { createFileRoute, Outlet } from "@tanstack/react-router"
import Header from "../components/header"
import LeftSideMenu from "../components/left-side-menu"

export const Route = createFileRoute("/_auth")({
	component: AuthLayout,
})

function AuthLayout() {
	return (
		<div>
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
