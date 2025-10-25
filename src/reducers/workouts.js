import { createSlice } from '@reduxjs/toolkit'
import workoutService from '../services/workout'

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: [],
  reducers: {
    setWorkouts(state, action) {
      return action.payload
    },
    removeWorkout(state, action) {
      return state.filter(w => w.id !== action.payload.id)
    },
    addWorkout(state, action) {
      state.push(action.payload)
    }
  }
})

export const initializeWorkouts = () => {
  return async dispatch => {
    const workouts = await workoutService.getList()
    dispatch(setWorkouts(workouts))
  }
}

export const deleteWorkout = workout => {
  return async dispatch => {
    await workoutService.remove(workout.id)
    dispatch(removeWorkout(workout))
  }
}

export const { setWorkouts, removeWorkout, addWorkout } = workoutsSlice.actions
export default workoutsSlice.reducer