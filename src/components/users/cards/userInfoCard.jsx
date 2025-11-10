import { useMemo, useState } from "react";
import { useAuthContext } from "../../../contexts/useAuthContext";
import { useAllMovies, useUserReelProgress } from "../../../utilities/customHooks";
import { getFavouriteGenreStats } from "../tabs/myStatsTab";
import LoadingSpinner from "../../common/LoadingScreenOverlay";
import styles from "../UserComponents.module.scss";
import MoviesWatched from "../tabs/moviesWatchedTab";
import UpdateProfile from "../../modals/UpdateProfileInfo";
import UpdatePassword from "../../modals/UpdatePassword";
import DeleteUser from "../../modals/DeleteUser";

export default function UserInfoCard({ className }) {
  const { data, isLoading } = useAllMovies();
  const { user } = useAuthContext();
  const { data: userRp } = useUserReelProgress();

  const [showDeleteProfile, setShowDeleteProfile] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const topGenres = useMemo(() => {
    if (!userRp?.reelProgress || !data?.movies) return [];
    return getFavouriteGenreStats(userRp.reelProgress, data.movies);
  }, [userRp, data?.movies]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className={className}>
      <button onClick={() => setShowUpdateProfile(true)} className={styles.navItem}>
        {" "}
        Edit Profile Info{" "}
      </button>{" "}
      |
      <button onClick={() => setShowUpdatePassword(true)} className={styles.navItem}>
        {" "}
        Update Password{" "}
      </button>
      <button onClick={() => setShowDeleteProfile(true)} className={styles.deleteButton}>
        {" "}
        Delete Profile{" "}
      </button>
      <fieldset className={styles.cardBorder}>
        <legend>Your Cinematic Info</legend>
        <h2>Username: {user.username}</h2>
        <h2>Email: {user.email}</h2>
        <h2>Your Top 5 Favourite Genres:</h2>
        {topGenres.length > 0 ? (
          topGenres.map((genre) => <div key={genre}>{genre}</div>)
        ) : (
          <div>You haven't rated any movies yet!</div>
        )}
        <MoviesWatched />
        <UpdateProfile isOpen={showUpdateProfile} onClose={() => setShowUpdateProfile(false)} />
        <UpdatePassword isOpen={showUpdatePassword} onClose={() => setShowUpdatePassword(false)} />
        <DeleteUser isOpen={showDeleteProfile} onClose={() => setShowDeleteProfile(false)} />
      </fieldset>
    </section>
  );
}
