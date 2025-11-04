import { useDispatch } from "react-redux";
import { setRestTimeModalStatus, updateExerciseGroup } from "../../reducers/focusedWorkout";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

const RestTimeModal = ({ show, exerciseGroup }) => {
  const [restTime, setRestTime] = useState(exerciseGroup ? exerciseGroup.restTime : null);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setRestTimeModalStatus({ isModalOpen: false }));
  }

  const saveRestTime = () => {
    dispatch(updateExerciseGroup({
      exerciseGroup: {
        ...exerciseGroup,
        restTime
      }
    }));
    dispatch(setRestTimeModalStatus({ isModalOpen: false }));
  }

  const updateRestTimeMinutes = (e) => {
    let newRestTime = null;
    const newMinutes = Number(e.target.value);
    if (Number(seconds) === 0 && newMinutes === 0) {
      newRestTime = null;
    } else {
      const secondsNum = restTime
        ? Number(restTime.split(":")[1])
        : 0;
      const secondsTick = `${(secondsNum < 10 ? '0' : '')}${secondsNum}`;
      const newMinutesTick = `${(newMinutes < 10 ? '0' : '')}${newMinutes}`;
      newRestTime = `00:${newMinutesTick}:${secondsTick}`
    }
    setRestTime(newRestTime);
  }

  const updateRestTimeSeconds = (e) => {
    let newRestTime = null;
    const totalSeconds = Number(e.target.value);
    // in case user enters in something like 90 sec
    const newMinutes = Math.floor(totalSeconds / 60);
    const newSeconds = totalSeconds % 60;
    if (Number(minutes) === 0 && totalSeconds === 0) {
      newRestTime = null;
    } else {
      const minutesNum = restTime
        ? Number(restTime.split(":")[0]) + newMinutes
        : newMinutes;
      const minutesTick = `${(minutesNum < 10 ? '0' : '')}${minutesNum}`;
      const newSecondsTick = `${(newSeconds < 10 ? '0' : '')}${newSeconds}`;
      newRestTime = `00:${minutesTick}:${newSecondsTick}`
    }
    setRestTime(newRestTime);
  }

  if (!exerciseGroup) return;

  const ticks = restTime ? restTime.split(":") : null;
  const minutes = ticks ? ticks[1] : "";
  const seconds = ticks ? ticks[2] : "";

  return (
    <Modal
      show={show}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Rest Time
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row row-cols-auto m-1 justify-content-center align-items-center">
          <div className="col-2">
            <input
              type='number'
              id="restTimeMinutes"
              className="form-control"
              value={minutes}
              onChange={(e) => updateRestTimeMinutes(e)}
            />
          </div>
          <label className="col-auto">min</label>
          <div className="col-2">
            <input
              type='number'
              id="restTimeSeconds"
              className="form-control"
              value={seconds}
              onChange={(e) => updateRestTimeSeconds(e)}
            />
          </div>
          <label className="col-auto">sec</label>
          <Button variant="warning" onClick={() => setRestTime(null)}>Clear</Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
        <Button onClick={saveRestTime}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RestTimeModal;