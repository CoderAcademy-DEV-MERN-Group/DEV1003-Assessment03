import { useAuthContext } from "../../../contexts/useAuthContext";
import { useAllMovies } from "../../../utilities/customHooks";
import { getFavouriteGenreStats } from "../tabs/myStatsTab";

export default function UserInfoCard() {
  const { data: movies } = useAllMovies();
  const { user } = useAuthContext();

  const topGenres = getFavouriteGenreStats(user.reelProgress, movies?.movies);

  return (
    <section>
      <h1>Username: {user.username}</h1>
      <h2>Email: {user.email}</h2>
      <h2>Reel Progress: {user.reelProgress.length}/100 Reel Canon movies watched!</h2>
      <h2>Your Top 5 Favourite Genres:</h2>
      {topGenres.length > 0 && topGenres.map((genre) => <div key={genre}>{genre}</div>)}
    </section>
  );
}
