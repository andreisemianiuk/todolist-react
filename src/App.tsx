import React, { useState } from 'react'
import './App.css'
import TodoList from './TodoList/TodoList'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm/AddItemForm'

export type TaskType = {
  title: string
  id: string
  isDone: boolean
}

export type TasksListType = {
  [key: string]: TaskType[]
}

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistsType = {
  id: string
  title: string
  filter: FilterType
}

function App() {
  const TodoListId_1 = v1()
  const TodoListId_2 = v1()
  
  let [todolists, setTodolists] = useState<TodolistsType[]>([
    {
      id: TodoListId_1,
      title: 'What to learn',
      filter: 'all',
    },
    {
      id: TodoListId_2,
      title: 'What to buy',
      filter: 'all',
    },
  ])
  
  let [tasks, setTasks] = useState<TasksListType>({
    [TodoListId_1]: [
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'JS', isDone: false},
    ],
    [TodoListId_2]: [
      {id: v1(), title: 'Chair', isDone: false},
      {id: v1(), title: 'Table', isDone: false},
      {id: v1(), title: 'Computer', isDone: false},
    ],
  })
  
  const addTask = (title: string, todolistId: string) => {
    const task = {
      id: v1(),
      title: title,
      isDone: false,
    }
    tasks[todolistId] = [task, ...tasks[todolistId]]
    setTasks({...tasks})
  }
  const addTodolist = (title: string) => {
    const TodoListId = v1()
    const todolist: TodolistsType = {
      id: TodoListId,
      title: title,
      filter: 'all',
    }
    setTodolists([todolist, ...todolists])
    tasks[TodoListId] = []
    setTasks({...tasks})
  }
  
  const removeTask = (todoId: string, todolistId: string) => {
    tasks[todolistId] = tasks[todolistId].filter(v => v.id !== todoId)
    setTasks({...tasks})
  }
  
  const changeChecked = (todoId: string, isDone: boolean, todolistId: string) => {
    let task = tasks[todolistId].find(v => v.id === todoId)
    if (task) {
      task.isDone = isDone
      setTasks({...tasks})
    }
  }
  
  const changeFilter = (value: FilterType, todolistId: string) => {
    let todolist = todolists.find(v => v.id === todolistId)
    if (todolist) {
      todolist.filter = value
    }
    setTodolists([...todolists])
  }
  
  const deleteTodolist = (todolistId: string) => {
    todolists = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(todolists)
    delete tasks[todolistId]
    setTasks({...tasks})
  }
  
  const changeTitle = (todolistId: string,taskId: string, newTitle: string) => {
    const targetTask = tasks[todolistId].find(t => t.id === taskId)
    if (targetTask) {
      targetTask.title = newTitle
    }
  }
  
  return (
    <div className='App'>
      <AddItemForm addItem={addTodolist}/>
      {todolists.map(tl => {
          let allTodolistsTasks = tasks[tl.id]
          let tasksForTodoList = allTodolistsTasks
          
          switch (tl.filter) {
            case 'active':
              tasksForTodoList = allTodolistsTasks.filter(t => !t.isDone)
              break
            case 'completed':
              tasksForTodoList = allTodolistsTasks.filter(t => t.isDone)
          }
          return <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            filter={tl.filter}
            addTask={addTask}
            removeTask={removeTask}
            changeChecked={changeChecked}
            changeFilter={changeFilter}
            deleteTodolist={deleteTodolist}
          />
        },
      )}
    </div>
  )
}

export default App
