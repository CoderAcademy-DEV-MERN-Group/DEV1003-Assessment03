import { useState } from "react";
import { UserInfoCard } from "../../components/users";
import FriendsCard from "../../components/users/cards/friendsCard";
import ReelProgressCard from "../../components/users/cards/reelProgressCard";
import styles from "./userProfile.module.scss";
import UpdateProfile from "../../components/modals/UpdateProfileInfo";
import UpdatePassword from "../../components/modals/UpdatePassword";
import DeleteUser from "../../components/modals/DeleteUser";
// import AddFriendCard from "../../components/users/cards/AddFriendCard";

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
        <FriendsCard className={styles.userFriendsCard} />
        {/* <AddFriendCard className={styles.userFriendsCard} /> */}
        <ReelProgressCard className={styles.userReelProgressCard} />
      </div>
      <UpdateProfile isOpen={showUpdateProfile} onClose={() => setShowUpdateProfile(false)} />
      <UpdatePassword isOpen={showUpdatePassword} onClose={() => setShowUpdatePassword(false)} />
      <DeleteUser isOpen={showDeleteProfile} onClose={() => setShowDeleteProfile(false)} />
    </div>
  );
}
