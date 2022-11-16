import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useField, useResource } from '../hooks'
import { createNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const AddComment = ({ blogID }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const { reset: resetCommentInput, ...comment } = useField('text')
  const [,blogService] = useResource('/api/blogs')

  const addComment = async () => {
    const baseUrl = '/api/blogs'
    const config = {
      headers: { Authorization: token },
    }

    const commentObject = { comment: comment.value }

    await axios.post(`${baseUrl}/${blogID}/comments`, commentObject, config)
    resetCommentInput()
    await blogService.getAll()
    dispatch(createNotification('comment added', 'info', 3))
  }

  return (
    <div>
      <Form.Control { ...comment } />
      <Button onClick={addComment}>add comment</Button>
    </div>
  )
}

export default AddComment