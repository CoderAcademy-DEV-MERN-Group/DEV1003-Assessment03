# Friends Card

Card component that conditionally renders addFriends tab, friendRequests tab and myFriends tab

## API Requests

N/A

## States

- State to represent currently selected tab received from user profile
- State to represent current user friendships, state and setter passed to all 3 tabs received from user profile
- State of all unfriended users, frontend logic to remove users in current friendships state from all users array. State and setter passed to friendCard

## Use Effects

- Render each tab conditionally when state of tab is updated

## Event Handler

- Use selected tab state setter to update state of tab on click when different tab clicked

## Components

- My Friends Tab
- Friend requests tab
- Add Friends Tab
