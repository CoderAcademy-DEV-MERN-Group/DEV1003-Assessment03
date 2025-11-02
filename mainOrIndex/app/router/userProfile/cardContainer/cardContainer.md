# Card Container

Card container component that renders 3x user profile cards

## API Requests

- router.get('users/my-profile', verifyToken, getUserProfile): Get current user info (OPTIONAL - could parse from all users call instead of calling separately)
- router.get('friendships/my-friends', verifyToken, getUserFriendships): Get current user friendships
- router.post('friendships/:recipientUserId', verifyToken, createFriendship): Add pending friendship document
- router.put('friendships/my-friends/:requesterUserId', verifyToken, updateFriendship): Accept friend request from other user
- router.delete('/my-friends/:otherUserId', verifyToken, removeFriendship): Delete friendship document on unfriend or reject request
- router.get('users/', verifyToken, requireAdmin, getAllUsers): Get all users
- router.put('users/my-profile', verifyToken, updateUserProfile): Update user in database when user state changes

## States

- State to represent current user, passed to all 3 children
- State to represent current user friendships, state passed to userInfoCard, state and setter to friendsCard
- State of all unfriended users, frontend logic to remove users in current friendships state from all users array. State and setter passed to friendCard

## Use Effects

- Call users users/my-profile or /my-profile/update-password put route to update user document when state for user changes
- Call friendships post, put or delete route conditionally when friendship state updates to either add new friendship document, set existing friendship document to accepted or delete existing friendship document when friend request rejected or current friend deleted. Could separate this into separate states

## Components

- user Info Card
- Friends Card
- Reel Progress Card
