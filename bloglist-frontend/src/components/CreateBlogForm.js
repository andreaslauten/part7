import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { useField, useResource } from '../hooks'
import { Form, Button } from 'react-bootstrap'

const CreateBlogForm = () => {
  const dispatch = useDispatch()
  const [, blogService] = useResource('/api/blogs')

  const { reset: resetNewTitle, ...newTitle } = useField('text')
  const { reset: resetNewAuthor, ...newAuthor } = useField('text')
  const { reset: resetNewURL, ...newURL } = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    blogService.create({
      title: newTitle.value,
      author: newAuthor.value,
      url: newURL.value,
    })
    resetNewTitle()
    resetNewAuthor()
    resetNewURL()
    dispatch(createNotification(`a new blog ${newTitle.value} by ${newAuthor.value} added`, 'info', 3))
  }

  const createBlogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={createBlogFormRef}>
        <div>
          <h2>create new</h2>
          <Form onSubmit={addBlog}>
            <Form.Group>
              <Form.Label>title:</Form.Label>
              <Form.Control
                id="title-input"
                {...newTitle}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>author:</Form.Label>
              <Form.Control
                id="author-input"
                {...newAuthor}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>url:</Form.Label>
              <Form.Control
                id="url-input"
                {...newURL}
              />
            </Form.Group>
            <Button id="create-button" type="submit">
              create
            </Button>
          </Form>
        </div>
      </Togglable>
    </div>
  )
}

export default CreateBlogForm
