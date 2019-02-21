import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import styles from '../../styles/components/StudentModal/StudentModal.module.css';

const StudentModal = ({ toggleModal, showModal, id }) => (
  <div>
    <Modal isOpen={showModal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Next Lucky Winner is:</ModalHeader>
      <ModalBody className={styles.modalBody}>
        <p className={styles.id}>{id}</p>
      </ModalBody>
    </Modal>
  </div>
)

export default StudentModal;