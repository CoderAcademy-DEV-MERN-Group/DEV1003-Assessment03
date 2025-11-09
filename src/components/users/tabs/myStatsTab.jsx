export const getFavouriteGenreStats = (userRatings, moviesData) => {
  // Add safety checks
  if (!moviesData || !Array.isArray(moviesData)) {
    return "Movie data not available";
  }

  if (!userRatings || !userRatings.length) {
    return "You haven't rated any movies yet!";
  }

  const moviesArray = moviesData;

  // Map movie data to an array to parse
  const moviesMap = moviesArray.reduce((map, movie) => {
    if (movie && movie._id) {
      map[movie._id] = movie;
    }
    return map;
  }, {});

  // set up some variables
  const genreCount = {};
  let totalRatedMovies = 0;

  // For each user rating, add that rating to a tally for that genre:
  userRatings.forEach((rating) => {
    const movie = moviesMap[rating.movie];
    if (movie && movie.genre && Array.isArray(movie.genre)) {
      movie.genre.forEach((genre) => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
      totalRatedMovies++;
    }
  });

  if (totalRatedMovies === 0) return "You haven't rated any movies yet!";

  const topGenres = Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(
      ([genre, count], index) =>
        `${index + 1}. ${genre}: Total of ${count} ${count === 1 ? "star rated!" : "stars rated!"}`
    );

  return topGenres;
};
