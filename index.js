const express = require('express')
const { getVillains, slugger, addNewVillain } = require('./controller/villains.js')
const bodyParser = require('body-parser')
const app = express()

app.get('/villains', getVillains)
app.get('/villains/:slug', slugger)


app.post('/villains', bodyParser.json(), addNewVillain)

app.listen(1337, () => {
  return console.log('you are lisening to 1337')
})
