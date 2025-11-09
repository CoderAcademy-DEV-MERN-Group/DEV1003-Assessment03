/* eslint-disable react/jsx-props-no-spreading */
// React hook form provides form management without useState
import Modal from "react-modal";
import styles from "./Modals.module.scss";

function Terms({ isOpen, onClose }) {
  return (
    // Modal
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      shouldFocusAfterRender={false}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      {/* Close button :D */}
      <button
        type="button"
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close pop-up"
      >
        {" "}
        x{" "}
      </button>
      <section className={styles.modalForm}>
        <fieldset className={styles.inputGroup}>
          <legend>Terms of Use</legend>
          <h1>Be Kind, Be Fair, Have Fun!</h1>
          <article className={styles.generalMessage}>
            <p>
              This site is intended for purely educational purposes, and at this stage of
              development is maintained by three student developers, please use the site with care.
            </p>
            <p>
              If anyone acts unkindly towards other users, or ourselves, we reserve the right to
              barr access to the site.
            </p>
            <p>Mainly just be nice and chill and you'll be fine!</p>
          </article>
        </fieldset>
        <fieldset className={styles.inputGroup}>
          <legend>Contributing</legend>
          <article className={styles.generalMessage}>
            <h3>If you'd like to contribute, please read below:</h3>
            <ul>
              <li>
                <b>Branching and Forking:</b> Fork the repository and create feature branches from
                main using descriptive names (feature/user-auth, fix/rating-bug)
              </li>
              <li>
                <b>Conventional Commits:</b> Follow conventional commit format (feat:, fix:, docs:,
                style:, refactor:, test:, chore:) for clear commit history
              </li>
              <li>
                <b>Pull Requests:</b> Pull requests with no explanation will not be merged, please
                leave detailed comments in your code!
              </li>
              <li>
                <b>Issues:</b> Issues must be clear and concise, vague issues are non-issues!
              </li>
            </ul>
            <p>
              Then head over to our team's {""}
              <a href="" target="_blank" className={styles.navItem}>
                GitHub
              </a>
              {""} and reach out!
            </p>
          </article>
        </fieldset>
      </section>
    </Modal>
  );
}

export default Terms;
