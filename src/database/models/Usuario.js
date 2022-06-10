module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
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
        apellido: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        pass: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING(100),
        },
        rol: {
            type: dataTypes.STRING(25),
            allowNull: false,
        },
        direccion: {
            type: dataTypes.STRING(100),
        },
        telefono: {
            type: dataTypes.INTEGER(25),
        }
        
    };
    let config = {
        tableName : 'usuarios',
        timestamps : false
    }
    const User = sequelize.define(alias, cols, config);

    return User
}