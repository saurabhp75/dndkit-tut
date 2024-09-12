import { type MetaFunction } from '@remix-run/node'
import { useState } from 'react'
import { Button } from '#app/components/ui/button.js'
import { Input } from '#app/components/ui/input.js'
import { data } from './data'

export const meta: MetaFunction = () => [{ title: 'Epic Notes' }]

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
	return (
		<main className="font-poppins flex flex-col gap-4 h-full justify-center items-center">
			<div>Total: {users.length}</div>
			<div className="flex gap-3">
				<Input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<Button onClick={addUser}>Add user</Button>
			</div>
			<div>
				{users.map((user) => (
					<div className="mb-1 border px-2" key={user.id}>
						{user.name}
					</div>
				))}
			</div>
		</main>
	)
}
