let { getAutos, getSucursales } = require('../data/dataBase')

let autosController = {
    listar: (req, res) => {
        res.render('autos', {
            autos : getAutos,
            session : req.session
        })
    },   
    auto : (req, res) => {
        let auto = getAutos.find( auto => auto.id == req.params.id)
        let sucursal = getSucursales.find( sucursal => sucursal.id == auto.sucursal)
        res.render('autoDetail', {
            auto,
            sucursal,
            session : req.session
        })
    }
}

module.exports = autosController