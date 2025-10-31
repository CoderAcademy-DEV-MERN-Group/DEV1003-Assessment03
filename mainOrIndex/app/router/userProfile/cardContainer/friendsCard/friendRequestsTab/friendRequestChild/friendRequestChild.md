# Friend Request Child

## Pending friend requests state

receive pending friend request and state updater from parent.

## Update friendship - accept

Have on click button that calls router.put('/my-friends/:requesterUserId', verifyToken, updateFriendship); to update friendRequestAccepted bool to true, and update state to remove relevant friendship

## Update friendship - decline

Have on click button that calls router.delete('/my-friends/:otherUserId', verifyToken, removeFriendship); to delete friendship document, and update state to remove relevant friendship
