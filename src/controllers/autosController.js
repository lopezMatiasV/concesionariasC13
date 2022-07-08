const { Auto } = require('../database/models')

module.exports = {
    listar: (req, res) => {
        Auto.findAll()
            .then(autos => {
                res.render('autos', {
                    autos,
                })
            })
            .catch(errors => console.log(errors))
    },   
    auto : (req, res) => {
        Auto.findByPk(req.params.id,{
            include:['sucursal']
        })
        .then(auto => {
            res.render('autoDetail', {
                auto,
                sucursal : auto.sucursal,
            })
        })
        .catch(errors => console.log(errors))
    }
}