# My Friends Tab

Component that contains a name input to filter friends by name and a list of all current friends, with an unfriend button to delete friends

## API Requests

N/A

## States

- State for current input value of search
- State to represent current user friendships, state and setter passed from parent

## Use Effects

- Render list of friends when search input updates or current user friendships updates (so it reloads without deleted friend if friend is deleted)

## Event Handler

- Use search input state setter to update value of search state on submit
- Use current user friendships state setter to update value on click of 'unfriend' button

## Components

N/A
