import { useState, Fragment } from 'react'
import { Container, Modal, Button } from 'react-bootstrap'
import { useFetch } from '../hooks/useFetch'

import ReadOnlyRow from './ReadOnlyRow'
import EditableRow from './EditableRow'

import './contacts.css'

const Contacts = () => {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [editContactId, setEditContactId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    city: '',
    phone: '',
    email: '',
  })

  // GET request to  custom hook
  const { data, isPending, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  )

  // POST request
  const { postData, data: contacts } = useFetch(
    'https://jsonplaceholder.typicode.com/users',
    'POST'
  )

  // options to post data to API
  const handleSubmit = (e) => {
    e.preventDefault()
    postData({
      name,
      city,
      phone,
      email,
    })

    document.form.reset()
  }

  // delete request
  const { deleteData, data: deleteContact } = useFetch(
    'https://jsonplaceholder.typicode.com/posts/1',
    'DELETE'
  )
  console.log(deleteContact)

  // edit contact handler
  const handleEditClick = (event, contact) => {
    event.preventDefault()
    setEditContactId(contact.id)

    const formValues = {
      id: contact.id,
      name: contact.name,
      city: contact.address.city,
      phone: contact.phone,
      email: contact.email,
    }

    setEditFormData(formValues)
  }

  // handle edit form data
  const handleEditFormChange = (event) => {
    event.preventDefault()

    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue

    setEditFormData(newFormData)
  }

  const handleDelete = (event, contact) => {
    deleteData()
    alert('Contact Deleted!!!')
  }

  return (
    <Container>
      <div className='contacts'>
        <h3>My Contact List</h3>
        {error && <p className='error'>{error}</p>}
        {isPending && <p className='loading'>Loading...</p>}
        {data && (
          <form>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((contact) => (
                  <>
                    {editContactId === contact.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                      />
                    ) : (
                      <ReadOnlyRow
                        contact={contact}
                        handleEditClick={handleEditClick}
                        handleDelete={handleDelete}
                      />
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </form>
        )}

        <h3>Add New Contact</h3>
        <form name='form' onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            required
            placeholder='Enter a name'
            onChange={(e) => setName(e.target.value)}></input>
          <input
            type='text'
            name='city'
            required
            placeholder=' city'
            onChange={(e) => setCity(e.target.value)}></input>
          <input
            type='text'
            name='phone'
            required
            placeholder=' phone'
            onChange={(e) => setPhone(e.target.value)}></input>
          <input
            type='email'
            name='email'
            required
            placeholder=' email'
            onChange={(e) => setEmail(e.target.value)}></input>
          <button onClick={handleShow}>Add</button>
        </form>

        {contacts && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className='bg-success'>
              <Modal.Title>POST Request Successful</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>ID: {contacts.id}</p>
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
      </div>
    </Container>
  )
}

export default Contacts
