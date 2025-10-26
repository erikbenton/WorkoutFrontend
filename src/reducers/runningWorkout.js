import { createSlice } from '@reduxjs/toolkit'
import { toKeyedObject, findIndexOfKey, swapObjects } from '../utils/helper'
import workoutService from "../services/workout";

const initializeWorkout = workout => {
  const now = new Date()
  return {
    selectedWorkout: { ...workout },
    activeExerciseGroup: null,
    workoutId: workout ? workout.id : null,
    exerciseGroups: workout
      ? workout.exerciseGroups.map(group =>
        initializeWorkoutExerciseGroup(group, group.exercise)).map(toKeyedObject)
      : [],
    startTime: now.toISOString(),
    endTime: null
  }
}

const initializeWorkoutExerciseGroup = (exerciseGroup, exercise) => {
  return {
    exercise,
    exerciseGroupId: exerciseGroup ? exerciseGroup.id : null,
    note: exerciseGroup ? exerciseGroup.note : null,
    comment: null,
    exerciseSets: exerciseGroup
      ? exerciseGroup.exerciseSets.map(initializeExerciseSet).map(toKeyedObject)
      : []
  }
}

const initializeExerciseSet = exerciseSet => {
  return {
    reps: null,
    weight: null,
    minReps: exerciseSet ? exerciseSet.minReps : null,
    maxReps: exerciseSet ? exerciseSet.maxReps : null,
    targetWeight: exerciseSet ? exerciseSet.weight : null,
    completed: false
  }
}

const activeWorkoutSlice = createSlice({
  name: 'activeWorkout',
  initialState: null,
  reducers: {
    initializeActiveWorkout(state, action) {
      return initializeWorkout(action.payload)
    },
    clearRunningWorkout() {
      return null;
    },
    selectActiveExerciseGroup(state, action) {
      const index = action.payload;
      const activeExerciseGroup = { ...state.exerciseGroups[index] }
      state.activeExerciseGroup = { ...activeExerciseGroup, index }
      return state
    },
    updateActiveExerciseGroupExercise(state, action) {
      const newExercise = action.payload;
      state.activeExerciseGroup.exercise = { ...newExercise };
      return state;
    },
    clearActiveExerciseGroup(state) {
      state.activeExerciseGroup = null
      return state
    },
    updateExerciseGroup(state, action) {
      const { groupKey, field, value } = action.payload;
      const exerciseGroup = { ...state.exerciseGroups.find(group => group.key === groupKey) };
      const updatedGroup = {
        ...exerciseGroup,
        [field]: value === "" ? null : value
      }
      state.exerciseGroups = state.exerciseGroups.map(group => group.key === groupKey ? updatedGroup : group)
      return state
    },
    shiftExerciseGroup(state, action) {
      const { shiftAmount, groupKey } = action.payload;
      const groupIndex = findIndexOfKey(state.exerciseGroups, groupKey)
      const shiftIndex = shiftAmount + groupIndex
      if (shiftIndex > -1 && shiftIndex < state.exerciseGroups.length) {
        state.exerciseGroups = swapObjects(state.exerciseGroups, groupIndex, shiftIndex)
      }
      return state
    },
    removeExerciseGroup(state, action) {
      const { groupKey } = action.payload;
      state.exerciseGroups = state.exerciseGroups.filter(group => group.key !== groupKey)
      return state;
    },
    addMultipleExerciseGroups(state, action) {
      const exercises = action.payload;
      const newExerciseGroups = exercises
        .map(ex => initializeWorkoutExerciseGroup(null, ex))
        .map(toKeyedObject);
      state.exerciseGroups = state.exerciseGroups.concat(newExerciseGroups);
      return state;
    },
    updateExerciseSet(state, action) {
      const { groupKey, setKey, field, value } = action.payload;
      // ensure reps are an integer value
      const updatedValue = (field === 'reps' && value !== "")
        ? parseInt(value)
        : value;
      const exerciseGroup = { ...state.exerciseGroups.find(group => group.key === groupKey) };
      const exerciseSet = { ...exerciseGroup.exerciseSets.find(s => s.key === setKey) };
      const updatedSet = { ...exerciseSet, [field]: updatedValue === "" ? null : updatedValue }
      exerciseGroup.exerciseSets = exerciseGroup.exerciseSets.map(s => s.key === setKey ? updatedSet : s);
      state.exerciseGroups = state.exerciseGroups.map(group => group.key === groupKey ? exerciseGroup : group);
      return state;
    },
    addExerciseSet(state, action) {
      const groupKey = action.payload.groupKey;
      const exerciseGroup = { ...state.exerciseGroups.find(group => group.key === groupKey) };
      exerciseGroup.exerciseSets = exerciseGroup.exerciseSets.concat(toKeyedObject(initializeExerciseSet(null)));
      state.exerciseGroups = state.exerciseGroups.map(group => group.key === groupKey ? exerciseGroup : group);
      return state;
    },
    removeExerciseSet(state, action) {
      const { groupKey, setKey } = action.payload;
      const exerciseGroup = { ...state.exerciseGroups.find(group => group.key === groupKey) };
      exerciseGroup.exerciseSets = exerciseGroup.exerciseSets.filter(set => set.key !== setKey);
      state.exerciseGroups = state.exerciseGroups.map(group => group.key === groupKey ? exerciseGroup : group);
      return state;
    }
  }
})

export const initializeRunningWorkout = (id) => {
  return async dispatch => {
    const workout = await workoutService.getDetails(id)
    dispatch(initializeActiveWorkout(workout))
  }
}

export const {
  initializeActiveWorkout,
  clearRunningWorkout,
  selectActiveExerciseGroup,
  updateActiveExerciseGroupExercise,
  clearActiveExerciseGroup,
  updateExerciseGroup,
  shiftExerciseGroup,
  removeExerciseGroup,
  addMultipleExerciseGroups,
  addExerciseSet,
  updateExerciseSet,
  removeExerciseSet } = activeWorkoutSlice.actions
export default activeWorkoutSlice.reducer