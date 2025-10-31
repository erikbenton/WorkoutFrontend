import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeExerciseGroup, shiftExerciseGroup } from "../../reducers/focusedWorkout";

const ExerciseGroupOptions = ({ exerciseGroup }) => {
  const dispatch = useDispatch()

  const removeGroup = () => {
    dispatch(removeExerciseGroup(exerciseGroup))
  }

  const shiftGroup = (shiftAmount) => {
    dispatch(shiftExerciseGroup({
      shiftAmount,
      exerciseGroup
    }))
  }

  return (
    <Dropdown className="d-inline">
      <Dropdown.Toggle variant="outline-primary" id={`group_options_${exerciseGroup.key}`}>
        options
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => shiftGroup(-1)}>shift up</Dropdown.Item>
        <Dropdown.Item onClick={() => shiftGroup(1)}>shift down</Dropdown.Item>
        <Dropdown.Item variant="danger" onClick={removeGroup}>remove group</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ExerciseGroupOptions;