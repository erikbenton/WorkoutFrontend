import { createSlice } from '@reduxjs/toolkit'
import bodyPartService from '../services/bodyParts'

const bodyPartsSlice = createSlice({
  name: 'bodyParts',
  initialState: [],
  reducers: {
    setBodyParts(state, action) {
      return action.payload
    }
  }
})

export const initializeBodyParts = () => {
  return async dispatch => {
    const bodyParts = await bodyPartService.getAll()
    dispatch(setBodyParts(bodyParts))
  }
}

export const { setBodyParts } = bodyPartsSlice.actions
export default bodyPartsSlice.reducer