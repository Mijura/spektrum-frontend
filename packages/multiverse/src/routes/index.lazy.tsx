import { createLazyFileRoute } from "@tanstack/react-router"
import Editor from "../pages/editor/editor"

export const Route: any = createLazyFileRoute("/" as never)({
	component: Editor,
})
