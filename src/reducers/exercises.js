import { createSlice } from '@reduxjs/toolkit'
import exerciseService from '../services/exercise'

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: [],
  reducers: {
    setExercises(state, action) {
      return action.payload
    }
  }
})

export const initializeExercises = () => {
  return async dispatch => {
    const exercises = await exerciseService.getAll()
    dispatch(setExercises(exercises))
  }
}

export const { setExercises } = exercisesSlice.actions
export default exercisesSlice.reducer