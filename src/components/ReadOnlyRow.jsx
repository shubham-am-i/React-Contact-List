const ReadOnlyRow = ({ contact, handleEditClick, handleDelete }) => {
  return (
    <tr key={contact.id}>
      <td>{contact.id}</td>
      <td>{contact.name}</td>
      <td>{contact.address.city}</td>
      <td>{contact.phone}</td>
      <td>{contact.email}</td>
      <td>
        <button
          type='button'
          onClick={(event) => handleEditClick(event, contact)}
          className='delete'>
          edit
        </button>
        <button type='button' onClick={(event) => handleDelete(event, contact)}>
          delete
        </button>
      </td>
    </tr>
  )
}

export default ReadOnlyRow
