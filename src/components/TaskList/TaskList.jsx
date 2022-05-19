import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

const TaskList = ({ todos, onDeleted, onEdit, onCompleted, onEditForm }) => {
  const elements = todos.map((item) => (
    <Task
      label={item.label}
      edit={item.edit}
      completed={item.completed}
      dateCreated={item.dateCreated}
      timeLeft={item.timeLeft}
      key={item.key}
      id={item.id}
      onDeleted={() => onDeleted(item.id)}
      onEdit={() => onEdit(item.id)}
      onCompleted={() => onCompleted(item.id)}
      onEditForm={onEditForm}
    />
  ))

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
