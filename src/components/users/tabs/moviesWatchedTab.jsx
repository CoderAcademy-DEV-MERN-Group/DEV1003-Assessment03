import { useAuthContext } from "../../../contexts/useAuthContext";
import { useAllMovies, useUserReelProgress } from "../../../utilities/customHooks";

export default function MoviesWatched({ className }) {
  // get all movies occurs even for non-logged in users
  const { data: canon, isLoading: canonLoading } = useAllMovies();
  // Checks for logged in status and attaches user data
  const { isAuthenticated } = useAuthContext();
  // Gets user reelProgress if logged in
  const { data: rpResponse, isLoading: progressLoading } = useUserReelProgress({
    enabled: isAuthenticated,
  });

  if (canonLoading || progressLoading) {
    return <>Movies loading...</>;
  }

  const movieTitleMap = {};
  (canon?.movies ?? []).forEach((movie) => {
    movieTitleMap[movie._id] = movie.title;
  });

  const watchedMovies = (rpResponse?.reelProgress ?? []).map((progress) => ({
    title: movieTitleMap[progress.movie] || "Unknown Movie",
    rating: progress.rating,
    movieId: progress.movie,
  }));

  return (
    <div className={className}>
      <h2>Movies Watched</h2>
      {watchedMovies.length === 0 ? (
        <p>No movies watched yet!</p>
      ) : (
        <ul>
          {watchedMovies.map((movie) => (
            <li key={movie.movieId}>
              <strong>{movie.title}</strong> - Rating: {movie.rating}/5 stars.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
