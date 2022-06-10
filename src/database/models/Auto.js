module.exports = (sequelize, dataTypes) => {
    let alias = 'Auto';
    let cols = {
        id : {
            type : dataTypes.INTEGER(11),
            primaryKey : true,
            autoIncrement : true,
        },
        marca : {
            type : dataTypes.STRING(100),
            allowNull : false,
        },
        modelo : {
            type : dataTypes.STRING(100),
            allowNull : false,
        },
        anio :{
            type : dataTypes.INTEGER(11),
            allowNull : false,
        },
        color : {
            type : dataTypes.STRING(25),
            allowNull : false,
        },
        imagen : {
            type : dataTypes.STRING(255),
        },
        sucursalId : {
            type : dataTypes.INTEGER(11),
        }
    };
    let config = {
        tableName : 'autos',
        timestamps : false
    }
    const Auto = sequelize.define(alias, cols, config);

    Auto.associate = models => {

        Auto.belongsTo(models.Sucursal, {//alias del modelo
            as : 'sucursal',//nombre de la asociacion
            foreignKey : 'sucursalId'
        })
        
    }

    return Auto
}