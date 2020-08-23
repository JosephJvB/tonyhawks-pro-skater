const fs = require('fs')
const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '../../.env')
})
const axios = require('axios')

const lastId = 746546613882847233
const firstId = 363778985160867841 // before dans first link post in #rollouts

// m.author.username
// m.id
// m.timestamp
// m.content

const gifMessages = require('./data/gifmessages.json')
void async function () {
  try {
    let gotAll = false
    let latest = gifMessages.length
      ? gifMessages[gifMessages.length - 1].id
      : firstId
    let loop = 0
    while(!gotAll) {
      console.log('loop', loop)
      const messages = await getMessages(latest)
      for(const m of messages) {
        if(m.content.includes('https://gfycat.com/')) gifMessages.push({
          id: m.id,
          ts: m.timestamp,
          user: m.author.username,
          content: m.content
        })
        gotAll = m.id == lastId
        latest = m.id
      }
      loop++
      console.log('got messages', gifMessages.length)
      console.log()
      console.log()
    }
    console.log('DONE')
    fs.writeFileSync(path.join(__dirname, 'data', 'gifmessages.json'), JSON.stringify(gifMessages, null, 2))
  } catch {
    console.log('ERROR')
    fs.writeFileSync(path.join(__dirname, 'data', 'gifmessages.json'), JSON.stringify(gifMessages, null, 2))
  }
}()

async function getMessages (afterId) {
  const params = { limit: 100 }
  if(afterId) params.after = afterId
  console.time('get')
  const r = await axios({
    method: 'get',
    url: `https://discord.com/api/channels/361095496892416002/messages`,
    params,
    headers: {
      Authorization: 'Bot ' + process.env.Bot
    }
  })
  console.timeEnd('get')
  return r.data
}