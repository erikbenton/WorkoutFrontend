import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { initializeActiveWorkout, initializeRunningWorkout } from "../../reducers/runningWorkout";
import { Link } from "react-router-dom";
import { formatExerciseNames } from "../../utils/helper";
import { Button } from "react-bootstrap";

const AvailableWorkouts = () => {
  const { data: workouts, loading, error } = useFetch('workouts');
  const dispatch = useDispatch();

  const selectWorkout = workout => {
    dispatch(initializeRunningWorkout(workout.id));
  }

  const startEmptyWorkout = () => {
    dispatch(initializeActiveWorkout(null))
  }

  if (loading) return <h1>Loading workouts...</h1>
  if (error) return <h1>Error getting workouts</h1>

  return (
    <div className="container">
      <h1>Choose a workout</h1>
      <ul className="no-bullets">
        {workouts.map(workout =>
          <li key={workout.id}>
            <div className="card my-2 col-xs-12 col-md-11 col-lg-7">
              <div className="card-header">
                <div className="row">
                  <Link
                    className="col-auto"
                    onClick={() => selectWorkout(workout)}
                  >
                    {workout.name}
                  </Link>
                </div>
              </div>
              <div className="card-body py-1">
                <div className="row">
                  <p className="card-text">{formatExerciseNames(workout.exerciseNames)}</p>
                </div>
              </div>
            </div>
          </li>)}
      </ul>
      <Button variant="primary" type="button" onClick={startEmptyWorkout}>Start an Empty Workout</Button>
    </div>
  )
}

export default AvailableWorkouts;