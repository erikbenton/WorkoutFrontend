import { useDispatch, useSelector } from "react-redux";
import { selectActiveExerciseGroup, addMultipleExerciseGroups } from "../../reducers/runningWorkout";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ExercisesSelection from "../Exercises/ExercisesSelection";
import ActiveGroupOptions from "./ActiveGroupOptions";
import { Button } from "react-bootstrap";

const RunningWorkoutSummary = ({
  selectingExercises,
  setSelectingExercises,
  selectedExercises,
  setSelectedExercises }) => {
  const runningWorkout = useSelector(state => state.runningWorkout)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!selectingExercises && selectedExercises.length > 0) {
      const exercisesToAdd = [...selectedExercises]
      dispatch(addMultipleExerciseGroups(exercisesToAdd));
      setSelectedExercises([]);
    }
  }, [dispatch, selectingExercises, selectedExercises, setSelectedExercises])

  const selectExerciseGroup = (index) => {
    dispatch(selectActiveExerciseGroup(index))
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
            <ActiveGroupOptions key={group.key} exerciseGroup={group} />
          </li>
        ))}
      </ol>
      <Button type="button" onClick={() => setSelectingExercises(true)}>Add exercises</Button>
    </div>
  )
}

export default RunningWorkoutSummary;