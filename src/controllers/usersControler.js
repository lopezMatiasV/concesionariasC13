const {getUsers, writeJsonUsers} = require('../data/dataBase')

module.exports = {
    login: (req, res) => {
        res.render('users/login')
    },
    register: (req, res) => {
        res.render('users/register')
    },
    processRegister: (req, res) => {
        let lastId = 0;
        getUsers.forEach( user => {
            if(user.id > lastId){
                lastId = user.id
            }
        });
        let { nombre, apellido, email, pass } = req.body;

        let newUser = {
            id : lastId + 1,
            nombre,
            apellido,
            email,
            pass
        }
        getUsers.push(newUser);
        writeJsonUsers(getUsers);
        res.redirect('/users/login')
    },
}