/**
 * Friends add monitoring callback
 */

const { Friendship } = require("wechaty")
const config = require("./config")
// Friends add verification message to automatically agree to keywords
const addFriendKeyword = "cps" //if need more , use array

// Friends add monitoring callback
module.exports = async function onFriendShip(friendship) {
  let logMsg
  try {
    logMsg = "add friend" + friendship.contact().name()
    console.log(logMsg)
    switch (friendship.type()) {
      /**
       * step 1 New friend request
       * to use 'request.hello()'' to get verification message 
       * Accept this request via 'request.accept ()'
       */
      case Friendship.Type.Receive:
        if (addFriendKeyword == friendship.hello()) {
          logMsg = `Pass verification automatically`
          await friendship.accept()
        } else {
          logMsg = "Not automatically passed because the verification message is: " + friendship.hello()
        }
        break

      /**
       * step 2 confirm
       */
      case Friendship.Type.Confirm:
        logMsg = "friend ship confirmed with " + friendship.contact().name()
        break
    }
    console.log(logMsg)
  } catch (e) {
    logMsg = e.message
  }
}
