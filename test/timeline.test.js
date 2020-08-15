const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '../.env')
})
process.env.AWS_REGION = 'us-west-2'
process.env.DEBUG = true
const fn = require('../dist/function')
fn.handler({
  body: JSON.stringify({
    user: {
      id: 'testid',
      avatar: 'testavatar',
      nickname: 'testname'
    }
  })
})