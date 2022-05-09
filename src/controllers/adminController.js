let { getAutos, getSucursales, writeJson, writeJsonAutos} = require('../data/dataBase');

module.exports = {
    /* Bienvenida del admin */
    index : (req, res) => {
        res.render('admin/adminIndex', {
            session : req.session
        })
    },

    /* CRUD SUCURSALES */

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

    /* CRUD AUTOS */

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
        let { marca, modelo, anio, color, sucursal } = req.body
        let auto = getAutos.find( auto => auto.id === +req.params.id)
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
}