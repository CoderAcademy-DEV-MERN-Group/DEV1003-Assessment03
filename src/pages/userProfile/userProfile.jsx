import { useState } from "react";
import { UserInfoCard } from "../../components/users";
import styles from "./userProfile.module.scss";

export default function UserProfile() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  if (shouldThrowError) {
    throw new Error("Test error to check error boundary!");
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.userCards}>
        <UserInfoCard className={styles.userInfoCard} />
        <div className={styles.userFriendsCard} />
        <div className={styles.userReelProgressCard} />
      </div>
      {/* Test button for error boundary */}
      <button onClick={() => setShouldThrowError(true)}>Test Error Boundary</button>
    </div>
  );
}
