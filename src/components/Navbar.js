import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router';


const FlickNavbar = () => {
  const navigate = useNavigate();
  let [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate(`/search?query=${query}`);
  }


    return(
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Flicks.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Movies" id="basic-nav-dropdown">
              <LinkContainer to='/movies'>
                <NavDropdown.Item>Popular</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/movies/now-playing'>
                <NavDropdown.Item>Now Playing</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/movies/upcoming'>
                <NavDropdown.Item>Upcoming</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/movies/top-rated'><NavDropdown.Item>Top Rated</NavDropdown.Item>
              </LinkContainer>
              
            </NavDropdown>
            <NavDropdown title="TV Shows" id="basic-nav-dropdown">
            <LinkContainer to='/tv'>
              <NavDropdown.Item>Popular</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/tv/airing-today'>
              <NavDropdown.Item> Airing today</NavDropdown.Item>
            </LinkContainer>
              <LinkContainer to='/tv/on-the-air'>
              <NavDropdown.Item >On the air</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/tv/top-rated'>
              <NavDropdown.Item>
                Top Rated
              </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
           <LinkContainer to='/people'>
           <Nav.Link >People</Nav.Link>
           </LinkContainer>
          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-danger" type='submit'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
};


export default FlickNavbar