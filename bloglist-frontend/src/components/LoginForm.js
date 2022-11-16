import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './Notification'
import loginService from '../services/login'
import { createNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { setToken } from '../reducers/tokenReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setToken(user.token))
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(createNotification('wrong username or password', 'alert', 3))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button id="login-button" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
