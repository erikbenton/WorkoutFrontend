import { useDispatch, useSelector } from "react-redux";
import { clearRunningWorkout } from "../../reducers/runningWorkout";
import AvailableWorkouts from "./AvailableWorkouts";
import ActiveExerciseGroup from "./ActiveExerciseGroup";
import RunningWorkoutSummary from "./RunningWorkoutSummary";
import { useState } from "react";
import RunningWorkoutName from "./RunningWorkoutName";
import { createCompletedWorkout } from "../../utils/helper";
import completedWorkoutService from "../../services/completedWorkout"

const RunningWorkout = () => {
  const [selectingExercises, setSelectingExercises] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const runningWorkout = useSelector(state => state.runningWorkout);
  const dispatch = useDispatch();

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
        ? <RunningWorkoutSummary
          selectingExercises={selectingExercises}
          setSelectingExercises={setSelectingExercises}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
        />
        : <ActiveExerciseGroup
          exerciseGroup={runningWorkout.exerciseGroups
            .find(group => group.key === runningWorkout.activeExerciseGroup.key)}
          index={runningWorkout.activeExerciseGroup.index}
          maxIndex={runningWorkout.exerciseGroups.length - 1}
          selectingExercises={selectingExercises}
          setSelectingExercises={setSelectingExercises}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
        />
      }
      <button type="button" onClick={cancelWorkout}>Cancel workout</button>
      <button type="button" onClick={completeWorkout}>Complete workout</button>
    </div>
  )
}

export default RunningWorkout;