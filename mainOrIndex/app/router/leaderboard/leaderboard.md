# Leaderboard

Leaderboard page rendering only children components (2 X ranking lists, 1x podium)

## API Requests

- router.get('leaderboard/', getLeaderboard); get all users in order of score

## States

- Leaderboard: stores leaderboard get request. Passed to all children components (Can probably just be variable since update not needed)

## Use Effects

N/A

## Components

- Podium
- 2 x ranking list components
