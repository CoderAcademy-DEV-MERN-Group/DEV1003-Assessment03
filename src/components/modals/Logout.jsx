import clsx from "clsx";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./Modals.module.scss";
import { useLogoutUser } from "../../utilities/customHooks/useAuth";
import { useAuthContext } from "../../contexts/useAuthContext";

function Logout({ isOpen, onClose }) {
  const navigate = useNavigate();

  const { logout: contextLogout, isAuthenticated, isLoading } = useAuthContext();

  const { mutate: apiLogout, isPending } = useLogoutUser();

  const handleLogout = async () => {
    // ← make async
    try {
      await apiLogout(undefined); // ← await the mutation
      await contextLogout(); // ← await token removal
      toast.success("Logged out successfully!");
    } catch (err) {
      await contextLogout(); // still remove token
      toast.error("Server error, but logged out locally.");
    } finally {
      onClose(); // ← Close immediately
      navigate("/", { replace: true }); // ← Redirect immediately
    }
  };

  if (isLoading) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <span className={styles.loadingMessage}>Checking authentication...</span>
      </Modal>
    );
  }

  if (!isAuthenticated) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
      >
        <button type="button" onClick={onClose} className={styles.closeButton} aria-label="Close">
          x
        </button>
        <p className={styles.loadingMessage}>You are not signed in.</p>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      shouldCloseOnOverlayClick={!isPending}
      shouldCloseOnEsc={!isPending}
    >
      <button type="button" onClick={onClose} className={styles.closeButton}>
        x
      </button>
      <section className={styles.modalForm}>
        <h1>Log Out</h1>
        <article className={styles.confirmMessage}>
          <p>Are you sure you want to log out?</p>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className={clsx(styles.modalButton, isPending && styles.buttonLoading)}
          >
            {isPending ? "Logging out..." : "Yes, Log Out"}
          </button>
        </article>
      </section>
    </Modal>
  );
}

export default Logout;
