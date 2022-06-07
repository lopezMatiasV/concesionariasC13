let { getAutos, getSucursales, writeJsonAutos} = require('../data/dataBase');
const { validationResult } = require('express-validator')
let fs = require('fs')
let path = require('path')

module.exports = {
    autos: (req, res) => {
        res.render('admin/adminAutos', {
            getAutos,
            session : req.session
        })
    },
    formAgregarAuto: (req, res) => {
        res.render('admin/agregarAuto', {
            getSucursales,
            session : req.session
        })
    },
    agregarAuto: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            let lastId = 0;
        getAutos.forEach( auto => {
            if(auto.id > lastId){
                lastId = auto.id
            }
        })
        let { marca, modelo, anio, color, sucursal } = req.body
        
        let nuevoAuto = {
            id :lastId + 1,
            marca,
            modelo,
            anio,
            color,
            sucursal : +sucursal,
            imagen :  req.file ? req.file.filename : 'default-image.png'
        }
        getAutos.push(nuevoAuto)
        writeJsonAutos(getAutos)
        //res.redirect('/admin/autos')
        res.redirect(`/admin/autos#${nuevoAuto.id}`)
        }else{
            res.render('admin/agregarAuto', {
                getSucursales,
                session : req.session,
                old : req.body,
                errors : errors.mapped()
            })
        }
        
    },
    editFormAuto: (req, res) => {
        let auto = getAutos.find( auto => auto.id === +req.params.id)
        let sucursal = getSucursales.find(sucursal => sucursal.id === auto.sucursal)
        
        res.render('admin/editAuto', {
            auto,
            sucursal,
            getSucursales,
            session : req.session
        })
    },
    editAuto: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            let { marca, modelo, anio, color, sucursal } = req.body
        let auto = getAutos.find( auto => auto.id === +req.params.id)
        /* elimina imagen existente */
        if (req.file) {
            if (fs.existsSync(path.join(__dirname, "../../public/images", auto.imagen))
                &&
                auto.imagen !== "default-image.png"){
                fs.unlinkSync( path.join(__dirname, "../../public/images", auto.imagen))
            }
        }

        getAutos.forEach( auto => {
            if(auto.id === +req.params.id){
                auto.marca = marca,
                auto.modelo = modelo,
                auto.anio = anio,
                auto.color = color,
                auto.sucursal = +sucursal,
                auto.imagen = req.file ? req.file.filename : auto.imagen
            }
        })
        writeJsonAutos(getAutos)
        res.redirect(`/admin/autos#${auto.id}`)
        }else{
            let auto = getAutos.find( auto => auto.id === +req.params.id)
            let sucursal = getSucursales.find(sucursal => sucursal.id === auto.sucursal)
        
            res.render('admin/editAuto', {
                auto,
                sucursal,
                getSucursales,
                session : req.session,
                old : req.body,
                errors : errors.mapped()
            })
        }
        
    },
    borrarAuto: (req, res) => {
        getAutos.forEach(auto => {
            if(auto.id === + req.params.id){
                let autoAEliminar = getAutos.indexOf(auto);
                getAutos.splice(autoAEliminar, 1)
            }
        })
        writeJsonAutos(getAutos);
        res.redirect('/admin/autos')
    },
    buscarAuto : (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        let autos = getAutos.filter( auto => auto.marca == busqueda || auto.modelo == busqueda)
        res.render('admin/adminAutos',{
            getAutos : autos,
            busqueda,
            session : req.session
        })
    }
}