const { Usuario, Sequelize } = require('../database/models')
let fs = require('fs')
let path = require('path')

module.exports = {
    users :(req, res) => {
        Usuario.findAll()
        .then( users => {
            res.render('admin/adminUsers', {
                users,
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
        Usuario.findByPk(req.params.id)
        .then(usuario => {
            Usuario.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                if (fs.existsSync(path.join(__dirname, "../../public/images/avatars", usuario.avatar)) &&
                    usuario.avatar !== "default-image.png"){
                    fs.unlinkSync( path.join(__dirname, "../../public/images/avatars", usuario.avatar))
                }
            })
            .catch(error => console.log(error))
            res.redirect('/admin/users')
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
            })
        })
    }
}