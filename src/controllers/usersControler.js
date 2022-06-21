const { Usuario } = require('../database/models')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
        res.render('users/login',{
            //session : req.session
        })
    },
    processLogin : (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()){
            Usuario.findOne({
                where : { email : req.body.email}
            })
            .then(usuario => {
                req.session.user = {
                    id : usuario.id,
                    nombre : usuario.nombre,
                    apellido : usuario.apellido,
                    avatar : usuario.avatar,
                    rol : usuario.rol
                }
                if(req.body.recordar){
                    res.cookie('concesionarias', req.session.user, {maxAge : 1000*60*10} )
                }
                res.locals.user = req.session.user;
                res.redirect('/')
            })
            .catch(errors => console.log(errors))
        }else{
            res.render('users/login', {
                errors : errors.mapped(),
                old : req.body,
                //session : req.session
            })
        }
    },
    register: (req, res) => {
        res.render('users/register',{
            //session : req.session
        })
    },
    processRegister: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            let { nombre, apellido, email, pass } = req.body;
            Usuario.create({
                nombre,
                apellido,
                email,
                pass : bcrypt.hashSync(pass, 10),
                rol : 'user',
                avatar : "default-image.png"
            })
            .then(usuario => {
                req.session.user = {
                    id : usuario.id,
                    nombre : usuario.nombre,
                    apellido : usuario.apellido,
                    avatar : usuario.avatar,
                    rol : usuario.rol
                }
                res.locals.user = req.session.user;
                res.redirect('/users/login')
            })
            .catch(errors => console.log(errors))
        }else{
            res.render('users/register', {
                errors : errors.mapped(),
                old : req.body,
                //session : req.session
            })
        }
        
    },
    logout : (req, res) => {
        req.session.destroy();
        res.redirect('/')
    },
    profile : (req, res) => {
        Usuario.findByPk(req.session.user.id)
        .then(user => {
            res.render('users/profile', {
                user,
                //session : req.session
            })
        })
        .catch(errors => console.log(errors))
    },
    editProfile : (req, res) => {
        Usuario.update({
            ...req.body,
            avatar: req.file ? req.file.filename : req.session.user.avatar
        },{
            where : { id : req.session.user.id}
        })
        .then(() => {
            res.redirect('/')
        })
        .catch(errors => console.log(errors))
    },
    deleteUser : (req, res) => {
        req.session.destroy()
        if (req.cookies.concesionarias){
            res.cookie('concesionarias','',{maxAge:-1});
        }
        Usuario.destroy({
            where:{
                id : req.params.id
            }
        })
        .then(() => {
            res.redirect('/') 
        })
        .catch(errors => console.log(errors))
    },
}