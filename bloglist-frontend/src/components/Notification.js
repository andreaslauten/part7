import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    notification.message === undefined ?
      null :
      <Alert variant="success">{notification.message}</Alert>)
}

export default Notification
