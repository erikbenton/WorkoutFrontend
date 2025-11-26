import { useDispatch } from "react-redux";
import { removeExerciseSet, shiftExerciseSet, setEditingSetKey } from "../../reducers/runningWorkout";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { MODAL_TYPES, setModal } from "../../reducers/modals";

const ActiveExerciseSetOptions = ({ set, groupKey, disabled }) => {
  const dispatch = useDispatch();

  const shiftSet = (shiftAmount) => {
    dispatch(shiftExerciseSet({
      setKey: set.key,
      groupKey,
      shiftAmount
    }));
  }

  const removeSet = () => {
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
      disabled={disabled}
      variant="outline-primary"
      className="no-border no-toggle no-hover"
      id={`set_options_${set.key}`}
      drop="down-centered"
      title={<FontAwesomeIcon icon={faEllipsisVertical}
      />}
    >
      <Dropdown.Item onClick={() => shiftSet(-1)}>shift up</Dropdown.Item>
      <Dropdown.Item onClick={() => shiftSet(1)}>shift down</Dropdown.Item>
      <Dropdown.Item onClick={editSet}>edit targets</Dropdown.Item>
      <Dropdown.Item className="text-danger" onClick={removeSet}>remove set</Dropdown.Item>
    </DropdownButton>
  );
}

export default ActiveExerciseSetOptions;