import clsx from "clsx";
import Modal from "react-modal";
import { useState } from "react";
import styles from "./Modals.module.scss";
import { useLogoutUser } from "../../utilities/customHooks/useAuth";

function Logout({ isOpen, onClose }) {
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const { mutate: logout, isPending, error: apiError } = useLogoutUser();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        // Remove token from local storage
        localStorage.removeItem("authToken");
        setLogoutSuccess(true);

        setTimeout(() => {
          onClose();
          setLogoutSuccess(false);
          window.location.reload();
        }, 1500);
      },
      // MVP: Only one logout -> handling this directly
      // Future dev: move to useLogout User hook if reusing logout functionality
      onError: () => {
        localStorage.removeItem("authToken");
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      shouldCloseOnOverlayClick={!isPending && !logoutSuccess}
      shouldCloseOnEsc={!isPending && !logoutSuccess}
    >
      {/* Close button only if not logged out*/}
      {!logoutSuccess && (
        <button
          type="button"
          onClick={onClose}
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
