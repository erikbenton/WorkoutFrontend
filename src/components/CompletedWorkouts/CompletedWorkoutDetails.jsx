import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Button } from "react-bootstrap";
import completedWorkoutService from "../../services/completedWorkout";


const CompletedWorkoutDetails = () => {
  const id = Number(useParams().id);
  const navigate = useNavigate();
  const { data: completedWorkout, loading, error } = useFetch(`completedWorkouts/${id}`);

  if (loading) return <h1>Loading workout...</h1>
  if (error) return <h1>error</h1>

  const getFormatedCompletion = (workout) => {
    const dateNoTime = workout.createdAt.split("T")[0];
    return dateNoTime;
  }

  const deleteWorkout = async (workout) => {
    const response = confirm(`Delete workout ${workout.name}?`);
    if (response) {
      try {
        await completedWorkoutService.remove(workout.id)
        navigate("/completedWorkouts");
      } catch (error) {
        console.error(error);
      }
    }
  }

  const totalReps = group => group.completedExerciseSets.reduce((acc, curr) => acc + curr.reps, 0);
  const totalWeight = group => group.completedExerciseSets.reduce((acc, curr) => acc + (curr.weight ?? 0), 0);

  return (
    <div className="container">
      <h1>{completedWorkout.name} - {getFormatedCompletion(completedWorkout)}</h1>
      <p>Duration: {completedWorkout.duration}</p>
      <ol className="no-bullets">
        {completedWorkout.completedExerciseGroups.map(group =>
          <li key={group.id}>
            <div className="card my-2">
              <div className="card-header">
                <Link to={`/exercises/${group.exercise.id}`}>{group.exercise.name}</Link>
              </div>
              <div className="card-body">
                {group.comment && <span className="card-text">{group.comment}</span>}
                <ol className="list-group list-group-flush">
                  {group.completedExerciseSets.map(set =>
                    <li className="list-group-item ps-0" key={set.id}>
                      {set.reps} reps {set.weight ? `x ${set.weight} lbs` : ''}
                    </li>
                  )}
                </ol>
              </div>
              <span className="card-footer">
                <span className="badge text-bg-primary">Reps: {totalReps(group)}</span>
                <span className="ms-1 badge text-bg-success">
                  {totalWeight(group) === 0 ? "" : `Weight: ${totalWeight(group)} lbs`}
                </span>
              </span>
            </div>
          </li>
        )}
      </ol>
      <Link to="/completedWorkouts">
        <Button variant="outline-primary">
          Workout Histories
        </Button>
      </Link>
      <Button
        variant="danger"
        type="button"
        className="ms-1"
        onClick={() => deleteWorkout(completedWorkout)}
      >
        Delete?
      </Button>
    </div>
  )
}

export default CompletedWorkoutDetails;