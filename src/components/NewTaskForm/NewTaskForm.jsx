import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

const NewTaskForm = function NewTaskForm({ onAdded }) {
  NewTaskForm.propTypes = {
    onAdded: PropTypes.func,
  }

  NewTaskForm.defaultProps = {
    onAdded: () => {},
  }

  const [ label, setLabel ] = useState('')
  const [ min, setMin ] = useState('')
  const [ sec, setSec ] = useState('')

  const onLabelChange = (event) => {
    setLabel(event.target.value)
  }

  const onMinChange = (event) => {
    setMin(event.target.value)
  }

  const onSecChange = (event) => {
    setSec(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const minute = min === '' ? 0 : min
    const second = sec === '' ? 0 : sec

    if (sec >= 60) {
      return
    }

    
    onAdded(label, minute, second)
    setLabel('')
    setMin('')
    setSec('')
  }

  return (
    <form onSubmit={onSubmit} className="newtask-form">
      <input
        type="text"
        name="inputText"
        className="newtask"
        onChange={onLabelChange}
        placeholder="What needs to be done?"
        value={label}
        autoFocus
      />
      <input 
        type="number"
        name="minutes"
        onChange={onMinChange}
        className="newtask-form__timer" 
        placeholder="Min" 
        value={min}
        min="0"
      />
      <input 
        type="number"
        name="seconds"
        onChange={onSecChange}
        className="newtask-form__timer" 
        placeholder="Sec" 
        value={sec}
        min="0"
        max="59"
      />
      <input 
        type="submit" 
        className="submit-form"
        value="add"
        onClick={onSubmit} /> 
    </form>
  )
}

export default NewTaskForm
