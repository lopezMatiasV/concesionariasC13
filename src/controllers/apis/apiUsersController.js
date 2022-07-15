const { Usuario } = require('../../database/models')

const getUrl = (req) => req.protocol + "://" + req.get("host") + req.originalUrl;

module.exports = {
    all : (req, res) => {
        Usuario.findAll({
            attributes: ['id', 'nombre', 'apellido', 'email', 'rol'],
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
        .catch((error) => res.status(400).send(error))
    },
    one : (req, res) => {
        Usuario.findByPk(req.params.id)
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
    }
}