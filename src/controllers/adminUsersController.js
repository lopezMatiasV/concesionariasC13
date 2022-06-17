const { Usuario, Sequelize } = require('../database/models')
module.exports = {
    users :(req, res) => {
        Usuario.findAll()
        .then( users => {
            res.render('admin/adminUsers', {
                users,
                session: req.session
            })
        })
        .catch(error => console.log(error))
    },
    userEdit : (req, res) =>{
        let { rol } = req.body
            Usuario.update({
                rol
            },
            { where: { id : req.params.id}})
            .then(() => {
                res.redirect('/admin/users')
            })
            .catch(error => console.log(error))
    },
    userDelete : (req, res) => {
        Usuario.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((user) => {
            return res.redirect('/admin/users')
        })
        .catch(error => console.log(error))
    },
    userSearch : (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        Usuario.findAll({
            where: {
                rol: {[Sequelize.Op.substring]: busqueda}
            }
        })
        .then(users => {
            res.render('admin/adminUsers',{
                users,
                busqueda,
                session: req.session
            })
        })
    }
}