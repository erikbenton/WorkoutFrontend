import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectingExercises: false,
  exercisesSelected: []
};

const exerciseSelectionSlice = createSlice({
  name: "exerciseSelection",
  initialState,
  reducers: {
    setSelectingExercises(state, action) {
      const { selectingExercises } = action.payload;
      return { ...state, selectingExercises };
    },
    addExerciseToSelection(state, action) {
      const { exercise } = action.payload;
      const updatedExercises = state.exercisesSelected.concat(exercise);
      return { ...state, exercisesSelected: updatedExercises };
    },
    removeExerciseFromSelection(state, action) {
      const { exercise } = action.payload;
      const updatedExercises = state.exercisesSelected.filter(ex => ex.id !== exercise.id);
      return { ...state, exercisesSelected: updatedExercises };
    },
    cancelExerciseSelection() {
      return initialState;
    }
  }
});

export const {
  setSelectingExercises,
  addExerciseToSelection,
  removeExerciseFromSelection,
  cancelExerciseSelection
} = exerciseSelectionSlice.actions;

export default exerciseSelectionSlice.reducer;