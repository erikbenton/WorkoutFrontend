import { createSlice } from '@reduxjs/toolkit'
import equipmentService from '../services/equipment'

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: [],
  reducers: {
    setEquipment(state, action) {
      return action.payload
    }
  }
})

export const initializeEquipment = () => {
  return async dispatch => {
    const equipment = await equipmentService.getAll()
    dispatch(setEquipment(equipment))
  }
}

export const { setEquipment } = equipmentSlice.actions
export default equipmentSlice.reducer