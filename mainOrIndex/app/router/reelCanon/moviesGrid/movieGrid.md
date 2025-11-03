# Movies Grid

Only renders movie card components in grid

## API Requests

N/A

## States

- State of watched movies (reel progress):
  - Receive state and state setter from reel canon, pass state setter to movies card, so if a movie is scratched (aka set to watched) we update state of watched movies
- State of ratings (in reel progress):
  - Receive state and state setter from reel canon, pass state to movies card so if a movie is rated it updates ratings state
- State of search filter(s):
  - Receive search filter(s) state from reel-canon

## Use Effects

(Might be better as event handlers unsure right now)

- Display movie components conditional on state of search filter(s)

## Event Handler

N/A

## Components

- Movie Card
