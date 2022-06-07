let { getAutos, getSucursales, writeJson, writeJsonAutos} = require('../data/dataBase');
const { validationResult } = require('express-validator')

module.exports = {
    /* Vista de la tabla de sucursales */
    sucursales: (req, res) => {
        res.render('admin/adminSucursales', {
            sucursales : getSucursales,
            session : req.session
        })
    },
    /* Vista del formulario */
    formAgregarSucursal: (req, res) => {
        res.render('admin/agregarSucursal',{
            session : req.session
        })
    },
    /* Se ejecuta la accion del guardado de la nueva sucursal */
    agregarSucursal: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            let lastId = 0;
        getSucursales.forEach( sucursal => {
            if(sucursal.id > lastId){
                lastId = sucursal.id
            }
        })
        /* traemos lo que viene x body */
        let { nombre, direccion, telefono } = req.body
        /* Creamos el objeto con la nueva sucursal*/
        let nuevaSucursal = {
            id : lastId + 1,
            nombre,
            direccion, 
            telefono,
            imagen : req.file ? req.file.filename : 'default-image.png'
        }
        /* Cargamos la nueva sucursal al array de sucursales */
        getSucursales.push(nuevaSucursal)
        /* Sobreescribimos el json */
        writeJson(getSucursales)
        /* Redireccionamos a la vista de todas las sucursales */
        res.redirect('/admin/sucursales')
        }else{
            res.render('admin/agregarSucursal',{
                session : req.session,
                old : req.body,
                errors : errors.mapped()
            })
        }
        
    },
    /* Envia el formulario de edicion de sucursal */
    editForm: (req, res) => {
        /* buscamos los datos de la sucursal que queremos editar */
        let sucursal = getSucursales.find(sucursal => sucursal.id == req.params.id)
        /* Enviamos la vista con la variable donde guardamos la sucursal buscada */
        res.render('admin/editarSucursal', {
            sucursal,
            session : req.session
        })
    },
    /* Edita la sucursal que seleccionamos */
    editarSucursal: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            /* Capturamos lo que viene x body */
        let { nombre, direccion, telefono } = req.body
        /* Buscamos en nuestro array la sucursal que coincida con el id que enviamos */
        getSucursales.forEach( sucursal => {
            if(sucursal.id == req.params.id ){
                /* Una vez encontrada modificamos sus datos en el array */
                sucursal.id = sucursal.id,
                sucursal.nombre = nombre, 
                sucursal.direccion = direccion,
                sucursal.telefono = telefono,
                sucursal.imagen = req.file ? req.file.filename : sucursal.imagen
            }
        })
        /* Sobreescribimos el JSON */
        writeJson(getSucursales);
        /* Redireccionamos */
        res.redirect('/admin/sucursales')
        }else{
            let sucursal = getSucursales.find(sucursal => sucursal.id === +req.params.id) 
            res.render('admin/editarSucursal', {
                sucursal,
                session: req.session,
                errors: errors.mapped(),
                old: req.body
            })
        }
        
    },
    /* Eliminamos la sucursal seleccionada */
    borrarSucursal: (req, res) => {
        /* Buscamos los datos de la sucursal que queremos borrar */
        let sucursal = getSucursales.find(sucursal => sucursal.id == req.params.id)
        /* Buscamos el indice en el array de la sucursal que queremos borrar */
        let sucursalAEliminar = getSucursales.indexOf(sucursal)
        /* Eliminamos del array el indice que conseguimos en el paso anterior */
        getSucursales.splice(sucursalAEliminar, 1)
        /* Sobreescribimos el JSON */
        writeJson(getSucursales)
        /* Redireccionamos */
        res.redirect('/admin/sucursales')
    },
    buscarSucursal : (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        let sucursales = getSucursales.filter( sucursal => sucursal.nombre.toLowerCase() == busqueda)
        res.render('admin/adminSucursales',{
            sucursales,
            busqueda,
            session : req.session
        })
    }
}