const villains = (Connection, Sequelize) => {
  return Connection.define('users', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    movie: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING },
  }, { paranoind: true })
}

module.exports = villains
