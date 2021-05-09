const express = require('express')
const villains = require('./villains')
const { getVillains } = require('./controller/villains.js')
const app = express()
app.get('/', getVillains)
app.get('/villains/:slug',)
app.listen(2020, () => {
    console.log('hi')
})
