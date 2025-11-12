import { useState } from "react";
import { useAuthContext } from "../../contexts/useAuthContext";
import { useAllFriendships } from "../../utilities/customHooks";
import styles from "../styles/Navbar.module.scss";
import MyFriendRequests from "../modals/FriendRequests";

export default function FriendRequestButton() {
  const { user } = useAuthContext();
  const { data: friendships } = useAllFriendships();
  const [showModal, setShowModal] = useState(false);

  const pendingRequestCount =
    friendships?.friendships?.filter(
      (friendship) => !friendship.friendRequestAccepted && friendship.requesterUserId !== user._id
    ).length || 0;

  return (
    <>
      <button className={styles.link} onClick={() => setShowModal(true)}>
        Friend Requests{" "}
        {pendingRequestCount > 0 && <span className={styles.badge}>{pendingRequestCount}</span>}
      </button>

      <MyFriendRequests isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
