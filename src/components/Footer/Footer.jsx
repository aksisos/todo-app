import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../TaskFilter'
import './Footer.css'

const Footer = ({ completed, onCompletedDeleted, filter, onFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{completed} items left</span>
      <TaskFilter filter={filter} onFilter={onFilter} />
      <button className="clear-completed" onClick={onCompletedDeleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  completed: 0,
  filter: '',
  onFilter: () => {},
  onCompletedDeleted: () => {},
}

Footer.propTypes = {
  completed: PropTypes.number,
  filter: PropTypes.string,
  onFilter: PropTypes.func,
  onCompletedDeleted: PropTypes.func,
}

export default Footer
