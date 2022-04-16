import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './task.css'

export default class Task extends Component {
  static propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func,
    onEdit: PropTypes.func,
    onEditForm: PropTypes.func,
  }

  static defaultProps = {
    label: '',
    onDeleted: () => {},
    onCompleted: () => {},
    onEdit: () => {},
    onEditForm: () => {},
  }

  state = {
    textEdit: this.props.label,
  }

  onLabelChange = (e) => {
    console.log(e.target.value)
    this.setState({
      textEdit: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { id, onEdit } = this.props
    e.preventDefault()
    this.props.onEditForm(id, this.state.textEdit)
    onEdit()
  }

  render() {
    const { label, onDeleted, onEdit, onCompleted, completed, edit } = this.props

    let classNames = ''

    if (completed) {
      classNames = ' completed'
    }

    if (edit) {
      classNames = ' editing'
    }

    const EditingTask = () => {
      return <input type="text" className="edit" onChange={this.onLabelChange} value={this.state.textEdit} autoFocus />
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onCompleted} />
          <label>
            <span className="description">{label}</span>
            <span className="created">{formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>{classNames === ' editing' ? <EditingTask /> : null}</form>
      </li>
    )
  }
}
