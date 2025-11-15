import { useState } from "react";
import UserInfoCard from "./UserInfoCard";
import FriendsCard from "./FriendsCard";
import ReelProgressCard from "./ReelProgressCard";
import styles from "./UserProfile.module.scss";
import UpdateProfile from "../../components/modals/UpdateProfileInfo";
import UpdatePassword from "../../components/modals/UpdatePassword";
import DeleteUser from "../../components/modals/DeleteUser";
import AddFriendCard from "./AddFriendCard";

export default function UserProfile() {
  const [showDeleteProfile, setShowDeleteProfile] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  return (
    <div className={styles.profilePage}>
      <div className={styles.userButtons}>
        <button onClick={() => setShowUpdateProfile(true)} className={styles.modalButton}>
          Edit Profile Info
        </button>
        <button onClick={() => setShowUpdatePassword(true)} className={styles.modalButton}>
          Update Password
        </button>
        <button onClick={() => setShowDeleteProfile(true)} className={styles.deleteButton}>
          Delete Profile
        </button>
      </div>
      <div className={styles.userCards}>
        <UserInfoCard className={styles.userInfoCard} />
        <AddFriendCard className={styles.userAddFriendsCard} />
        <FriendsCard className={styles.userFriendsCard} />
        <ReelProgressCard className={styles.userReelProgressCard} />
      </div>
      <UpdateProfile isOpen={showUpdateProfile} onClose={() => setShowUpdateProfile(false)} />
      <UpdatePassword isOpen={showUpdatePassword} onClose={() => setShowUpdatePassword(false)} />
      <DeleteUser isOpen={showDeleteProfile} onClose={() => setShowDeleteProfile(false)} />
    </div>
  );
}
