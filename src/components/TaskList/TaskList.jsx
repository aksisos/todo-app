import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

const TaskList = ({ todos, onDeleted, onEdit, onCompleted, onEditForm }) => {
  const elements = todos.map((item) => {
    const { id, key, label, edit, completed, dateCreated, timeLeft } = item

    return (
      <Task
        label={label}
        edit={edit}
        completed={completed}
        dateCreated={dateCreated}
        timeLeft={timeLeft}
        key={key}
        id={id}
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
