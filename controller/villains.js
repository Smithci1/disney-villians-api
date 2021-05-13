const models = require('../models')
const getVillains = async (request, response) => {
  const villains = await models.villains.findAll({ attributes: ['name', 'movie', 'slug'] })

  return response.send(villains)
}
const slugger = async (req, res) => {
  const { slug } = req.params
  const villainMatch = await models.villains.findOne({ where: { slug }, attributes: ['name', 'movie', 'slug'] })

  return villainMatch ? res.send(villainMatch) : res.sendStatus(404)
}


module.exports = { getVillains, slugger }
