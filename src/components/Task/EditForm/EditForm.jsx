import React, { useState } from 'react'
import './EditForm'
import PropTypes from 'prop-types'

const EditForm = function EditForm({ label, onEditForm, id}) {
  EditForm.propTypes = {
    onEditForm: PropTypes.func,
    id: PropTypes.number.isRequired,
    label: PropTypes.string
  }
      
  EditForm.defaultProps = {
    onEditForm: () => {},
    label: ''
  }

  const [text, setText] = useState(label)

  const onTextEdit = (event) => {
    setText(event.target.value)
  }
	
  const onSubmit = (event) => {
    event.preventDefault()
    onEditForm(id, text)
  }

  return (<form onSubmit={onSubmit}>
    <input type="text" className="edit" defaultValue={ label } onChange={onTextEdit} />
  </form>) 
}

export default EditForm
