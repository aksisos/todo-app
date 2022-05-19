import React from 'react'
import PropTypes from 'prop-types'

import './Task.css'
import EditForm from './EditForm'
import Time from './Time'
import TaskTimer from './TaskTimer'

const Task = function Task({ label, onDeleted, onEdit, onCompleted, completed, edit, id, dateCreated, timeLeft, onEditForm }) {
  Task.propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func,
    onEdit: PropTypes.func,
    onEditForm: PropTypes.func,
    id: PropTypes.number.isRequired,
    dateCreated: PropTypes.instanceOf(Date),
    timeLeft: PropTypes.instanceOf(Date).isRequired
  }

  Task.defaultProps = {
    label: '',
    onDeleted: () => {},
    onCompleted: () => {},
    onEdit: () => {},
    onEditForm: () => {},
    dateCreated: {}
  }

  const isCompl = completed ? ' completed' : 'task active' 
  const isEdit = edit ? ' editing' : isCompl

  return (
    <li className={ isEdit }>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={onCompleted} />
        <label>
          <span className="title">{label}</span>
          {timeLeft !== 0 ? <TaskTimer timeLeftProp={timeLeft} onCompleted={() => onCompleted(id)} /> : null}
          <span className="created"><Time dateCreated={dateCreated}/></span>
        </label>
        <button className="icon icon-edit" onClick={onEdit} type='button' alt='edit'/>
        <button className="icon icon-destroy" onClick={onDeleted} type='button' alt='delete'/>
      </div>
      {edit === true ? <EditForm
        onEditForm={onEditForm}
        id={id}
        label={label}/> : null}
    </li>
  )
}

export default Task
