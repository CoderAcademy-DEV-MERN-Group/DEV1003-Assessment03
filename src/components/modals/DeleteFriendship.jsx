import { useState } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useDeleteFriendship } from "../../utilities/customHooks/useFriendships";
import styles from "./Modals.module.scss";

export default function DeleteFriendship({
  isOpen,
  onClose,
  friendUser,
  isPendingRequest = false,
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { mutate: deleteFriendship, isPending } = useDeleteFriendship();

  const actionText = isPendingRequest ? "delete friend request to" : "unfriend";
  const buttonText = isPendingRequest ? "Delete Request" : "Unfriend";
  const successMessage = isPendingRequest
    ? `Friend request to ${friendUser?.username} deleted`
    : `You are no longer friends with ${friendUser?.username}`;

  const handleDeleteConfirm = () => {
    deleteFriendship(friendUser._id, {
      onSuccess: () => {
        toast.success(successMessage);
        onClose();
        setShowConfirmation(false);
      },
      onError: () => {
        toast.error(`Failed to ${actionText}. Please try again.`);
        setShowConfirmation(false);
      },
    });
  };

  const handleClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      shouldCloseOnOverlayClick={!isPending}
      shouldCloseOnEsc={!isPending}
    >
      <button type="button" onClick={onClose} className={styles.closeButton} disabled={isPending}>
        x
      </button>
      <section className={styles.modalForm}>
        <h1>{buttonText}</h1>
        <article className={styles.generalMessage}>
          {!showConfirmation ? (
            <>
              <p>
                This will {actionText} {friendUser?.username}.
              </p>
              <div className={styles.buttonSection}>
                <button type="button" className={styles.cancelButton} onClick={handleClose}>
                  Go Back
                </button>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => setShowConfirmation(true)}
                >
                  {buttonText}
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Are you sure?</strong> This will {actionText} {friendUser?.username}.
              </p>
              <div className={styles.buttonSection}>
                <button type="button" onClick={handleClose} className={styles.cancelButton}>
                  Go Back
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  disabled={isPending}
                  className={`${styles.deleteButton} ${isPending ? styles.buttonLoading : ""}`}
                >
                  {isPending ? "Processing..." : `Confirm Cancel`}
                </button>
              </div>
            </>
          )}
        </article>
      </section>
    </Modal>
  );
}
