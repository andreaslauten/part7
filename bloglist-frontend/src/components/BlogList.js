import { useResource } from '../hooks'
import { Link } from 'react-router-dom'
import CreateBlogForm from './CreateBlogForm'

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [blogs] = useResource('/api/blogs')

  return (
    <div>
      <CreateBlogForm />
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
