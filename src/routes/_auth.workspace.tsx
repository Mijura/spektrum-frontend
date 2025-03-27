import { createFileRoute } from '@tanstack/react-router'
import WorkspacePage from '../pages/workspace-page'

export const Route: any = createFileRoute('/_auth/workspace')({
  component: WorkspacePage,
})
