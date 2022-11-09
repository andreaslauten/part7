import { useEffect } from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import UsersView from './components/UsersView'
import { setToken } from './reducers/tokenReducer'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import { useResource } from './hooks'
import User from './components/User'

const App = () => {
  const padding = {
    padding: 5
  }

  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.user)
  const [users] = useResource('/api/users')

  const match = useMatch('/users/:id')

  const matchedUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      dispatch(setToken(loggedUser.token))
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  if (loggedUser === null) {
    return (
      <LoginForm />
    )
  }

  return (
    <div>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
        <h2>blogs</h2>
        <Notification />
        <p>{loggedUser.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Routes>
        <Route path='/blogs' element={<BlogList />} />
        <Route path='/users' element={<UsersView />} />
        <Route path='/users/:id' element={<User user={matchedUser} />} />
        <Route path='/' element={<CreateBlogForm />} />
      </Routes>
    </div>
  )
}

export default App
