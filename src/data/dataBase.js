let fs = require('fs');

module.exports = {
    /* Pasamos a formato JS los JSON */
    getSucursales : JSON.parse(fs.readFileSync('./src/data/concesionarias.json', 'utf-8')),
    getAutos : JSON.parse(fs.readFileSync('./src/data/autos.json', 'utf-8')),
    getUsers : JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8')),
    /* Creamos las funciones que usaremos para sobreescribir los archivos JSON*/
    writeJson : (dataBase) => {
        fs.writeFileSync('./src/data/concesionarias.json', JSON.stringify(dataBase), "utf-8")
    },
    writeJsonAutos : (dataBase) => {
        fs.writeFileSync('./src/data/autos.json', JSON.stringify(dataBase), "utf-8")
    },
    writeJsonUsers : (dataBase) => {
        fs.writeFileSync('./src/data/users.json', JSON.stringify(dataBase), "utf-8")
    }
}


