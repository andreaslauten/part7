
import { useResource } from '../hooks'

const UsersView = () => {
  const [users] = useResource('/api/users')

  if (users === undefined) {
    return null
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.blogs.length}</td>
        </tr>)}
      </tbody>

    </table>
  )
}

export default UsersView
