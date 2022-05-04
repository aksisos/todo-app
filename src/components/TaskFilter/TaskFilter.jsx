import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './TaskFilter.css'

export default class TasksFilter extends Component {
  static propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func,
  }

  static defaultProps = {
    filter: '',
    onFilter: () => {},
  }

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  render() {
    const { filter, onFilter } = this.props

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name
      const clazz = isActive ? 'selected' : null
      return (
        <button className={clazz} key={name} onClick={() => onFilter(name)}>
          {label}
        </button>
      )
    })

    return (
      <ul className="filters">
        <li>{buttons}</li>
      </ul>
    )
  }
}
