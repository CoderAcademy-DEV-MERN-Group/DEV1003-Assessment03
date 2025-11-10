import { useMemo } from "react";
import { useAuthContext } from "../../../contexts/useAuthContext";
import { useAllMovies, useUserReelProgress } from "../../../utilities/customHooks";
import { getFavouriteGenreStats } from "../tabs/myStatsTab";
import LoadingSpinner from "../../common/LoadingScreenOverlay";
import styles from "../UserComponents.module.scss";
import MoviesWatched from "../tabs/moviesWatchedTab";

export default function UserInfoCard({ className }) {
  const { data, isLoading } = useAllMovies();
  const { user } = useAuthContext();
  const { data: userRp } = useUserReelProgress();

  const topGenres = useMemo(() => {
    if (!userRp?.reelProgress || !data?.movies) return [];
    return getFavouriteGenreStats(userRp.reelProgress, data.movies);
  }, [userRp, data?.movies]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className={className}>
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
      </fieldset>
    </section>
  );
}
