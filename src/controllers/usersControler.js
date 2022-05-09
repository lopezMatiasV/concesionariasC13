const {getUsers, writeJsonUsers} = require('../data/dataBase')
const {validationResult} = require('express-validator')

module.exports = {
    login: (req, res) => {
        res.render('users/login',{
            session : req.session
        })
    },
    processLogin : (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()){
            let user = getUsers.find(user => user.email === req.body.email)
            req.session.user = {
            id : user.id,
            nombre : user.nombre,
            apellido : user.apellido,
            avatar : user.avatar,
            rol : user.rol
        }
        res.redirect('/')
        }else{
            //res.send(errors)
            res.render('users/login', {
                errors : errors.mapped(),
                old : req.body,
                session : req.session
            })
        }
    },
    register: (req, res) => {
        //res.send(req.session.user)
        res.render('users/register',{
            session : req.session
        })
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
            pass,
            avatar : "default-image.png"
        }
        getUsers.push(newUser);
        writeJsonUsers(getUsers);
        res.redirect('/users/login')
    },
    logout : (req, res) => {
        req.session.destroy();
        res.redirect('/')
    }
}