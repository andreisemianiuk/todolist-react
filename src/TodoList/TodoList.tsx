import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterType, TaskType } from '../App'
import TodoListTask from '../TodoListTask/TodoListTask'
// import styles from './TodoList.module.css'

type TodoListPropsType = {
	title: string
	tasks: TaskType[]
	addTask: (title: string) => void
	removeTask: (taskId: string) => void
	changeChecked: (id: string, isDone: boolean) => void
	changeFilter: (value: FilterType) => void
}

function TodoList(props: TodoListPropsType) {
	const [title, setTitle] = useState<string>('')

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value
		setTitle(value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			props.addTask(title)
			setTitle('')
		}
	}

	const onClickHandler = () => {
		props.addTask(title)
		setTitle('')
	}

	const showAllTasks = () => props.changeFilter('all')
	const showActiveTasks = () => props.changeFilter('active')
	const showCompletedTasks = () => props.changeFilter('completed')

	return (
		<div>
			<h3>What to {props.title}</h3>
			<div>
				<input value={title}
					onChange={onChangeHandler}
					onKeyPress={onKeyPressHandler}
				/>
				<button onClick={onClickHandler}>Add</button>
			</div>
			<ul>
				{props.tasks.map(v => <TodoListTask key={v.id} id={v.id} title={v.title}
					removeTask={props.removeTask}
					changeChecked={props.changeChecked}
				/>)}
			</ul>
			<button onClick={showAllTasks}>All</button>
			<button onClick={showActiveTasks}>Active</button>
			<button onClick={showCompletedTasks}>Completed</button>
		</div>
	)
}

export default TodoList