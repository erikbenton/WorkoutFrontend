import { Modal, Button } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { clearModal } from "../../reducers/modals";


const ConfirmModal = ({ header, body, show, cancelModal, confirmModal }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(clearModal());
  }

  const confirm = () => {
    confirmModal();
    closeModal();
  }

  return (
    <Modal show={show} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancelModal ?? closeModal}>Close</Button>
        <Button onClick={confirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;