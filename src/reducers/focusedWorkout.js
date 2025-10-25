import { createSlice } from '@reduxjs/toolkit'
import workoutService from '../services/workout'
import { toKeyedObject, findIndexOfKey, swapObjects } from '../utils/helper'

const initialWorkout = {
  name: '',
  exerciseGroups: []
}

const initialExerciseGroup = (exercise) => {
  return {
    note: null,
    exercise,
    exerciseSets: []
  }
}

const initialExerciseSet = {
  minReps: null,
  maxReps: null,
  weight: null,
}

const workoutSlice = createSlice({
  name: 'focusedWorkout',
  initialState: toKeyedObject(initialWorkout),
  reducers: {
    setWorkout(state, action) {
      const workout = toKeyedObject(action.payload)
      // add key to all nested objects
      workout.exerciseGroups = workout.exerciseGroups
        ? workout.exerciseGroups.map(g => {
          g.exerciseSets = g.exerciseSets
            ? g.exerciseSets.map(toKeyedObject)
            : []
          return toKeyedObject(g)
        })
        : []

      return workout
    },
    resetWorkout() {
      return toKeyedObject(initialWorkout)
    },
    addExerciseGroup(state, action) {
      const exercise = action.payload
      state.exerciseGroups = state.exerciseGroups
        ? state.exerciseGroups.concat(toKeyedObject(initialExerciseGroup(exercise)))
        : [toKeyedObject(action.payload)]
    },
    addMultipleExerciseGroups(state, action) {
      const exercises = action.payload;
      const newExerciseGroups = exercises
        .map(ex => initialExerciseGroup(ex))
        .map(toKeyedObject);
      state.exerciseGroups = state.exerciseGroups.concat(newExerciseGroups);
      return state;
    },
    addExerciseSet(state, action) {
      const exerciseGroupKey = action.payload.key
      const exerciseGroup = state.exerciseGroups.find(g => g.key === exerciseGroupKey)
      exerciseGroup.exerciseSets = exerciseGroup.exerciseSets
        ? exerciseGroup.exerciseSets.concat(toKeyedObject(initialExerciseSet))
        : [toKeyedObject(initialExerciseSet)]
    },
    updateWorkout(state, action) {
      return action.payload
    },
    updateExerciseGroup(state, action) {
      const exerciseGroup = action.payload.exerciseGroup
      state.exerciseGroups = state.exerciseGroups.map(group => group.key === exerciseGroup.key ? exerciseGroup : group)
      return state
    },
    shiftExerciseGroup(state, action) {
      const shiftAmount = action.payload.shiftAmount
      const group = action.payload.exerciseGroup
      const groupIndex = findIndexOfKey(state.exerciseGroups, group.key)
      const shiftIndex = shiftAmount + groupIndex
      if (shiftIndex > -1 && shiftIndex < state.exerciseGroups.length) {
        state.exerciseGroups = swapObjects(state.exerciseGroups, groupIndex, shiftIndex)
      }
      return state
    },
    updateExerciseSet(state, action) {
      const groupKey = action.payload.exerciseGroupKey
      const updatedSet = action.payload.exerciseSet
      const exerciseGroup = state.exerciseGroups.find(group => group.key === groupKey)
      exerciseGroup.exerciseSets = exerciseGroup.exerciseSets.map(set => set.key === updatedSet.key ? updatedSet : set)
      state.exerciseGroups = state.exerciseGroups.map(group => group.key === exerciseGroup.key ? exerciseGroup : group)
      return state
    },
    removeExerciseGroup(state, action) {
      const exerciseGroupToRemove = action.payload
      state.exerciseGroups = state.exerciseGroups.filter(group => group.key !== exerciseGroupToRemove.key)
      return state
    },
    removeExerciseSet(state, action) {
      const groupKey = action.payload.exerciseGroupKey
      const setToRemove = action.payload.exerciseSet
      const exerciseGroup = state.exerciseGroups.find(group => group.key === groupKey)
      exerciseGroup.exerciseSets = exerciseGroup.exerciseSets.filter(set => set.key !== setToRemove.key)
      state.exerciseGroups = state.exerciseGroups.map(group => group.key === exerciseGroup.key ? exerciseGroup : group)
      return state
    }
  }
})

export const getWorkoutDetails = (id) => {
  return async dispatch => {
    const workout = await workoutService.getDetails(id)
    dispatch(setWorkout(workout))
  }
}

export const initializeFocusedWorkout = (id) => {
  return async dispatch => {
    if (id) {
      const workout = await workoutService.getDetails(id)
      dispatch(setWorkout(workout))
    } else {
      dispatch(resetWorkout())
    }
  }
}

export const updateWorkoutName = updatedWorkout => {
  return dispatch => {
    const name = updatedWorkout.name === "" ? null : updatedWorkout.name
    dispatch(updateWorkout({
      ...updatedWorkout,
      name
    }))
  }
}

export const {
  setWorkout,
  resetWorkout,
  addExerciseGroup,
  addMultipleExerciseGroups,
  addExerciseSet,
  updateWorkout,
  updateExerciseGroup,
  shiftExerciseGroup,
  removeExerciseGroup,
  updateExerciseSet,
  removeExerciseSet
} = workoutSlice.actions
export default workoutSlice.reducer