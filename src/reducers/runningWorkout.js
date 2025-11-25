import { createSlice } from '@reduxjs/toolkit'
import { toKeyedObject, findIndexOfKey, swapObjects, createCompletedWorkout } from '../utils/helper'
import workoutService from "../services/workout";
import completedWorkoutService from "../services/completedWorkout";

const initializeWorkout = workout => {
  const now = new Date()
  return {
    name: workout ? workout.name : "New Workout",
    note: null,
    selectedWorkout: { ...workout },
    activeExerciseGroup: null,
    workoutId: workout ? workout.id : null,
    exerciseGroups: workout
      ? workout.exerciseGroups.map(group =>
        initializeWorkoutExerciseGroup(group, group.exercise)).map(toKeyedObject)
      : [],
    startTime: now.toISOString(),
    endTime: null,
    showRestTimer: false,
    restTime: null,
    restStartedAt: null,
    editingGroupKey: null,
    editingSetKey: null
  }
}

const initializeWorkoutExerciseGroup = (exerciseGroup, exercise) => {
  return {
    exercise,
    exerciseGroupId: exerciseGroup ? exerciseGroup.id : null,
    note: exerciseGroup ? exerciseGroup.note : null,
    restTime: exerciseGroup ? exerciseGroup.restTime : null,
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
    setType: exerciseSet ? exerciseSet.setType : null,
    completed: false
  }
}

const activeWorkoutSlice = createSlice({
  name: 'runningWorkout',
  initialState: null,
  reducers: {
    initializeActiveWorkout(state, action) {
      return initializeWorkout(action.payload)
    },
    clearRunningWorkout() {
      return null;
    },
    updateRunningWorkout(state, action) {
      const { field, value } = action.payload;
      const updatedRunningWorkout = {
        ...state,
        [field]: value === "" ? null : value
      };
      return updatedRunningWorkout;
    },
    setRestTimer(state, action) {
      const { showRestTimer, restTime, restStartedAt } = action.payload;
      return { ...state, showRestTimer, restTime, restStartedAt };
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
    shiftExerciseSet(state, action) {
      const { shiftAmount, groupKey, setKey } = action.payload;
      const group = { ...state.exerciseGroups.find(g => g.key === groupKey) };
      const setIndex = findIndexOfKey(group.exerciseSets, setKey)
      const shiftIndex = shiftAmount + setIndex
      if (shiftIndex > -1 && shiftIndex < group.exerciseSets.length) {
        group.exerciseSets = swapObjects(group.exerciseSets, setIndex, shiftIndex);
        state.exerciseGroups = state.exerciseGroups.map(g => g.key === groupKey ? group : g);
      }
      return state;
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
      const setLength = exerciseGroup.exerciseSets.length;
      const newExerciseSet = setLength > 0
        ? initializeExerciseSet(exerciseGroup.exerciseSets[setLength - 1])
        : initializeExerciseSet(null);
      exerciseGroup.exerciseSets = exerciseGroup.exerciseSets.concat(toKeyedObject(newExerciseSet));
      state.exerciseGroups = state.exerciseGroups.map(group => group.key === groupKey ? exerciseGroup : group);
      return state;
    },
    removeExerciseSet(state, action) {
      const { groupKey, setKey } = action.payload;
      const exerciseGroup = { ...state.exerciseGroups.find(group => group.key === groupKey) };
      exerciseGroup.exerciseSets = exerciseGroup.exerciseSets.filter(set => set.key !== setKey);
      state.exerciseGroups = state.exerciseGroups.map(group => group.key === groupKey ? exerciseGroup : group);
      return state;
    },
    autofillExerciseSet(state, action) {
      const { reps, weight } = action.payload;

      if (!state.activeExerciseGroup) return state;

      const group = { ...state.exerciseGroups.find(g => g.key === state.activeExerciseGroup.key) };
      const setIndex = group.exerciseSets.findIndex(set => !set.completed);

      if (setIndex === -1) return state;

      const filledSet = { ...group.exerciseSets[setIndex], reps, weight };
      group.exerciseSets = group.exerciseSets.map(set => set.key === filledSet.key ? filledSet : set);
      state.exerciseGroups = state.exerciseGroups.map(g => g.key === group.key ? group : g);
      return state;
    },
    setEditingSetKey(state, action) {
      const { setKey, groupKey } = action.payload;
      return { ...state, editingSetKey: setKey, editingGroupKey: groupKey };
    }
  }
})

export const initializeRunningWorkout = (id) => {
  return async dispatch => {
    dispatch(clearRunningWorkout());
    const workout = await workoutService.getDetails(id)
    dispatch(initializeActiveWorkout(workout))
  }
}

export const restartRestTimer = (restTime) => {
  return dispatch => {
    dispatch(setRestTimer({ showRestTimer: false, restTime: null, restStartedAt: null }))
    if (!restTime) return;
    setTimeout(() => {
      const now = new Date();
      dispatch(setRestTimer({ showRestTimer: true, restTime, restStartedAt: now.toISOString() }))
    }, 0);
  }
}

export const saveCompleteWorkout = (workout) => {
  return async (dispatch) => {
    const completedWorkout = createCompletedWorkout(workout);
    const savedCompletedWorkout = await completedWorkoutService
      .create(completedWorkout);
    dispatch(clearRunningWorkout());
    return savedCompletedWorkout;
  }
}

export const {
  initializeActiveWorkout,
  clearRunningWorkout,
  updateRunningWorkout,
  setRestTimer,
  selectActiveExerciseGroup,
  updateActiveExerciseGroupExercise,
  clearActiveExerciseGroup,
  updateExerciseGroup,
  shiftExerciseGroup,
  shiftExerciseSet,
  removeExerciseGroup,
  addMultipleExerciseGroups,
  addExerciseSet,
  updateExerciseSet,
  removeExerciseSet,
  autofillExerciseSet,
  setEditingSetKey } = activeWorkoutSlice.actions
export default activeWorkoutSlice.reducer