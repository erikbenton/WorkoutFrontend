import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeExerciseGroup, setRestTimeModalStatus, shiftExerciseGroup } from "../../reducers/focusedWorkout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

const ExerciseGroupOptions = ({ exerciseGroup, setSelectingExercises, setReplacementExerciseGroup }) => {
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

  const openRestTimeModal = () => {
    dispatch(setRestTimeModalStatus({
      isModalOpen: true,
      groupKey: exerciseGroup.key
    }));
  }

  const replaceExercise = (group) => {
    setSelectingExercises(true);
    setReplacementExerciseGroup(group)
  }

  return (
    <>
      <DropdownButton
        variant="outline-primary"
        className="no-border no-toggle no-hover"
        id={`group_options_${exerciseGroup.key}`}
        drop="down-centered"
        title={<FontAwesomeIcon icon={faEllipsisVertical}
        />}
      >
        <Dropdown.Item onClick={() => replaceExercise(exerciseGroup)}>replace exercise</Dropdown.Item>
        <Dropdown.Item onClick={() => shiftGroup(-1)}>shift up</Dropdown.Item>
        <Dropdown.Item onClick={() => shiftGroup(1)}>shift down</Dropdown.Item>
        <Dropdown.Item onClick={openRestTimeModal}>enter rest time</Dropdown.Item>
        <Dropdown.Item variant="danger" onClick={removeGroup}>remove group</Dropdown.Item>
      </DropdownButton>
    </>
  )
}

export default ExerciseGroupOptions;