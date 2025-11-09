import { useAllMovies } from "../../utilities/customHooks/useMovies";
import { useUserReelProgress } from "../../utilities/customHooks/useReelProgress";
import { useAuthContext } from "../../contexts/useAuthContext";
import ErrorMessage from "../../components/common/ErrorMessage";
import MovieCard from "../../components/movies/movieCard";
import styles from "./ReelCanon.module.scss";

export default function ReelCanon() {
  // get all movies occurs even for non-logged in users
  const { data: canon, isLoading: canonLoading, error: canonError } = useAllMovies();
  // Checks for logged in status and attaches user data
  const { user, isAuthenticated } = useAuthContext();
  // Gets user reelProgress if logged in
  const {
    data: rpResponse,
    isLoading: progressLoading,
    error: progressError,
  } = useUserReelProgress({
    enabled: isAuthenticated,
  });

  if (canonLoading || progressLoading) {
    return <>Movies loading...</>;
  }

  if (canonError) {
    return (
      <>
        <div className={styles.reelProgress} />
        <div className={styles.errorContainer}>
          <ErrorMessage error={canonError.message} className={styles.errorMessage} />
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </>
    );
  }

  if (isAuthenticated && progressError && progressError.status !== 404) {
    return (
      <>
        <div className={styles.reelProgress} />
        <div className={styles.errorContainer}>
          <ErrorMessage error={progressError.message} className={styles.errorMessage} />
          <p className={styles.errorMessage}>Movie data loaded, but progress failed to load.</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </>
    );
  }

  // Create a lookup object for any existing progress records
  const progressMap = {};
  if (rpResponse?.reelProgress) {
    rpResponse.reelProgress.forEach((p) => {
      progressMap[p.movie] = {
        isRevealed: p.isWatched,
        rating: p.rating,
      };
    });
  }

  // Create array of movies with isRevealed status for display
  const movies = (canon?.movies ?? []).map((m) => {
    const prog = progressMap[m._id];
    return {
      ...m,
      isRevealed: !!prog?.isRevealed,
      rating: prog?.rating ?? undefined,
    };
  });

  return (
    <div>
      <section className={styles.reelCanon}>
        <article className={styles.title}>
          <h1>The Reel Canon</h1>
          {!isAuthenticated ? (
            <h2>Sign In or Register to Start Your Film Journey!</h2>
          ) : (
            <h2>
              {isAuthenticated ? `Welcome ${user.username}! ` : ""}
              100 Curated Films to Start Your Celluloid Exploration!
            </h2>
          )}
        </article>

        <section className={styles.grid}>
          {movies.map((movie, i) => (
            <MovieCard key={movie._id} movie={movie} index={i} totalMovies={movies.length} />
          ))}
        </section>
      </section>
    </div>
  );
}
