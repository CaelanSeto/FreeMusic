import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SearchBar({placeholder, data}) {
  return (
    <Form className="d-flex">
        <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
        />
        <Button variant="outline-light" className="me-3" href="#">Search</Button>
    </Form>
  )
}

export default SearchBar