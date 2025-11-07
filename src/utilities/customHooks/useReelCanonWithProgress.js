import { useAuthContext } from "../../contexts/useAuthContext";
import { useAllMovies } from "./useMovies";
import { useUserReelProgress } from "./useReelProgress";

export const useReelCanonWithProgress = () => {
  // fetch reel-canon movies
  const { data: canon, isLoading: moviesLoading } = useAllMovies();

  // Check if user is logged in
  const { isAuthenticated } = useAuthContext();

  // Fetch progress only if logged in
  const { data: rpResponse, isLoading: progressLoading } = useUserReelProgress({
    enabled: isAuthenticated, // checks that user exits and is not null/falsy
  });

  // Create object lookup for UI speed
  const progressMap = {};
  if (rpResponse?.reelProgress) {
    rpResponse.reelProgress.forEach((record) => {
      progressMap[record.movie._id] = {
        isRevealed: record.isWatched,
        rating: record.rating,
      };
    });
  }

  // Update ui with any existing watched movies
  const movies = (canon?.movies ?? []).map((movie) => {
    const progress = progressMap[movie._id];
    return {
      ...movie,
      isRevealed: !!progress?.isRevealed,
      rating: progress?.rating ?? undefined,
    };
  });

  // Return all the data!
  return {
    movies,
    isLoading: moviesLoading || progressLoading,
    isAuthenticated,
  };
};
