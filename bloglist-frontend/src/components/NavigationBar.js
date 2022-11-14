import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'

const NavigationBar = () => {
  const navbarStyle = {
    padding: 5,
    backgroundColor: 'lightgrey'
  }

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
    <div style={navbarStyle}>
      <Link style={padding} to='/blogs'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      <div style={padding}>{loggedUser.name} logged in</div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default NavigationBar