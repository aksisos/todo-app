import React, { Component } from 'react'
import './TaskTimer.css'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

export default class TaskTimer extends Component {
  static propTypes = {
    onCompleted: PropTypes.func.isRequired,
    timeLeft: PropTypes.instanceOf(Date).isRequired
  }

  constructor({ timeLeft }) {
    super()
    this.state = {
      timeLeft,
      isPlay: false,
    }
  }

  onPlayClick = () => {
    this.startTimer()
    this.setState(() => ({ isPlay: true }))
  }

  componentDidUpdate() {
    const { onCompleted } = this.props

    if (format(this.state.timeLeft, 'mm:ss') === '00:00') {
      if (this.state.isPlay === true) {
        this.stopTimer()
        onCompleted()
      }
    }
  }

  startTimer = () => {
    const { timeLeft } = this.state
    let newTime = timeLeft

    this.interval = setInterval(() => {
      newTime -= 1000
      this.setState(() => ({ timeLeft: newTime }))
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.interval)
    this.setState(() => ({isPlay: false}))
  }

  render() {
    const { isPlay, timeLeft } = this.state
    const playButton = <button className="icon icon-play" type="button" aria-label="play" onClick={this.onPlayClick} />
    const pauseButton = (
      <button className="icon icon-pause" type="button" aria-label="pause" onClick={this.stopTimer} />
    )
    const formatTimeLeft = format(timeLeft, 'mm:ss')

    const button = isPlay ? pauseButton : playButton

    return (
      <span className={formatTimeLeft === '00:00' ? 'hidden' : 'description'}>
        {button}
        {formatTimeLeft}
      </span>
    )
  }
}