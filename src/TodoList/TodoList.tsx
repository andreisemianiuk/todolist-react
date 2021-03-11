import React from 'react'
import { FilterType, TaskType } from '../App'
import TodoListTask from '../TodoListTask/TodoListTask'
import styles from './TodoList.module.css'
import { AddItemForm } from '../AddItemForm/AddItemForm'

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
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  
  const deleteTodolist = () => {
    props.deleteTodolist(props.id)
  }
  
  const showAllTasks = () => props.changeFilter('all', props.id)
  const showActiveTasks = () => props.changeFilter('active', props.id)
  const showCompletedTasks = () => props.changeFilter('completed', props.id)
  
  return (
    <div>
      <h3 className={styles.title}>{props.title}
        <button className={styles.titleBtn} onClick={deleteTodolist}>x</button>
      </h3>
      
      <AddItemForm addItem={addTask}/>
      
      <div className={styles.filterBtns}>
        <button className={`${styles.btn} ${props.filter === 'all' ? styles.selected : ''}`} onClick={showAllTasks}>All
        </button>
        <button className={`${styles.btn} ${props.filter === 'active' ? styles.selected : ''}`}
                onClick={showActiveTasks}>Active
        </button>
        <button className={`${styles.btn} ${props.filter === 'completed' ? styles.selected : ''}`}
                onClick={showCompletedTasks}>Completed
        </button>
      </div>
      <ul>
        
        {props.tasks && props.tasks.map(v => <TodoListTask key={v.id} id={v.id} todolistId={props.id} title={v.title} isDone={v.isDone}
                                            removeTask={props.removeTask}
                                            changeChecked={props.changeChecked}
        />)}
      </ul>
    
    </div>
  )
}

export default TodoList