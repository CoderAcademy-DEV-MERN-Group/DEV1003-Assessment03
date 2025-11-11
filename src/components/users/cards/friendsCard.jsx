import { useAuthContext } from "../../../contexts/useAuthContext";
import { useAllFriendships, useAllUsers } from "../../../utilities/customHooks";
import styles from "../UserComponents.module.scss";

export default function FriendsCard({ className }) {
  const { user } = useAuthContext();
  const { data: friendships } = useAllFriendships();
  const { data: users } = useAllUsers();

  const usersLookup = users?.users?.reduce((account, user) => {
    account[user._id] = user;
    return account;
  }, {});

  return (
    <section className={className}>
      <article className={styles.cardBorder}>
        <h2>Your Friendships</h2>
        {!friendships?.friendships || friendships.friendships.length === 0 ? (
          <p>No friends yet!</p>
        ) : (
          <table className={styles.friendsTable}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {friendships.friendships.map((friendship) => {
                const friendId =
                  friendship.user1 === user?._id ? friendship.user2 : friendship.user1;
                const friendUser = usersLookup?.[friendId];
                return (
                  <tr key={friendship._id} className={styles.tableRow}>
                    <td className={styles.colUsername}>{friendUser?.username || "Unknown user"}</td>
                    <td className={styles.colEmail}>{friendUser?.email}</td>
                    <td className={styles.colStatus}>
                      {!friendship.friendRequestAccepted ? "Pending" : "Accepted"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </article>
    </section>
  );
}
