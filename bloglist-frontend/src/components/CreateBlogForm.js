import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { createNotification } from '../reducers/notificationReducer'
import { setBlogs } from '../reducers/blogsReducer'
import Togglable from './Togglable'
import { useField } from '../hooks'

const CreateBlogForm = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  const { reset: resetNewTitle, ...newTitle } = useField('text')
  const { reset: resetNewAuthor, ...newAuthor } = useField('text')
  const { reset: resetNewURL, ...newURL } = useField('text')

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      dispatch(setBlogs(blogs.concat(returnedBlog)))
      dispatch(createNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'info', 3))
      createBlogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(createNotification(exception.response.data.error, 'alert', 3))
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle.value,
      author: newAuthor.value,
      url: newURL.value,
    })
    resetNewTitle()
    resetNewAuthor()
    resetNewURL()
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
