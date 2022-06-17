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
                session : req.session
            })
        })
        .catch(errors => console.log(errors));
    },
    formAgregarAuto: (req, res) => {
        Sucursal.findAll()
        .then(sucursales => {
            res.render('admin/agregarAuto', {
            getSucursales : sucursales,
            session : req.session
            })
        })
        .catch(errors => console.log(errors));
    },
    agregarAuto: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            let { marca, modelo, anio, color, sucursal } = req.body
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
                    session : req.session,
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
                session : req.session
            })
        })
        .catch(errors => console.log(errors));
    },
    editAuto: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            let auto = Auto.findByPk(req.params.id)
            //let { marca, modelo, anio, color, sucursal } = req.body
            Auto.update({
                ...req.body,
                sucursalId : +req.body.sucursal,
                imagen: req.file ? req.file.filename : auto.imagen
            },{
                where : {id : req.params.id}
            })
            .then(() => {
                /* elimina imagen existente */
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
                    session : req.session,
                    old : req.body,
                    errors : errors.mapped()
                })
            })
            .catch(errors => console.log(errors));
        }
        
    },
    borrarAuto: (req, res) => {
        Auto.destroy({
            where : { id : req.params.id}
        })
        .then(() => {
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
                session : req.session
            })
        })
    }
}