import { ErrorComponent, ErrorComponentProps } from "@tanstack/react-router"
import React from "react"
import { ProjectNotFoundError } from "./project-not-found-error"
import { ProjectNotFound } from "./project-not-found"

export function PostError({ error }: ErrorComponentProps) {
	if (error instanceof ProjectNotFoundError) {
		return <ProjectNotFound />
	} else {
		return <ErrorComponent error={error} />
	}
}
