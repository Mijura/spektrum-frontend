import { createFileRoute } from '@tanstack/react-router'
import PricingPage from '../pages/pricing-page'

export const Route = createFileRoute('/_auth/pricing')({
  component: PricingPage,
})
