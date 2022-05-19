import React from 'react'
import PropTypes from 'prop-types'

import './TaskFilter.css'

const TaskFilter = function TaskFilter({filter, onFilter}) {
  TaskFilter.propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func,
  }

  TaskFilter.defaultProps = {
    filter: '',
    onFilter: () => {},
  }

  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttonsRender = buttons.map(({ name, label }) => {
    const isActive = filter === name
    const isSelected = isActive ? 'selected' : null
    return (
      <li key={name}>
        <button 
          type='button'
          className={isSelected} 
          onClick={() => onFilter(name)}>
          { label }
        </button>
      </li>
    )
  })

  return (
    <ul className="filters">
      { buttonsRender }
    </ul>
  )

}

export default TaskFilter
