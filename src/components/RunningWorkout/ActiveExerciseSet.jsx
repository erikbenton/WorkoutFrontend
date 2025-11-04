import { useDispatch } from "react-redux";
import { updateExerciseSet, removeExerciseSet, restartRestTimer } from "../../reducers/runningWorkout";
import { Button } from "react-bootstrap";
import { useState } from "react";


const ActiveExerciseSet = ({ groupKey, set, restTime }) => {
  const dispatch = useDispatch();
  // needed so user can edit set without resetting rest timer
  const [completed, setCompleted ] = useState(false);

  const updateSet = (e, set) => {
    const [field] = e.target.id.split("_");
    const value = e.target.value;
    dispatch(updateExerciseSet({
      groupKey,
      setKey: set.key,
      field,
      value
    }));
  }

  const removeSet = (set) => {
    dispatch(removeExerciseSet({
      groupKey,
      setKey: set.key
    }));
  }

  const toggleSetCompleted = (set, value) => {
    if (set.reps && set.reps > -1) {
      dispatch(updateExerciseSet({
        groupKey,
        setKey: set.key,
        field: "completed",
        value
      }));
      if (restTime && value && !completed) {
        setCompleted(true);
        dispatch(restartRestTimer(restTime))
      }
    } else {
      alert("A set's reps must be non-negative.")
    }
  }

  const repsPlaceholderText = set =>
    `${set.minReps ? set.minReps : ''}${(set.minReps && set.maxReps) ? '-' : ''}${set.maxReps ? set.maxReps : ''}`

  const weightPlaceholderText = set => set.targetWeight ? `${set.targetWeight} lbs` : ''

  return (
    <div className="row row-cols-auto m-1">
      <div className="col-3">
        <input
          disabled={set.completed}
          className="form-control"
          type="number"
          id={`reps_${set.key}`}
          value={set.reps ?? ""}
          onChange={(e) => updateSet(e, set)}
          placeholder={repsPlaceholderText(set)}
        />
      </div>
      <div className="col-5">
        <input
          disabled={set.completed}
          className="form-control"
          type="number"
          id={`weight_${set.key}`}
          value={set.weight ?? ""}
          onChange={(e) => updateSet(e, set)}
          placeholder={weightPlaceholderText(set)}
        />
      </div>
      <Button
        className="col-2"
        type="button"
        variant={set.completed ? "success" : "primary"}
        onClick={() => toggleSetCompleted(set, !set.completed)}
      >
        {set.completed ? 'edit' : 'complete'}
      </Button>
      <Button
        className="col-1"
        variant="danger"
        type="button"
        disabled={set.completed}
        onClick={() => removeSet(set)}
      >
        X
      </Button>
    </div>
  )
}

export default ActiveExerciseSet;