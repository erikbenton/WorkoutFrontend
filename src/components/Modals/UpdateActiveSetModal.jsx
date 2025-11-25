import { Modal, Button } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { clearModal } from "../../reducers/modals";
import { updateExerciseSet } from "../../reducers/runningWorkout";
import setTypes, { setTypeColor } from "../../utils/setTypes";
import { useState } from "react";


const UpdateActiveSetModal = ({ set, groupKey, show }) => {
  const dispatch = useDispatch();
  const [minReps, setMinReps] = useState(set.minReps);
  const [maxReps, setMaxReps] = useState(set.maxReps);
  const [setType, setSetType] = useState(set.setType);

  const closeModal = () => {
    dispatch(clearModal());
  }

  const confirm = () => {
    const setKey = set.key;
    dispatch(updateExerciseSet({
      groupKey, setKey, field: "minReps", value: minReps
    }));
    dispatch(updateExerciseSet({
      groupKey, setKey, field: "maxReps", value: maxReps
    }));
    dispatch(updateExerciseSet({
      groupKey, setKey, field: "setType", value: setType
    }));
    closeModal();
  }

  const updateMinReps = (e) => {
    e.preventDefault();
    const minReps = e.target.value === "" ? null : e.target.value
    setMinReps(minReps);
  }

  const updateMaxReps = (e) => {
    e.preventDefault();
    const maxReps = e.target.value === "" ? null : e.target.value
    setMaxReps(maxReps);
  }

  const updateSetType = (e) => {
    e.preventDefault();
    const setType = e.target.value === "" ? null : e.target.value
    setSetType(setType);
  }

  return (
    <Modal show={show} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Set
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row row-cols-auto m-1 text-center align-items-center">
          <span className="col-3 ps-0 ps-md-2">Min Reps</span>
          <span className="col-3 ps-0">Max Reps</span>
          <span className="col-4 px-0">Type</span>
          <span className="col-2 col-sm-4"></span>
        </div>
        <div className="row row-cols-auto m-1 justify-content-center align-items-center">
          <div className="col-3 ps-0 ps-md-2">
            <input
              type="number"
              className="form-control text-center"
              id={`minReps_${set.key}`}
              value={minReps ?? ""}
              onChange={updateMinReps}
            />
          </div>
          <div className="col-3 ps-0">
            <input
              type="number"
              className="form-control text-center"
              id={`maxReps_${set.key}`}
              value={maxReps ?? ""}
              onChange={updateMaxReps}
            />
          </div>
          <div className="col-4 px-0">
            <select
              value={setType ?? ""}
              className="form-select no-caret px-1 text-center"
              style={{ color: setTypeColor(set) }}
              onChange={updateSetType}>
              {Object.keys(setTypes).map(setType => (
                <option
                  key={setTypes[setType].type}
                  style={{ color: setTypes[setType].color }}
                  value={setTypes[setType].type}
                >
                  {setTypes[setType].type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
        <Button onClick={confirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateActiveSetModal;