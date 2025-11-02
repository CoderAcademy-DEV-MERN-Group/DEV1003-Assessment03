# Carousel

Movie carousel component that displays an amount (e.g) 10 random reel-canon movies in rotating carousel

## API call

- router.get('movies/reel-canon', getReelCanon);

## States

- Featured movies state holding 10 randomly selected movies from all 100 reel-canon movies
- State for which movie is currently active in view

## Use Effects

N/A

## Components

- Can/should we reuse movie component from reelcanon as rendered components in carousel?
- If not seperate basic movie component or just render directly to carousel

## Event Handlers

- Potentially on hover to display detail
