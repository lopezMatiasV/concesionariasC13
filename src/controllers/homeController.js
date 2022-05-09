let { getSucursales, getAutos } = require('../data/dataBase')

module.exports = {
    index: (req, res) => {
        res.render('home', {
            titulo: "Conocé nuestras sucursales",
            sucursales: getSucursales,
            session : req.session
        })
    },
    search: (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        let autos = getAutos.filter( auto => auto.marca == busqueda || auto.modelo == busqueda)
        res.render('search',{
            autos,
            busqueda,
            session : req.session
        })
    }
}

