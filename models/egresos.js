const mongoose = require('mongoose');
const { Schema } = mongoose;

const egresoSchema = Schema({
    fechaEgreso: {
        type: String,
        required: [false]
    },
    motivo: {
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

egresoSchema.methods.toJSON = function () {
    const { __v, password, _id, ...egreso } = this.toObject();
    egreso.uid = _id
    return egreso;
}

const EgresoModel = mongoose.model('egresos', egresoSchema);

module.exports = {
    EgresoModel
}