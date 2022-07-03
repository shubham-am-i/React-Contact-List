import { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useFetch } from '../hooks/useFetch'

const EditableRow = ({ editFormData, handleEditFormChange }) => {
  const [show, setShow] = useState(false)
  const { name, city, phone, email } = editFormData

  // PUT request
  const { putData, data: contacts } = useFetch(
    'https://jsonplaceholder.typicode.com/posts/1',
    'PUT'
  )

  const handleClose = () => {
    setShow(false)
    window.location.reload()
  }
  const handleShow = (e) => {
    e.preventDefault()
    putData({
      name,
      city,
      phone,
      email,
    })
    setShow(true)
  }

  return (
    <>
      <tr>
        <td>{editFormData.id}</td>
        <td>
          <input
            type='text'
            name='name'
            required
            placeholder='Edit a name'
            value={editFormData.name}
            onChange={handleEditFormChange}></input>
        </td>

        <td>
          {' '}
          <input
            type='text'
            name='city'
            required
            placeholder=' Edit a city'
            value={editFormData.city}
            onChange={handleEditFormChange}></input>
        </td>

        <td>
          <input
            type='text'
            name='phone'
            required
            placeholder=' Edit a phone'
            value={editFormData.phone}
            onChange={handleEditFormChange}></input>
        </td>

        <td>
          {' '}
          <input
            type='email'
            name='email'
            required
            placeholder=' Edit a email'
            value={editFormData.email}
            onChange={handleEditFormChange}></input>
        </td>
        <td>
          <button type='submit' onClick={(e) => handleShow(e)}>
            Save
          </button>
        </td>
      </tr>

      {contacts && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className='bg-warning'>
            <Modal.Title>Response from PUT Request...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Name: {contacts.name}</p>
            <p>City: {contacts.city}</p>
            <p>Phone: {contacts.phone}</p>
            <p>Email: {contacts.email}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default EditableRow
