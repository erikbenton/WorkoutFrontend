import { createSlice } from '@reduxjs/toolkit'

export const MODAL_TYPES = Object.freeze({
  CANCEL_WORKOUT: "CANCEL_WORKOUT",
  START_WORKOUT : "START_WORKOUT",
  DELETE_WORKOUT: "DELETE_WORKOUT",
  UPDATE_REST: "UPDATE_REST",
  CHANGE_SET: "CHANGE_SET",
  CONFIRM: "CONFIRM"
});

const modalSlice = createSlice({
  name: 'modal',
  initialState: null,
  reducers: {
    setModal(state, action) {
      const { openModal } = action.payload;
      return openModal;
    },
    clearModal() {
      return null;
    }
  }
});

export const { setModal, clearModal } = modalSlice.actions;
export default modalSlice.reducer;