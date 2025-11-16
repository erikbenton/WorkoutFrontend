import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getWorkoutDetails } from "../../reducers/focusedWorkout";
import { deleteWorkout } from "../../reducers/workouts";
import { initializeRunningWorkout } from "../../reducers/runningWorkout";
import { Button } from "react-bootstrap";
import { setTypeColor } from "../../utils/setTypes";

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

  const restText = restTime => restTime.split(":").slice(1).join(":");

  return (
    <>
      <h2>{workout.name}</h2>
      {workout.description &&
        <p className="lead fs-6">
          {workout.description}
        </p>
      }
      <ol className="no-bullets">
        {workout.exerciseGroups.map(group =>
          <li key={group.key}>
            <div className="card my-2">
              <div className="card-header">
                <div className="row">
                  <Link className="col-auto" to={`/exercises/${group.exercise.id}`}>{group.exercise.name}</Link>
                  {group.restTime && <span className="col-auto ms-auto">{restText(group.restTime)} Rest</span>}
                </div>
              </div>
              <div className="card-body">
                {group.note &&
                  <div className="card-text">
                    <span>{group.note}</span>
                  </div>}
              </div>
              <ol className="list-group list-group-flush">
                {group.exerciseSets.map(set =>
                  <li className="list-group-item" key={set.key}>
                    <div className="row">
                      <div className="col-3">
                        {repsText(set)}
                      </div>
                      <div className="col-auto">
                        <span className="badge" style={{ backgroundColor: setTypeColor(set) }}>{set.setType}</span>
                      </div>
                    </div>
                  </li>)}
              </ol>
            </div>
          </li>
        )}
      </ol>
      <Link to="/workouts"><Button variant="outline-primary">View all workouts</Button></Link>
      <Button variant="success" onClick={navigateToEditWorkoutForm}>Edit Workout</Button>
      <Button onClick={navigateToRunningWorkout}>Run this Workout</Button>
      <Button variant="danger" type="button" onClick={() => removeWorkout(workout)}>Delete?</Button>
    </>
  )
}

export default WorkoutDetails