import { useSelector } from "react-redux";
import AvailableWorkouts from "./AvailableWorkouts";
import ActiveExerciseGroup from "./ActiveExerciseGroup";
import RunningWorkoutSummary from "./RunningWorkoutSummary";
import RunningWorkoutName from "./RunningWorkoutName";
import ExerciseHistoryList from "../Exercises/ExerciseHistoryList";

const RunningWorkout = () => {
  const runningWorkout = useSelector(state => state.runningWorkout);

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
      {runningWorkout.activeExerciseGroup && <ExerciseHistoryList exercise={runningWorkout.activeExerciseGroup.exercise} />}
    </div>
  )
}

export default RunningWorkout;