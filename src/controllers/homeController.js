const { Auto, Sucursal } = require('../database/models')
const {Op} = require('sequelize')

module.exports = {
    index: (req, res) => {
        Sucursal.findAll()
        .then(sucursales => {
            res.render('home', {
                titulo: "Conocé nuestras sucursales",
                sucursales,
            })
        })
        .catch(errors => console.log(errors))    },
    search: (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        Auto.findAll({
            where: {
                [Op.or]: [
                    { marca: {[Op.substring]: busqueda}},
                    { modelo: {[Op.substring]: busqueda}},
                    { color: {[Op.substring]: busqueda}}
                ]
            },
        })
        .then(autos => {
            res.render('search',{
                autos,
                busqueda,
            })
        })
        .catch(errors => console.log(errors))    }
}

