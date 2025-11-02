# Add Friends Tab

Component that contains a name input to filter users by name and a list of all current users with no associated friendship document, with an add friend button to add friends

## API Requests

N/A

## States

- State for current input value of search
- State to represent current user friendships, state and setter passed from parent
- State to represent all unfriend users, state and setter passed from parent

## Use Effects

- Render list of users when search input updates or current user friendships updates (so it reloads without added user if user is added)

## Event Handler

- Use search input state setter to update value of search state on submit
- Use current user friendships state setter and unfriended users state setter to update value both on click of 'add friend' button (could instead have use effect in card container component that runs filter logic to set unfriended users state when friendships state changes)

## Components

N/A
