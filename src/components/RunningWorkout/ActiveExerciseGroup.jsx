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
import { Button } from "react-bootstrap";

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
      <Button variant="outline-primary" type="button" onClick={backToSummary}>Back to summary</Button>
      <h2>
        <Link to={`/exercises/${exerciseGroup.exercise.id}`}>
          {exerciseGroup.exercise.name}
        </Link>
        <Button type="button" onClick={replaceExercise}>replace exercise</Button>
      </h2>
      {exerciseGroup.note && <p>{exerciseGroup.note}</p>}
      <ol>
        {exerciseGroup.exerciseSets.map(set => (
          <ActiveExerciseSet key={set.key} groupKey={exerciseGroup.key} set={set} />
        ))}
      </ol>
      <Button type="button" onClick={addSet}>Add set</Button>
      <br />
      <label>Comment
        <input type="text" id={`comment_${exerciseGroup.key}`} value={exerciseGroup.comment ?? ""} onChange={(e) => updateGroup(e)} />
      </label>
      <br />
      {index > 0 && <Button variant="outline-primary" type="button" onClick={() => shiftActiveExercise(-1)}>Prev Exercise</Button>}
      {index < maxIndex && <Button type="button" onClick={() => shiftActiveExercise(1)}>Next Exercise</Button>}
    </div>
  )
}

export default ActiveExerciseGroup;