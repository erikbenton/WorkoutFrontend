import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getWorkoutDetails } from "../../reducers/focusedWorkout";
import { deleteWorkout } from "../../reducers/workouts";
import { initializeRunningWorkout } from "../../reducers/runningWorkout";
import { Button } from "react-bootstrap";

const WorkoutDetails = () => {
  const id = Number(useParams().id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const workout = useSelector(state => state.focusedWorkout);
  const runningWorkout = useSelector(state => state.runningWorkout);

  useEffect(() => {
    dispatch(getWorkoutDetails(id));
  }, [dispatch, id]);

  const navigateToEditWorkoutForm = () => {
    navigate(`/workouts/edit/${workout.id}`);
  }

  const navigateToRunningWorkout = () => {
    if (runningWorkout) {
      const response = confirm("There is already a workout running. Do you want to cancel that workout and run this one instead?");
      if (!response) {
        return; // don't reset the workout
      }
    }
    dispatch(initializeRunningWorkout(workout.id));
    navigate("/runningWorkout");
  }

  const removeWorkout = (workout) => {
    const response = confirm(`Delete workout ${workout.name}?`);
    if (response) {
      dispatch(deleteWorkout(workout));
      navigate("/workouts");
    }
  }

  if (!workout.id) {
    return (
      <div>
        Loading data...
      </div>
    );
  }

  const repsText = set =>
    `${set.minReps ? set.minReps : ""}
    ${set.minReps && set.maxReps ? "-" : ""}
    ${set.maxReps ? set.maxReps : ""}`;

  const weightText = set => set.weight !== null ? `x ${set.weight} lbs` : "reps"

  return (
    <>
      <h2>{workout.name}</h2>
      <ol>
        {workout.exerciseGroups.map(group =>
          <li key={group.key}>
            <Link to={`/exercises/${group.exercise.id}`}>{group.exercise.name}</Link>
            {group.note && <p>{group.note}</p>}
            <ol>
              {group.exerciseSets.map(set =>
                <li key={set.key}>
                  {repsText(set)} {weightText(set)}
                </li>)}
            </ol>
          </li>
        )}
      </ol>
      <Button variant="outline-primary"><Link to="/workouts">View all workouts</Link></Button>
      <Button variant="success" onClick={navigateToEditWorkoutForm}>Edit Workout</Button>
      <Button onClick={navigateToRunningWorkout}>Run this Workout</Button>
      <Button variant="danger" type="button" onClick={() => removeWorkout(workout)}>Delete?</Button>
    </>
  )
}

export default WorkoutDetails