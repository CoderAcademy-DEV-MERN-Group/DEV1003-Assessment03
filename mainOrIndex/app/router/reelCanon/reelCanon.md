# Reel Canon

Page that renders Title and paragraph, then search component, then movie grid component

## API Requests

- router.get('movies/reel-canon', getReelCanon); (get all reel-canon movies)
- router.get('/', verifyToken, getReelProgress); (get all reel progress of logged in user)

## States

- State of watched movies (reel progress):
  - Pass state setter to movies grid, then movies card, so if a movie is scratched (aka set to watched) we update state of watched movies
- State of ratings (in reel progress):
  - Pass state setter to movies grid, then movies card so if a movie is rated it updates ratings state
- State of search filter(s)

Pass state updater to movies grid then movies card so watched movies state is updated when a movie is rated

## Use Effects

(Might be better as event handlers unsure right now)

- router.post('movies/', verifyToken, validateReelProgress, createReelProgress):
  - Add movie to reel progress of logged in user when watched movies state is updated
- router.patch('movies/:movieId', verifyToken, validateReelProgress, updateReelProgress);
  - Use effect to update rating in user reel progress when ratings state updates updates.

## Event Handler

N/A

## Components

N/A
