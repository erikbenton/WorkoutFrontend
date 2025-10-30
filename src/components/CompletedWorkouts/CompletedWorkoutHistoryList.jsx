import { Link } from "react-router-dom"
import useFetch from "../../hooks/useFetch"


const CompletedWorkoutHistoryList = () => {
  const { data: completedWorkouts, loading, error } = useFetch('completedWorkouts');

  if (loading) return <h1>Loading workouts...</h1>
  if (error) return <h1>Error loading workouts</h1>

  const getFormatedCompletion = (workout) => {
    const dateNoTime = workout.completedAt.split("T")[0];
    return dateNoTime;
  }

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {completedWorkouts.map(workout =>
          <li key={workout.id}>
            <Link to={`/completedWorkouts/${workout.id}`}>{workout.name} - {getFormatedCompletion(workout)}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default CompletedWorkoutHistoryList;