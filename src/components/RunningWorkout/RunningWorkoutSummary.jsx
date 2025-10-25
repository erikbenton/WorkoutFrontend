import { useDispatch, useSelector } from "react-redux";
import { selectActiveExerciseGroup, shiftExerciseGroup, removeExerciseGroup } from "../../reducers/runningWorkout";
import { Link } from "react-router-dom";


const RunningWorkoutSummary = () => {
  const runningWorkout = useSelector(state => state.runningWorkout)
  const dispatch = useDispatch()

  const selectExerciseGroup = (index) => {
    dispatch(selectActiveExerciseGroup(index))
  }

  const shiftGroup = (group, shiftAmount) => {
    dispatch(shiftExerciseGroup({
      groupKey: group.key,
      shiftAmount
    }));
  }

  const removeGroup = (group) => {
    dispatch(removeExerciseGroup({ groupKey: group.key }))
  }

  return (
    <>
      <ol>
        {runningWorkout.exerciseGroups.map((group, index) => (
          <li key={group.key}>
            <Link onClick={() => selectExerciseGroup(index)}>
              {group.exercise.name} - {group.exerciseSets.length} sets
            </Link>
            <button type="button" onClick={() => shiftGroup(group, -1)}>shift UP</button>
            <button type="button" onClick={() => shiftGroup(group, 1)}>shift DOWN</button>
            <button type="button" onClick={() => removeGroup(group)}>remove</button>
          </li>
        ))}
      </ol>
    </>
  )
}

export default RunningWorkoutSummary;