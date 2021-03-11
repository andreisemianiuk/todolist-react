import React, { ChangeEvent, useState } from 'react'
import s from './EditableSpan.module.css'
import { Simulate } from 'react-dom/test-utils'

type EditableSpanType = {
  title: string
}
export const EditableSpan = ({title}: EditableSpanType) => {
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState('')
  
  const editModeHandler = () => {
    setEditMode(true)
  }
  
  const editTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    setEditMode(false)
  }
  
  return (
   <>
     {editMode ? <input value={value} onBlur={editTitle}/> : <span onDoubleClick={editModeHandler} className={s.text}>{title}</span>}
   </>
  )
}

// export default EditableSpan
