import { Link, Routes, Route, useMatch } from 'react-router-dom'
import WorkoutList from './components/Workouts/WorkoutList'
import Home from './components/Home'
import WorkoutDetails from './components/Workouts/WorkoutDetails'
import ExerciseList from './components/Exercises/ExerciseList'
import ExerciseDetails from './components/Exercises/ExerciseDetails'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeBodyParts } from './reducers/bodyParts'
import { initializeEquipment } from './reducers/equipment'
import WorkoutForm from './components/Workouts/WorkoutForm'
import EditExerciseForm from './components/Exercises/EditExerciseForm'
import ExerciseForm from './components/Exercises/ExerciseForm'
import EditWorkoutForm from './components/Workouts/EditWorkoutForm'
import RunningWorkout from './components/RunningWorkout/RunningWorkout'

const Menu = () => {
  const match = useMatch("/runningWorkout")
  const runningWorkout = useSelector(state => state.runningWorkout)
  const padding = {
    padding: '0.25rem'
  }
  return (
    <div>
      <Link style={padding} to='/'>Home</Link>
      <Link style={padding} to='/Programs'>Programs</Link>
      <Link style={padding} to='/Workouts'>Workouts</Link>
      <Link style={padding} to='/Exercises'>Exercises</Link>
      {(!match || !runningWorkout)
        && <Link style={padding} to="/runningWorkout">
          {runningWorkout ? 'Continue Workout' : 'Do a Workout'}
        </Link>}
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBodyParts())
    dispatch(initializeEquipment())
  }, [dispatch])

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Workout routes */}
        <Route path="/workouts" element={<WorkoutList />} />
        <Route path="/workouts/:id" element={<WorkoutDetails />} />
        <Route path="/workouts/create" element={<WorkoutForm workout={null} />} />
        <Route path="/workouts/edit/:id" element={<EditWorkoutForm />} />
        {/* Exercise routes */}
        <Route path="/exercises" element={<ExerciseList />} />
        <Route path="/exercises/:id" element={<ExerciseDetails />} />
        <Route path="/exercises/create" element={<ExerciseForm exercise={null} />} />
        <Route path="/exercises/edit/:id" element={<EditExerciseForm />} />
        <Route path="/runningWorkout" element={<RunningWorkout />} />
      </Routes>
    </>
  )
}

export default App
