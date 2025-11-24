import { useDispatch, useSelector } from "react-redux";
import AvailableWorkouts from "./AvailableWorkouts";
import ActiveExerciseGroup from "./ActiveExerciseGroup";
import RunningWorkoutSummary from "./RunningWorkoutSummary";
import RunningWorkoutName from "./RunningWorkoutName";
import ExerciseHistoryTabs from "../Exercises/ExerciseHistoryTabs";
import { MODAL_TYPES } from "../../reducers/modals";
import ConfirmModal from "../Modals/ConfirmModal";
import { clearRunningWorkout } from "../../reducers/runningWorkout";

const RunningWorkout = () => {
  const runningWorkout = useSelector(state => state.runningWorkout);
  const exerciseSelection = useSelector(state => state.exerciseSelection);
  const modals = useSelector(state => state.modals);
  const dispatch = useDispatch();

  // if no running workout, show list of available workouts
  if (!runningWorkout) {
    return (
      <AvailableWorkouts />
    )
  }

  const showCancelModal = modals === MODAL_TYPES.CANCEL_WORKOUT;

  // if no exercise is active in the workout
  // show a summary of the workout
  return (
    <div className="container-flex">
      {showCancelModal &&
        <ConfirmModal
          show={showCancelModal}
          body="Cancel the current workout?"
          header="Cancel workout"
          confirmModal={() => dispatch(clearRunningWorkout())}
        />}
      {!exerciseSelection.selectingExercises &&
        <RunningWorkoutName />
      }
      <div className="container">
        {!runningWorkout.activeExerciseGroup
          ? <RunningWorkoutSummary />
          : <ActiveExerciseGroup
            exerciseGroup={runningWorkout.exerciseGroups
              .find(group => group.key === runningWorkout.activeExerciseGroup.key)}
            index={runningWorkout.activeExerciseGroup.index}
            maxIndex={runningWorkout.exerciseGroups.length - 1}
          />
        }
      </div>
      {!exerciseSelection.selectingExercises
        && runningWorkout.activeExerciseGroup
        && <ExerciseHistoryTabs exercise={runningWorkout.activeExerciseGroup.exercise} />
      }
    </div>
  )
}

export default RunningWorkout;