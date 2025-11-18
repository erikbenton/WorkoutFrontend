import { useDispatch, useSelector } from "react-redux";
import { clearRunningWorkout } from "../../reducers/runningWorkout";
import AvailableWorkouts from "./AvailableWorkouts";
import ActiveExerciseGroup from "./ActiveExerciseGroup";
import RunningWorkoutSummary from "./RunningWorkoutSummary";
import RunningWorkoutName from "./RunningWorkoutName";
import { createCompletedWorkout } from "../../utils/helper";
import completedWorkoutService from "../../services/completedWorkout"
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ExerciseHistoryList from "../Exercises/ExerciseHistoryList";

const RunningWorkout = () => {
  const runningWorkout = useSelector(state => state.runningWorkout);
  const exerciseSelection = useSelector(state => state.exerciseSelection);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelWorkout = () => {
    const cancelingWorkout = confirm("Cancel the current workout?")
    if (cancelingWorkout) {
      dispatch(clearRunningWorkout())
    }
  }

  const completeWorkout = async () => {
    const completedWorkout = createCompletedWorkout(runningWorkout);
    try {
      const savedCompletedWorkout = await completedWorkoutService
        .create(completedWorkout);
      dispatch(clearRunningWorkout());
      navigate(`/completedWorkouts/${savedCompletedWorkout.id}`);
    } catch (e) {
      console.error(e);
    }
  }

  // if no running workout, show list of available workouts
  if (!runningWorkout) {
    return (
      <AvailableWorkouts />
    )
  }

  // if no exercise is active in the workout
  // show a summary of the workout
  return (
    <div>
      <RunningWorkoutName />
      {!runningWorkout.activeExerciseGroup
        ? <RunningWorkoutSummary />
        : <ActiveExerciseGroup
          exerciseGroup={runningWorkout.exerciseGroups
            .find(group => group.key === runningWorkout.activeExerciseGroup.key)}
          index={runningWorkout.activeExerciseGroup.index}
          maxIndex={runningWorkout.exerciseGroups.length - 1}
        />
      }
      {!exerciseSelection.selectingExercises &&
        <div className="row justify-content-center">
          <Button className="col-4 col-md-3 col-lg-2" variant="danger" type="button" onClick={cancelWorkout}>Cancel workout</Button>
          <Button className="col-4 col-md-3 col-lg-2" variant="success" type="button" onClick={completeWorkout}>Finish workout</Button>
        </div>
      }
      {runningWorkout.activeExerciseGroup && <ExerciseHistoryList exercise={runningWorkout.activeExerciseGroup.exercise} />}
    </div>
  )
}

export default RunningWorkout;