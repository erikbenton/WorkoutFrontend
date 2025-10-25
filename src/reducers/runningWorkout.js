import { createSlice } from '@reduxjs/toolkit'
import { toKeyedObject } from '../utils/helper'
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
    exerciseGroupId: exerciseGroup.id,
    note: exerciseGroup.note,
    comment: null,
    exerciseSets: exerciseGroup.exerciseSets.map(initializeExerciseSet).map(toKeyedObject)
  }
}

const initializeExerciseSet = exerciseSet => {
  return {
    reps: null,
    weight: null,
    minReps: exerciseSet ? exerciseSet.minReps : null,
    maxReps: exerciseSet ? exerciseSet.maxReps : null,
    targetWeight: exerciseSet ? exerciseSet.weight : null
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
      const groupKey = action.payload;
      const activeExerciseGroup = state.exerciseGroups.find(group => group.key === groupKey)
      state.activeExerciseGroup = { ...activeExerciseGroup }
      return state
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
    updateExerciseSet(state, action) {
      const { groupKey, setKey, field, value } = action.payload;
      const exerciseGroup = { ...state.exerciseGroups.find(group => group.key === groupKey) };
      const exerciseSet = { ...exerciseGroup.exerciseSets.find(s => s.key === setKey) };
      const updatedSet = { ...exerciseSet, [field]: value === "" ? null : value }
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
  clearActiveExerciseGroup,
  updateExerciseGroup,
  addExerciseSet,
  updateExerciseSet,
  removeExerciseSet } = activeWorkoutSlice.actions
export default activeWorkoutSlice.reducer