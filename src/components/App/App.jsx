import React, { useState, useRef } from 'react'
import { parse } from 'date-fns'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import './App.css'

const App = function App() {
  const key = useRef(0)
  const id = useRef(0)

  const createTodoItem = (label, min = 0, sec = 0) => {
    const parseTime = parse(`${min}:${sec}`, 'mm:ss', new Date())

    key.current += 1
    id.current += 1

    return {
      label,
      edit: false,
      completed: false,
      key: key.current,
      id: id.current,
      dateCreated: new Date(),
      timeLeft: parseTime,
    }
  }

  const [todoData, setTodoData] = useState([createTodoItem('row row'), createTodoItem('fight'), createTodoItem('the power')])
  const [filter, setFilter] = useState('all')

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

    setTodoData(newArray)
  }

  const deleteCompletedItem = () => {
    setTodoData( todoData.filter((el) => !el.completed) )
  }

  const addItem = (text, min, sec) => {
    if (text.trim() !== '' && (min || sec)) {
      setTodoData( [...todoData, createTodoItem(text, min, sec)] )
    }
  }

  const toggleItem = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const editItem = (id) => {
    setTodoData(toggleItem(todoData, id, 'edit'))
  }

  const completedItem = (id) => {
    setTodoData(toggleItem(todoData, id, 'completed'))
  }

  const editForm = (id, text) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newItem = { ...oldItem, label: text, edit: !oldItem.edit  }

    setTodoData( [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)] )
  }

  const filterItems = (items, filter) => {
    if (filter === 'all') {
      return items
    } else if (filter === 'active') {
      return items.filter((el) => !el.completed)
    } else if (filter === 'completed') {
      return items.filter((el) => el.completed)
    }
  }

  const onFilterChange = (filter) => {
    setFilter( filter )
  }

  const completedCount = todoData.filter((el) => !el.completed).length
  const visibleItems = filterItems(todoData, filter)

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
      </header>
      <NewTaskForm onAdded={addItem} />
      <TaskList
        todos={visibleItems}
        onDeleted={deleteItem}
        onEdit={editItem}
        onCompleted={completedItem}
        onEditForm={editForm}
      />
      <Footer
        completed={completedCount}
        filter={filter}
        onFilter={onFilterChange}
        onCompletedDeleted={deleteCompletedItem}
      />
    </section>
  )
}

export default App
