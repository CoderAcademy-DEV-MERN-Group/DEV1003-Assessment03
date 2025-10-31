# Add Friends Tab

## Reuse components from friends tab

Reuse friends search bar component and friends list component, just changing the search logic and different state

## State for all users that have no associated friendship document

There are 2 ways to do this.

- Create API route that searches for all users, matching name provided from search bar and checks for associated friendship documents, returning all users that meet criteria and rendering (database heavy and slow, not recommended)
- Call router.get('/', verifyToken, requireAdmin, getAllUsers); to get all users and compare to state holding all current user friendships, then save this to a state representing all uses without an associated friendship. Use front end filter logic to set search state matching name passed to search bar (less scaleable but much more efficient for app of our size and easier to implement)

## Updating State

Friend request tab and friends tab will have to be passed state updaters to add users to unfriended users state when friend requests are rejected or friends are unfriended.

State updaters not required to be passed here as adding a friend will only create a pending friendship document that isn't rendered anywhere
