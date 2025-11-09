export const getFavouriteGenreStats = (userRatings, moviesData) => {
  // Map movie data to an array to parse
  const moviesMap = moviesData.reduce((map, movie) => {
    if (movie && movie._id) {
      map[movie._id] = movie;
    }
    return map;
  }, {});

  // set up some blank variables
  const genreCount = {};

  // For each user rating passed to the function, add that rating to a tally for that genre:
  userRatings.forEach((rating) => {
    const movie = moviesMap[rating.movie];
    movie?.genre?.forEach((genre) => {
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });
  });

  return Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(
      ([genre, count], index) =>
        `${index + 1}. ${genre}: ${count} ${count === 1 ? "movie" : "movies"}`
    );
};
