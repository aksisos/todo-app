import React, { useState, useEffect } from 'react'
import './TaskTimer.css'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

const TaskTimer = function TaskTimer({ timeLeftProp, onCompleted }) {
  TaskTimer.propTypes = {
    onCompleted: PropTypes.func.isRequired,
    timeLeftProp: PropTypes.instanceOf(Date).isRequired
  }

  const [timeLeft, setTimeLeft] = useState(timeLeftProp)
  const [isPlay, setIsPlay] = useState(false)
  const [activeInterval, setActiveInterval] = useState('')

  const onPlayClick = () => {
    startTimer()
    setIsPlay(true)
  }

  useEffect(() => {
    if (format(timeLeft, 'mm:ss') === '00:00') {
      if (isPlay === true) {
        stopTimer()
        onCompleted()
      }
    }
  }, [activeInterval, onCompleted, timeLeft])

  const startTimer = () => {
    let newTime = timeLeft

    const interval = setInterval(() => {
      newTime -= 1000
      setTimeLeft(newTime)
    }, 1000)
    setActiveInterval(interval)
  }

  const stopTimer = () => {
    clearInterval(activeInterval)
    setIsPlay(false)
  }

  const playButton = <button className="icon icon-play" type="button" aria-label="play" onClick={onPlayClick} />
  const pauseButton = <button className="icon icon-pause" type="button" aria-label="pause" onClick={stopTimer} />
  const formatTimeLeft = format(timeLeft, 'mm:ss')
  const button = isPlay ? pauseButton : playButton

  return (
    <span className={formatTimeLeft === '00:00' ? 'hidden' : 'description'}>
      {button}
      {formatTimeLeft}
    </span>
  )
}

export default TaskTimer
