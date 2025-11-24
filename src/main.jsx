import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import bodyPartsReducer from './reducers/bodyParts'
import equipmentReducer from './reducers/equipment'
import focusedWorkoutReducer from './reducers/focusedWorkout'
import runningWorkoutReducer from './reducers/runningWorkout.js'
import App from './App.jsx'
import "./index.css"
import { loadFromLocalStorage, saveToLocalStorage } from './utils/helper.js'
import exerciseSelectionReducer from './reducers/exerciseSelection.js'
import modalsReducer from "./reducers/modals.js"

const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    bodyParts: bodyPartsReducer,
    equipment: equipmentReducer,
    focusedWorkout: focusedWorkoutReducer,
    runningWorkout: runningWorkoutReducer,
    exerciseSelection: exerciseSelectionReducer,
    modals: modalsReducer,
  },
  preloadedState
});

store.subscribe(() => saveToLocalStorage(store.getState()));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
)
