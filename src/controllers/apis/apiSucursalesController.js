const { Sucursal } = require('../../database/models')
const getUrl = (req) =>
    req.protocol + "://" + req.get("host") + req.originalUrl;
const { validationResult } = require('express-validator')

module.exports = {
    all: (req, res) => {
        Sucursal.findAll({
            include: [{
                association: 'autos',
                attributes: ["id", "marca","modelo", "anio", "color", "imagen"],      
            }]
        })
        .then((result) => {
            if (result !== 0) {
                res.status(200).json({
                    meta: {
                        endPoint: getUrl(req),
                        total: result.length,
                    },
                    data: result,
                });
            } else {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        msg: "Not found",
                    },
                });
            }
        })
        .catch((error) => res.status(400).send(error));
    },
    one : (req, res) => {
        Sucursal.findByPk(req.params.id,{
            include: [{
                association: 'autos',
                attributes: ["id", "marca", "anio", "color", "imagen"]
            }]
        })
        .then((result) => {
            if (result !== 0) {
                res.status(200).json({
                    meta: {
                        endPoint: getUrl(req),
                        total: result.length,
                    },
                    data: result,
                });
            } else {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        msg: "Not found",
                    },
                });
            }
        })
        .catch((error) => res.status(400).send(error));
    },
    add : (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()) {
            Sucursal.create({
                ...req.body
            })
            .then((result) => {
                res.status(201).json({
                    meta: {
                        endPoint: getUrl(req),
                        msg: "Sucursal agregada",
                    },
                    data: result,
                });
            })
            .catch((error) => res.status(400).send(error));
        }else{
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: errors.mapped(),
                },
            });
        }
        
    },
    edit : (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            Sucursal.findByPk(req.params.id)
            .then(sucursal => {
                if (sucursal) {
                    Sucursal.update(
                        {
                            ...req.body
                        },
                        { 
                            where: { id: req.params.id }
                        }
                    )
                    .then(() => {
                        res.status(201).json({
                            msg : `Sucursal con el id:${sucursal.id} actualizada correctamente`,
                        })
                    })
                }else{
                    return res.status(400).json({
                        msg: "Sin cambios, ese id no existe ",
                    });
                }
            })
            .catch((error) => res.status(400).send(error));
        }else{
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: errors.mapped(),
                },
            });
        }
        
    },
    destroy : (req, res) => {
        Sucursal.findByPk(req.params.id)
        .then(sucursal => {
            if (sucursal) {
                Sucursal.destroy({
                    where: {id : req.params.id}
                })
                .then(()=> {
                    res.status(201).json({
                        msg : `La sucursal con el id:${req.params.id} fue eliminada correctamente`,
                    })
                })
                .catch(errors => console.log(errors))
            }else{
                res.status(400).json({
                    msg: `Sin cambios, el id: ${req.params.id} no existe`,
                });
            }
        })
        
    }
}