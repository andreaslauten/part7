import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { createNotification } from '../reducers/notificationReducer'


const AddComment = ({ blogID }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const { reset, ...comment } = useField('text')

  const addComment = async () => {
    const baseUrl = '/api/blogs'
    const config = {
      headers: { Authorization: token },
    }

    const commentObject = { comment: comment.value }

    await axios.post(`${baseUrl}/${blogID}/comments`, commentObject, config)
    reset()
    dispatch(createNotification('comment added', 'info', 3))
  }

  return (
    <div>
      <input { ...comment } />
      <button onClick={addComment}>add comment</button>
    </div>
  )
}

export default AddComment