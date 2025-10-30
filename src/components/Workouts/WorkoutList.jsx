import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { resetWorkout } from "../../reducers/focusedWorkout"
import { useEffect } from "react"
import { initializeWorkouts } from "../../reducers/workouts"
import useFetch from "../../hooks/useFetch"
import { formatExerciseNames } from "../../utils/helper";

const WorkoutList = () => {
  const { data: workouts, loading, error } = useFetch("workouts");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeWorkouts())
  }, [dispatch])

  const navigateToNewWorkoutForm = () => {
    dispatch(resetWorkout())
    navigate('/workouts/create')
  }

  if (loading) return <h1>Loading workouts...</h1>;
  if (error) return <h1>Unable to get workouts: {error.status}</h1>;

  return (
    <div>
      <h2>Workouts</h2>
      {
        workouts &&
        <ul>
          {workouts.map(workout =>
          <li key={workout.id}>
            <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
            <p>{formatExerciseNames(workout.exerciseNames)}</p>
          </li>)}
        </ul>
      }
      <button onClick={navigateToNewWorkoutForm}>New Workout</button>
    </div>
  )
}

export default WorkoutList