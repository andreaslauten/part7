import { configureStore } from '@reduxjs/toolkit'

import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import tokenReducer from './reducers/tokenReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogsReducer,
    notification: notificationReducer,
    token: tokenReducer
  }
})

export default store