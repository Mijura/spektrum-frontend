import React from "react"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import Header from "../shared/header"
import LeftSideMenu from "../shared/left-side-menu"

export const Route = createRootRoute({
	component: RootRoute,
})

function RootRoute() {
	return (
		<div className="flex flex-col bg-[#2F2F2F] h-full min-h-screen w-full">
			<div className="flex z=50 h-fit w-full">
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
