import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import exercisesReducer from './reducers/exercises'
import workoutsReducer from './reducers/workouts'
import bodyPartsReducer from './reducers/bodyParts'
import equipmentReducer from './reducers/equipment'
import focusedWorkoutReducer from './reducers/focusedWorkout'
import runningWorkoutReducer from './reducers/runningWorkout.js'
import App from './App.jsx'

const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    workouts: workoutsReducer,
    bodyParts: bodyPartsReducer,
    equipment: equipmentReducer,
    focusedWorkout: focusedWorkoutReducer,
    runningWorkout: runningWorkoutReducer,
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
)
