import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { clearRunningWorkout, saveCompleteWorkout } from "../../reducers/runningWorkout";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { setSelectingExercises } from "../../reducers/exerciseSelection";

const RunningWorkoutOptions = ({ editWorkoutName, setEditWorkoutName }) => {
  const dispatch = useDispatch();
  const runningWorkout = useSelector(state => state.runningWorkout);
  const navigate = useNavigate();

  const cancelWorkout = () => {
    const cancelingWorkout = confirm("Cancel the current workout?")
    if (cancelingWorkout) {
      dispatch(clearRunningWorkout())
    }
  }

  const completeWorkout = async () => {
    try {
      const savedCompletedWorkout = await dispatch(saveCompleteWorkout(runningWorkout));
      navigate(`/completedWorkouts/${savedCompletedWorkout.id}`);
    } catch (e) {
      console.error(e);
    }
  }

  const replaceExercise = () => {
    dispatch(setSelectingExercises({ selectingExercises: true }));
  }

  const toggleEditWorkoutName = () => {
    setEditWorkoutName(!editWorkoutName);
  }

  return (
    <DropdownButton
      variant="outline-primary"
      className="no-border no-toggle no-hover"
      id="runningWorkoutOptions"
      drop="down-centered"
      title={<FontAwesomeIcon icon={faEllipsisVertical}
      />}
    >
      <Dropdown.Item onClick={toggleEditWorkoutName}>
        {editWorkoutName ? "Save" : "Edit" } name
      </Dropdown.Item>
      {runningWorkout.activeExerciseGroup
        && <Dropdown.Item onClick={replaceExercise}>Replace exercise</Dropdown.Item>}
      <Dropdown.Item onClick={completeWorkout} className="text-success">Finish workout</Dropdown.Item>
      <Dropdown.Item onClick={cancelWorkout} className="text-danger">Cancel workout</Dropdown.Item>
    </DropdownButton>
  );
}

export default RunningWorkoutOptions;