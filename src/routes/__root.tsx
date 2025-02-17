import React from "react"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import Header from "../shared/header"
import LeftSideMenu from "../shared/left-side-menu"

export const Route = createRootRoute({
	component: RootRoute,
})

function RootRoute() {
	return (
		<div className="flex flex-col bg-surface-3 h-screen min-h-screen max-h-screen w-full">
			<div className="h-fit w-full">
				<Header />
			</div>
			<div className="flex flex-row overflow-y-auto">
				<LeftSideMenu />
				<div className="grow pl-[72px] flex">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
