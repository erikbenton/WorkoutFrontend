import { useDispatch, useSelector } from "react-redux";
import { selectActiveExerciseGroup, shiftExerciseGroup, removeExerciseGroup, addMultipleExerciseGroups } from "../../reducers/runningWorkout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ExercisesSelection from "../Exercises/ExercisesSelection";


const RunningWorkoutSummary = () => {
  const [selectingExercises, setSelectingExercises] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const runningWorkout = useSelector(state => state.runningWorkout)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!selectingExercises && selectedExercises.length > 0) {
      const exercisesToAdd = [...selectedExercises]
      dispatch(addMultipleExerciseGroups(exercisesToAdd));
      setSelectedExercises([]);
    }
  }, [dispatch, selectingExercises, selectedExercises])

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

  if (selectingExercises) return (
    <ExercisesSelection
      setSelectingExercises={setSelectingExercises}
      setSelectedExercises={setSelectedExercises} />
  )

  return (
    <div>
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
      <button type="button" onClick={() => setSelectingExercises(true)}>Add exercises</button>
    </div>
  )
}

export default RunningWorkoutSummary;