const models = require('../models')
const getVillains = async (req, res) => {
  const villains = await models.villains.findAll({ attributes: ['name', 'movie', 'slug'] })

  return res.send(villains)
}
const slugger = async (req, res) => {
  const { slug } = req.params
  const villainMatch = await models.villains.findOne({
    where: { slug },
    attributes: ['name', 'movie', 'slug']
  })

  return villainMatch ? res.send(villainMatch) : res.sendStatus(404)
}
const addNewVillain = async (req, res) => {
  const { name, movie, slug } = req.body

  if (!name || !movie || !slug) {
    return res.status(400).send('You have not presented the attributes required: name, movie, slug')
  }

  const newVillain = await models.villains.create({ name, movie, slug })

  return res.status(201).send(newVillain)
}



module.exports = { getVillains, slugger, addNewVillain }
