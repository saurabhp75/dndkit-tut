import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { type MetaFunction } from '@remix-run/node'
import { useState } from 'react'
import { Button } from '#app/components/ui/button.js'
import { Input } from '#app/components/ui/input.js'
import { data } from './data'

type User = {
	id: number
	name: string
}

export const meta: MetaFunction = () => [{ title: 'Sortable List' }]

export default function Index() {
	const [users, setUsers] = useState(data)
	const [inputValue, setInputValue] = useState('')

	function addUser() {
		if (inputValue === '') {
			return
		}
		const newUser = {
			id: +Date.now().toString(),
			name: inputValue,
		}
		setInputValue('')
		setUsers((prev) => [...prev, newUser])
	}

	function onDragEnd(e: DragEndEvent) {
		// console.dir(e)
		const { active, over } = e
		if (!over || active.id === over.id) {
			return
		}
		setUsers((users) => {
			const oldIndex = users.findIndex((user) => user.id === active.id)
			const newIndex = users.findIndex((user) => user.id === over.id)
			// We have used a helper to swap the two entries in the users list
			return arrayMove(users, oldIndex, newIndex)
		})
	}

	return (
		<main className="font-poppins flex h-full flex-col items-center justify-center gap-4">
			<div>Total: {users.length}</div>
			<div className="flex gap-3">
				<Input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<Button size="lg" onClick={addUser}>
					Add user
				</Button>
			</div>
			<div>
				<DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
					<SortableContext items={users} strategy={verticalListSortingStrategy}>
						{users.map((user) => (
							<SortableUser key={user.id} user={user} />
						))}
					</SortableContext>
				</DndContext>
			</div>
		</main>
	)
}

function SortableUser({ user }: { user: User }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: user.id })

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="mb-1 border px-2"
		>
			{user.name}
		</div>
	)
}
