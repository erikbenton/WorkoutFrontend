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
    <div>
      <h1>Choose a workout</h1>
      <ul>
        {workouts.map(workout => (
          <li key={workout.id}>
            <Link onClick={() => selectWorkout(workout)}>
              {workout.name}
            </Link>
            <p>{formatExerciseNames(workout.exerciseNames)}</p>
          </li>
        ))}
      </ul>
      <Button variant="primary" type="button" onClick={startEmptyWorkout}>Start an Empty Workout</Button>
    </div>
  )
}

export default AvailableWorkouts;