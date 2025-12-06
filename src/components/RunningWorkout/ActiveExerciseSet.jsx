import { useDispatch } from "react-redux";
import { updateExerciseSet, restartRestTimer, setEditingSetKey } from "../../reducers/runningWorkout";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPencil } from '@fortawesome/free-solid-svg-icons'
import { setTypePlaceholderClass, setTypeColor } from "../../utils/setTypes";
import ActiveExerciseSetOptions from "./AcitveExerciseSetOptions";
import { MODAL_TYPES, setModal } from "../../reducers/modals";

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
      enterActiveSetDetailsModal();
    }
    if (set.completed) {
      setCompleted(true);
    }
  }

  const enterActiveSetDetailsModal = () => {
    dispatch(setEditingSetKey({ setKey: set.key, groupKey }));
    dispatch(setModal({ openModal: MODAL_TYPES.ENTER_SET }));
  }

  const repsPlaceholderText =
    `${set.minReps ? set.minReps : ''}${(set.minReps && set.maxReps) ? '-' : ''}${set.maxReps ? set.maxReps : ''}`

  return (
    <div className="row row-cols-auto m-1 align-items-center justify-content-center">
      <div className="col-3 px-1 text-center">
        <input
          disabled={set.completed}
          className="form-control px-1 text-center align-items-center"
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
          className={"form-control text-center align-items-center " + setTypePlaceholderClass(set)}
          type="number"
          id={`weight_${set.key}`}
          value={set.weight ?? ""}
          onChange={(e) => updateSet(e, set)}
          style={{ color: setTypeColor(set) }}
          placeholder={set.setType}
        />
      </div>
      <div className="col-2 col-md-1">
        <Button
          className="no-border-btn"
          type="button"
          variant={set.completed ? "success" : "primary"}
          onClick={() => toggleSetCompleted(set, !set.completed)}
        >
          {set.completed
            ? <FontAwesomeIcon icon={faCheck} />
            : <FontAwesomeIcon icon={faPencil} />}
        </Button>
      </div>
      <div className="col-1 ps-1 pe-0">
        <ActiveExerciseSetOptions disabled={set.completed} groupKey={groupKey} set={set} />
      </div>
    </div>
  )
}

export default ActiveExerciseSet;