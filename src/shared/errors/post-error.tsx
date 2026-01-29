import { ErrorComponent, ErrorComponentProps } from "@tanstack/react-router"
import { ProjectNotFoundError } from "@jigjoy-io/platform-sdk"
import { ProjectNotFound } from "./project-not-found"

export function PostError({ error }: ErrorComponentProps) {
	if (error instanceof ProjectNotFoundError) {
		return <ProjectNotFound />
	} else {
		return <ErrorComponent error={error} />
	}
}
