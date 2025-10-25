import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { initializeRunningWorkout } from "../../reducers/runningWorkout";
import { Link } from "react-router-dom";

const AvailableWorkouts = () => {
  const { data: workouts, loading, error } = useFetch('workouts');
  const dispatch = useDispatch();

  const selectWorkout = workout => {
    dispatch(initializeRunningWorkout(workout.id));
  }

  if (loading) return <h1>Loading workouts...</h1>
  if (error) return <h1>Error getting workouts</h1>

  return (
    <ul>
      {workouts.map(workout => (
        <li key={workout.id} onClick={() => selectWorkout(workout)}>
          <Link>
            {workout.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default AvailableWorkouts;