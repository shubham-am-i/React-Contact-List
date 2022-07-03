import React from 'react'

import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar bg='success' expand='lg'>
        <Container>
          <Navbar.Brand>Ninja Contacts</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
