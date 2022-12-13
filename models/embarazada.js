const mongoose = require('mongoose');
const { Schema } = mongoose;

const embarazadasSchema = Schema({

    Carnet_Identidad: {
        type: String,
        required: [false],
    },
    Nombre: {
        type: String,
        required: [false]
    },
    Telefono: {
        type: String,
        required: [false]
    },
    Provincia: {
        type: String,
        required: [false]
    },
    Municipio: {
        type: String,
        required: [false]
    },
    Direccion: {
        type: String,
        required: [false]
    },
    Area_Salud: {
        type: String,
        required: [false]
    },
    Codigo_ingreso: {
        type: String,
        required: [false]
    },
    NoHC: {
        type: String,
        required: [false]
    },
    NoConsulotorio: {
        type: String,
        required: [false]
    },

});

embarazadasSchema.methods.toJSON = function () {
    const { __v, password, _id, ...embarazadas } = this.toObject();
    embarazadas.uid = _id
    return embarazadas;
}

const EmbarazadasModel = mongoose.model('embarazadas', embarazadasSchema);

module.exports = {
    EmbarazadasModel
}