import React, { useState } from 'react'
import './App.css'
import TodoList from './TodoList/TodoList'
import { v1 } from 'uuid'

export type TaskType = {
	title: string
	id: string
	isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

const state: TaskType[] = [
]

function App() {
	let [tasks, setTasks] = useState<TaskType[]>(state)

	const addTask = (title: string) => {
		let task = {
			id: v1(),
			title: title,
			isDone: false
		}
		setTasks([task, ...tasks])
	}

	const removeTask = (todoId: string) => {
		tasks = tasks.filter(v => v.id !== todoId)
		setTasks(tasks)
	}

	const changeChecked = (todoId: string, isDone: boolean) => {
		let task = tasks.find(v => v.id === todoId)
		if (task) {
			task.isDone = isDone
		}
		setTasks([...tasks])
	}

	let [filter, setFilter] = useState<FilterType>('all')
	let tasksForTodoList = tasks

	switch (filter) {
		case 'active':
			tasksForTodoList = tasks.filter(t => !t.isDone)
			break
		case 'completed':
			tasksForTodoList = tasks.filter(t => t.isDone)
	}

	const changeFilter = (value: FilterType) => {
		setFilter(value)
	}

	return (
		<div className='App'>
			<TodoList title={'learn'}
				tasks={tasksForTodoList}
				addTask={addTask}
				removeTask={removeTask}
				changeChecked={changeChecked}
				changeFilter={changeFilter}
			/>
		</div>
	)
}

export default App
