const User = ({ user }) => {
  // console.log(user)

  return user === undefined ? null :
    <div>
      {user.name}
    </div>
}

export default User