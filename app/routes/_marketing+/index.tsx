import { type MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => [{ title: 'dnd-kit tutorial' }]

export default function Index() {
	return (
		<main className="font-poppins flex h-full flex-col items-center justify-center gap-4">
			<Link to="/sortable">Sortable list</Link>
			<Link to="/kanban">Kanban board</Link>
		</main>
	)
}
