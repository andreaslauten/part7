import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
      state.type = action.payload.type
    }
  }
})

export const { setNotification } = notificationSlice.actions

let timeoutId = null

export const createNotification = (message, type, timeInSeconds) => {
  return dispatch => {
    dispatch(setNotification({ message, type }))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(setNotification({}))
    }, timeInSeconds * 1000)
  }
}

export default notificationSlice.reducer