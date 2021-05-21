const models = require('../models')
const getVillains = async (req, res) => {
  try {
    const villains = await
    models.villains.findAll({ attributes: ['name', 'movie', 'slug'] })

    return res.send(villains)
  } catch (error) {
    return res.status(500).send('villains are unreachable, please try again')
  }
}
const slugger = async (req, res) => {
  try {
    const { slug } = req.params
    const villainMatch = await
    models.villains.findOne({
      where: { slug }, attributes: ['name', 'movie', 'slug']
    })

    return villainMatch ? res.send(villainMatch) : res.sendStatus(404)
  } catch (error) {
    return res.status(500).send('villain is unreachable, please try again')
  }
}
const addNewVillain = async (req, res) => {
  try {
    const { name, movie, slug } = req.body

    if (!name || !movie || !slug) {
      return res.status(400).send('You have not presented the attributes required: name, movie, slug')
    }

    const newVillain = await models.villains.create({ name, movie, slug })

    return res.status(201).send(newVillain)
  } catch (error) {
    return res.status(500).send('not able to create villain, please try again')
  }
}


module.exports = { getVillains, slugger, addNewVillain }
