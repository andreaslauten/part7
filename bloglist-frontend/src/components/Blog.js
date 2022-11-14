import { useDispatch } from 'react-redux'
import { useResource } from '../hooks'
import { createNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [,blogService] = useResource('/api/blogs')

  const addLike = (event) => {
    event.preventDefault()

    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    blogService.update(blog.id, updatedBlog)
    dispatch(createNotification(`added like for blog ${blog.title} by ${blog.author}`, 'info', 3))
  }

  const removeBlog = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id)
    }
  }

  const permissionToDelete = () => {
    const loggedBlogappUser = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    )
    if (loggedBlogappUser) {
      return loggedBlogappUser.username === blog.user.username
    }
  }

  return blog === undefined ? null :
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={addLike}>like</button></div>
      <div>added by {blog.author}</div>
      {permissionToDelete() ? (
        <button onClick={removeBlog}>remove</button>
      ) : (
        <div></div>
      )}
    </div>
}

export default Blog
