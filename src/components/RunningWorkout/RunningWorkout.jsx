import { useDispatch, useSelector } from "react-redux";
import AvailableWorkouts from "./AvailableWorkouts";
import ActiveExerciseGroup from "./ActiveExerciseGroup";
import RunningWorkoutSummary from "./RunningWorkoutSummary";
import RunningWorkoutName from "./RunningWorkoutName";
import ExerciseHistoryTabs from "../Exercises/ExerciseHistoryTabs";
import { MODAL_TYPES } from "../../reducers/modals";
import ConfirmModal from "../Modals/ConfirmModal";
import { clearRunningWorkout } from "../../reducers/runningWorkout";
import UpdateActiveSetModal from "../Modals/UpdateActiveSetModal";
import EnterActiveSetDetailsModal from "../Modals/EnterActiveSetDetailsModal";

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
  const showUpdateSetModal = modals === MODAL_TYPES.UPDATE_SET;
  const showEnterSetDetailsModal = modals === MODAL_TYPES.ENTER_SET;
  const activeGroup = runningWorkout.activeExerciseGroup
    ? runningWorkout.exerciseGroups.find(g => g.key === runningWorkout.activeExerciseGroup.key)
    : null;
  const activeSet = activeGroup && runningWorkout.editingSetKey
    ? activeGroup.exerciseSets.find(s => s.key === runningWorkout.editingSetKey)
    : null;

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
      {showUpdateSetModal &&
        <UpdateActiveSetModal
          set={activeSet}
          groupKey={activeGroup.key}
          show={showUpdateSetModal}
        />}
      {showEnterSetDetailsModal && <EnterActiveSetDetailsModal show={showEnterSetDetailsModal} set={activeSet} groupKey={activeGroup.key} />}
      {!exerciseSelection.selectingExercises &&
        <RunningWorkoutName />
      }
      <div className="container">
        {!runningWorkout.activeExerciseGroup
          ? <RunningWorkoutSummary />
          : <ActiveExerciseGroup
            exerciseGroup={activeGroup}
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