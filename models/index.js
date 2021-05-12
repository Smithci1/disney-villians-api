const Sequelize = require('sequelize')
const villainsModel = require('./villains')

const connection = new Sequelize('villainDatabase', 'villainUSER', 'villery1',
  { host: 'localhost', dialect: 'mysql' })

const villains = villainsModel(connection, Sequelize)

module.exports = { villains }
