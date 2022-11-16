import { useEffect } from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import UsersView from './components/UsersView'
import { setToken } from './reducers/tokenReducer'
import { Navigate, Route, Routes, useMatch } from 'react-router-dom'
import { useResource } from './hooks'
import User from './components/User'
import Blog from './components/Blog'
import NavigationBar from './components/NavigationBar'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.user)
  const [users] = useResource('/api/users')
  const [blogs] = useResource('/api/blogs')

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  const matchedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const matchedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      dispatch(setToken(loggedUser.token))
    }
  }, [])

  if (loggedUser === null) {
    return (
      <LoginForm />
    )
  }

  return (
    <div className="container">
      <div>
        <NavigationBar />
        <h2>blog app</h2>
        <Notification />
      </div>

      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs' element={<BlogList />} />
        <Route path='/blogs/:id' element={matchedBlog ? <Blog blog={matchedBlog} /> : <Navigate replace to='/' />} />
        <Route path='/users' element={<UsersView />} />
        <Route path='/users/:id' element={<User user={matchedUser} />} />
      </Routes>
    </div>
  )
}

export default App
