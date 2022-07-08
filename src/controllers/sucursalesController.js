const { Sucursal } = require('../database/models')

module.exports = {
    sucursales: (req, res) => {
        Sucursal.findAll()
        .then(sucursales => {
            res.render('sucursales', {
                getSucursales : sucursales,
            })
        })
        .catch(errors => console.log(errors))
    },
    sucursal : (req, res) => {
        Sucursal.findByPk(req.params.id, {
            include : ['autos']
        })
        .then(sucursal => {
            res.render('sucursal',{
                sucursal,
                autos : sucursal.autos,
            })
        })
        .catch(errors => console.log(errors))
    }
}