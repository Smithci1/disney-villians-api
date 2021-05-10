const villains = require('../villains')
const getVillains = async(req,res) => {
    return res.send(villains)
}
const noEnter = (req,res) => {
    return res.Status(404)
}
const slugger = (req,res) =>{
    const { slug } = req.params
    const villainMatch = await mo
    
}

module.exports = { getVillains }
