import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterType, TaskType } from '../App'
import TodoListTask from '../TodoListTask/TodoListTask'
import styles from './TodoList.module.css'

type TodoListPropsType = {
  id: string
  title: string
  filter: string
  tasks: TaskType[]
  addTask: (title: string, todolistId: string) => void
  removeTask: (taskId: string, todolistId: string) => void
  changeChecked: (id: string, isDone: boolean, todolistId: string) => void
  changeFilter: (value: FilterType, todolistId: string) => void
  deleteTodolist: (todolistId: string) => void
}

function TodoList(props: TodoListPropsType) {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  
  const addTask = () => {
    if (title.trim()) {
      props.addTask(title, props.id)
      setTitle('')
    } else {
      setError('Title is required!')
      setTitle('')
    }
  }
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setError('')
    setTitle(value)
  }
  
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }
  
  const onClickHandler = () => {
    addTask()
  }
  
  const deleteTodolist = () => {
    props.deleteTodolist(props.id)
  }
  
  const showAllTasks = () => props.changeFilter('all', props.id)
  const showActiveTasks = () => props.changeFilter('active', props.id)
  const showCompletedTasks = () => props.changeFilter('completed', props.id)
  
  return (
    <div>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{props.title}</h3>
        <button className={styles.titleBtn} onClick={deleteTodolist}>x</button>
      </div>
      <div className={styles.inputWrapper}>
        <input
          className={error ? styles.error : ''}
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button className={styles.addBtn} onClick={onClickHandler}>Add</button>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
      <ul>
        {props.tasks.map(v => <TodoListTask key={v.id} id={v.id} todolistId={props.id} title={v.title} isDone={v.isDone}
                                            removeTask={props.removeTask}
                                            changeChecked={props.changeChecked}
        />)}
      </ul>
      <button className={`${styles.btn} ${props.filter === 'all' ? styles.selected : ''}`} onClick={showAllTasks}>All
      </button>
      <button className={`${styles.btn} ${props.filter === 'active' ? styles.selected : ''}`}
              onClick={showActiveTasks}>Active
      </button>
      <button className={`${styles.btn} ${props.filter === 'completed' ? styles.selected : ''}`}
              onClick={showCompletedTasks}>Completed
      </button>
    </div>
  )
}

export default TodoList