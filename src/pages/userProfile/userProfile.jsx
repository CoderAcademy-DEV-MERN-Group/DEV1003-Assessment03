import { UserInfoCard } from "../../components/users";
import ReelProgressCard from "../../components/users/cards/reelProgressCard";
import styles from "./userProfile.module.scss";

export default function UserProfile() {
  return (
    <div className={styles.profilePage}>
      <div className={styles.userCards}>
        <UserInfoCard className={styles.userInfoCard} />
        <div className={styles.userFriendsCard} />
        <ReelProgressCard className={styles.userReelProgressCard} />
      </div>
    </div>
  );
}
