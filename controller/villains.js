const villains = require('../villains')

const getVillains = (req,res) => {
    return res.send(villains)
}
const noEnter = (req,res) => {
    return res.Status(404)
}

module.exports = {getVillains}