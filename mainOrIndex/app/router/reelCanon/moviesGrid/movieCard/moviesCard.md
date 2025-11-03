# Movie Card

Renders individual movies in divs (or semantic equivalent) with onHover and mobile equivalent revealing movie details (such as description) and displaying movie poster or blank color conditional on if user has watched the movie or not

## API Requests

N/A

## States

- State of watched movies (reel progress):
  - Receive state and state setter from movies grid, so if a movie is scratched (aka set to watched) we update state of watched movies, and update whether movie is 'scratched'
- State of ratings (in reel progress):
  - Receive state and state setter from movies grid, so if a movie is rated it updates ratings state and changes rendering of rating in movie card

## Use Effects

(Might be better as event handlers unsure right now)

- Update state of watched movies on scratch action
- Update state of reviewed movies on review action

## Event Handler

N/A

## Components

- Movie Card
