import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearActiveExerciseGroup,
  updateExerciseGroup,
  addExerciseSet,
  selectActiveExerciseGroup,
  updateActiveExerciseGroupExercise
} from "../../reducers/runningWorkout";
import ActiveExerciseSet from "./ActiveExerciseSet";
import { useEffect } from "react";
import ReplaceExercise from "../Exercises/ReplaceExercise";

const ActiveExerciseGroup = ({
  exerciseGroup,
  index,
  maxIndex,
  selectingExercises,
  setSelectingExercises,
  selectedExercises,
  setSelectedExercises }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!selectingExercises && selectedExercises.length > 0) {
      const exercisesToAdd = [...selectedExercises]
      dispatch(updateExerciseGroup({
        groupKey: exerciseGroup.key,
        field: "exercise",
        value: exercisesToAdd[0]
      }));
      dispatch(updateActiveExerciseGroupExercise(exercisesToAdd[0]))
      setSelectedExercises([]);
    }
  }, [dispatch, selectingExercises, selectedExercises, setSelectedExercises, exerciseGroup])

  const backToSummary = () => {
    dispatch(clearActiveExerciseGroup())
  }

  const updateGroup = (e) => {
    const [field] = e.target.id.split("_");
    const value = e.target.value;
    dispatch(updateExerciseGroup({
      groupKey: exerciseGroup.key,
      field,
      value
    }))
  }

  const addSet = () => {
    dispatch(addExerciseSet({ groupKey: exerciseGroup.key }))
  }

  const shiftActiveExercise = shift => {
    dispatch(selectActiveExerciseGroup(index + shift))
  }

  const replaceExercise = () => {
    setSelectingExercises(true);
  }

  if (selectingExercises) return (
    <ReplaceExercise
      setSelectingExercises={setSelectingExercises}
      setSelectedExercises={setSelectedExercises}
      selectedExercises={selectedExercises}
    />
  )

  return (
    <div>
      <button type="button" onClick={backToSummary}>Back to summary</button>
      <h2>
        <Link to={`/exercises/${exerciseGroup.exercise.id}`}>
          {exerciseGroup.exercise.name}
        </Link>
        <button type="button" onClick={replaceExercise}>replace exercise</button>
      </h2>
      {exerciseGroup.note && <p>{exerciseGroup.note}</p>}
      <ol>
        {exerciseGroup.exerciseSets.map(set => (
          <ActiveExerciseSet key={set.key} groupKey={exerciseGroup.key} set={set} />
        ))}
      </ol>
      <button type="button" onClick={addSet}>Add set</button>
      <br />
      <label>Comment
        <input type="text" id={`comment_${exerciseGroup.key}`} value={exerciseGroup.comment ?? ""} onChange={(e) => updateGroup(e)} />
      </label>
      <br />
      {index > 0 && <button type="button" onClick={() => shiftActiveExercise(-1)}>Prev Exercise</button>}
      {index < maxIndex && <button type="button" onClick={() => shiftActiveExercise(1)}>Next Exercise</button>}
    </div>
  )
}

export default ActiveExerciseGroup;