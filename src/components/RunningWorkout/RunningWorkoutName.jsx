import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateRunningWorkout } from "../../reducers/runningWorkout";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const RunningWorkoutName = () => {
  const [editWorkoutName, setEditWorkoutName] = useState(false);
  const runningWorkout = useSelector(state => state.runningWorkout);
  const dispatch = useDispatch();

  const updateWorkoutName = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    dispatch(updateRunningWorkout({ field, value }))
  }

  return (
    <div className="container">
      <h1 className="row row-cols-auto align-items-center" onDoubleClick={() => setEditWorkoutName(true)}>
        {editWorkoutName
          ? <div className="col-8">
            <input
              type="text"
              id="name"
              className="form-control d-inline"
              value={runningWorkout.name}
              onChange={(e) => updateWorkoutName(e)}
              onBlur={() => setEditWorkoutName(false)}
            />
          </div>
          : runningWorkout.name}
        <div className="col-1">

          <Button variant={editWorkoutName ? "success" : "primary"} size="sm" type="button" onClick={() => setEditWorkoutName(!editWorkoutName)}>
            <FontAwesomeIcon icon={faPen} />
          </Button>
        </div>
      </h1>
    </div>
  )
}

export default RunningWorkoutName;