# Friend Requests Tab

Component that contains a list of all current pending friend requests, representing friendship documents associated between current user and another user, where 'friendRequestAccepted' bool is false and 'requesterUserId' is not the current users id

## API Requests

N/A

## States

- State to represent current user friendships, state and setter passed from parent

## Use Effects

- Render list of friends when current user friendships updates (so it reloads without deleted friend if friend is deleted)

## Event Handler

- Use current user friendships state setter to update value on click of 'accept' or 'reject' button, triggering the use effect in the cardContainer component to call either the update or delete friendships route accordingly

## Components

N/A
