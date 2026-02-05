import { createFileRoute } from "@tanstack/react-router"
import ApiKeysPage from "../pages/api-keys-page"

export const Route = createFileRoute("/_auth/api-keys")({
	component: ApiKeysPage,
})
