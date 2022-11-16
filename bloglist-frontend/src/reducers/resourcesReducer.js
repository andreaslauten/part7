import { createSlice } from '@reduxjs/toolkit'

const resourcesSlice = createSlice({
  name: 'resources',
  initialState: [{ name: 'users', dataArray: [] }, { name: 'blogs', dataArray: [] }],
  reducers: {
    setResources2(state, action) {
      const resourcesObject = state.find(resources => resources.name === action.payload.name)
      resourcesObject.dataArray = action.payload.dataArray
    }
  }
})

export const { setResources2 } = resourcesSlice.actions

export const setResources = (name, dataArray) => {
  return dispatch => {
    dispatch(setResources2({ name, dataArray }))
  }
}

export default resourcesSlice.reducer