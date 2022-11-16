import { configureStore } from '@reduxjs/toolkit'
import resourcesReducer from './reducers/resourcesReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import tokenReducer from './reducers/tokenReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    resources: resourcesReducer,
    notification: notificationReducer,
    token: tokenReducer
  }
})

export default store