import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const NavigationBar = () => {

  const padding = {
    padding: 5,
    display: 'inline-flex'
  }

  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.user)

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {loggedUser
              ? <em style={padding}>{loggedUser.name} logged in</em>
              : <Link style={padding} to="/login">login</Link>
            }
          </Nav.Link>
          <Nav.Link>
            <Button onClick={handleLogout}>logout</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar