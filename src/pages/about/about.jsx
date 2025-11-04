import Modal from "react-modal";
import { useForm } from "@formspree/react";
import styles from "./about.module.scss";

function ContactUs({ isOpen, onClose }) {
  const [state, handleSubmit] = useForm("mblpvzov");

  if (state.succeeded) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <p>
          Thanks for contacting us! We'll get back to you soon.
          <br />
        </p>
        <button onClick={onClose} className={styles.closeButton}>
          {" "}
          x{" "}
        </button>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      <button
        type="button"
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close contact form pop-up"
      >
        {" "}
        x{" "}
      </button>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <h1> Contact Us! </h1>
        <fieldset className={styles.inputGroup}>
          <legend> What's on your mind? </legend>
          <p>
            <label htmlFor="email">Email: </label>
            <input
              name="email"
              type="email"
              className={styles.contactEmail}
              required
            />
          </p>
          <p>
            <label htmlFor="message">Message: </label>
            <textarea
              name="message"
              type="text"
              className={styles.contactMessage}
              required
              minLength="10"
            />
          </p>
        </fieldset>
        <button disabled={state.submitting}>Submit</button>
      </form>
    </Modal>
  );
}

export default ContactUs;
