const { Auto } = require('../../database/models')
const getUrl = (req) => req.protocol + "://" + req.get("host") + req.originalUrl;
const { validationResult } = require('express-validator')

module.exports = {
    all : async (req, res) => {
        try {
            let autos = await Auto.findAll({
                attributes: ["id", "marca", "anio", "color", "imagen"],
                include: [{
                    association: 'sucursal',
                    attributes: [ "nombre", "direccion", "telefono", "imagen"]
                }]
            })
            if (autos) {
                res.status(200).json({
                    meta: {
                        endPoint: getUrl(req),
                        total: autos.length,
                    },
                    data: autos,
                });
            } else {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        msg: "Not found",
                    },
                });
            }
        } catch (error) {
            res.status(400).send(error)
        }
    },
    one : async (req, res) => {
        try {
            let auto = await Auto.findByPk(req.params.id,{
                attributes: ["id", "marca", "modelo", "anio", "color", "imagen"],
                include: [{
                    association: 'sucursal',
                    attributes: [ "nombre", "direccion", "telefono", "imagen"]
                }]
            })
            if (auto) {
                res.status(200).json({
                    meta: {
                        endPoint: getUrl(req),
                        total: auto.length,
                    },
                    data: auto,
                });
            } else {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        msg: `Id ${req.params.id} inexistente`,
                    },
                });
            }
        } catch (error) {
            res.status(400).send(error)
        }
    },
    add : async (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            try {
                let newAuto = await Auto.create({
                    ...req.body
                })
                res.status(201).json({
                    meta: {
                    endPoint: getUrl(req),
                    msg: "Auto agregado",
                    },
                    data: newAuto,
                });
            } catch (error) {
                res.status(400).send(error)
            }
        }else{
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: errors.mapped(),
                },
            });
        }
    },
    edit : async (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            try {
                let auto = await Auto.findByPk(req.params.id)
                if (auto) {
                    let autoUpdate = await Auto.update(
                        {
                            ...req.body
                        },
                        {
                            where: { id: req.params.id }
                        }
                    )
                        res.status(201).json({
                            msg: "Auto actualizado",
                            data : autoUpdate
                        })
                }else{
                    return res.status(400).json({
                        msg: "Sin cambios, ese id no existe ",
                    });
                }
                
            } catch (error) {
                res.status(400).send(error)
            }
        }else{
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: errors.mapped(),
                },
            });
        }
    },
    destroy : async (req, res) => {
        try {
            await Auto.destroy({
                where: {id : req.params.id}
            })
            if(auto){
                res.status(200).json({
                    msj: 'Auto eliminado correctamente'
                })
            }else{
                return res.status(400).json({
                    msg: "Sin cambios, ese id no existe ",
                });
            }
        } catch (error) {
            console.log(errors)
        }
    }
}