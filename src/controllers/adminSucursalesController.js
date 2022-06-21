const { validationResult } = require('express-validator')
const { Sucursal} = require('../database/models')
const { Op } = require('sequelize')

module.exports = {
    sucursales: (req, res) => {
        Sucursal.findAll()
        .then(sucursales => {
            res.render('admin/adminSucursales', {
                sucursales,
                //session : req.session
            })
        })
        .catch(errors => console.log(errors))
    },
    formAgregarSucursal: (req, res) => {
        res.render('admin/agregarSucursal',{
            //session : req.session
        })
    },
    agregarSucursal: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            Sucursal.create({
                ...req.body,
                imagen : req.file ? req.file.filename : 'default-image.png'
            })
            .then(() => {
                res.redirect('/admin/sucursales')
            })
            .catch(errors => console.log(errors))
        }else{
            res.render('admin/agregarSucursal',{
                //session : req.session,
                old : req.body,
                errors : errors.mapped()
            })
        }
        
    },
    editForm: (req, res) => {
        Sucursal.findByPk(req.params.id)
        .then(sucursal => {
            res.render('admin/editarSucursal', {
                sucursal,
                //session : req.session
            })
        })
        .catch(errors => console.log(errors))
    },
    editarSucursal: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            let sucursal = Sucursal.findByPk(req.params.id)
            Sucursal.update({
                ...req.body,
                imagen : req.file ? req.file.filename : sucursal.imagen
            }, {
                where : {id : req.params.id}
            })
            .then(() => {
                res.redirect('/admin/sucursales')
            })
            .catch(errors => console.log(errors))
        }else{
            Sucursal.findByPk(req.params.id)
                .then(sucursal => {
                    res.render('admin/editarSucursal', {
                        sucursal,
                        //session : req.session,
                        errors: errors.mapped(),
                        old: req.body
                    })
                })
                .catch(errors => console.log(errors))
        }
    },
    borrarSucursal: (req, res) => {
        Sucursal.destroy({
            where : {id : req.params.id}
        })
        .then(() => {
            res.redirect('/admin/sucursales')
        })
        .catch(errors => console.log(errors))
    },
    buscarSucursal : (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        Sucursal.findAll({
            where : {
                nombre : {[Op.substring]: busqueda}
            }
        })
        .then( sucursales => {
            res.render('admin/adminSucursales',{
                sucursales,
                busqueda,
                //session : req.session
            })
        })
        .catch(errors => console.log(errors))
    }
}