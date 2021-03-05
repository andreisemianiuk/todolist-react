import React, { ChangeEvent } from 'react'
import styles from './TodoListTask.module.css'

type TodoListTaskPropsType = {
  todolistId: string
  title: string
  key: string
  id: string
  isDone: boolean
  removeTask: (id: string, todolistId: string) => void
  changeChecked: (id: string, isDone: boolean, todolistId: string) => void
}

function TodoListTask(props: TodoListTaskPropsType) {

  const onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeChecked(props.id, e.currentTarget.checked, props.todolistId)
  }

  const removeTask = () => {
    props.removeTask(props.id, props.todolistId)
  }

  const taskCompleted = props.isDone ? styles.selected : ''

  return (
    <li key={props.key}>
			<span className={styles.item}>
				<input type="checkbox" onChange={onCheckedHandler} checked={props.isDone}/>
				<span className={`${styles.text} ${taskCompleted}`}>{props.title}</span>
				<button className={styles.delete} onClick={removeTask}>x</button>
			</span>
    </li>
  )
}

export default TodoListTask