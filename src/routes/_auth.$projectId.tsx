import { createFileRoute } from '@tanstack/react-router'
import { Loader } from '@honeycomb-app/design'
import { fetchProject } from '../api/project'
import { useDispatch } from 'react-redux'
import { projectUpdated } from '../reducers/project-reducer'
import { PostError } from '../shared/errors/post-error'
import { useEffect } from 'react'
import WorkspacePage from '../pages/workspace-page'

export const Route: any = createFileRoute('/_auth/$projectId')({
  loader: async ({ params: { projectId } }) => {
    try {
      return await fetchProject(projectId)
    } catch (error) {
      throw error
    }
  },
  errorComponent: PostError,
  pendingComponent: PendingComponent,
  component: WorkspaceComponent,
})

function PendingComponent() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader message="Project loading" />
    </div>
  )
}

function WorkspaceComponent() {
  const project = Route.useLoaderData()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      projectUpdated({
        ...project,
        chatHistory: [
          {
            id: 1,
            role: 'system',
            content: `I'm here to help you create your app! Give me instructions, and I will start creating.`,
          },
        ],
      }),
    )
  }, [])

  return <WorkspacePage />
}
