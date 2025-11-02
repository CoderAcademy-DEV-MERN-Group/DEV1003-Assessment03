# Reel Canon

Page that renders Title and paragraph, then search component, then movie grid component

## API Requests

- router.get('movies/reel-canon', getReelCanon); (get all reel-canon movies)
- router.get('users/', verifyToken, getReelProgress); (get all reel progress of logged in user)
- router.post('reel-progress/', verifyToken, validateReelProgress, createReelProgress): (add movie to reel progress of user when scratched off)
- router.patch('reel-progress/:movieId', verifyToken, validateReelProgress, updateReelProgress); (add review to movie already in users reel-progress)

## States

- State of watched movies (reel progress):
  - Pass state setter to movies grid, then movies card, so if a movie is scratched (aka set to watched) we update state of watched movies
- State of ratings (in reel progress):
  - Pass state setter to movies grid, then movies card so if a movie is rated it updates ratings state
- State of search filter(s):
  - Pass state setter to search component and state to movies grid then movies

## Use Effects

(Might be better as event handlers unsure right now)

- Add movie to reel progress of logged in user when watched movies state is updated
- Use effect to update rating in user reel progress when ratings state updates updates.

## Event Handler

N/A

## Components

- Movies Grid
- Search Bar
