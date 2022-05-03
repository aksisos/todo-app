import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Time extends Component {
  static propTypes = {
    dateCreated: PropTypes.instanceOf(Date).isRequired
  }

  state = {
    time: formatDistanceToNow(new Date(), {addSuffix: true, includeSeconds: true})
  }

  componentDidMount() {
    const {dateCreated} = this.props
    setInterval(() => {
      this.setState(() => ({
        time: formatDistanceToNow(dateCreated, {addSuffix: true, includeSeconds: true})
      })
      )
    }, 5000)
  
  }

  render () {
    const { time } = this.state
    return <span>{ time }</span>
  }
};
