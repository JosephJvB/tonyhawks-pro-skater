const fs = require('fs')
const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '../../.env')
})
const axios = require('axios')
const x = 744911529585016883
const channelId = 361095496892416002

axios({
  method: 'get',
  url: `https://discord.com/api/channels/361095496892416002/messages/744911529585016883`,
  // params: {
  //   after: afterId,
  //   limit: 100,
  // },
  headers: {
    Authorization: 'Bot ' + process.env.Bot
  }
})
.then(r => {
  console.log(r.data)
})
.catch(e => {
  console.log(e.response.data)
  console.log(e.response.status)
})