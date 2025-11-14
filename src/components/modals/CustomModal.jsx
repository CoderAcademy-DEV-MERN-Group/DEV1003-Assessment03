// Custom Modal component so we can create common settings
import Modal from "react-modal";
import styles from "./Modals.module.scss";

function CustomModal({ children, ...props }) {
  // Set inert on root when modal is open for accessibility
  const openModal = () => {
    document.getElementById("root").setAttribute("inert", "");
  };
  // Remove inert and aria-hidden from root when modal is closed
  const closeModal = () => {
    document.getElementById("root").removeAttribute("inert");
    document.getElementById("root").removeAttribute("aria-hidden");
  };

  return (
    <Modal
      {...props}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      onAfterOpen={openModal}
      onAfterClose={closeModal}
      closeTimeoutMS={500}
      ariaModal
    >
      {children}
    </Modal>
  );
}

export default CustomModal;
