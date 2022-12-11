const mongoose = require('mongoose');
const { Schema } = mongoose;

const fallecidaSchema = Schema({
    fecha: {
        type: String,
        required: [false],
    },
    causa: {
        type: String,
        required: [false],
    },
    sala: {
        type: String,
        required: [false],
    },
    cama: {
        type: String,
        required: [false],
    },
    idEmbarazada: {
        type: Schema.ObjectId,
        ref: embarazadas,
        required: [false]
    },
    
});

fallecidaSchema.methods.toJSON = function () {
    const { __v, password, _id, ...fallecidas } = this.toObject();
    fallecidas.uid = _id
    return fallecidas;
}

const FallecidasModel = mongoose.model('fallecidas', fallecidaSchema);

module.exports = {
    FallecidasModel
}