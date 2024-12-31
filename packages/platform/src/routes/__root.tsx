import React from "react"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import Header from "../shared/header"
import LeftSideMenu from "../shared/left-side-menu"

export const Route = createRootRoute({
	component: RootRoute,
})

function RootRoute() {
	return (
		<div className="flex flex-col bg-[#2F2F2F]">
			<Header />
			<div className="h-full w-full flex flex-row">
				<div className="w-[72px]">
					<LeftSideMenu />
				</div>
				<div className="w-full flex items-center justify-center">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
