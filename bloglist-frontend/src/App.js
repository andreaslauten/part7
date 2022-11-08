import { useEffect } from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import UsersView from './components/UsersView'
// import { useResource } from './hooks'
import { setToken } from './reducers/tokenReducer'

const App = () => {
  const dispatch = useDispatch()
  // const [, blogService] = useResource('/api/blogs')
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      dispatch(setToken(user.token))
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  if (user === null) {
    return (
      <LoginForm />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <CreateBlogForm />
      <BlogList />
      <h2>Users</h2>
      <UsersView />
    </div>
  )
}

export default App
