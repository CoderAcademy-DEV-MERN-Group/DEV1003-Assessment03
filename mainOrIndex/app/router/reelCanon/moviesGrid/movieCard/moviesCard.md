# Movies Card

## API request for all movies

router.get('movies/reel-canon', getReelCanon);

## Update reel-progress

Call router.post('/', verifyToken, validateReelProgress, createReelProgress); To add movie to reel-progress, effectively 'scratching it off'

Call router.patch('/:movieId', verifyToken, validateReelProgress, updateReelProgress); to add rating to watched, but unrated movie

## Store all movies in state

update reel-progress state with state setter passed from movies grid

update ratings state with state setter passed from movies grid
