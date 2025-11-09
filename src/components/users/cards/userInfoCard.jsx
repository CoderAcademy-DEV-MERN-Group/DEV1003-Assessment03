import { useAuthContext } from "../../../contexts/useAuthContext";
import { useAllMovies } from "../../../utilities/customHooks";
import { getFavouriteGenreStats } from "../tabs/myStatsTab";

export default function UserInfoCard({ className }) {
  const { data, isLoading } = useAllMovies();
  const { user } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const topGenres = getFavouriteGenreStats(user.reelProgress, data.movies);

  return (
    <section className={className}>
      <h1>Username: {user.username}</h1>
      <h2>Email: {user.email}</h2>
      <h2>Reel Progress: {user.reelProgress.length}/100 Reel Canon movies watched!</h2>
      <h2>Your Top 5 Favourite Genres:</h2>
      {topGenres.length > 0 ? (
        topGenres.map((genre) => <div key={genre}>{genre}</div>)
      ) : (
        <div>You haven't rated any movies yet!</div>
      )}
    </section>
  );
}
