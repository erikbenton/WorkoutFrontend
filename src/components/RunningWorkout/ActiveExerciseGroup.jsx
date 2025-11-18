import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateExerciseGroup,
  addExerciseSet,
  selectActiveExerciseGroup,
  updateActiveExerciseGroupExercise
} from "../../reducers/runningWorkout";
import ActiveExerciseSet from "./ActiveExerciseSet";
import { useEffect } from "react";
import ReplaceExercise from "../Exercises/ReplaceExercise";
import { Button } from "react-bootstrap";
import { cancelExerciseSelection } from "../../reducers/exerciseSelection";

const ActiveExerciseGroup = ({
  exerciseGroup,
  index,
  maxIndex}) => {
  const dispatch = useDispatch();
  const exerciseSelection = useSelector(state => state.exerciseSelection);

  useEffect(() => {
    if (!exerciseSelection.selectingExercises && exerciseSelection.exercisesSelected.length > 0) {
      const exercisesToAdd = [...exerciseSelection.exercisesSelected]
      dispatch(updateExerciseGroup({
        groupKey: exerciseGroup.key,
        field: "exercise",
        value: exercisesToAdd[0]
      }));
      dispatch(updateActiveExerciseGroupExercise(exercisesToAdd[0]))
      dispatch(cancelExerciseSelection());
    }
  }, [dispatch, exerciseSelection, exerciseGroup])

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

  if (exerciseSelection.selectingExercises) return (
    <ReplaceExercise />
  )

  return (
    <div>
      <div className="row my-2">
        <h2 className="col-auto m-0">
          <Link to={`/exercises/${exerciseGroup.exercise.id}`}>
            {exerciseGroup.exercise.name}
          </Link>
        </h2>
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
        <ActiveExerciseSet key={set.key} groupKey={exerciseGroup.key} restTime={exerciseGroup.restTime} set={set} />
      ))}
      <div className="row justify-content-center">
        <Button className="col-3 mt-2" type="button" onClick={addSet}>Add set</Button>
      </div>
      <div className="row row-cols-auto my-3 align-items-center">
        <label className="col-form-label">Comment</label>
        <div className="col-9">
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
          className="col-4 col-md-2 text-nowrap"
          disabled={index === 0}
          variant="outline-primary"
          type="button"
          onClick={() => shiftActiveExercise(-1)}
        >
          Prev Exercise
        </Button>
        <Button
          className="col-4 col-md-2 text-nowrap"
          disabled={index === maxIndex}
          type="button"
          onClick={() => shiftActiveExercise(1)}
        >
          Next Exercise
        </Button>
      </div>
    </div>
  )
}

export default ActiveExerciseGroup;