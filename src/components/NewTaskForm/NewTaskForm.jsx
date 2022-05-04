import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static propTypes = {
    onAdded: PropTypes.func,
  }

  static defaultProps = {
    onAdded: () => {},
  }

  state = {
    label: '',
    min: '',
    sec: '',
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onSecChange = (event) => {
    this.setState({
      sec: event.target.value
    })
  }

  onMinChange = (event) => {
    this.setState({
      min: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    let { min, sec } = this.state
    const { label } = this.state
    const { onAdded } = this.props

    if (!sec) {
      sec = 0
    }
    if (!min) {
      min = 0
    }
    if (sec >= 60) {
      return
    }

    onAdded(label, min, sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { label, sec, min } = this.state

    return (
      <form onSubmit={this.onSubmit} className="newtask-form">
        <input
          type="text"
          name="inputText"
          className="newtask"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          value={label}
          autoFocus
        />
        <input 
          type="number"
          name="minutes"
          onChange={this.onMinChange}
          className="newtask-form__timer" 
          placeholder="Min" 
          value={min}
          min="0"
        />
        <input 
          type="number"
          name="seconds"
          onChange={this.onSecChange}
          className="newtask-form__timer" 
          placeholder="Sec" 
          value={sec}
          min="0"
          max="59"
        />
        <input 
          type="submit" 
          className="submit-form"
          value="add"
          onClick={this.onSubmit} /> 
      </form>
    )
  }
}
