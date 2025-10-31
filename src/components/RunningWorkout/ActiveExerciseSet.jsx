import { useDispatch } from "react-redux";
import { updateExerciseSet, removeExerciseSet } from "../../reducers/runningWorkout";
import { Button, CloseButton } from "react-bootstrap";


const ActiveExerciseSet = ({ groupKey, set }) => {
  const dispatch = useDispatch();

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
    } else {
      alert("A set's reps must be non-negative.")
    }
  }

  const repsPlaceholderText = set =>
    `${set.minReps ? set.minReps : ''}${(set.minReps && set.maxReps) ? '-' : ''}${set.maxReps ? set.maxReps : ''}`

  const weightPlaceholderText = set => set.targetWeight ? `${set.targetWeight} lbs` : ''

  return (
    <li key={set.key}>
      <label>Reps
        <input
          disabled={set.completed}
          type="number"
          id={`reps_${set.key}`}
          value={set.reps ?? ""}
          onChange={(e) => updateSet(e, set)}
          placeholder={repsPlaceholderText(set)}
        />
      </label>
      <label>Weight
        <input
          disabled={set.completed}
          type="number"
          id={`weight_${set.key}`}
          value={set.weight ?? ""}
          onChange={(e) => updateSet(e, set)}
          placeholder={weightPlaceholderText(set)}
        />
      </label>
      <Button type="button" variant={set.completed ? "success" : "primary"} onClick={() => toggleSetCompleted(set, !set.completed)}>
        {set.completed ? 'edit' : 'complete'}
      </Button>
      <Button variant="danger" type="button" disabled={set.completed} onClick={() => removeSet(set)}>X</Button>
    </li>
  )
}

export default ActiveExerciseSet;