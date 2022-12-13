const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingresoSchema = Schema({
    fechaDeingreso: {
        type: String,
        required: [false]
    },
    diagnostico: {
        type: String,
        required: [false]
    },
    sala: {
        type: String,
        required: [false]
    },
    cama: {
        type: String,
        required: [false]
    },
    escolaridad: {
        type: String,
        required: [false]
    },
    estadoConyugal: {
        type: String,
        required: [false]
    },
    habitosToxicos: {
        type: String,
        required: [false]
    },
    nombrePadre: {
        type: String,
        required: [false]
    },
    padreFallecido: {
        type: Boolean,
        required: [false]
    },
    nombreMadre: {
        type: String,
        required: [false]
    },
    madreFallecida: {
        type: Boolean,
        required: [false]
    },
    nombreEmergencia: {
        type: String,
        required: [false]
    },
    telefonoEmergencia: {
        type: String,
        required: [false]
    },
    idEmbarazada: {
        type: Schema.ObjectId,
        ref: 'embarazadas',
        required: [false]
    },
    idUsuario: {
        type: Schema.ObjectId,
        ref: 'users',
        required: [false]
    },
    
});

ingresoSchema.methods.toJSON = function () {
    const { __v, password, _id, ...ingreso } = this.toObject();
    ingreso.uid = _id
    return ingreso;
}

const IngresoModel = mongoose.model('ingresos', ingresoSchema);

module.exports = {
    IngresoModel
}