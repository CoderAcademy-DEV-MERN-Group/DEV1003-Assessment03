import Modal from "react-modal";
import styles from "./Modals.module.scss";

function AboutUs({ isOpen, onClose }) {
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
          <legend>About the Developers</legend>
          <h1>Joss, Jordan and Nhi!</h1>
          <article className={styles.generalMessage}>
            <p>
              We are three student developers, currently studying a bootcamp style course on Full
              Stack Web Development!
            </p>
            <br />
            <p>
              We are just starting our coding journey, and have all worked together to create this
              SPA!
            </p>
            <br />
            <p>
              Below are links to our individual GitHubs to track our developing developer journey:
            </p>
            <br />
            <a href="https://github.com/jordanleal12" className={styles.navItem} target="_blank">
              Jordan's Github
            </a>{" "}
            <br />
            <p>
              Jordan is a tester and framework dynamo, making the granular components that help this
              site run in the background!{" "}
            </p>
            <br />
            <a href="https://github.com/lulu-codes" className={styles.navItem} target="_blank">
              Nhi's Github
            </a>{" "}
            <br />
            <p>
              Nhi is enthusiastic and loves styling! She helped finesse the final colours and
              theming for this site!{" "}
            </p>{" "}
            <br />
            <a href="https://github.com/truth-josstice" className={styles.navItem} target="_blank">
              Joss' Github
            </a>{" "}
            <br />
            <p>
              Joss is an all rounder, but had a big influence on the Reel Canon and the user
              experience site-wide!
            </p>
          </article>
        </fieldset>
      </section>
    </Modal>
  );
}

export default AboutUs;
