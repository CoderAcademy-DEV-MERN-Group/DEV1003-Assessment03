// import { useState } from "react";
import { UserInfoCard } from "../../components/users";
import styles from "./userProfile.module.scss";
import MoviesWatched from "../../components/users/tabs/moviesWatchedTab";

export default function UserProfile() {
  // const [shouldThrowError, setShouldThrowError] = useState(false);

  // if (shouldThrowError) {
  //   throw new Error("Test error to check error boundary!");
  // }

  return (
    <div className={styles.profilePage}>
      <div className={styles.userCards}>
        <UserInfoCard className={styles.userInfoCard} />
        <MoviesWatched className={styles.userInfoCard} />
        <div className={styles.userFriendsCard} />
        <div className={styles.userReelProgressCard} />
      </div>
      {/* Test button for error boundary */}
      {/* <button onClick={() => setShouldThrowError(true)}>Test Error Boundary</button> */}
    </div>
  );
}
