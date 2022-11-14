import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { useField, useResource } from '../hooks'

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
          <form onSubmit={addBlog}>
            <div>
              title:{' '}
              <input
                id="title-input"
                {...newTitle}
              />
            </div>
            <div>
              author:{' '}
              <input
                id="author-input"
                {...newAuthor}
              />
            </div>
            <div>
              url:{' '}
              <input
                id="url-input"
                {...newURL}
              />
            </div>
            <button id="create-button" type="submit">
              create
            </button>
          </form>
        </div>
      </Togglable>
    </div>
  )
}

export default CreateBlogForm
