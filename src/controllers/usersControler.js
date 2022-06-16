const {getUsers, writeJsonUsers} = require('../data/dataBase')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

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
        if(req.body.recordar){
            res.cookie('concesionarias', req.session.user, {maxAge : 1000*60*10} )
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
        let errors = validationResult(req)
        if(errors.isEmpty()){
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
            pass : bcrypt.hashSync(pass, 10),
            rol : 'user',
            avatar : "default-image.png"
        }
        getUsers.push(newUser);
        writeJsonUsers(getUsers);
        res.redirect('/users/login')
        }else{
            //res.send(errors)
            res.render('users/register', {
                errors : errors.mapped(),
                old : req.body,
                session : req.session
            })
        }
        
    },
    logout : (req, res) => {
        req.session.destroy();
        res.redirect('/')
    },
    profile : (req, res) => {
        let id = +req.session.user.id;
        let user = getUsers.find(user => user.id === id)
        res.render('users/profile', {
            user,
            session : req.session
        })
    },
    editProfile : (req, res) => {
        let id = +req.params.id;
        let user = getUsers.find(user => user.id === id)
        let { nombre, direccion, telefono } = req.body
        /* user.id = user.id
        user.nombre = nombre
        user.direccion = direccion
        user.telefono = telefono
        user.avatar = req.file ? req.file.filename : user.avatar
 */
        getUsers.forEach(user => {
            if(user.id === id){
                user.id = user.id
                user.nombre = nombre
                user.direccion = direccion
                user.telefono = telefono
                user.avatar = req.file ? req.file.filename : user.avatar
            }
        })

        writeJsonUsers(getUsers)
        req.session.user = user
        res.redirect('/users/perfil')
    },
    deleteUser : (req, res) => {
        getUsers.forEach(user => {
            if(user.id === +req.params.id){
                let userABorrar = getUsers.indexOf(user)
                getUsers.splice(userABorrar, 1)
            }
        })
        writeJsonUsers(getUsers)
        req.session.destroy()
        res.redirect('/')
    }
}