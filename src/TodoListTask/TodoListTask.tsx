import React from 'react'
// import { FilterType, TaskType } from '../App'
import styles from './TodoListTask.module.css'

type TodoListTaskPropsType = {
	title: string
	key: string
	id: string
	removeTask: (id: string) => void
	changeChecked: (id: string, isDone: boolean) => void
}

function TodoListTask(props: TodoListTaskPropsType) {
	console.log('task rendered');
	const onCheckedHandler = (e: any) => {
		props.changeChecked(props.id, e.currentTarget.checked)
	}

	const removeTask = () => {
		props.removeTask(props.id)
	}

	return (
		<li key={props.key}>
			<span className={styles.item}>
				<input type="checkbox" onChange={onCheckedHandler} />
				<span>{props.title}</span>
				<button onClick={removeTask}>X</button>
			</span>
		</li>
	)
}

export default TodoListTask