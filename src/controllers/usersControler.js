const { Usuario } = require('../database/models')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
let fs = require('fs')
let path = require('path')

module.exports = {
    login: (req, res) => {
        res.render('users/login')
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
            })
        }
    },
    register: (req, res) => {
        res.render('users/register')
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
            })
        })
        .catch(errors => console.log(errors))
    },
    editProfile : async (req, res) => {
        try {
            let usuarioEdit = await Usuario.findByPk(req.params.id)
            await Usuario.update({
                ...req.body,
                avatar: req.file ? req.file.filename : req.session.user.avatar
            },{
                where : {id : req.params.id}
            })
            let usuario = await Usuario.findByPk(req.params.id)
            if(req.file){
                if (fs.existsSync(path.join(__dirname, "../../public/images/avatars", usuario.avatar)) &&
                    usuario.avatar !== "default-image.png"){
                    fs.unlinkSync( path.join(__dirname, "../../public/images/avatars", usuarioEdit.avatar))
                }
            }
            req.session.user = {
                id : usuario.id,
                nombre : usuario.nombre,
                apellido : usuario.apellido,
                avatar : usuario.avatar,
                rol : usuario.rol
            }
            res.locals.user = req.session.user;
            res.redirect('/users/perfil')
        } catch (error) {
            console.log(error);
        }
        /* Usuario.findByPk(req.session.user.id)
        .then(usuario => {
            Usuario.update({
                ...req.body,
                avatar: req.file ? req.file.filename : req.session.user.avatar
            },{
                where : { id : req.session.user.id}
            })
            .then(() => {
                if(req.file){
                    if (fs.existsSync(path.join(__dirname, "../../public/images/avatars", usuario.avatar)) &&
                        usuario.avatar !== "default-image.png"){
                        fs.unlinkSync( path.join(__dirname, "../../public/images/avatars", usuario.avatar))
                    }
                }
            })
            .catch(errors => console.log(errors))
            res.redirect('/users/perfil')
        })
        .catch(errors => console.log(errors))
         */
    },
    deleteUser : (req, res) => {
        req.session.destroy()
        if (req.cookies.concesionarias){
            res.cookie('concesionarias','',{maxAge:-1});
        }
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
            res.redirect('/')
        })
        .catch(error => console.log(error))
    },
}