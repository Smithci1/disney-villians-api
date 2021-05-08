const express = require('express')
const villains = require('./villains')
const {getVillains} = require('./controller/villains.js')
const app = express()
app.get('/', getVillains)
app.all('*',)
app.listen(2020, () => {
    console.log('hi')
})
