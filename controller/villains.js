const villains = require('../villains')
const models = require('../models')
const getVillains = async (req, res) => {
  const villains = await models.villains.findAll({ props: ['name', 'movie', 'slug'] })

  return res.send(villains)
}

const slugger = async (req, res) => {
  const { slug } = req.params
  const villainMatch = await models.villains.findOne({ where: { slug } })

  return res.send(villainMatch)
}

module.exports = { getVillains, slugger }
