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
      <article className={styles.cardBorder}>
        <h2>Your Cinematic Info</h2>
        <h3>Username: {user.username}</h3>
        <h3>Email: {user.email}</h3>
        <h3>Your Top 5 Favourite Genres:</h3>
        {topGenres.length > 0 ? (
          topGenres.map((genre) => <div key={genre}>{genre}</div>)
        ) : (
          <div>You haven't rated any movies yet!</div>
        )}
        <MoviesWatched />
      </article>
    </section>
  );
}
