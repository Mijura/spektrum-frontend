import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

export const Route = createRootRoute({
	component: RootRoute,
})

function RootRoute() {
	return (
		<div className="flex flex-col bg-surface-300 h-screen min-h-screen max-h-screen w-full overflow-hidden">
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
		</div>
	)
}
