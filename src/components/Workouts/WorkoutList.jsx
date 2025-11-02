import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { resetWorkout } from "../../reducers/focusedWorkout"
import { useEffect } from "react"
import { initializeWorkouts } from "../../reducers/workouts"
import useFetch from "../../hooks/useFetch"
import { formatExerciseNames } from "../../utils/helper";
import { Button } from "react-bootstrap"

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
        <ul className="no-bullets">
          {workouts.map(workout =>
            <li key={workout.id}>
              <div className="card my-2 p-2 col-xs-12 col-md-11 col-lg-7">
                <div className="row">
                  <Link
                    className="col-auto"
                    to={`/workouts/${workout.id}`}
                  >
                    {workout.name}
                  </Link>
                </div>
                <div className="row">
                <p className="card-text">{formatExerciseNames(workout.exerciseNames)}</p>
                </div>
              </div>
            </li>)}
        </ul>
      }
      <Button variant="primary" onClick={navigateToNewWorkoutForm}>New Workout</Button>
    </div>
  )
}

export default WorkoutList