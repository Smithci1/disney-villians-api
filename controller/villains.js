const models = require('../models')
const getVillains = async (request, response) => {
  const villains = await models.villains.findAll({ attributes: ['name', 'movie', 'slug'] })

  return response.send(villains)
}
const slugger = async (req, res) => {
  const { slug } = req.params
  const villainMatch = await models.villains.findOne({ where: { slug } })

  return res.send(villainMatch)
}


module.exports = { getVillains, slugger }
