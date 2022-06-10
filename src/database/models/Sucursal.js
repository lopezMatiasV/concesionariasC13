module.exports = (sequelize, dataTypes) => {
    let alias = 'Sucursal';
    let cols = {
        id : {
            type : dataTypes.INTEGER(11),
            primaryKey : true,
            autoIncrement : true,
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        direccion: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        telefono: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        imagen: {
            type: dataTypes.STRING(255),
        },
    };
    let config = {
        tableName : 'sucursales',
        timestamps : false
    }
    const Sucursal = sequelize.define(alias, cols, config);

    Sucursal.associate = models => {

        Sucursal.hasMany(models.Auto, {
            as : 'autos',
            foreignKey : 'sucursalId'
        })
        
    }

    return Sucursal
}