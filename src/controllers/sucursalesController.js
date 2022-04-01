let { getSucursales, getAutos } = require('../data/dataBase')

module.exports = {
    sucursales: (req, res) => {
        res.render('sucursales', {
            getSucursales
        })
    },
    sucursal : (req, res) => {
        let id_sucursal = req.params.IDsucursal
        let sucursal = getSucursales.find(sucursal => sucursal.id == id_sucursal)
        
        let autos = getAutos.filter( autos => autos.sucursal == id_sucursal)
        res.render('sucursal',{
            sucursal,
            autos
        })
    }
}