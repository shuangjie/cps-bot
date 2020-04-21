/**
 * Message listening callback
 */
const { Message } = require("wechaty")
// node-request
const request = require("request")
const urlencode = require("urlencode")
const config = require("./config")
// bot name
const name = config.name

// Message listening callback
module.exports = bot => {
  return async function onMessage(msg) {
    // Judging that the message came from yourself, do not care, return
    if (msg.self()) return

    console.log("=============================")
    console.log(`msg : ${msg}`)
    console.log(
      `from: ${msg.from() ? msg.from().name() : null}: ${
        msg.from() ? msg.from().id : null
      }`
    )
    console.log(`to: ${msg.to()}`)
    console.log(`text: ${msg.text()}`)
    console.log("=============================")

    // Determine if this message type is text
    if (msg.type() == Message.Type.Text) {

      // request your api
      let res = await requestApi(msg.text())
      // return content
      await msg.say(res)
      
    } else {
      console.log("The message is not text!")
    }
  }
}

/**
 * Request an interface and return the message to the user
 * @param {String} info sent content
 * @return {Promise} Corresponding content
 */
function requestApi(info) {
  return new Promise((resolve, reject) => {
    let url = `https://cps.linkces.com/jd/universal`

    request.post(url, {form:{content:info}},(error, response, body) => {

      let res = JSON.parse(body)
      if (!error && res.code == 0) {
        let send = res.data.result
        console.log('res', res)
        resolve(send)
      } else {
        resolve("Server is busy")
      }

    })

  }).then().catch( function(e){
    //do some thing
  })
}
