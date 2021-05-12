const Connection = require('mysql2/typings/mysql/lib/Connection')
const { Sequelize } = require('sequelize/types')

const villains = (Connection, Sequelize) => {
  return Connection.define('heroes', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    movie: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING },

  })
}
