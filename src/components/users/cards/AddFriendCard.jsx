import { useMemo } from "react";
import { useAuthContext } from "../../../contexts/useAuthContext";
import { useAllFriendships, useAllUsers } from "../../../utilities/customHooks";

export default function AddFriendCard({ className }) {
  const { user: currentUser } = useAuthContext();
  const { data: allUsersData } = useAllUsers();
  const { data: allFriendshipsData } = useAllFriendships();

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

  if (!currentUser) {
    return <div>Please Sign In</div>;
  }
  return (
    <section className={className}>
      <>hi</>
    </section>
  );
}
