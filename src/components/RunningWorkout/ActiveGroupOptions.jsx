import { Dropdown } from "react-bootstrap";
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
    <Dropdown drop="down-centered" className="ms-auto d-inline">
      <Dropdown.Toggle variant="outline-primary" id={`group_options_${exerciseGroup.key}`} size="sm">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => shiftGroup(exerciseGroup, -1)}>shift up</Dropdown.Item>
        <Dropdown.Item onClick={() => shiftGroup(exerciseGroup, 1)}>shift down</Dropdown.Item>
        <Dropdown.Item variant="danger" onClick={() => removeGroup(exerciseGroup)}>remove group</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ActiveGroupOptions;