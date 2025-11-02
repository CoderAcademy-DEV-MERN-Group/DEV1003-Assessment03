# My Stats Tab

Tab component that conditionally renders depending on currently selected tab state in parent. Will show user statistics such as:

- Total watch time (would require addition of runtime to movie model)
- Watch time remaining (would require addition of runtime to movie model)
- Favourite Genre (would require logic to count genre instances in reel-progress and return largest)
- Leaderboard position (would require api call to leaderboard/ route)
- Total friends

## API Requests

- Possible call to router.get('leaderboard/', getLeaderboard);

## States

- State to represent current user
- State of all current user friends

## Use Effects

N/A

## Components

N/A
