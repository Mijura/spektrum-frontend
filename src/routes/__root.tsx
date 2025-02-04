import React from "react"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import Header from "../shared/header"
import LeftSideMenu from "../shared/left-side-menu"

export const Route = createRootRoute({
	component: RootRoute,
})

function RootRoute() {
	return (
		<div className="flex flex-col bg-surface-3 h-[100dvh] min-h-[100dvh] max-h-[100dvh] w-full">
			<div className="h-fit w-full">
				<Header />
			</div>
			<div className="grow flex flex-row">
				<LeftSideMenu />
				<div className="grow pl-[72px]">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
