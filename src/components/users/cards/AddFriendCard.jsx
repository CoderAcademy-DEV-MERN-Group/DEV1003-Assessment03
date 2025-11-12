import { useMemo, useState } from "react";
import { useAuthContext } from "../../../contexts/useAuthContext";
import { useAllFriendships, useAllUsers } from "../../../utilities/customHooks";
import styles from "../UserComponents.module.scss";

export default function AddFriendCard({ className }) {
  const { user: currentUser } = useAuthContext();
  const { data: allUsersData } = useAllUsers();
  const { data: allFriendshipsData } = useAllFriendships();
  const [searchTerm, setSearchTerm] = useState("");

  // Extract arrays from API response objects
  const allUsers = allUsersData?.users;
  const allFriendships = allFriendshipsData?.friendships;

  function findUnfriendedUsers() {
    // Return an empty array if needed data isn't loaded yet
    if (!allUsers || !allFriendships || !currentUser) return [];
    // Make set of all friends ID's, set using .has() is faster for lookups than array .includes()
    const friendIds = new Set(
      allFriendships.map((e) => (e.user1 === currentUser._id ? e.user2 : e.user1))
    );
    // Return array of users from allUsers that aren't current user or in friendIds
    return allUsers.filter((e) => e._id !== currentUser._id && !friendIds.has(e._id));
  }
  // useMemo only recalculates when dependencies change, more efficient than useEffect + useState
  const unfriendedUsers = useMemo(findUnfriendedUsers, [allUsers, allFriendships, currentUser]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return unfriendedUsers.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [unfriendedUsers, searchTerm]);

  // const handleSendRequest = (user) => {
  //   console.log("Sending friend request to:", user.username);
  // };

  let content;

  if (filteredUsers.length === 0) {
    content = <p>No Matching users found</p>;
  } else {
    content = filteredUsers.map((user) => <div key={user._id}>{user.username}</div>);
  }

  return (
    <section className={className}>
      <article className={styles.cardBorder}>
        <h2>Add Friends</h2>
        {/* Search bar!!!! WEEEWWW!!!! */}
        <search className={styles.searchContainer}>
          <label>Enter a username to search for friends:</label>
          <input
            type="text"
            className={styles.searchField}
            placeholder=" &#x1F50E;&#xFE0E; Start your search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Search results */}
          <div className={styles.searchResults}>{content}</div>
        </search>
      </article>
    </section>
  );
}
