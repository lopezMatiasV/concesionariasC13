const { validationResult } = require('express-validator')
const { Auto, Sucursal} = require('../database/models')
const { Op } = require('sequelize')
let fs = require('fs')
let path = require('path')

module.exports = {
    sucursales: (req, res) => {
        Sucursal.findAll()
        .then(sucursales => {
            res.render('admin/adminSucursales', {
                sucursales,
            })
        })
        .catch(errors => console.log(errors))
    },
    formAgregarSucursal: (req, res) => {
        res.render('admin/agregarSucursal')
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
            })
        })
        .catch(errors => console.log(errors))
    },
    editarSucursal: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            Sucursal.findByPk(req.params.id)
            .then(sucursal => {
                Sucursal.update({
                    ...req.body,
                    imagen : req.file ? req.file.filename : sucursal.imagen
                }, {
                    where : {id : req.params.id}
                })
                .then(() => {
                    if (req.file) {
                        if (fs.existsSync(path.join(__dirname, "../../public/images", sucursal.imagen))
                            &&
                            sucursal.imagen !== "default-image.png"){
                            fs.unlinkSync( path.join(__dirname, "../../public/images", sucursal.imagen))
                        }
                    }
                    res.redirect('/admin/sucursales')
                })
                .catch(errors => console.log(errors))
            })
            .catch(errors => console.log(errors))
        }else{
            Sucursal.findByPk(req.params.id)
                .then(sucursal => {
                    res.render('admin/editarSucursal', {
                        sucursal,
                        errors: errors.mapped(),
                        old: req.body
                    })
                })
                .catch(errors => console.log(errors))
        }
    },
    borrarSucursal: (req, res) => {
        Auto.findAll({
            where : { sucursalId : req.params.id }
        })
        .then(autos => {
            autos.forEach(auto => {
                if (fs.existsSync(path.join(__dirname, "../../public/images", auto.imagen)) &&
                    auto.imagen !== "default-image.png"){
                    fs.unlinkSync( path.join(__dirname, "../../public/images", auto.imagen))
                }
            })
            Auto.destroy({
                where : { sucursalId : req.params.id}
            })
            .then(() => {
                Sucursal.findByPk(req.params.id)
                .then(sucursal => {
                    Sucursal.destroy({
                        where : {id : req.params.id}
                    })
                    .then(() => {
                        if (fs.existsSync(path.join(__dirname, "../../public/images", sucursal.imagen)) &&
                            sucursal.imagen !== "default-image.png"){
                            fs.unlinkSync( path.join(__dirname, "../../public/images", sucursal.imagen))
                        }
                    })
                    .catch(errors => console.log(errors))
                })
                .catch(errors => console.log(errors))
            })
            .catch(errors => console.log(errors))
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
            })
        })
        .catch(errors => console.log(errors))
    }
}