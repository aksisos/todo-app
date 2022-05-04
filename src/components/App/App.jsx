import React, { Component } from 'react'
import { parse } from 'date-fns'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import './App.css'

export default class App extends Component {
  key = 0
  id = 0

  state = {
    todoData: [this.createTodoItem('row row'), this.createTodoItem('fight'), this.createTodoItem('the power')],
    filter: 'all',
  }

  createTodoItem(label, min = 0, sec = 0) {

    const parseTime = parse(`${min}:${sec}`, 'mm:ss', new Date())

    return {
      label,
      edit: false,
      completed: false,
      key: this.key++,
      id: this.id++,
      dateCreated: new Date(),
      timeLeft: parseTime,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return { todoData: newArray }
    })
  }

  deleteCompletedItem = () => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter((el) => !el.completed) }
    })
  }

  addItem = (text, min, sec) => {
    if (text.trim() !== '' && (min || sec)) {
      this.setState(({ todoData }) => {
        const newArray = [...todoData, this.createTodoItem(text, min, sec)]
        return { todoData: newArray }
      })
    }
  }

  toggleItem(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  editItem = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleItem(todoData, id, 'edit'),
      }
    })
  }

  completedItem = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleItem(todoData, id, 'completed'),
      }
    })
  }

  editForm = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = { ...oldItem, label: text }

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return { todoData: newArray }
    })
  }

  filterItems(items, filter) {
    if (filter === 'all') {
      return items
    } else if (filter === 'active') {
      return items.filter((el) => !el.completed)
    } else if (filter === 'completed') {
      return items.filter((el) => el.completed)
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  render() {
    const { todoData, filter } = this.state

    const completedCount = todoData.filter((el) => !el.completed).length
    const visibleItems = this.filterItems(todoData, filter)

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
        </header>
        <NewTaskForm onAdded={this.addItem} />
        <TaskList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onEdit={this.editItem}
          onCompleted={this.completedItem}
          onEditForm={this.editForm}
        />
        <Footer
          completed={completedCount}
          filter={filter}
          onFilter={this.onFilterChange}
          onCompletedDeleted={this.deleteCompletedItem}
        />
      </section>
    )
  }
}
