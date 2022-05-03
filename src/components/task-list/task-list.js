import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

const TaskList = ({ todos, onDeleted, onEdit, onCompleted, onEditForm }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <Task
        key={id}
        id={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onEdit={() => onEdit(id)}
        onCompleted={() => onCompleted(id)}
        onEditForm={onEditForm}
      />
    )
  })

  return <ul className="list-group task-list">{elements}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
  onCompleted: PropTypes.func,
  onEditForm: PropTypes.func,
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onEdit: () => {},
  onCompleted: () => {},
  onEditForm: () => {},
}

export default TaskList
