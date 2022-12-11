const mongoose = require('mongoose');
const { Schema } = mongoose;

const egresoSchema = Schema({

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

egresoSchema.methods.toJSON = function () {
    const { __v, password, _id, ...egreso } = this.toObject();
    egreso.uid = _id
    return egreso;
}

const EgresoModel = mongoose.model('solicitudes', egresoSchema);

module.exports = {
    EgresoModel
}