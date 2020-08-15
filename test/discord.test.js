const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '../.env')
})
const D = require('../dist/clients/discord').default
const d = new D()
d.getUser('191392978588139530')
.then(console.log)
.catch(console.log)
