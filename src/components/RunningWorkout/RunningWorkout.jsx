import { useDispatch, useSelector } from "react-redux";
import { clearRunningWorkout } from "../../reducers/runningWorkout";
import AvailableWorkouts from "./AvailableWorkouts";
import ActiveExerciseGroup from "./ActiveExerciseGroup";
import RunningWorkoutSummary from "./RunningWorkoutSummary";
import { useState } from "react";

const RunningWorkout = () => {
  const [selectingExercises, setSelectingExercises] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const runningWorkout = useSelector(state => state.runningWorkout)
  const dispatch = useDispatch()

  const cancelWorkout = () => {
    const cancelingWorkout = confirm("Cancel the current workout?")
    if (cancelingWorkout) {
      dispatch(clearRunningWorkout())
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
      <h1>{runningWorkout.selectedWorkout.name}</h1>
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
    </div>
  )
}

export default RunningWorkout;