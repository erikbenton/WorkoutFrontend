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
      <div className="container">
        <div className="row align-items-center">
          <h2 className="col-auto">
            <Link to={`/exercises/${exerciseGroup.exercise.id}`}>
              {exerciseGroup.exercise.name}
            </Link>
          </h2>
          <Button className="col-auto" type="button" onClick={replaceExercise}>replace exercise</Button>
        </div>
        <div className="row">
          {exerciseGroup.note && <p>{exerciseGroup.note}</p>}
        </div>
        {exerciseGroup.exerciseSets.length > 0 &&
          <div className="row row-cols-auto m-1 justify-content-center align-items-center text-center">
            <span className="col-3">Reps</span>
            <span className="col-5">Weight</span>
            <span className="col-4"></span>
          </div>
        }
        {exerciseGroup.exerciseSets.map(set => (
          <ActiveExerciseSet key={set.key} groupKey={exerciseGroup.key} set={set} />
        ))}
        <div className="row justify-content-center">
          <Button className="col-3" type="button" onClick={addSet}>Add set</Button>
        </div>
        <div className="row row-cols-auto my-3 align-items-center">
          <label className="col-form-label">Comment</label>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              id={`comment_${exerciseGroup.key}`}
              value={exerciseGroup.comment ?? ""}
              onChange={(e) => updateGroup(e)}
            />
          </div>
        </div>
        <div className="row justify-content-center mb-3">
          <Button
            className="col-3"
            disabled={index === 0}
            variant="outline-primary"
            type="button"
            onClick={() => shiftActiveExercise(-1)}
          >
            Prev Exercise
          </Button>
          <Button
            className="col-3"
            disabled={index === maxIndex}
            type="button"
            onClick={() => shiftActiveExercise(1)}
          >
            Next Exercise
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ActiveExerciseGroup;