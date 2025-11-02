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

  const formattedDuration = (duration) => {
    const [hours, minutes, seconds] = duration.split(":");
    const hoursText = hours === "00"
      ? ""
      : `${hours}hr `;
    const minutesText = minutes === "00"
      ? ""
      : `${minutes}min `;
    const secondsText = seconds === "00"
      ? ""
      : `${seconds}s`;

    return `${hoursText.replace(/^0/, "")}${minutesText.replace(/^0/, "")}${secondsText.replace(/^0/, "")}`;
  }

  return (
    <div>
      <h2>Workout Histories</h2>
      <ul>
        {completedWorkouts.map(workout =>
          <li key={workout.id}>
            <div className="card my-2 p-2 col-md-8 col-lg-5">
              <div className="row">
                <Link
                  to={`/completedWorkouts/${workout.id}`}
                >
                  {workout.name} - {getFormatedCompletion(workout)}
                </Link>
              </div>
              <div className="row">
                <p className="card-text mb-1">{workout.numberOfExerciseGroups} exercises completed</p>
                <p className="card-text">Duration: {formattedDuration(workout.duration)}</p>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default CompletedWorkoutHistoryList;