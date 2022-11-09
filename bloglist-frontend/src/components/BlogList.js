import Blog from './Blog'
import { useResource } from '../hooks'

const BlogList = () => {
  const [blogs, blogService] = useResource('/api/blogs')

  const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes)

  return blogsSorted.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      updateBlog={blogService.update}
      removeBlogWithId={blogService.remove}
    />
  ))
}

export default BlogList
