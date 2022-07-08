const { Auto, Sucursal } = require('../database/models')
const { validationResult } = require('express-validator')
let fs = require('fs')
let path = require('path')
const {Op} = require('sequelize')

module.exports = {
    autos: (req, res) => {
        Auto.findAll({
            include : ['sucursal']
        })
        .then(autos => {
            res.render('admin/adminAutos', {
                getAutos : autos,
            })
        })
        .catch(errors => console.log(errors));
    },
    formAgregarAuto: (req, res) => {
        Sucursal.findAll()
        .then(sucursales => {
            res.render('admin/agregarAuto', {
                getSucursales : sucursales,
            })
        })
        .catch(errors => console.log(errors));
    },
    agregarAuto: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            Auto.create({
                ...req.body,
                imagen :  req.file ? req.file.filename : 'default-image.png'
            })
            .then(auto =>{
                res.redirect(`/admin/autos#${auto.id}`)
            })
            .catch(errors => console.log(errors));
        }else{
            Sucursal.findAll()
            .then(sucursales => {
                res.render('admin/agregarAuto', {
                    getSucursales : sucursales,
                    old : req.body,
                    errors : errors.mapped()
                })
            })
            .catch(errors => console.log(errors));
        }
    },
    editFormAuto: (req, res) => {
        let auto = Auto.findByPk(req.params.id, {
            include : ['sucursal']
        })
        let sucursales = Sucursal.findAll()
        Promise.all([auto, sucursales])
        .then(([auto, sucursales]) => {
            res.render('admin/editAuto', {
                auto,
                sucursal : auto.sucursal,
                getSucursales : sucursales,
            })
        })
        .catch(errors => console.log(errors));
    },
    editAuto: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            Auto.findByPk(req.params.id)
            .then(auto => {
                Auto.update({
                    ...req.body,
                    sucursalId : +req.body.sucursalId,
                    imagen: req.file ? req.file.filename : auto.imagen
                },{
                    where : {id : req.params.id}
                })
                .then(() => {
                    if (req.file) {
                        if (fs.existsSync(path.join(__dirname, "../../public/images", auto.imagen))
                            &&
                            auto.imagen !== "default-image.png"){
                            fs.unlinkSync( path.join(__dirname, "../../public/images", auto.imagen))
                        }
                    }
                    res.redirect(`/admin/autos#${auto.id}`)
                })
                .catch(errors => console.log(errors));
            })
            .catch(errors => console.log(errors));
        }else{
            let auto = Auto.findByPk(req.params.id, {
                include : ['sucursal']
            })
            let sucursales = Sucursal.findAll()
            Promise.all([auto, sucursales])
            .then(([auto, sucursales]) => {
                res.render('admin/editAuto', {
                    auto,
                    sucursal : auto.sucursal,
                    getSucursales : sucursales,
                    old : req.body,
                    errors : errors.mapped()
                })
            })
            .catch(errors => console.log(errors));
        }
        
    },
    borrarAuto: (req, res) => {
        Auto.findByPk(req.params.id)
        .then(auto => {
            Auto.destroy({
                where : { id : req.params.id}
            })
            .then(() => {
                if (fs.existsSync(path.join(__dirname, "../../public/images", auto.imagen)) &&
                    auto.imagen !== "default-image.png"){
                    fs.unlinkSync( path.join(__dirname, "../../public/images", auto.imagen))
                }
            })
            .catch(errors => console.log(errors));
            res.redirect('/admin/autos')
        })
        .catch(errors => console.log(errors));
    },
    buscarAuto : (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        Auto.findAll({
            where: {
                [Op.or]: [
                    { marca: {[Op.substring]: busqueda}},
                    { modelo: {[Op.substring]: busqueda}},
                    { color: {[Op.substring]: busqueda}},
                    { anio: {[Op.substring]: busqueda}}
                ]
            },
        })
        .then(autos => {
            res.render('admin/adminAutos',{
                getAutos : autos,
            })
        })
    }
}