import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateRunningWorkout, clearActiveExerciseGroup } from "../../reducers/runningWorkout";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import RunningWorkoutOptions from "./RunningWorkoutOptions";

const RunningWorkoutName = () => {
  const [editWorkoutName, setEditWorkoutName] = useState(false);
  const runningWorkout = useSelector(state => state.runningWorkout);
  const dispatch = useDispatch();

  const updateWorkoutName = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    dispatch(updateRunningWorkout({ field, value }))
  }

  const backToSummary = () => {
    dispatch(clearActiveExerciseGroup())
  }

  return (
    <div className="container">
      <div className="row row-cols-auto mb-2 align-items-center">
        <div className="px-0 col-auto h-100">
          <Button
            variant={runningWorkout.activeExerciseGroup ? "outline-primary" : "outline-secondary"}
            type="button"
            disabled={!runningWorkout.activeExerciseGroup}
            className="no-outline-button"
            onClick={backToSummary}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </div>
        <div className="col-auto ps-0">
          <span className="fs-1 fw-medium">
            {editWorkoutName
          ? <div className="col-auto px-0">
            <input
              type="text"
              id="name"
              className="form-control pe-0"
              value={runningWorkout.name ?? ""}
              onChange={(e) => updateWorkoutName(e)}
            />
          </div>
          : runningWorkout.name}
          </span>
        </div>
        <div className="col-auto ms-auto">
          <RunningWorkoutOptions editWorkoutName={editWorkoutName} setEditWorkoutName={setEditWorkoutName} />
        </div>
      </div>
    </div>
  )
}

export default RunningWorkoutName;