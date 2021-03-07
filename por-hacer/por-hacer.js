const fs = require('fs');

let listadoPorHacer = [];

const guardarBD = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarBD();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarBD();
        return true;
    } else {
        return false;
    }
}

const borrar = (desc) => {
    cargarDB();

    //UNA FORMA DE HACERLO!!!
    // let index = listadoPorHacer.findIndex(tarea => {
    //     return tarea.descripcion === descripcion;
    // })

    // if (index >= 0) {
    //     listadoPorHacer.splice(index, 1);
    //     guardarBD();
    //     return true;
    // } else {
    //     return false;
    // }

    //USANDO FILTER
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== desc);

    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarBD();
        return true;
    }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}