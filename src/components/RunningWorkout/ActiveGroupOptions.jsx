import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { shiftExerciseGroup, removeExerciseGroup } from "../../reducers/runningWorkout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const ActiveGroupOptions = ({ exerciseGroup }) => {
  const dispatch = useDispatch()

  const shiftGroup = (group, shiftAmount) => {
    dispatch(shiftExerciseGroup({
      groupKey: group.key,
      shiftAmount
    }));
  }

  const removeGroup = (group) => {
    dispatch(removeExerciseGroup({ groupKey: group.key }))
  }

  return (
    <DropdownButton
      variant="outline-primary"
      className="no-border no-toggle no-hover"
      id={`group_options_${exerciseGroup.key}`}
      drop="down-centered"
      title={<FontAwesomeIcon icon={faEllipsisVertical}
      />}
    >
      <Dropdown.Item onClick={() => shiftGroup(exerciseGroup, -1)}>shift up</Dropdown.Item>
      <Dropdown.Item onClick={() => shiftGroup(exerciseGroup, 1)}>shift down</Dropdown.Item>
      <Dropdown.Item variant="danger" onClick={() => removeGroup(exerciseGroup)}>remove group</Dropdown.Item>
    </DropdownButton>
  )
}

export default ActiveGroupOptions;