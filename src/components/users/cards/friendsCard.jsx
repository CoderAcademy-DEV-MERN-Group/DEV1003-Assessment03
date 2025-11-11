import { useAllFriendships, useAllUsers } from "../../../utilities/customHooks";
import styles from "../UserComponents.module.scss";

export default function FriendsCard({ className }) {
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
            <thead>
              <tr>
                <th className={styles.colUsername}>Username</th>
                <th className={styles.colEmail}>Username</th>
                <th className={styles.colStatus}>Username</th>
              </tr>
            </thead>
            <tbody>
              {friendships.friendships.map((friendship) => {
                const friendUser = usersLookup?.[friendship.user2];
                return (
                  <tr key={friendship._id} className={styles.tableRow}>
                    <td>Username: {friendUser?.username || "Uknown user"}</td>
                    <td>Email: {friendUser?.email}</td>
                    <td>Status: {!friendship.friendRequestAccepted ? "Pending" : "Accepted"}</td>
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
