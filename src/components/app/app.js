import React, { Component } from 'react'

import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'
import './app.css'

export default class App extends Component {
  maxid = 100

  state = {
    todoData: [this.createTodoItem('row row'), this.createTodoItem('fight'), this.createTodoItem('the power')],
    filter: 'all',
  }

  createTodoItem(label) {
    return {
      label,
      edit: false,
      completed: false,
      id: this.maxid++,
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

  addItem = (text) => {
    if (text.trim() !== '') {
      this.setState(({ todoData }) => {
        const newArray = [...todoData, this.createTodoItem(text)]
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
    console.log(id, text)
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = { ...oldItem, label: text }

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return { todoData: newArray }
    })
  }

  filterItems(items, filter) {
    switch (filter) {
    case 'all':
      return items
    case 'active':
      return items.filter((el) => !el.completed)
    case 'completed':
      return items.filter((el) => el.completed)
    default:
      return items
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
