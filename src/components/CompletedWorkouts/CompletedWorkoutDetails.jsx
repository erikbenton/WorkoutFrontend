import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Button } from "react-bootstrap";


const CompletedWorkoutDetails = () => {
  const id = Number(useParams().id);
  const { data: completedWorkout, loading, error } = useFetch(`completedWorkouts/${id}`);

  if (loading) return <h1>Loading workout...</h1>
  if (error) return <h1>error</h1>

  const getFormatedCompletion = (workout) => {
    const dateNoTime = workout.createdAt.split("T")[0];
    return dateNoTime;
  }

  return (
    <>
      <h1>{completedWorkout.name} - {getFormatedCompletion(completedWorkout)}</h1>
      <ol>
        {completedWorkout.completedExerciseGroups.map(group =>
          <li key={group.id}>
            <Link to={`/exercises/${group.exercise.id}`}>{group.exercise.name}</Link>
            {group.note && <p>{group.note}</p>}
            <ol>
              {group.completedExerciseSets.map(set =>
                <li key={set.id}>
                  {set.reps} reps {set.weight ? `x ${set.weight} lbs` : ''}
                </li>
              )}
            </ol>
          </li>
        )}
      </ol>
      <Button variant="outline-primary"><Link to="/completedWorkouts">Workout Histories</Link></Button>
    </>
  )
}

export default CompletedWorkoutDetails;