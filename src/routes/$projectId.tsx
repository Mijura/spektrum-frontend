import { createFileRoute } from "@tanstack/react-router"
import Editor from "../pages/editor/editor"
import { Loader } from "@jigjoy-io/ui"
import React, { useEffect } from "react"
import { PostError } from "../util/errors/post-error"
import { fetchProject } from "../api/project"
import { useDispatch } from "react-redux"
import { projectUpdated } from "../reducers/editor-reducer"

export const Route: any = createFileRoute("/$projectId" as never)({
	loader: async ({ params: { projectId } }) => {
		try {
			return await fetchProject(projectId)
		} catch (error) {
			throw error
		}
	},
	errorComponent: PostError,
	pendingComponent: PendingComponent,
	component: EditorComponent,
})

function PendingComponent() {
	return <Loader message="Project loading" />
}

function EditorComponent() {
	const project = Route.useLoaderData()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(
			projectUpdated({
				...project,
				chatHistory: [
					{
						id: 1,
						role: "system",
						content: `I'm here to help you create your app! Give me instructions, and I will start creating.`,
					},
				],
			}),
		)
	}, [])

	return <Editor />
}
