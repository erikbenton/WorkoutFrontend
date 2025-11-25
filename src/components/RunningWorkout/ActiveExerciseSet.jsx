import { useDispatch } from "react-redux";
import { updateExerciseSet, removeExerciseSet, restartRestTimer, shiftExerciseSet, setEditingSetKey } from "../../reducers/runningWorkout";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faClipboardQuestion, faCheck, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { setTypePlaceholderClass, setTypeColor } from "../../utils/setTypes";
import { MODAL_TYPES, setModal } from "../../reducers/modals";

const ActiveExerciseSetOptions = ({ set, groupKey }) => {
  const dispatch = useDispatch();

  const shiftSet = (set, shiftAmount) => {
    dispatch(shiftExerciseSet({
      setKey: set.key,
      groupKey,
      shiftAmount
    }));
  }

  const removeSet = (set) => {
    dispatch(removeExerciseSet({
      groupKey,
      setKey: set.key
    }));
  }

  const editSet = () => {
    dispatch(setEditingSetKey({ setKey: set.key, groupKey }));
    dispatch(setModal({ openModal: MODAL_TYPES.UPDATE_SET }));
  }


  return (
    <DropdownButton
      variant="outline-primary"
      className="no-border no-toggle no-hover"
      id={`set_options_${set.key}`}
      drop="down-centered"
      title={<FontAwesomeIcon icon={faEllipsisVertical}
      />}
    >
      <Dropdown.Item onClick={() => shiftSet(set, -1)}>shift up</Dropdown.Item>
      <Dropdown.Item onClick={() => shiftSet(set, 1)}>shift down</Dropdown.Item>
      <Dropdown.Item onClick={editSet}>edit down</Dropdown.Item>
      <Dropdown.Item className="text-danger" onClick={() => removeSet(set)}>remove set</Dropdown.Item>
    </DropdownButton>
  )
}

const ActiveExerciseSet = ({ groupKey, set, restTime }) => {
  const dispatch = useDispatch();
  // needed so user can edit set without resetting rest timer
  const [completed, setCompleted] = useState(set.completed);

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

  const toggleSetCompleted = (set, value) => {
    if (set.reps && set.reps > -1) {
      dispatch(updateExerciseSet({
        groupKey,
        setKey: set.key,
        field: "completed",
        value
      }));
      if (value && !completed) {
        setCompleted(true);
        dispatch(restartRestTimer(restTime))
      }
    } else {
      alert("A set's reps must be non-negative.")
    }
  }

  const repsPlaceholderText =
    `${set.minReps ? set.minReps : ''}${(set.minReps && set.maxReps) ? '-' : ''}${set.maxReps ? set.maxReps : ''}`

  return (
    <div className="row row-cols-auto m-1 align-items-center">
      <div className="col-3 px-1">
        <input
          disabled={set.completed}
          className="form-control px-1 text-center"
          type="number"
          id={`reps_${set.key}`}
          value={set.reps ?? ""}
          onChange={(e) => updateSet(e, set)}
          placeholder={repsPlaceholderText}
        />
      </div>
      <div className="col-5">
        <input
          disabled={set.completed}
          className={"form-control text-center " + setTypePlaceholderClass(set)}
          type="number"
          id={`weight_${set.key}`}
          value={set.weight ?? ""}
          onChange={(e) => updateSet(e, set)}
          style={{ color: setTypeColor(set) }}
          placeholder={set.setType}
        />
      </div>
      <Button
        className="col-auto"
        type="button"
        variant={set.completed ? "success" : "primary"}
        onClick={() => toggleSetCompleted(set, !set.completed)}
      >
        {set.completed
          ? <FontAwesomeIcon icon={faCheck} />
          : <FontAwesomeIcon icon={faClipboardQuestion} />}
      </Button>
      <div className="col">
        <ActiveExerciseSetOptions groupKey={groupKey} set={set} />
      </div>
    </div>
  )
}

export default ActiveExerciseSet;