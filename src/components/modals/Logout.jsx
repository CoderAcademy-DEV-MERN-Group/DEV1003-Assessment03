import clsx from "clsx";
import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Modals.module.scss";
import { useLogoutUser } from "../../utilities/customHooks/useAuth";
import { useAuthContext } from "../../contexts/useAuthContext";

function Logout({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const { logout: contextLogout, isAuthenticated, isLoading } = useAuthContext();

  const { mutate: apiLogout, isPending, error: apiError } = useLogoutUser();

  const handleLogout = () => {
    apiLogout(undefined, {
      onSuccess: async () => {
        // Remove token from local storage
        await contextLogout();
        setLogoutSuccess(true);
      },
      // MVP: Only one logout -> handling this directly
      // Future dev: move to useLogout User hook if reusing logout functionality
      onError: async () => {
        await contextLogout();
        setLogoutSuccess(true);
      },
    });
  };

  const handleClose = () => {
    onClose();
    if (logoutSuccess) {
      navigate("/", { replace: true });
    }
  };

  if (isLoading) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <span className={styles.loadingMessage}>Checking authentication...</span>
      </Modal>
    );
  }

  if (logoutSuccess) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.successMessage}>
          You've been logged out successfully! See you next time!
        </div>
      </Modal>
    );
  }

  if (!isAuthenticated) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
      >
        <button
          type="button"
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Close"
        >
          x
        </button>
        <p className={styles.loadingMessage}>You are not signed in.</p>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      shouldCloseOnOverlayClick={!isPending && !logoutSuccess}
      shouldCloseOnEsc={!isPending && !logoutSuccess}
    >
      {/* Close button only if not logged out*/}
      {!logoutSuccess && (
        <button
          type="button"
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Close logout pop-up"
        >
          {" "}
          x{" "}
        </button>
      )}
      <section className={styles.modalForm}>
        <h1> Log Out </h1>
        {logoutSuccess ? (
          <article className={styles.successMessage}>
            <p>You have been successfully logged out!</p>
            <p>Redirecting</p>
          </article>
        ) : (
          <article className={styles.confirmMessage}>
            <p>Are you sure you want to log out?</p>

            {apiError && (
              <span className={styles.apiError}>
                Note: There was an issue with the server, but you have been logged out locally.
              </span>
            )}

            <button
              type="button"
              onClick={handleLogout}
              disabled={isPending}
              className={clsx(styles.modalButton, isPending && styles.buttonLoading)}
            >
              {isPending ? "Logging out..." : "Yes, Log Out"}
            </button>
          </article>
        )}
      </section>
    </Modal>
  );
}

export default Logout;
