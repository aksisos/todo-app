import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

const Time = function Time({ dateCreated }) {
  Time.propTypes = {
    dateCreated: PropTypes.instanceOf(Date).isRequired,
  }
  
  const [time, setTime] = useState(formatDistanceToNow(new Date(), { addSuffix: true, includeSeconds: true }))

  useEffect(() => {
    setInterval(() => {
      setTime(formatDistanceToNow(dateCreated, { addSuffix: true, includeSeconds: true }))
    }, 5000)
  })

  return <span>{time}</span>
}

export default Time
