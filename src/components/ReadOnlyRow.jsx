const ReadOnlyRow = ({ contact, handleEditClick }) => {
  return (
    <tr key={contact.id}>
      <td>{contact.name}</td>
      <td>{contact.address.city}</td>
      <td>{contact.phone}</td>
      <td>{contact.email}</td>
      <td>
        <button type='button' onClick={(event) => handleEditClick(event, contact)}>
          edit
        </button>
      </td>
    </tr>
  )
}

export default ReadOnlyRow
