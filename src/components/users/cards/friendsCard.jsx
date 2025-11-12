import { useState } from "react";
import { useAuthContext } from "../../../contexts/useAuthContext";
import { useAllFriendships, useAllUsers } from "../../../utilities/customHooks";
import styles from "../UserComponents.module.scss";
import DeleteFriendship from "../../modals/DeleteFriendship";
import LoadingSpinner from "../../common/LoadingScreenOverlay";

export default function FriendsCard({ className }) {
  const { user } = useAuthContext();
  const { data: friendships, isLoading: friendshipsLoading } = useAllFriendships();
  const { data: users, isLoading: usersLoading } = useAllUsers();
  const [selectedFriendship, setSelectedFriendship] = useState(null);

  if (usersLoading || friendshipsLoading) {
    return <LoadingSpinner />;
  }

  // Create a lookup table for all friendships (users are occasionally in the wrong order)
  const usersLookup = users?.users?.reduce((account, user) => {
    account[user._id] = user;
    return account;
  }, {});

  // Helper function to get friend user from friendship
  const getFriendFromFriendship = (friendship) => {
    if (!friendship || !user) return null;
    const friendId = friendship.user1 === user?._id ? friendship.user2 : friendship.user1;
    return usersLookup?.[friendId];
  };

  const selectedFriendUser = selectedFriendship
    ? getFriendFromFriendship(selectedFriendship)
    : null;

  return (
    <section className={className}>
      <article className={styles.cardBorder}>
        <h2>Your Friendships</h2>
        <table className={styles.friendsTable}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {friendships.friendships
              .filter((f) => f.friendRequestAccepted)
              .map((friendship) => {
                const friendUser = getFriendFromFriendship(friendship);
                return (
                  <tr
                    key={friendship._id}
                    className={styles.tableRow}
                    onClick={() => setSelectedFriendship(friendship)}
                    title={!friendship.friendRequestAccepted ? "Cancel Request" : "Unfriend"}
                  >
                    <td className={styles.colUsername}>{friendUser?.username || "Unknown user"}</td>
                    <td className={styles.colEmail}>{friendUser?.email}</td>
                    <td className={styles.colStatus}>
                      {!friendship.friendRequestAccepted ? "Pending" : "Accepted"}
                    </td>
                  </tr>
                );
              })}
            {friendships.friendships.filter((f) => f.friendRequestAccepted).length === 0 && (
              <tr>
                <td colSpan="4" className={styles.noRequests}>
                  No friendships yet!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
      <DeleteFriendship
        isOpen={!!selectedFriendship}
        onClose={() => setSelectedFriendship(null)}
        friendUser={selectedFriendUser}
        isPendingRequest={!selectedFriendship?.friendRequestAccepted}
      />
    </section>
  );
}
