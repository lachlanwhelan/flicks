import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import Flicks from '../Flicks.png';
import '../styles/Navbar.scss';
import { AuthContext } from '../AuthContext';
import { Dropdown } from 'react-bootstrap';

const CustomDropdown = ({ signOutUser }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant='outline-transparent'
        className='nav-item dropdown text-white'
        id='dropdown-basic'
      >
        <FontAwesomeIcon icon={faUser} size='lg' />
      </Dropdown.Toggle>

      <Dropdown.Menu className='user_actions_menu'>
        <LinkContainer to='/profile'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <button onClick={signOutUser} class='dropdown-item'>
          Logout
        </button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const FlickNavbar = ({ signInUser, signOutUser }) => {
  const navigate = useNavigate();
  let [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Navbar variant='dark' expand='lg'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <img src={Flicks} />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <NavDropdown title='Movies' id='basic-nav-dropdown'>
              <LinkContainer to='/movie'>
                <NavDropdown.Item>Popular</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/movie/now-playing'>
                <NavDropdown.Item>Now Playing</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/movie/upcoming'>
                <NavDropdown.Item>Upcoming</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/movie/top-rated'>
                <NavDropdown.Item>Top Rated</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <NavDropdown title='TV Shows' id='basic-nav-dropdown'>
              <LinkContainer to='/tv'>
                <NavDropdown.Item>Popular</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/tv/airing-today'>
                <NavDropdown.Item> Airing today</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/tv/on-the-air'>
                <NavDropdown.Item>On the air</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/tv/top-rated'>
                <NavDropdown.Item>Top Rated</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <LinkContainer to='/people'>
              <Nav.Link>People</Nav.Link>
            </LinkContainer>
          </Nav>

          <Form className='d-flex me-4' onSubmit={handleSubmit}>
            <Form.Control
              type='search'
              placeholder='Search'
              className='search-form-input me-2 text-white'
              aria-label='Search'
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              className='search-form-btn'
              variant='outline-danger'
              type='submit'
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Form>

          {isAuthenticated ? (
            <CustomDropdown signOutUser={signOutUser} />
          ) : (
            <Nav.Link onClick={signInUser}>
              <FontAwesomeIcon icon={faUser} size='lg' />
              &nbsp;&nbsp;
              <span>Sign in</span>
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FlickNavbar;
