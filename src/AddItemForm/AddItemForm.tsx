import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import styles from './AddItemForm.module.css'

type AddItemFormType = {
  addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  
  const addItem = () => {
    if (title.trim()) {
      props.addItem(title)
      setTitle('')
    } else {
      setError('Title is required!')
      setTitle('')
    }
  }
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }
  
  return (
    <div>
      <input
        className={error ? styles.error : ''}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      <button className={styles.addBtn} onClick={addItem}>Add</button>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  )
}