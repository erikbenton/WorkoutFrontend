import { useDispatch } from "react-redux";
import { clearModal } from "../../reducers/modals";
import { setEditingSetKey, updateExerciseSet } from "../../reducers/runningWorkout";
import { useState } from "react";
import { setTypePlaceholderClass, setTypeColor } from "../../utils/setTypes";
import { Modal, Button } from "react-bootstrap"


const EnterActiveSetDetailsModal = ({ show, set, groupKey }) => {
  const dispatch = useDispatch();
  const [reps, setReps] = useState(set.reps);
  const [weight, setWeight] = useState(set.weight);

  const confirm = () => {
    if (reps === null) {
      return;
    }
    const setKey = set.key;
    dispatch(updateExerciseSet({
      groupKey, setKey, field: "reps", value: reps
    }));
    dispatch(updateExerciseSet({
      groupKey, setKey, field: "weight", value: weight
    }));
    dispatch(updateExerciseSet({
      groupKey, setKey, field: "completed", value: true
    }));
    closeModal();
  }

  const closeModal = () => {
    dispatch(setEditingSetKey({ groupKey: null, setKey: null }))
    dispatch(clearModal());
  }

  const updateReps = (e) => {
    e.preventDefault();
    const reps = e.target.value === "" ? null : e.target.value
    setReps(reps);
  }

  const updateWeight = (e) => {
    e.preventDefault();
    const weight = e.target.value === "" ? null : e.target.value
    setWeight(weight);
  }

  const repsPlaceholderText =
    `${set.minReps ? set.minReps : ''}${(set.minReps && set.maxReps) ? '-' : ''}${set.maxReps ? set.maxReps : ''}`

  return (
    <Modal show={show} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Set
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row row-cols-auto m-1 text-center justify-content-center align-items-center">
          <span className="col-3 ps-0 ps-md-2">Reps</span>
          <span className="col-5 me-2 me-md-4">Weight</span>
        </div>
        <div className="row row-cols-auto m-1 justify-content-center align-items-center">
          <div className="col-3 ps-0 ps-md-2">
            <input
              type="number"
              className="form-control text-center"
              placeholder={repsPlaceholderText}
              id={`reps_${set.key}`}
              value={reps ?? ""}
              onChange={updateReps}
            />
          </div>
          <div className="col-5">
            <input
              className={"form-control text-center align-items-center " + setTypePlaceholderClass(set)}
              type="number"
              id={`weight_${set.key}`}
              value={weight ?? ""}
              onChange={(e) => updateWeight(e)}
              style={{ color: setTypeColor(set) }}
              placeholder={set.setType}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
        <Button onClick={confirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default EnterActiveSetDetailsModal;