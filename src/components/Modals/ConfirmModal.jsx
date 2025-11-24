import { Modal } from "react-bootstrap"


const ConfirmModal = ({ header, body, cancelModal, confirmModal }) => {
  return (
    <Modal>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancelModal}>Close</Button>
        <Button onClick={confirmModal}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;