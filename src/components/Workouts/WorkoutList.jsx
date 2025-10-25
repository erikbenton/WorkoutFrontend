import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { resetWorkout } from "../../reducers/focusedWorkout"
import { useEffect } from "react"
import { initializeWorkouts } from "../../reducers/workouts"


const WorkoutList = () => {
  const workouts = useSelector(state => state.workouts)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeWorkouts())
  }, [dispatch])

  const navigateToNewWorkoutForm = () => {
    dispatch(resetWorkout())
    navigate('/workouts/create')
  }

  return (
    <div>
      <h2>Workouts</h2>
      {
        workouts &&
        <ul>
          {workouts.map(workout =>
          <li key={workout.id}>
            <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
          </li>)}
        </ul>
      }
      <button onClick={navigateToNewWorkoutForm}>New Workout</button>
    </div>
  )
}

export default WorkoutList