import clsx from "clsx";
import Modal from "react-modal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../utilities/services/apiServices";
import styles from "./Modal.module.scss";

function Logout({ isOpen, onClose }) {
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const {
    mutate: submit,
    isPending,
    error: apiError,
  } = useMutation({
    mutationFn: logoutUser,

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

    onError: () => {
      localStorage.removeItem("authToken");
      setLogoutSuccess(true);
      setTimeout(() => {
        onClose();
        setLogoutSuccess(false);
        window.location.reload();
      }, 1500);
    },
  });

  const handleLogout = () => {
    submit();
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
          <>
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
          </>
        )}
      </section>
    </Modal>
  );
}

export default Logout;
