import Blog from './Blog'
import { useResource } from '../hooks'

const BlogList = () => {
  const [blogs, blogService] = useResource('/api/blogs')
  // const blogs = useSelector((state) => state.blogs)

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  // }, [])

  // const updateBlog = async (blogId, newBlog) => {
  //   try {
  //     const updatedBlog = await blogService.update(blogId, newBlog)
  //     const updatedBlogs = blogs.map((blog) =>
  //       blog.id === blogId ? updatedBlog : blog
  //     )
  //     dispatch(setBlogs(updatedBlogs))
  //   } catch (exception) {
  //     dispatch(createNotification(exception.response.data.error, 'alert', 3))
  //   }
  // }

  // const removeBlogWithId = async (blogId) => {
  //   try {
  //     const response = await blogService.remove(blogId)
  //     console.log(response)
  //     const updatedBlogs = blogs.filter((blog) => blog.id !== blogId)
  //     dispatch(setBlogs(updatedBlogs))
  //   } catch (exception) {
  //     dispatch(createNotification(exception, 'info', 3))
  //   }
  // }

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
