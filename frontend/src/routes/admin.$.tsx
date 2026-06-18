import { createFileRoute } from '@tanstack/react-router'
import AdminApp from '../admin/App'
import '../admin/index.css'

export const Route = createFileRoute('/admin/$')({
  component: () => <AdminApp />
})
