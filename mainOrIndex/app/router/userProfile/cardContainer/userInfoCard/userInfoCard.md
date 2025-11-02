# User Info Card

Card component that conditionally renders myDetails tab, moviesWatched tab and myStats tab

## API Requests

N/A

## States

- State to represent currently selected tab
- State to represent current user, received from cardContainer and passed to all 3 tabs
- State to represent current user friendships, state passed to userInfoCard, state and setter to friendsCard
- State of all unfriended users, frontend logic to remove users in current friendships state from all users array. State and setter passed to friendCard

## Use Effects

- Render each tab conditionally when state of tab is updated

## Event Handler

- Use selected tab state setter to update state of tab on click when different tab clicked

## Components

- user Info Card
- Friends Card
- Reel Progress Card
