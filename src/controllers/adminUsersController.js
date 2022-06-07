const {getUsers, writeJsonUsers} = require('../data/dataBase')

module.exports = {
    users :(req, res) => {
        res.render('admin/adminUsers',{
            users : getUsers,
            session : req.session
        })
    },
    userEdit : (req, res) =>{
        let user = getUsers.find(user => user.id === +req.params.id)
        getUsers.forEach(user => {
            if(user.id === +req.params.id){
                user.rol = req.body.rol
            }
        })
        writeJsonUsers(getUsers)
        res.redirect(`/admin/users#${user.id}`)
    },
    userDelete : (req, res) => {
        getUsers.forEach(user => {
            if(user.id === + req.params.id){
                let userAEliminar = getUsers.indexOf(user);
                getUsers.splice(userAEliminar, 1)
            }
        })
        writeJsonUsers(getUsers);
        res.redirect('/admin/users')
    },
    userSearch : (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        let users = getUsers.filter( user => user.rol == busqueda)
        res.render('admin/adminUsers',{
            users,
            busqueda,
            session : req.session
        })
    }
}