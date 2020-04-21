/**
 * wechaty-puppet-padplus index
 */

const { Wechaty } = require("wechaty")
const { PuppetPadplus } = require("wechaty-puppet-padplus")
const config = require("./config")

const onScan = require("./onScan") // monitor the callback when scanning the QR code
const onMessage = require("./onMessage") // Message listening callback
const onFriendShip = require("./onFriendShip") // Friends add monitoring callback

// init
const bot = new Wechaty({
  puppet: new PuppetPadplus({
    token: config.token
  }),
  name: config.name
})

bot
  .on("scan", onScan)
  .on("message", onMessage(bot))
  .on("friendship", onFriendShip)
  .start()
